package com.wuyi.mall.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wuyi.mall.entity.Category;
import org.apache.ibatis.annotations.Mapper;

/**
 * 分类表 Mapper 接口
 */
@Mapper
public interface CategoryMapper extends BaseMapper<Category> {
}