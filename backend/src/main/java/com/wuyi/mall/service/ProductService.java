package com.wuyi.mall.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wuyi.mall.entity.Product;

/**
 * 商品模块业务接口
 */
public interface ProductService {

    /**
     * 多条件分页查询商品列表 (核心查询接口)
     * @param categoryId 分类ID (可选)
     * @param merchantId 商家ID (可选)
     * @param auditStatus 审核状态 (可选)
     * @param saleStatus 上架状态 (可选)
     * @param pageNum 当前页码
     * @param pageSize 每页条数
     * @return 分页结果
     */
    Page<Product> getProductPage(Long categoryId, Long merchantId, Integer auditStatus, Integer saleStatus, int pageNum, int pageSize);

    /**
     * 获取单个商品详情
     */
    Product getProductDetail(Long id);

    /**
     * 商家提交商品上架申请
     */
    void applyProduct(Product product, Long merchantId);

    /**
     * 管理员审核商品
     */
    void auditProduct(Long id, Integer status);
}