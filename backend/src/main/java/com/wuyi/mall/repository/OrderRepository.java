package com.wuyi.mall.repository;

import com.wuyi.mall.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByOrderNo(String orderNo);
}