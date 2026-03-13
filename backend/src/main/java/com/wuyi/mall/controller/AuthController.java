package com.wuyi.mall.controller;

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
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
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