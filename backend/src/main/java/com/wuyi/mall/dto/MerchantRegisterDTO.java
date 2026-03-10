package com.wuyi.mall.dto;

import lombok.Data;

/**
 * 接收前端商家入驻注册参数
 */
@Data
public class MerchantRegisterDTO {
    private String username;
    private String password;
    private String phone;
    private String realName;
    private String idCard;
    private String shopName;
}