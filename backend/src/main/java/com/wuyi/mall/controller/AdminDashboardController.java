package com.wuyi.mall.controller;

import com.wuyi.mall.common.result.Result;
import com.wuyi.mall.dto.DashboardStatsDTO;
import com.wuyi.mall.service.AdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 管理员首页大盘接口
 */
@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    @Autowired
    private AdminDashboardService adminDashboardService;

    /**
     * 获取数据统计看板
     */
    @GetMapping("/stats")
    public Result<DashboardStatsDTO> getStats() {
        try {
            DashboardStatsDTO stats = adminDashboardService.getDashboardStats();
            return Result.success(stats);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}