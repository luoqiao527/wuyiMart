package com.wuyi.mall.controller;

import com.wuyi.mall.entity.MerchantProfile;
import com.wuyi.mall.service.MerchantProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/merchant-profiles")
public class MerchantProfileController {
    @Autowired
    private MerchantProfileService merchantProfileService;

    @PostMapping
    public MerchantProfile create(@RequestBody MerchantProfile merchantProfile) {
        return merchantProfileService.save(merchantProfile);
    }

    @GetMapping("/{id}")
    public MerchantProfile getById(@PathVariable Long id) {
        return merchantProfileService.findById(id);
    }

    @GetMapping("/user/{userId}")
    public MerchantProfile getByUserId(@PathVariable Long userId) {
        return merchantProfileService.findByUserId(userId);
    }

    @PutMapping("/{id}")
    public MerchantProfile update(@PathVariable Long id, @RequestBody MerchantProfile merchantProfile) {
        merchantProfile.setId(id);
        return merchantProfileService.save(merchantProfile);
    }
}