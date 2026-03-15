package com.wuyi.mall.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wuyi.mall.common.result.Result;
import com.wuyi.mall.entity.MerchantProfile;
import com.wuyi.mall.service.AdminMerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 管理员端 - 商家入驻审核控制器
 */
@RestController
@RequestMapping("/api/admin/merchants")
public class AdminMerchantController {

    @Autowired
    private AdminMerchantService adminMerchantService;

    /**
     * 审核商家入驻申请
     * @param userId 商家的 user_id
     */
    @PutMapping("/{userId}/audit")
    public Result<Void> auditMerchant(@PathVariable Long userId, @RequestBody Map<String, Object> params) {
        try {
            Integer status = (Integer) params.get("status");
            String rejectReason = (String) params.get("rejectReason");
            
            if (status == null || (status != 1 && status != 2)) {
                return Result.error("状态参数不正确 (1-通过, 2-驳回)");
            }
            
            adminMerchantService.auditMerchant(userId, status, rejectReason);
            return Result.success();
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取商家入驻列表 (管理员看板使用)
     */
    @GetMapping
    public Result<Page<MerchantProfile>> getMerchantList(
            @RequestParam(required = false) Integer auditStatus,
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize) {
        
        return Result.success(adminMerchantService.getMerchantList(auditStatus, pageNum, pageSize));
    }
}