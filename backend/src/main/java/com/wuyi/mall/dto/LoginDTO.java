package com.wuyi.mall.dto;

import lombok.Data;

/**
 * 接收前端登录参数
 */
@Data
public class LoginDTO {
    private String username;
    private String password;
}