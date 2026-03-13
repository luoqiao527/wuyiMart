package com.wuyi.mall.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 委托售卖表实体类 (对应数据库表: entrustments)
 */
@Data
@TableName("entrustments")
public class Entrustment {

    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 委托人(用户)ID
     */
    private Long userId;

    /**
     * 目标商家ID (可选，不指定则入平台池)
     */
    private Long merchantId;

    /**
     * 物品名称
     */
    private String itemName;

    /**
     * 物品描述
     */
    private String itemDesc;

    /**
     * 物品照片 (JSON数组)
     */
    private String images;

    /**
     * 期望售卖价格
     */
    private BigDecimal expectedPrice;

    /**
     * 状态：0-待处理, 1-商家已接受, 2-商家已拒绝
     */
    private Integer status;

    /**
     * 商家回复/拒绝原因留言
     */
    private String replyMsg;

    /**
     * 申请时间
     */
    private LocalDateTime createdAt;

    /**
     * AI 图文对比匹配度 (0.00 ~ 1.00)
     */
    private Double realValue;
}