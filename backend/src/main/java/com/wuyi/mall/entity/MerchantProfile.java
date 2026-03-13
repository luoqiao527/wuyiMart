package com.wuyi.mall.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;

/**
 * 商家扩展信息表实体类 (对应数据库表: merchant_profiles)
 */
@Data
@TableName("merchant_profiles")
public class MerchantProfile {

    /**
     * 主键
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 关联users表id
     */
    private Long userId;

    /**
     * 店铺名称
     */
    private String shopName;

    /**
     * 店铺简介
     */
    private String shopDesc;

    /**
     * 审核状态：0-待审核, 1-通过, 2-驳回
     */
    private Integer auditStatus;

    /**
     * 驳回原因
     */
    private String rejectReason;

    /**
     * 商家账户余额
     */
    private BigDecimal balance;
}