const { productApi, favoriteApi, auctionApi } = require('../../utils/api');
const { formatPrice, formatTime, formatCountdown, checkLogin, goToLogin, showLoading, hideLoading, showSuccess, showError, previewImage } = require('../../utils/util');

Page({
  data: {
    productId: null,
    product: {
      images: []
    },
    bidRecords: [],
    isFavorited: false,
    countdown: '',
    countdownTimer: null,
    showBidPopup: false,
    bidAmount: '',
    minBidAmount: 0,
    bidding: false
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ productId: options.id });
      this.loadProductDetail(options.id);
      this.checkFavoriteStatus(options.id);
    }
  },

  onShow() {
    this.startCountdown();
  },

  onHide() {
    this.clearCountdown();
  },

  onUnload() {
    this.clearCountdown();
  },

  // 加载商品详情
  async loadProductDetail(id) {
    showLoading('加载中...');
    
    try {
      const res = await productApi.getProductDetail(id);
      
      // 处理商品数据
      const product = {
        ...res,
        images: res.images ? JSON.parse(res.images) : ['https://picsum.photos/750/750'],
        currentPrice: formatPrice(res.currentPrice || res.startPrice),
        startPrice: formatPrice(res.startPrice),
        increment: formatPrice(res.increment || 0),
        description: res.description || '暂无商品描述'
      };

      // 计算最低出价
      const currentPrice = parseFloat(res.currentPrice || res.startPrice);
      const increment = parseFloat(res.increment || 0);
      const minBidAmount = currentPrice + increment;

      this.setData({
        product,
        minBidAmount: formatPrice(minBidAmount),
        bidAmount: formatPrice(minBidAmount)
      });

      // 如果是拍卖商品，加载出价记录
      if (res.saleStatus === 1) {
        this.loadBidRecords(id);
      }

      // 启动倒计时
      this.startCountdown();

      hideLoading();
    } catch (error) {
      hideLoading();
      showError('加载商品详情失败');
      console.error('加载商品详情失败:', error);
    }
  },

  // 加载出价记录
  async loadBidRecords(productId) {
    try {
      // 这里假设有获取出价记录的接口
      // const res = await auctionApi.getBidRecords(productId);
      // this.setData({ bidRecords: res || [] });
      
      // 模拟数据
      this.setData({
        bidRecords: [
          { id: 1, username: '用户***1', avatar: '', amount: '1,200', time: '2分钟前' },
          { id: 2, username: '用户***2', avatar: '', amount: '1,100', time: '5分钟前' },
          { id: 3, username: '用户***3', avatar: '', amount: '1,000', time: '10分钟前' }
        ]
      });
    } catch (error) {
      console.error('加载出价记录失败:', error);
    }
  },

  // 检查收藏状态
  async checkFavoriteStatus(productId) {
    if (!checkLogin(false)) return;
    
    try {
      const res = await favoriteApi.checkFavorite(productId);
      this.setData({ isFavorited: res });
    } catch (error) {
      console.error('检查收藏状态失败:', error);
    }
  },

  // 启动倒计时
  startCountdown() {
    this.clearCountdown();
    
    const updateCountdown = () => {
      const { product } = this.data;
      if (!product.endTime) return;
      
      const countdown = this.calculateCountdown(product.endTime);
      this.setData({ countdown });
    };
    
    updateCountdown();
    this.data.countdownTimer = setInterval(updateCountdown, 1000);
  },

  // 清除倒计时
  clearCountdown() {
    if (this.data.countdownTimer) {
      clearInterval(this.data.countdownTimer);
      this.data.countdownTimer = null;
    }
  },

  // 计算倒计时
  calculateCountdown(endTime) {
    if (!endTime) return '';
    
    const end = new Date(endTime.replace(/-/g, '/')).getTime();
    const now = Date.now();
    const diff = Math.floor((end - now) / 1000);
    
    if (diff <= 0) return '已结束';
    
    return formatCountdown(diff);
  },

  // 预览图片
  previewImage(e) {
    const index = e.currentTarget.dataset.index;
    previewImage(this.data.product.images, index);
  },

  // 返回首页
  goToHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  // 切换收藏
  async toggleFavorite() {
    if (!checkLogin()) {
      goToLogin();
      return;
    }

    const { productId, isFavorited } = this.data;
    
    try {
      if (isFavorited) {
        await favoriteApi.removeFavorite(productId);
        showSuccess('取消收藏');
      } else {
        await favoriteApi.addFavorite(productId);
        showSuccess('收藏成功');
      }
      
      this.setData({ isFavorited: !isFavorited });
    } catch (error) {
      showError('操作失败');
    }
  },

  // 联系商家
  contactMerchant() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 打开出价弹窗
  placeBid() {
    if (!checkLogin()) {
      goToLogin();
      return;
    }

    this.setData({ showBidPopup: true });
  },

  // 关闭出价弹窗
  closeBidPopup() {
    this.setData({ showBidPopup: false });
  },

  // 阻止冒泡
  preventClose() {
    // 什么都不做，阻止事件冒泡
  },

  // 出价输入
  onBidInput(e) {
    this.setData({ bidAmount: e.detail.value });
  },

  // 确认出价
  async confirmBid() {
    const { productId, bidAmount, minBidAmount, bidding } = this.data;
    
    if (bidding) return;

    // 验证出价
    const bid = parseFloat(bidAmount);
    const min = parseFloat(minBidAmount);
    
    if (!bidAmount || isNaN(bid)) {
      showError('请输入出价金额');
      return;
    }

    if (bid < min) {
      showError(`出价不能低于 ¥${minBidAmount}`);
      return;
    }

    this.setData({ bidding: true });
    showLoading('出价中...');

    try {
      await auctionApi.placeBid(productId, bid);
      
      hideLoading();
      showSuccess('出价成功');
      
      this.setData({ 
        showBidPopup: false,
        bidding: false
      });
      
      // 刷新商品详情
      this.loadProductDetail(productId);
      
    } catch (error) {
      hideLoading();
      this.setData({ bidding: false });
      showError(error.msg || '出价失败');
    }
  }
});
