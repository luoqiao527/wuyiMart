package com.wuyi.mall.dto;

import lombok.Data;

/**
 * 接收前端普通用户注册参数
 */
@Data
public class UserRegisterDTO {
    private String username;
    private String password;
    private String phone;
    private String email;
}