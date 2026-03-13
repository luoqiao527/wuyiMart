package com.wuyi.mall.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "merchant_profiles")
public class MerchantProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;
    
    @Column(name = "shop_name", nullable = false, length = 128)
    private String shopName;
    
    @Column(name = "shop_desc", columnDefinition = "NVARCHAR(MAX)")
    private String shopDesc;
    
    @Column(name = "audit_status", nullable = false, columnDefinition = "TINYINT DEFAULT 0")
    private int auditStatus;
    
    @Column(name = "reject_reason", length = 255)
    private String rejectReason;
    
    @Column(name = "balance", columnDefinition = "DECIMAL(12,2) DEFAULT 0.00")
    private double balance;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getShopDesc() {
        return shopDesc;
    }

    public void setShopDesc(String shopDesc) {
        this.shopDesc = shopDesc;
    }

    public int getAuditStatus() {
        return auditStatus;
    }

    public void setAuditStatus(int auditStatus) {
        this.auditStatus = auditStatus;
    }

    public String getRejectReason() {
        return rejectReason;
    }

    public void setRejectReason(String rejectReason) {
        this.rejectReason = rejectReason;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}