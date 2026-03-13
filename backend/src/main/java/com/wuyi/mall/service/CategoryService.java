package com.wuyi.mall.service;

import com.wuyi.mall.entity.Category;
import java.util.List;

/**
 * 分类模块业务接口
 */
public interface CategoryService {

    /**
     * 获取所有已通过审核的可用分类 (用于C端商城展示和商家上架商品时选择)
     */
    List<Category> getApprovedCategories();

    /**
     * 获取所有分类 (管理员端使用，包含待审核的)
     */
    List<Category> getAllCategories();

    /**
     * 商家申请新增分类
     * @param name 分类名称
     * @param merchantId 商家ID
     * @return 新分类的主键ID
     */
    Long applyCategory(String name, Long merchantId);

    /**
     * 管理员直接新增分类
     * @param name 分类名称
     * @return 新分类的主键ID
     */
    Long addCategoryDirectly(String name);

    /**
     * 管理员审核商家提交的分类
     * @param id 分类ID
     * @param status 审核状态 (1-通过, 2-驳回)
     */
    void auditCategory(Long id, Integer status);

    /**
     * 管理员修改分类名称
     */
    void updateCategoryName(Long id, String name);

    /**
     * 管理员删除分类
     */
    void deleteCategory(Long id);
}