const { orderApi } = require('../../utils/api');
const { formatPrice, formatTime, showLoading, hideLoading, showSuccess, showError, showConfirm, checkLogin, goToLogin } = require('../../utils/util');

Page({
  data: {
    currentStatus: 0,
    statusTabs: [
      { label: '全部', value: 0 },
      { label: '待付款', value: 1 },
      { label: '待发货', value: 2 },
      { label: '待收货', value: 3 },
      { label: '待评价', value: 4 }
    ],
    orders: [],
    loading: false,
    noMore: false,
    refreshing: false,
    pageNum: 1,
    pageSize: 10
  },

  onLoad(options) {
    if (!checkLogin()) {
      goToLogin();
      return;
    }
    
    if (options.status) {
      this.setData({ currentStatus: parseInt(options.status) });
    }
    this.loadOrders();
  },

  onShow() {
    if (checkLogin(false)) {
      this.loadOrders(true);
    }
  },

  // 切换状态
  switchStatus(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({ 
      currentStatus: status,
      orders: [],
      pageNum: 1,
      noMore: false
    }, () => {
      this.loadOrders();
    });
  },

  // 加载订单列表
  async loadOrders(isRefresh = false) {
    if (this.data.loading) return;

    if (isRefresh) {
      this.setData({ pageNum: 1, noMore: false });
    }

    this.setData({ loading: true });

    try {
      const res = await orderApi.getOrders({
        status: this.data.currentStatus || undefined,
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize
      });

      const records = res || [];
      
      // 处理订单数据
      const processedOrders = records.map(item => ({
        ...item,
        statusText: this.getStatusText(item.status),
        statusClass: this.getStatusClass(item.status),
        totalAmount: formatPrice(item.depositAmount + (item.finalAmount || 0)),
        price: formatPrice(item.product?.currentPrice || item.depositAmount),
        productImage: item.product?.images ? JSON.parse(item.product.images)[0] : 'https://picsum.photos/160/160',
        productTitle: item.product?.title || '商品名称',
        createTime: formatTime(item.createTime, 'yyyy-MM-dd hh:mm')
      }));

      if (isRefresh || this.data.refreshing) {
        this.setData({
          orders: processedOrders,
          loading: false,
          refreshing: false
        });
      } else {
        this.setData({
          orders: [...this.data.orders, ...processedOrders],
          loading: false,
          noMore: records.length < this.data.pageSize
        });
      }

    } catch (error) {
      this.setData({ loading: false, refreshing: false });
      console.error('加载订单失败:', error);
    }
  },

  // 获取状态文本
  getStatusText(status) {
    const statusMap = {
      0: '待付款',
      1: '待发货',
      2: '待收货',
      3: '已完成',
      4: '已取消'
    };
    return statusMap[status] || '未知状态';
  },

  // 获取状态样式类
  getStatusClass(status) {
    const classMap = {
      0: 'pending',
      1: 'paid',
      2: 'shipped',
      3: 'completed',
      4: 'cancelled'
    };
    return classMap[status] || '';
  },

  // 下拉刷新
  onRefresh() {
    this.setData({ refreshing: true });
    this.loadOrders(true);
  },

  // 加载更多
  loadMore() {
    if (!this.data.noMore && !this.data.loading) {
      this.setData({ pageNum: this.data.pageNum + 1 });
      this.loadOrders();
    }
  },

  // 跳转到订单详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?id=${id}`
    });
  },

  // 取消订单
  async cancelOrder(e) {
    const confirmed = await showConfirm('确认取消', '确定要取消这个订单吗？');
    if (!confirmed) return;

    const id = e.currentTarget.dataset.id;
    showLoading('取消中...');

    try {
      await orderApi.cancelOrder(id);
      hideLoading();
      showSuccess('取消成功');
      this.loadOrders(true);
    } catch (error) {
      hideLoading();
      showError('取消失败');
    }
  },

  // 支付订单
  payOrder(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '支付功能开发中',
      icon: 'none'
    });
  },

  // 查看物流
  viewLogistics(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '物流功能开发中',
      icon: 'none'
    });
  },

  // 确认收货
  async confirmReceive(e) {
    const confirmed = await showConfirm('确认收货', '确认已收到商品吗？');
    if (!confirmed) return;

    const id = e.currentTarget.dataset.id;
    showLoading('处理中...');

    try {
      await orderApi.confirmReceive(id);
      hideLoading();
      showSuccess('确认成功');
      this.loadOrders(true);
    } catch (error) {
      hideLoading();
      showError('确认失败');
    }
  },

  // 申请售后
  applyAfterSale(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '售后功能开发中',
      icon: 'none'
    });
  },

  // 去评价
  goToReview(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '评价功能开发中',
      icon: 'none'
    });
  }
});
