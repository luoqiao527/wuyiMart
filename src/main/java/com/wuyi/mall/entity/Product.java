package com.wuyi.mall.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "merchant_id", nullable = false)
    private Long merchantId;
    
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    
    @Column(name = "title", nullable = false, length = 255)
    private String title;
    
    @Column(name = "description", columnDefinition = "NVARCHAR(MAX)")
    private String description;
    
    @Column(name = "images", columnDefinition = "NVARCHAR(MAX)")
    private String images;
    
    @Column(name = "start_price", nullable = false, columnDefinition = "DECIMAL(12,2) DEFAULT 0.00")
    private double startPrice;
    
    @Column(name = "deposit", nullable = false, columnDefinition = "DECIMAL(12,2) DEFAULT 0.00")
    private double deposit;
    
    @Column(name = "current_price", columnDefinition = "DECIMAL(12,2) DEFAULT 0.00")
    private double currentPrice;
    
    @Column(name = "increment", nullable = false, columnDefinition = "DECIMAL(10,2) DEFAULT 0.00")
    private double increment;
    
    @Column(name = "start_time", nullable = false)
    private Date startTime;
    
    @Column(name = "end_time", nullable = false)
    private Date endTime;
    
    @Column(name = "audit_status", nullable = false, columnDefinition = "TINYINT DEFAULT 0")
    private int auditStatus;
    
    @Column(name = "sale_status", nullable = false, columnDefinition = "TINYINT DEFAULT 0")
    private int saleStatus;
    
    @Column(name = "description_en", columnDefinition = "NVARCHAR(MAX)")
    private String descriptionEn;
    
    @Column(name = "summary", columnDefinition = "NVARCHAR(MAX)")
    private String summary;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(Long merchantId) {
        this.merchantId = merchantId;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public double getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(double startPrice) {
        this.startPrice = startPrice;
    }

    public double getDeposit() {
        return deposit;
    }

    public void setDeposit(double deposit) {
        this.deposit = deposit;
    }

    public double getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public double getIncrement() {
        return increment;
    }

    public void setIncrement(double increment) {
        this.increment = increment;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public int getAuditStatus() {
        return auditStatus;
    }

    public void setAuditStatus(int auditStatus) {
        this.auditStatus = auditStatus;
    }

    public int getSaleStatus() {
        return saleStatus;
    }

    public void setSaleStatus(int saleStatus) {
        this.saleStatus = saleStatus;
    }

    public String getDescriptionEn() {
        return descriptionEn;
    }

    public void setDescriptionEn(String descriptionEn) {
        this.descriptionEn = descriptionEn;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}