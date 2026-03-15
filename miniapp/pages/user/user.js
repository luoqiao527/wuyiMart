const { checkLogin, goToLogin, showConfirm } = require('../../utils/util');
const app = getApp();

Page({
  data: {
    isLoggedIn: false,
    userInfo: {},
    stats: {
      favorites: 0,
      orders: 0,
      auctions: 0,
      coupons: 0
    },
    orderCount: {
      pendingPay: 0,
      pendingShip: 0,
      pendingReceive: 0,
      pendingReview: 0,
      afterSales: 0
    }
  },

  onLoad() {
    this.checkLoginStatus();
  },

  onShow() {
    this.checkLoginStatus();
    if (this.data.isLoggedIn) {
      this.loadUserStats();
    }
  },

  // 检查登录状态
  checkLoginStatus() {
    const userInfo = wx.getStorageSync('userInfo');
    const token = wx.getStorageSync('token');
    
    this.setData({
      isLoggedIn: !!(userInfo && token),
      userInfo: userInfo || {}
    });
  },

  // 加载用户统计数据
  async loadUserStats() {
    // 这里应该调用API获取统计数据
    // 模拟数据
    this.setData({
      stats: {
        favorites: 12,
        orders: 8,
        auctions: 3,
        coupons: 2
      },
      orderCount: {
        pendingPay: 1,
        pendingShip: 2,
        pendingReceive: 1,
        pendingReview: 0,
        afterSales: 0
      }
    });
  },

  // 跳转到个人信息
  goToProfile() {
    if (!checkLogin()) {
      goToLogin();
      return;
    }
    wx.navigateTo({
      url: '/pages/profile/profile'
    });
  },

  // 跳转到订单列表
  goToOrders(e) {
    if (!checkLogin()) {
      goToLogin();
      return;
    }
    const status = e.currentTarget.dataset.status;
    const url = status !== undefined 
      ? `/pages/order-list/order-list?status=${status}`
      : '/pages/order-list/order-list';
    wx.navigateTo({ url });
  },

  // 跳转到收藏
  goToFavorites() {
    if (!checkLogin()) {
      goToLogin();
      return;
    }
    wx.navigateTo({
      url: '/pages/favorites/favorites'
    });
  },

  // 跳转到拍卖
  goToAuction() {
    if (!checkLogin()) {
      goToLogin();
      return;
    }
    wx.navigateTo({
      url: '/pages/auction/auction'
    });
  },

  // 跳转到地址管理
  goToAddress() {
    if (!checkLogin()) {
      goToLogin();
      return;
    }
    wx.navigateTo({
      url: '/pages/address/address'
    });
  },

  // 跳转到售后
  goToAfterSales() {
    if (!checkLogin()) {
      goToLogin();
      return;
    }
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 浏览记录
  goToHistory() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 联系客服
  contactService() {
    wx.showModal({
      title: '联系客服',
      content: '客服电话：400-123-4567',
      confirmText: '拨打',
      success: (res) => {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '4001234567'
          });
        }
      }
    });
  },

  // 帮助中心
  showHelp() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 关于我们
  showAbout() {
    wx.showModal({
      title: '关于无艺商城',
      content: '无艺商城 - 发现艺术之美\n版本：1.0.0',
      showCancel: false
    });
  },

  // 退出登录
  async logout() {
    const confirmed = await showConfirm('确认退出', '确定要退出登录吗？');
    if (confirmed) {
      app.clearLoginState();
      this.setData({
        isLoggedIn: false,
        userInfo: {}
      });
      wx.showToast({
        title: '已退出登录',
        icon: 'success'
      });
    }
  },

  // 去登录
  goToLogin() {
    goToLogin();
  }
});
