package com.wuyi.mall.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wuyi.mall.entity.Entrustment;

public interface EntrustmentService {

    /**
     * 用户提交委托售卖申请 (含异步 AI 调用)
     * @param entrustment 委托详情
     * @param userId 提交人ID
     */
    void submitEntrustment(Entrustment entrustment, Long userId);

    /**
     * 用户查询自己的委托记录
     */
    Page<Entrustment> getUserEntrustments(Long userId, int pageNum, int pageSize);

    /**
     * 商家查询指派给自己的委托记录
     */
    Page<Entrustment> getMerchantEntrustments(Long merchantId, Integer status, int pageNum, int pageSize);

    /**
     * 商家审核(接受/拒绝)委托
     */
    void auditEntrustment(Long id, Long merchantId, Integer status, String replyMsg);
}