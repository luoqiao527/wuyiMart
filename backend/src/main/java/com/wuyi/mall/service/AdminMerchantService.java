package com.wuyi.mall.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wuyi.mall.entity.MerchantProfile;

public interface AdminMerchantService {
    
    /**
     * 管理员审核商家入驻申请
     * @param userId 商家的 user_id
     * @param status 1-通过, 2-驳回
     * @param rejectReason 驳回原因
     */
    void auditMerchant(Long userId, Integer status, String rejectReason);
    
    /**
     * 获取商家入驻列表 (供后台审核看板使用)
     */
    Page<MerchantProfile> getMerchantList(Integer auditStatus, int pageNum, int pageSize);
}