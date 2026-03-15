package com.wuyi.mall.controller;

<<<<<<< HEAD
import com.wuyi.mall.common.result.Result;
import com.wuyi.mall.dto.LoginDTO;
import com.wuyi.mall.dto.MerchantRegisterDTO;
import com.wuyi.mall.dto.UserRegisterDTO;
import com.wuyi.mall.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * 认证授权接口 (公开接口，无需 JWT 校验即可访问)
 */
=======
import com.wuyi.mall.common.Result;
import com.wuyi.mall.entity.User;
import com.wuyi.mall.service.UserService;
import com.wuyi.mall.utils.JwtUtils;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

>>>>>>> 86d584441656c1ee113d39e2654666180ef38e13
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
<<<<<<< HEAD
    private AuthService authService;

    /**
     * 统一登录接口
     */
    @PostMapping("/login")
    public Result<Map<String, Object>> login(@RequestBody LoginDTO loginDTO) {
        try {
            Map<String, Object> data = authService.login(loginDTO);
            return Result.success(data);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 普通用户注册
     */
    @PostMapping("/register/user")
    public Result<Long> registerUser(@RequestBody UserRegisterDTO registerDTO) {
        try {
            Long userId = authService.registerUser(registerDTO);
            return Result.success(userId);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 商家入驻注册
     */
    @PostMapping("/register/merchant")
    public Result<Long> registerMerchant(@RequestBody MerchantRegisterDTO registerDTO) {
        try {
            Long userId = authService.registerMerchant(registerDTO);
            return Result.success(userId);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}
=======
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public Result<User> register(@RequestBody RegisterRequest request) {
        User user = userService.register(request.getUsername(), request.getPassword(),
                request.getRole(), request.getPhone(), request.getEmail());
        user.setPassword(null);
        return Result.success("注册成功", user);
    }

    @PostMapping("/login")
    public Result<Map<String, Object>> login(@RequestBody LoginRequest request) {
        String token = userService.login(request.getUsername(), request.getPassword());
        User user = userService.getUserById(jwtUtils.getUserIdFromToken(token));
        user.setPassword(null);

        Map<String, Object> data = new HashMap<>();
        data.put("token", token);
        data.put("user", user);
        return Result.success("登录成功", data);
    }

    @PostMapping("/refresh")
    public Result<Map<String, String>> refreshToken(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        if (!jwtUtils.validateToken(token)) {
            return Result.error("Token无效");
        }
        Long userId = jwtUtils.getUserIdFromToken(token);
        String username = jwtUtils.getUsernameFromToken(token);
        Integer role = jwtUtils.getRoleFromToken(token);
        String newToken = jwtUtils.generateToken(userId, username, role);

        Map<String, String> data = new HashMap<>();
        data.put("token", newToken);
        return Result.success("刷新成功", data);
    }

    @Data
    public static class RegisterRequest {
        private String username;
        private String password;
        private Integer role = 2;
        private String phone;
        private String email;
    }

    @Data
    public static class LoginRequest {
        private String username;
        private String password;
    }
}
>>>>>>> 86d584441656c1ee113d39e2654666180ef38e13
