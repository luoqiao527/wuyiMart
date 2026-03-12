package com.wuyi.mall.controller;

import com.wuyi.mall.common.result.Result;
import com.wuyi.mall.entity.Category;
import com.wuyi.mall.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 分类模块接口 (包含用户端、商家端、管理员端)
 */
@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // ================== 公共/C端接口 ==================

    /**
     * 获取所有可用分类 (C端展示、商家发布商品时调用)
     */
    @GetMapping("/categories")
    public Result<List<Category>> getApprovedCategories() {
        return Result.success(categoryService.getApprovedCategories());
    }

    // ================== 商家端接口 ==================

    /**
     * 商家申请新增分类
     * 注意：实际开发中 merchantId 应通过 JWT 拦截器从 HttpServletRequest(ThreadLocal) 中提取
     */
    @PostMapping("/merchant/categories")
    public Result<Long> applyCategory(@RequestBody Map<String, String> params, 
                                      @RequestHeader("X-User-Id") Long merchantId) { // 这里用 Header 模拟鉴权拦截提取的ID
        try {
            String name = params.get("name");
            if (name == null || name.trim().isEmpty()) {
                return Result.error("分类名称不能为空");
            }
            Long categoryId = categoryService.applyCategory(name, merchantId);
            return Result.success(categoryId);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    // ================== 管理员端接口 ==================

    /**
     * 获取全部分类列表 (包含待审核)
     */
    @GetMapping("/admin/categories")
    public Result<List<Category>> getAllCategories() {
        return Result.success(categoryService.getAllCategories());
    }

    /**
     * 管理员直接新增一级分类
     */
    @PostMapping("/admin/categories")
    public Result<Long> addCategoryDirectly(@RequestBody Map<String, String> params) {
        try {
            Long categoryId = categoryService.addCategoryDirectly(params.get("name"));
            return Result.success(categoryId);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 管理员修改分类名称
     */
    @PutMapping("/admin/categories/{id}")
    public Result<Void> updateCategory(@PathVariable Long id, @RequestBody Map<String, String> params) {
        try {
            categoryService.updateCategoryName(id, params.get("name"));
            return Result.success();
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 管理员审核商家提交的分类
     */
    @PutMapping("/admin/categories/{id}/audit")
    public Result<Void> auditCategory(@PathVariable Long id, @RequestBody Map<String, Integer> params) {
        try {
            Integer status = params.get("status"); // 1-通过, 2-驳回
            categoryService.auditCategory(id, status);
            return Result.success();
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 管理员删除分类
     */
    @DeleteMapping("/admin/categories/{id}")
    public Result<Void> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return Result.success();
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}