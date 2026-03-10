package com.wuyi.mall.service;

import com.wuyi.mall.dto.DashboardStatsDTO;

/**
 * 管理员数据大盘业务接口
 */
public interface AdminDashboardService {

    /**
     * 统计全站基础数据 (用户数、商家数、商品数)
     * @return 统计结果对象
     */
    DashboardStatsDTO getDashboardStats();
}