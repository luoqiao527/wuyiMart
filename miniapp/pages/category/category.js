const { productApi } = require('../../utils/api');
const { formatPrice, showError } = require('../../utils/util');

Page({
  data: {
    categories: [],
    currentCategory: null,
    currentCategoryInfo: null,
    products: [],
    loading: false,
    noMore: false,
    pageNum: 1,
    pageSize: 10
  },

  onLoad(options) {
    this.loadCategories(options.id);
  },

  // 加载分类列表
  async loadCategories(selectedId) {
    try {
      const res = await productApi.getCategories();
      const categories = res || [];
      
      this.setData({ categories });
      
      // 如果有传入的分类ID，选中它；否则选中第一个
      const currentId = selectedId || (categories[0] && categories[0].id);
      if (currentId) {
        this.selectCategory({ currentTarget: { dataset: { id: currentId } } });
      }
    } catch (error) {
      console.error('加载分类失败:', error);
      showError('加载分类失败');
    }
  },

  // 选择分类
  selectCategory(e) {
    const id = e.currentTarget.dataset.id;
    const categoryInfo = this.data.categories.find(item => item.id === id);
    
    this.setData({
      currentCategory: id,
      currentCategoryInfo: categoryInfo,
      products: [],
      pageNum: 1,
      noMore: false
    });
    
    this.loadProducts();
  },

  // 加载商品列表
  async loadProducts() {
    if (this.data.loading || this.data.noMore) return;

    this.setData({ loading: true });

    try {
      const res = await productApi.getProducts({
        categoryId: this.data.currentCategory,
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize
      });

      const records = res.records || [];
      
      // 处理商品数据
      const processedProducts = records.map(item => ({
        ...item,
        currentPrice: formatPrice(item.currentPrice || item.startPrice),
        images: item.images ? JSON.parse(item.images) : ['https://picsum.photos/300/300']
      }));

      this.setData({
        products: [...this.data.products, ...processedProducts],
        loading: false,
        noMore: records.length < this.data.pageSize
      });

    } catch (error) {
      this.setData({ loading: false });
      showError('加载商品失败');
      console.error('加载商品失败:', error);
    }
  },

  // 加载更多
  loadMore() {
    if (!this.data.noMore && !this.data.loading) {
      this.setData({ pageNum: this.data.pageNum + 1 });
      this.loadProducts();
    }
  },

  // 跳转到搜索
  goToSearch() {
    wx.showToast({
      title: '搜索功能开发中',
      icon: 'none'
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
