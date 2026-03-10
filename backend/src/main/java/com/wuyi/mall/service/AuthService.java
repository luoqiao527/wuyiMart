package com.wuyi.mall.service;

import com.wuyi.mall.dto.LoginDTO;
import com.wuyi.mall.dto.MerchantRegisterDTO;
import com.wuyi.mall.dto.UserRegisterDTO;

import java.util.Map;

/**
 * 认证与授权业务接口
 */
public interface AuthService {
    
    /**
     * 统一登录
     * @return 包含 token 和 用户信息的 Map
     */
    Map<String, Object> login(LoginDTO loginDTO);

    /**
     * 普通用户注册
     */
    void registerUser(UserRegisterDTO registerDTO);

    /**
     * 商家入驻注册
     */
    void registerMerchant(MerchantRegisterDTO registerDTO);
}