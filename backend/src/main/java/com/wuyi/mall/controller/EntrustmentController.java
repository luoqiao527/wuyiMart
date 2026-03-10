package com.wuyi.mall.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wuyi.mall.common.result.Result;
import com.wuyi.mall.entity.Entrustment;
import com.wuyi.mall.service.EntrustmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 委托售卖模块接口
 */
@RestController
@RequestMapping("/api")
public class EntrustmentController {

    @Autowired
    private EntrustmentService entrustmentService;

    // ================== C端用户接口 ==================

    /**
     * 用户提交委托售卖申请
     */
    @PostMapping("/entrustments")
    public Result<Void> submitEntrustment(@RequestBody Entrustment entrustment,
                                          @RequestHeader("X-User-Id") Long userId) { // 模拟鉴权获取用户ID
        try {
            // 校验必填项
            if (entrustment.getItemName() == null || entrustment.getImages() == null) {
                return Result.error("物品名称和照片不能为空");
            }
            entrustmentService.submitEntrustment(entrustment, userId);
            return Result.success();
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 用户获取自己的委托记录列表
     */
    @GetMapping("/entrustments")
    public Result<Page<Entrustment>> getUserEntrustments(
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestHeader("X-User-Id") Long userId) {
        
        return Result.success(entrustmentService.getUserEntrustments(userId, pageNum, pageSize));
    }


    // ================== 商家端接口 ==================

    /**
     * 商家获取指派给自己的委托列表
     */
    @GetMapping("/merchant/entrustments")
    public Result<Page<Entrustment>> getMerchantEntrustments(
            @RequestParam(required = false) Integer status,
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestHeader("X-User-Id") Long merchantId) {
        
        return Result.success(entrustmentService.getMerchantEntrustments(merchantId, status, pageNum, pageSize));
    }

    /**
     * 商家处理委托 (接受或拒绝)
     */
    @PutMapping("/merchant/entrustments/{id}/audit")
    public Result<Void> auditEntrustment(
            @PathVariable Long id,
            @RequestBody Map<String, Object> params,
            @RequestHeader("X-User-Id") Long merchantId) {
        try {
            Integer status = (Integer) params.get("status"); // 1-接受, 2-拒绝
            String replyMsg = (String) params.get("replyMsg");
            entrustmentService.auditEntrustment(id, merchantId, status, replyMsg);
            return Result.success();
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}