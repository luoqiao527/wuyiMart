package com.wuyi.mall.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wuyi.mall.entity.Product;
import com.wuyi.mall.mapper.ProductMapper;
import com.wuyi.mall.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductMapper productMapper;

    @Override
    public Page<Product> getProductPage(Long categoryId, Long merchantId, Integer auditStatus, Integer saleStatus, int pageNum, int pageSize) {
        // 创建分页对象
        Page<Product> page = new Page<>(pageNum, pageSize);

        // 构建动态查询条件
        LambdaQueryWrapper<Product> queryWrapper = new LambdaQueryWrapper<>();
        
        // 分类过滤
        if (categoryId != null) {
            queryWrapper.eq(Product::getCategoryId, categoryId);
        }
        // 商家过滤
        if (merchantId != null) {
            queryWrapper.eq(Product::getMerchantId, merchantId);
        }
        // 审核状态过滤
        if (auditStatus != null) {
            queryWrapper.eq(Product::getAuditStatus, auditStatus);
        }
        // 上架状态过滤
        if (saleStatus != null) {
            queryWrapper.eq(Product::getSaleStatus, saleStatus);
        }

        // 【核心修复：完美避开 SQL Server 的分页报错 BUG】
        // 1. 先在没有 ORDER BY 的情况下，手动统计总条数 (避免了 COUNT 报错 1033)
        long totalCount = productMapper.selectCount(queryWrapper);
        page.setTotal(totalCount);
        
        // 2. 告诉 MyBatis-Plus 的 Page 对象：总数我已经算好了，你别去自动 Count 了！
        page.setSearchCount(false);

        // 3. 现在再把 ORDER BY 加上，去查真实的数据列表 (避免了 OFFSET 报错 102)
        queryWrapper.orderByDesc(Product::getId);

        // 执行分页列表查询并返回
        return productMapper.selectPage(page, queryWrapper);
    }

    @Override
    public Product getProductDetail(Long id) {
        Product product = productMapper.selectById(id);
        if (product == null) {
            throw new RuntimeException("商品不存在！");
        }
        return product;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void applyProduct(Product product, Long merchantId) {
        // 强制绑定当前操作的商家ID，防止越权发布
        product.setMerchantId(merchantId);
        
        // 初始价格处理：当前最高价默认为起拍价
        product.setCurrentPrice(product.getStartPrice());
        
        // 状态初始化
        product.setAuditStatus(0); // 0-待审核
        product.setSaleStatus(0);  // 0-下架 (通过审核后且到开拍时间才算上架/竞拍中)

        productMapper.insert(product);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void auditProduct(Long id, Integer status) {
        Product product = productMapper.selectById(id);
        if (product == null) {
            throw new RuntimeException("商品不存在！");
        }
        if (product.getAuditStatus() != 0) {
            throw new RuntimeException("该商品不是待审核状态！");
        }

        product.setAuditStatus(status);
        
        // 如果审核通过，则将状态更新为上架（这里可配合定时任务判断 start_time 是否到达）
        if (status == 1) {
            product.setSaleStatus(1);
        }
        
        productMapper.updateById(product);
    }
}