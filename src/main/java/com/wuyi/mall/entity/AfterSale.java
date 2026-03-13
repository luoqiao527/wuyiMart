package com.wuyi.mall.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "after_sales")
public class AfterSale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "merchant_id", nullable = false)
    private Long merchantId;
    
    @Column(name = "type", nullable = false)
    private int type;
    
    @Column(name = "reason", nullable = false, columnDefinition = "NVARCHAR(MAX)")
    private String reason;
    
    @Column(name = "images", columnDefinition = "NVARCHAR(MAX)")
    private String images;
    
    @Column(name = "status", nullable = false, columnDefinition = "TINYINT DEFAULT 0")
    private int status;
    
    @Column(name = "created_at", columnDefinition = "DATETIME DEFAULT GETDATE()")
    private Date createdAt;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(Long merchantId) {
        this.merchantId = merchantId;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}