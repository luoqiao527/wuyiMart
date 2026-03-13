package com.wuyi.mall.dto;

import lombok.Data;

/**
 * 管理员大盘数据统计 DTO
 */
@Data
public class DashboardStatsDTO {
    /**
     * 注册用户总数 (Role = 2)
     */
    private Long userCount;

    /**
     * 成功入驻的商家总数 (AuditStatus = 1)
     */
    private Long merchantCount;

    /**
     * 当前上架/竞拍中的商品总数 (SaleStatus = 1)
     */
    private Long productCount;
}