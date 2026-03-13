package com.wuyi.mall.entity; 


import com.baomidou.mybatisplus.annotation.IdType; 
import com.baomidou.mybatisplus.annotation.TableId; 
import com.baomidou.mybatisplus.annotation.TableName; 
import lombok.Data; 


import java.time.LocalDateTime; 


/** 
 * 统一用户表实体类 (对应数据库表: users) 
 */ 
@Data 
@TableName("users") 
public class User { 


    /** 
     * 主键 
     */ 
    @TableId(type = IdType.AUTO) 
    private Long id; 


    /** 
     * 登录账号名 
     */ 
    private String username; 


    /** 
     * 密码（加密存储） 
     */ 
    private String password; 


    /** 
     * 角色权限：0-管理员, 1-商家, 2-用户 
     */ 
    private Integer role; 


    /** 
     * 头像URL 
     */ 
    private String avatar; 


    /** 
     * 手机号 
     */ 
    private String phone; 


    /** 
     * 邮箱 
     */ 
    private String email; 


    /** 
     * 真实姓名（商家入驻/实名） 
     */ 
    private String realName; 


    /** 
     * 身份证号（商家入驻） 
     */ 
    private String idCard; 


    /** 
     * 状态：1-正常, 0-禁用 
     */ 
    private Integer status; 


    /** 
     * 注册时间 
     */ 
    private LocalDateTime createdAt; 
}