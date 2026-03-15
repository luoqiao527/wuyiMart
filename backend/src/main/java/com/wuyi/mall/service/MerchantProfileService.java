package com.wuyi.mall.service;

import com.wuyi.mall.entity.MerchantProfile;
import com.wuyi.mall.repository.MerchantProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MerchantProfileService {
    @Autowired
    private MerchantProfileRepository merchantProfileRepository;

    public MerchantProfile findByUserId(Long userId) {
        return merchantProfileRepository.findByUserId(userId);
    }

    public MerchantProfile save(MerchantProfile merchantProfile) {
        return merchantProfileRepository.save(merchantProfile);
    }

    public MerchantProfile findById(Long id) {
        return merchantProfileRepository.findById(id).orElse(null);
    }
}