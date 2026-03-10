package com.wuyi.mall.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wuyi.mall.entity.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * 用户表 Mapper 接口
 * 继承 BaseMapper 即可免费获得 MyBatis-Plus 提供的绝大部分单表 CRUD 方法
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {
    
    // 如果有非常复杂的连表查询（如联查商家表等），可以在这里自定义方法
    // 并在对应的 UserMapper.xml 中写 SQL，当前单表操作无需额外写 SQL

}