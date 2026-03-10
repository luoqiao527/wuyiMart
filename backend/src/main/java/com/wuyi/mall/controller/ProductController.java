package com.wuyi.mall.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wuyi.mall.common.result.Result;
import com.wuyi.mall.entity.Product;
import com.wuyi.mall.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 商品模块接口 (包含用户端、商家端、管理员端)
 */
@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    // ================== 公共/C端接口 ==================

    /**
     * C端获取商城商品列表 (分页)
     * 强制限制：仅查询审核通过(1)且已上架(1)的商品
     */
    @GetMapping("/products")
    public Result<Page<Product>> getPublicProducts(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize) {
        
        // 强制 auditStatus=1, saleStatus=1， merchantId不限
        Page<Product> pageData = productService.getProductPage(categoryId, null, 1, 1, pageNum, pageSize);
        return Result.success(pageData);
    }

    /**
     * 获取商品详情 (公共)
     */
    @GetMapping("/products/{id}")
    public Result<Product> getProductDetail(@PathVariable Long id) {
        return Result.success(productService.getProductDetail(id));
    }


    // ================== 商家端接口 ==================

    /**
     * 商家端获取自己的商品列表
     */
    @GetMapping("/merchant/products")
    public Result<Page<Product>> getMerchantProducts(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Integer auditStatus,
            @RequestParam(required = false) Integer saleStatus,
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestHeader("X-User-Id") Long merchantId) { // 模拟鉴权获取当前商家ID
        
        // 强制传入 merchantId，实现数据隔离
        Page<Product> pageData = productService.getProductPage(categoryId, merchantId, auditStatus, saleStatus, pageNum, pageSize);
        return Result.success(pageData);
    }

    /**
     * 商家提交商品上架申请
     */
    @PostMapping("/merchant/products")
    public Result<Void> applyProduct(@RequestBody Product product,
                                     @RequestHeader("X-User-Id") Long merchantId) {
        try {
            productService.applyProduct(product, merchantId);
            return Result.success();
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }


    // ================== 管理员端接口 ==================

    /**
     * 管理员获取全站商品列表 (最高权限查询，任意条件组合)
     */
    @GetMapping("/admin/products")
    public Result<Page<Product>> getAdminProducts(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long merchantId,
            @RequestParam(required = false) Integer auditStatus,
            @RequestParam(required = false) Integer saleStatus,
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize) {
        
        Page<Product> pageData = productService.getProductPage(categoryId, merchantId, auditStatus, saleStatus, pageNum, pageSize);
        return Result.success(pageData);
    }

    /**
     * 管理员审核商品上架
     */
    @PutMapping("/admin/products/{id}/audit")
    public Result<Void> auditProduct(@PathVariable Long id, @RequestBody Map<String, Integer> params) {
        try {
            Integer status = params.get("status"); // 1-通过, 2-驳回
            productService.auditProduct(id, status);
            return Result.success();
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}