package com.wuyi.mall.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
<<<<<<< HEAD
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
=======
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wuyi.mall.common.Result;
import com.wuyi.mall.entity.User;
import com.wuyi.mall.service.UserService;
import com.wuyi.mall.utils.JwtUtils;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/profile")
    public Result<User> getProfile(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        Long userId = jwtUtils.getUserIdFromToken(token);
        User user = userService.getUserById(userId);
        user.setPassword(null);
        return Result.success("获取成功", user);
    }

    @PutMapping("/profile")
    public Result<User> updateProfile(@RequestHeader("Authorization") String authHeader,
                                       @RequestBody UpdateProfileRequest request) {
        String token = authHeader.replace("Bearer ", "");
        Long userId = jwtUtils.getUserIdFromToken(token);
        User user = new User();
        user.setAvatar(request.getAvatar());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setRealName(request.getRealName());
        user.setIdCard(request.getIdCard());
        User updated = userService.updateUser(userId, user);
        updated.setPassword(null);
        return Result.success("更新成功", updated);
    }

    @PutMapping("/password")
    public Result<Void> updatePassword(@RequestHeader("Authorization") String authHeader,
                                       @RequestBody UpdatePasswordRequest request) {
        String token = authHeader.replace("Bearer ", "");
        Long userId = jwtUtils.getUserIdFromToken(token);
        userService.updatePassword(userId, request.getOldPassword(), request.getNewPassword());
        return Result.success("密码修改成功", null);
    }

    @GetMapping("/{id}")
    public Result<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        user.setPassword(null);
        return Result.success("获取成功", user);
    }

    @PutMapping("/{id}/status")
    public Result<Void> updateUserStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest request) {
        User user = new User();
        user.setId(id);
        user.setStatus(request.getStatus());
        userService.updateById(user);
        return Result.success("状态更新成功", null);
    }

    @GetMapping
    public Result<Page<User>> getUserList(@RequestParam(defaultValue = "1") Integer page,
                                          @RequestParam(defaultValue = "10") Integer size,
                                          @RequestParam(required = false) String username,
                                          @RequestParam(required = false) Integer role,
                                          @RequestParam(required = false) Integer status) {
        Page<User> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        if (username != null && !username.isEmpty()) {
            wrapper.like(User::getUsername, username);
        }
        if (role != null) {
            wrapper.eq(User::getRole, role);
        }
        if (status != null) {
            wrapper.eq(User::getStatus, status);
        }
        wrapper.orderByDesc(User::getCreatedAt);
        Page<User> result = userService.page(pageParam, wrapper);
        result.getRecords().forEach(u -> u.setPassword(null));
        return Result.success("获取成功", result);
    }

    @Data
    public static class UpdateProfileRequest {
        private String avatar;
        private String phone;
        private String email;
        private String realName;
        private String idCard;
    }

    @Data
    public static class UpdatePasswordRequest {
        private String oldPassword;
        private String newPassword;
    }

    @Data
    public static class UpdateStatusRequest {
        private Integer status;
    }
}
>>>>>>> 86d584441656c1ee113d39e2654666180ef38e13
