package com.wuyi.mall.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.wuyi.mall.common.utils.JwtUtils;
import com.wuyi.mall.dto.LoginDTO;
import com.wuyi.mall.dto.MerchantRegisterDTO;
import com.wuyi.mall.dto.UserRegisterDTO;
import com.wuyi.mall.entity.MerchantProfile;
import com.wuyi.mall.entity.User;
import com.wuyi.mall.mapper.MerchantProfileMapper;
import com.wuyi.mall.mapper.UserMapper;
import com.wuyi.mall.service.AuthService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private MerchantProfileMapper merchantProfileMapper;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public Map<String, Object> login(LoginDTO loginDTO) {
        // 1. 根据用户名查询用户
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUsername, loginDTO.getUsername());
        User user = userMapper.selectOne(queryWrapper);
        LambdaQueryWrapper<MerchantProfile> profileWrapper = new LambdaQueryWrapper<>();
        profileWrapper.eq(MerchantProfile::getUserId, user.getId());
        
        // 使用 Mapper 查询出商家档案实体
        MerchantProfile merchantProfile = merchantProfileMapper.selectOne(profileWrapper);
        if (user == null) {
            throw new RuntimeException("账号不存在！");
        }

        // 2. 校验账号状态
        if (user.getStatus() == 0) {
            throw new RuntimeException("该账号已被禁用，请联系管理员！");
        }
         if (user.getRole() == 1 && merchantProfile.getAuditStatus() == 0) {
            throw new RuntimeException("管理员正在加急审核中，请耐心等待！");
        }
        // 3. 校验密码 (使用 BCrypt 校验)
        if (!BCrypt.checkpw(loginDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("密码错误！");
        }

        // 4. 密码正确，生成 JWT Token
        String token = jwtUtils.generateToken(user.getId(), user.getUsername(), user.getRole());

        // 5. 封装返回结果
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("id", user.getId()); // 新增：返回用户主键ID
        resultMap.put("token", token);
        resultMap.put("role", user.getRole()); // 告知前端当前角色 0/1/2
        resultMap.put("username", user.getUsername());
        resultMap.put("avatar", user.getAvatar());

        return resultMap;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long registerUser(UserRegisterDTO dto) {
        // 1. 检查用户名是否已存在
        checkUsernameExist(dto.getUsername());

        // 2. 创建用户实体并使用 BCrypt 加密密码
        User user = new User();
        user.setUsername(dto.getUsername());
        // 生成盐并加密密码
        user.setPassword(BCrypt.hashpw(dto.getPassword(), BCrypt.gensalt()));
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());
        user.setRole(2); // 2 代表普通用户
        user.setStatus(1); // 1 代表正常

        // 3. 存入数据库
        userMapper.insert(user);

        return user.getId(); // MyBatis-Plus会自动回填主键，直接返回即可
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long registerMerchant(MerchantRegisterDTO dto) {
        // 1. 检查用户名是否已存在
        checkUsernameExist(dto.getUsername());

        // 2. 创建商家用户实体
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(BCrypt.hashpw(dto.getPassword(), BCrypt.gensalt()));
        user.setPhone(dto.getPhone());
        user.setRealName(dto.getRealName());
        user.setIdCard(dto.getIdCard());
        user.setRole(1); // 1 代表商家
        user.setStatus(1);

        // 存入 users 表，MyBatis-Plus 会自动将生成的自增主键回填到 user.getId() 中
        userMapper.insert(user);

        // 3. 创建商家店铺扩展信息
        MerchantProfile profile = new MerchantProfile();
        profile.setUserId(user.getId()); // 关联刚才生成的用户主键
        profile.setShopName(dto.getShopName());
        profile.setAuditStatus(0); // 0 代表待平台管理员审核

        // 存入 merchant_profiles 表
        merchantProfileMapper.insert(profile);

        return user.getId(); // 返回生成的商家主键
    }

    /**
     * 辅助方法：校验用户名是否被占用
     */
    private void checkUsernameExist(String username) {
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUsername, username);
        if (userMapper.selectCount(queryWrapper) > 0) {
            throw new RuntimeException("用户名已被占用，请更换！");
        }
    }
}