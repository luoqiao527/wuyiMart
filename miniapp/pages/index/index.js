const { productApi } = require('../../utils/api');
const { formatPrice, formatCountdown, showError } = require('../../utils/util');

Page({
  data: {
    banners: [
      { id: 1, image: 'https://picsum.photos/750/320?random=1', link: '' },
      { id: 2, image: 'https://picsum.photos/750/320?random=2', link: '' },
      { id: 3, image: 'https://picsum.photos/750/320?random=3', link: '' }
    ],
    categories: [
      { id: 1, name: '书画', icon: 'https://picsum.photos/88/88?random=1' },
      { id: 2, name: '瓷器', icon: 'https://picsum.photos/88/88?random=2' },
      { id: 3, name: '玉器', icon: 'https://picsum.photos/88/88?random=3' },
      { id: 4, name: '杂项', icon: 'https://picsum.photos/88/88?random=4' },
      { id: 5, name: '钱币', icon: 'https://picsum.photos/88/88?random=5' }
    ],
    products: [],
    loading: false,
    noMore: false,
    pageNum: 1,
    pageSize: 10,
    countdownTimer: null
  },

  onLoad() {
    this.loadProducts();
    this.loadCategories();
  },

  onShow() {
    // 启动倒计时
    this.startCountdown();
  },

  onHide() {
    // 清除倒计时
    this.clearCountdown();
  },

  onUnload() {
    this.clearCountdown();
  },

  // 加载商品列表
  async loadProducts(isRefresh = false) {
    if (this.data.loading) return;

    if (isRefresh) {
      this.setData({ pageNum: 1, noMore: false });
    }

    this.setData({ loading: true });

    try {
      const res = await productApi.getProducts({
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize
      });

      const records = res.records || [];
      
      // 处理商品数据
      const processedProducts = records.map(item => ({
        ...item,
        currentPrice: formatPrice(item.currentPrice || item.startPrice),
        images: item.images ? JSON.parse(item.images) : ['https://picsum.photos/300/300'],
        countdown: this.calculateCountdown(item.endTime)
      }));

      if (isRefresh) {
        this.setData({
          products: processedProducts,
          loading: false
        });
        wx.stopPullDownRefresh();
      } else {
        this.setData({
          products: [...this.data.products, ...processedProducts],
          loading: false,
          noMore: records.length < this.data.pageSize
        });
      }

      // 启动倒计时
      this.startCountdown();

    } catch (error) {
      this.setData({ loading: false });
      showError('加载商品失败');
      console.error('加载商品失败:', error);
    }
  },

  // 加载分类
  async loadCategories() {
    try {
      const res = await productApi.getCategories();
      if (res && res.length > 0) {
        // 只取前5个分类
        const categories = res.slice(0, 5).map((item, index) => ({
          id: item.id,
          name: item.name,
          icon: `https://picsum.photos/88/88?random=${index + 1}`
        }));
        this.setData({ categories });
      }
    } catch (error) {
      console.error('加载分类失败:', error);
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

  // 启动倒计时
  startCountdown() {
    this.clearCountdown();
    
    this.data.countdownTimer = setInterval(() => {
      const products = this.data.products.map(item => ({
        ...item,
        countdown: this.calculateCountdown(item.endTime)
      }));
      
      this.setData({ products });
    }, 1000);
  },

  // 清除倒计时
  clearCountdown() {
    if (this.data.countdownTimer) {
      clearInterval(this.data.countdownTimer);
      this.data.countdownTimer = null;
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadProducts(true);
  },

  // 上拉加载更多
  onReachBottom() {
    if (!this.data.noMore && !this.data.loading) {
      this.setData({ pageNum: this.data.pageNum + 1 });
      this.loadProducts();
    }
  },

  // 点击轮播图
  onBannerTap(e) {
    const item = e.currentTarget.dataset.item;
    if (item.link) {
      // 处理跳转逻辑
    }
  },

  // 跳转到分类
  goToCategory(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/category/category?id=${id}`
    });
  },

  // 跳转到搜索
  goToSearch() {
    wx.showToast({
      title: '搜索功能开发中',
      icon: 'none'
    });
  },

  // 跳转到拍卖专区
  goToAuction() {
    wx.navigateTo({
      url: '/pages/auction/auction'
    });
  },

  // 跳转到更多商品
  goToMore() {
    wx.switchTab({
      url: '/pages/category/category'
    });
  },

  // 跳转到商品详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${id}`
    });
  }
});
