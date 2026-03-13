package com.wuyi.mall.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.wuyi.mall.common.result.Result;
import com.wuyi.mall.entity.User;
import com.wuyi.mall.mapper.UserMapper;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserMapper userMapper;

    /**
     * 1. 获取个人中心基础信息 (含各状态订单数量统计等)
     */
    @GetMapping("/profile")
    public Result<Map<String, Object>> getUserProfile(@RequestHeader("X-User-Id") Long userId) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            return Result.error("用户不存在！");
        }

        Map<String, Object> data = new HashMap<>();
        // 基础信息 (注意脱敏，千万不要把 password 返回给前端)
        data.put("id", user.getId());
        data.put("username", user.getUsername());
        data.put("avatar", user.getAvatar());
        data.put("phone", user.getPhone());
        data.put("email", user.getEmail());
        data.put("role", user.getRole());
        data.put("realName", user.getRealName()); // 商家可能有真实姓名

        // 订单数量统计
        // TODO: 待订单模块完全打通后，这里需要联查 orders 表。目前先返回结构化的初始数据供前端联调页面
        Map<String, Integer> orderStats = new HashMap<>();
        orderStats.put("unpaid", 0);     // 待付保证金/尾款
        orderStats.put("unshipped", 0);  // 待发货
        orderStats.put("unreceived", 0); // 待收货
        orderStats.put("afterSales", 0); // 售后中
        data.put("orderStats", orderStats);

        return Result.success(data);
    }

    /**
     * 2. 修改个人信息 (用户名、密码、头像、手机号等)
     */
    @PutMapping("/profile")
    public Result<Void> updateProfile(@RequestHeader("X-User-Id") Long userId, 
                                      @RequestBody Map<String, String> params) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            return Result.error("用户不存在！");
        }

        // 修改头像
        if (params.containsKey("avatar") && !params.get("avatar").trim().isEmpty()) {
            user.setAvatar(params.get("avatar"));
        }
        
        // 修改手机号
        if (params.containsKey("phone") && !params.get("phone").trim().isEmpty()) {
            user.setPhone(params.get("phone"));
        }

        // 修改用户名 (必须校验是否被别人占用了)
        if (params.containsKey("username") && !params.get("username").trim().isEmpty()) {
            String newUsername = params.get("username").trim();
            if (!newUsername.equals(user.getUsername())) {
                LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
                wrapper.eq(User::getUsername, newUsername);
                if (userMapper.selectCount(wrapper) > 0) {
                    return Result.error("修改失败，该用户名已被占用！");
                }
                user.setUsername(newUsername);
            }
        }

        // 修改密码 (必须重新进行 BCrypt 加密后再存入数据库)
        if (params.containsKey("password") && !params.get("password").trim().isEmpty()) {
            // 使用项目中已有的 jbcrypt 库进行密码加密
            String newPassword = BCrypt.hashpw(params.get("password").trim(), BCrypt.gensalt());
            user.setPassword(newPassword);
        }

        userMapper.updateById(user);
        
        return Result.success();
    }
}