package com.wuyi.mall.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wuyi.mall.entity.MerchantProfile;
import org.apache.ibatis.annotations.Mapper;

/**
 * 商家扩展信息表 Mapper 接口
 */
@Mapper
public interface MerchantProfileMapper extends BaseMapper<MerchantProfile> {
}