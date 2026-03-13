package com.wuyi.mall.repository;

import com.wuyi.mall.entity.MerchantProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MerchantProfileRepository extends JpaRepository<MerchantProfile, Long> {
    MerchantProfile findByUserId(Long userId);
}