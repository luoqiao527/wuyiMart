package com.wuyi.mall.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import javax.persistence.*;

import java.util.Date;

@Data
@Entity
@TableName("orders")
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @Column(name = "order_no", nullable = false, unique = true, length = 64)
    private String orderNo;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "merchant_id", nullable = false)
    private Long merchantId;
    
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @Column(name = "address_id")
    private Long addressId;
    
    @Column(name = "status", nullable = false, columnDefinition = "TINYINT DEFAULT 0")
    private int status;
    
    @Column(name = "deposit_amount", nullable = false, columnDefinition = "DECIMAL(12,2) DEFAULT 0.00")
    private double depositAmount;
    
    @Column(name = "final_amount", columnDefinition = "DECIMAL(12,2)")
    private double finalAmount;
    
    @Column(name = "tracking_no", length = 64)
    private String trackingNo;
    
    @Column(name = "logistics_comp", length = 64)
    private String logisticsComp;
    
    @Column(name = "deposit_deadline")
    private Date depositDeadline;
    
    @Column(name = "final_pay_deadline")
    private Date finalPayDeadline;
    
    @Column(name = "create_time", columnDefinition = "DATETIME DEFAULT GETDATE()")
    private Date createTime;
    
    @Column(name = "pay_time")
    private Date payTime;
    
    @Column(name = "ship_time")
    private Date shipTime;
    
    @Column(name = "confirm_time")
    private Date confirmTime;
    
    @Column(name = "finish_time")
    private Date finishTime;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
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

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public double getDepositAmount() {
        return depositAmount;
    }

    public void setDepositAmount(double depositAmount) {
        this.depositAmount = depositAmount;
    }

    public double getFinalAmount() {
        return finalAmount;
    }

    public void setFinalAmount(double finalAmount) {
        this.finalAmount = finalAmount;
    }

    public String getTrackingNo() {
        return trackingNo;
    }

    public void setTrackingNo(String trackingNo) {
        this.trackingNo = trackingNo;
    }

    public String getLogisticsComp() {
        return logisticsComp;
    }

    public void setLogisticsComp(String logisticsComp) {
        this.logisticsComp = logisticsComp;
    }

    public Date getDepositDeadline() {
        return depositDeadline;
    }

    public void setDepositDeadline(Date depositDeadline) {
        this.depositDeadline = depositDeadline;
    }

    public Date getFinalPayDeadline() {
        return finalPayDeadline;
    }

    public void setFinalPayDeadline(Date finalPayDeadline) {
        this.finalPayDeadline = finalPayDeadline;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getPayTime() {
        return payTime;
    }

    public void setPayTime(Date payTime) {
        this.payTime = payTime;
    }
}