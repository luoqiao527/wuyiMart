package com.wuyi.mall.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 商品/拍卖品表实体类 (对应数据库表: products)
 */
@Data
@TableName("products")
public class Product {

    /**
     * 主键
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 所属商家ID
     */
    private Long merchantId;

    /**
     * 所属分类ID
     */
    private Long categoryId;

    /**
     * 商品标题
     */
    private String title;

    /**
     * 商品详情描述(可存放HTML)
     */
    private String description;

    /**
     * 轮播图/详情图 (存JSON字符串)
     */
    private String images;

    /**
     * 起拍价
     */
    private BigDecimal startPrice;

    /**
     * 拍卖保证金金额
     */
    private BigDecimal deposit;

    /**
     * 当前最高价
     */
    private BigDecimal currentPrice;

    /**
     * 每次加价幅度
     */
    private BigDecimal increment;

    /**
     * 开拍时间
     */
    private LocalDateTime startTime;

    /**
     * 截拍时间
     */
    private LocalDateTime endTime;

    /**
     * 商品审核状态：0-待审核, 1-通过, 2-驳回
     */
    private Integer auditStatus;

    /**
     * 上架状态：0-下架, 1-上架/竞拍中, 2-已截拍
     */
    private Integer saleStatus;

    /**
     * AI生成的英文详情
     */
    private String descriptionEn; 
    
    /**
     * AI生成的商品简介缩写
     */
    private String summary;
}