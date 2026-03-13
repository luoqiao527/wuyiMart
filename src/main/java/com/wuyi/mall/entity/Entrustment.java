package com.wuyi.mall.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "entrustments")
public class Entrustment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "merchant_id")
    private Long merchantId;
    
    @Column(name = "item_name", nullable = false, length = 128)
    private String itemName;
    
    @Column(name = "item_desc", columnDefinition = "NVARCHAR(MAX)")
    private String itemDesc;
    
    @Column(name = "images", columnDefinition = "NVARCHAR(MAX)")
    private String images;
    
    @Column(name = "expected_price", columnDefinition = "DECIMAL(12,2)")
    private double expectedPrice;
    
    @Column(name = "status", nullable = false, columnDefinition = "TINYINT DEFAULT 0")
    private int status;
    
    @Column(name = "reply_msg", length = 255)
    private String replyMsg;
    
    @Column(name = "created_at", columnDefinition = "DATETIME DEFAULT GETDATE()")
    private Date createdAt;
    
    @Column(name = "real_value")
    private float realValue;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemDesc() {
        return itemDesc;
    }

    public void setItemDesc(String itemDesc) {
        this.itemDesc = itemDesc;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public double getExpectedPrice() {
        return expectedPrice;
    }

    public void setExpectedPrice(double expectedPrice) {
        this.expectedPrice = expectedPrice;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getReplyMsg() {
        return replyMsg;
    }

    public void setReplyMsg(String replyMsg) {
        this.replyMsg = replyMsg;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public float getRealValue() {
        return realValue;
    }

    public void setRealValue(float realValue) {
        this.realValue = realValue;
    }
}