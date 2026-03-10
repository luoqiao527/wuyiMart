package com.wuyi.mall.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.wuyi.mall.entity.Category;
import com.wuyi.mall.entity.Product;
import com.wuyi.mall.mapper.CategoryMapper;
import com.wuyi.mall.mapper.ProductMapper;
import com.wuyi.mall.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryMapper categoryMapper;

    @Autowired
    private ProductMapper productMapper; // 注入商品 Mapper

    @Override
    public List<Category> getApprovedCategories() {
        LambdaQueryWrapper<Category> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Category::getAuditStatus, 1);
        return categoryMapper.selectList(queryWrapper);
    }

    @Override
    public List<Category> getAllCategories() {
        // 管理员查看全部分类，按状态排序，待审核的排前面
        LambdaQueryWrapper<Category> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.orderByAsc(Category::getAuditStatus);
        return categoryMapper.selectList(queryWrapper);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void applyCategory(String name, Long merchantId) {
        checkCategoryNameExist(name);

        Category category = new Category();
        category.setName(name);
        category.setCreatorId(merchantId);
        category.setAuditStatus(0); // 0-待审核

        categoryMapper.insert(category);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addCategoryDirectly(String name) {
        checkCategoryNameExist(name);

        Category category = new Category();
        category.setName(name);
        category.setCreatorId(0L); // 0 代表平台管理员创建
        category.setAuditStatus(1); // 直接生效

        categoryMapper.insert(category);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void auditCategory(Long id, Integer status) {
        Category category = categoryMapper.selectById(id);
        if (category == null) {
            throw new RuntimeException("该分类不存在！");
        }
        if (category.getAuditStatus() != 0) {
            throw new RuntimeException("该分类不是待审核状态！");
        }
        
        category.setAuditStatus(status);
        categoryMapper.updateById(category);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateCategoryName(Long id, String name) {
        Category category = categoryMapper.selectById(id);
        if (category == null) {
            throw new RuntimeException("该分类不存在！");
        }
        checkCategoryNameExist(name);
        
        category.setName(name);
        categoryMapper.updateById(category);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteCategory(Long id) {
        // 检查该分类下是否有商品
        LambdaQueryWrapper<Product> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Product::getCategoryId, id);
        if (productMapper.selectCount(queryWrapper) > 0) {
            // 如果查出该分类下已经挂载了商品，则抛出异常，强制拦截删除操作
            throw new RuntimeException("该分类下已有商品，不允许删除！");
        }
        
        // 确认无商品绑定后，才允许删除分类
        categoryMapper.deleteById(id);
    }

    /**
     * 辅助方法：校验分类名称是否重复
     */
    private void checkCategoryNameExist(String name) {
        LambdaQueryWrapper<Category> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Category::getName, name);
        if (categoryMapper.selectCount(queryWrapper) > 0) {
            throw new RuntimeException("分类名称已存在！");
        }
    }
}