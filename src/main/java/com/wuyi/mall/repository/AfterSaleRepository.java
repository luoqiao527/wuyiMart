package com.wuyi.mall.repository;

import com.wuyi.mall.entity.AfterSale;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AfterSaleRepository extends JpaRepository<AfterSale, Long> {
    List<AfterSale> findByOrderId(Long orderId);
}