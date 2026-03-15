package com.wuyi.mall.repository;

import com.wuyi.mall.entity.Entrustment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EntrustmentRepository extends JpaRepository<Entrustment, Long> {
    List<Entrustment> findByUserId(Long userId);
}