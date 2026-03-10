package com.wuyi.mall.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * 分类表实体类 (对应数据库表: categories)
 */
@Data
@TableName("categories")
public class Category {

    /**
     * 主键
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 分类名称
     */
    private String name;

    /**
     * 创建人ID (若是商家申请，填商家ID；管理员直接创建为0)
     */
    private Long creatorId;

    /**
     * 审核状态：1-正常(含审核通过), 0-待审核(商家申请用), 2-驳回
     */
    private Integer auditStatus;
}