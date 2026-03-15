const { orderApi } = require('../../utils/api');
const { formatPrice, formatTime, showLoading, hideLoading, showSuccess, showError, showConfirm, copyToClipboard } = require('../../utils/util');

Page({
  data: {
    orderId: null,
    order: {}
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ orderId: options.id });
      this.loadOrderDetail(options.id);
    }
  },

  // 加载订单详情
  async loadOrderDetail(id) {
    showLoading('加载中...');

    try {
      const res = await orderApi.getOrderDetail(id);

      // 处理订单数据
      const order = {
        ...res,
        statusText: this.getStatusText(res.status),
        statusDesc: this.getStatusDesc(res.status),
        totalAmount: formatPrice((res.depositAmount || 0) + (res.finalAmount || 0)),
        goodsAmount: formatPrice(res.product?.currentPrice || res.depositAmount),
        depositAmount: formatPrice(res.depositAmount),
        price: formatPrice(res.product?.currentPrice || res.depositAmount),
        productImage: res.product?.images ? JSON.parse(res.product.images)[0] : 'https://picsum.photos/180/180',
        productTitle: res.product?.title || '商品名称',
        productId: res.product?.id,
        createTime: formatTime(res.createTime),
        payTime: res.payTime ? formatTime(res.payTime) : null,
        shipTime: res.shipTime ? formatTime(res.shipTime) : null,
        address: {
          name: '张三',
          phone: '138****8000',
          fullAddress: '北京市朝阳区建国路88号SOHO现代城A座1201'
        }
      };

      this.setData({ order });
      hideLoading();
    } catch (error) {
      hideLoading();
      showError('加载订单详情失败');

      // 模拟数据
      this.setData({
        order: {
          id: id,
          orderNo: 'DD202403160001',
          status: 2,
          statusText: '待收货',
          statusDesc: '商品已发货，请注意查收',
          totalAmount: '12,800.00',
          goodsAmount: '12,800.00',
          depositAmount: '1,000.00',
          freightAmount: 0,
          price: '12,800.00',
          quantity: 1,
          productImage: 'https://picsum.photos/180/180?random=1',
          productTitle: '明代青花瓷瓶 精美绝伦 收藏价值极高',
          productId: 101,
          createTime: '2024-03-16 10:30:00',
          payTime: '2024-03-16 10:35:00',
          shipTime: '2024-03-16 14:20:00',
          trackingNo: 'SF1234567890',
          logisticsComp: '顺丰速运',
          address: {
            name: '张三',
            phone: '138****8000',
            fullAddress: '北京市朝阳区建国路88号SOHO现代城A座1201'
          }
        }
      });
    }
  },

  // 获取状态文本
  getStatusText(status) {
    const map = { 0: '待付款', 1: '待发货', 2: '待收货', 3: '已完成', 4: '已取消' };
    return map[status] || '未知状态';
  },

  // 获取状态描述
  getStatusDesc(status) {
    const map = {
      0: '请在规定时间内完成付款',
      1: '商家正在准备商品',
      2: '商品已发货，请注意查收',
      3: '交易已完成，期待您的评价',
      4: '订单已取消'
    };
    return map[status] || '';
  },

  // 复制订单号
  copyOrderNo() {
    copyToClipboard(this.data.order.orderNo);
  },

  // 取消订单
  async cancelOrder() {
    const confirmed = await showConfirm('确认取消', '确定要取消这个订单吗？');
    if (!confirmed) return;

    showLoading('取消中...');
    try {
      await orderApi.cancelOrder(this.data.orderId);
      hideLoading();
      showSuccess('取消成功');
      this.loadOrderDetail(this.data.orderId);
    } catch (error) {
      hideLoading();
      showError('取消失败');
    }
  },

  // 支付订单
  payOrder() {
    wx.showToast({
      title: '支付功能开发中',
      icon: 'none'
    });
  },

  // 查看物流
  viewLogistics() {
    wx.showToast({
      title: '物流功能开发中',
      icon: 'none'
    });
  },

  // 确认收货
  async confirmReceive() {
    const confirmed = await showConfirm('确认收货', '确认已收到商品吗？');
    if (!confirmed) return;

    showLoading('处理中...');
    try {
      await orderApi.confirmReceive(this.data.orderId);
      hideLoading();
      showSuccess('确认成功');
      this.loadOrderDetail(this.data.orderId);
    } catch (error) {
      hideLoading();
      showError('确认失败');
    }
  },

  // 申请售后
  applyAfterSale() {
    wx.showToast({
      title: '售后功能开发中',
      icon: 'none'
    });
  },

  // 去评价
  goToReview() {
    wx.showToast({
      title: '评价功能开发中',
      icon: 'none'
    });
  },

  // 删除订单
  async deleteOrder() {
    const confirmed = await showConfirm('确认删除', '确定要删除这个订单吗？删除后不可恢复');
    if (!confirmed) return;

    showLoading('删除中...');
    try {
      await orderApi.delete(this.data.orderId);
      hideLoading();
      showSuccess('删除成功');
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    } catch (error) {
      hideLoading();
      showError('删除失败');
    }
  },

  // 再次购买
  buyAgain() {
    const productId = this.data.order.productId;
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${productId}`
    });
  },

  // 跳转到商品详情
  goToProduct(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${id}`
    });
  }
});
