package com.wuyi.mall.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.wuyi.mall.dto.DashboardStatsDTO;
import com.wuyi.mall.entity.MerchantProfile;
import com.wuyi.mall.entity.Product;
import com.wuyi.mall.entity.User;
import com.wuyi.mall.mapper.MerchantProfileMapper;
import com.wuyi.mall.mapper.ProductMapper;
import com.wuyi.mall.mapper.UserMapper;
import com.wuyi.mall.service.AdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminDashboardServiceImpl implements AdminDashboardService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private MerchantProfileMapper merchantProfileMapper;

    @Autowired
    private ProductMapper productMapper;

    @Override
    public DashboardStatsDTO getDashboardStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();

        // 1. 统计注册用户数 (条件：role = 2 代表普通用户)
        LambdaQueryWrapper<User> userQuery = new LambdaQueryWrapper<>();
        userQuery.eq(User::getRole, 2);
        Long userCount = userMapper.selectCount(userQuery);
        stats.setUserCount(userCount);

        // 2. 统计入驻商家数 (条件：在商家扩展表里审核状态 audit_status = 1 为已通过)
        LambdaQueryWrapper<MerchantProfile> merchantQuery = new LambdaQueryWrapper<>();
        merchantQuery.eq(MerchantProfile::getAuditStatus, 1);
        Long merchantCount = merchantProfileMapper.selectCount(merchantQuery);
        stats.setMerchantCount(merchantCount);

        // 3. 统计上架商品数 (条件：sale_status = 1 代表正在上架/竞拍中)
        LambdaQueryWrapper<Product> productQuery = new LambdaQueryWrapper<>();
        productQuery.eq(Product::getSaleStatus, 1);
        Long productCount = productMapper.selectCount(productQuery);
        stats.setProductCount(productCount);

        return stats;
    }
}