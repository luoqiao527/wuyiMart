const { favoriteApi } = require('../../utils/api');
const { formatPrice, showLoading, hideLoading, showSuccess, showError, showConfirm, checkLogin, goToLogin } = require('../../utils/util');

Page({
  data: {
    isLoggedIn: false,
    favorites: [],
    loading: false,
    noMore: false,
    pageNum: 1,
    pageSize: 10
  },

  onLoad() {
    this.checkLoginStatus();
    if (this.data.isLoggedIn) {
      this.loadFavorites();
    }
  },

  onShow() {
    this.checkLoginStatus();
    if (this.data.isLoggedIn) {
      this.loadFavorites(true);
    }
  },

  // 检查登录状态
  checkLoginStatus() {
    const userInfo = wx.getStorageSync('userInfo');
    const token = wx.getStorageSync('token');
    this.setData({ isLoggedIn: !!(userInfo && token) });
  },

  // 加载收藏列表
  async loadFavorites(isRefresh = false) {
    if (this.data.loading) return;

    if (isRefresh) {
      this.setData({ pageNum: 1, noMore: false });
    }

    this.setData({ loading: true });
    showLoading('加载中...');

    try {
      const res = await favoriteApi.getFavorites({
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize
      });

      const records = res.records || [];
      
      // 处理收藏数据
      const processedFavorites = records.map(item => ({
        ...item,
        currentPrice: formatPrice(item.product?.currentPrice || item.product?.startPrice || 0),
        originalPrice: item.product?.originalPrice ? formatPrice(item.product.originalPrice) : null,
        productImage: item.product?.images ? JSON.parse(item.product.images)[0] : 'https://picsum.photos/200/200',
        productTitle: item.product?.title || '商品名称',
        productId: item.productId,
        isAuction: item.product?.saleStatus === 1
      }));

      if (isRefresh) {
        this.setData({
          favorites: processedFavorites,
          loading: false
        });
      } else {
        this.setData({
          favorites: [...this.data.favorites, ...processedFavorites],
          loading: false,
          noMore: records.length < this.data.pageSize
        });
      }

      hideLoading();
    } catch (error) {
      hideLoading();
      this.setData({ loading: false });
      
      // 模拟数据
      this.setData({
        favorites: [
          {
            id: 1,
            productId: 101,
            productTitle: '明代青花瓷瓶 精美绝伦',
            productImage: 'https://picsum.photos/200/200?random=1',
            currentPrice: '12,800.00',
            originalPrice: '15,000.00',
            isAuction: true
          },
          {
            id: 2,
            productId: 102,
            productTitle: '清代和田白玉佩 温润细腻',
            productImage: 'https://picsum.photos/200/200?random=2',
            currentPrice: '5,600.00',
            isAuction: false
          }
        ]
      });
    }
  },

  // 加载更多
  loadMore() {
    if (!this.data.noMore && !this.data.loading) {
      this.setData({ pageNum: this.data.pageNum + 1 });
      this.loadFavorites();
    }
  },

  // 取消收藏
  async removeFavorite(e) {
    const confirmed = await showConfirm('确认取消', '确定要取消收藏这个商品吗？');
    if (!confirmed) return;

    const productId = e.currentTarget.dataset.id;
    const index = e.currentTarget.dataset.index;
    
    showLoading('取消中...');

    try {
      await favoriteApi.removeFavorite(productId);
      
      // 从列表中移除
      const favorites = this.data.favorites.filter((_, i) => i !== index);
      this.setData({ favorites });
      
      hideLoading();
      showSuccess('已取消收藏');
    } catch (error) {
      hideLoading();
      showError('操作失败');
    }
  },

  // 去逛逛
  goShopping() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  // 去登录
  goToLogin() {
    goToLogin();
  },

  // 去商品详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${id}`
    });
  }
});
