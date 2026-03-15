package com.wuyi.mall.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wuyi.mall.entity.MerchantProfile;
import com.wuyi.mall.mapper.MerchantProfileMapper;
import com.wuyi.mall.service.AdminMerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminMerchantServiceImpl implements AdminMerchantService {

    @Autowired
    private MerchantProfileMapper merchantProfileMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void auditMerchant(Long userId, Integer status, String rejectReason) {
        LambdaQueryWrapper<MerchantProfile> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(MerchantProfile::getUserId, userId);
        MerchantProfile profile = merchantProfileMapper.selectOne(wrapper);
        
        if (profile == null) {
            throw new RuntimeException("未找到该商家的入驻记录！");
        }

        profile.setAuditStatus(status);
        if (status == 2) {
            profile.setRejectReason(rejectReason);
        }
        
        merchantProfileMapper.updateById(profile);
    }

    @Override
    public Page<MerchantProfile> getMerchantList(Integer auditStatus, int pageNum, int pageSize) {
        Page<MerchantProfile> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<MerchantProfile> wrapper = new LambdaQueryWrapper<>();
        
        if (auditStatus != null) {
            wrapper.eq(MerchantProfile::getAuditStatus, auditStatus);
        }
        // 按入驻时间倒序排列
        page.addOrder(com.baomidou.mybatisplus.core.metadata.OrderItem.desc("id"));
        
        return merchantProfileMapper.selectPage(page, wrapper);
    }
}