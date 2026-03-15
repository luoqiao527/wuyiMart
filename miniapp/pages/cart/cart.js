const { checkLogin, goToLogin, formatPrice, showConfirm, showSuccess } = require('../../utils/util');

Page({
  data: {
    isLoggedIn: false,
    cartList: [],
    isAllSelected: false,
    totalPrice: '0.00',
    selectedCount: 0
  },

  onLoad() {
    this.checkLoginStatus();
  },

  onShow() {
    this.checkLoginStatus();
    if (this.data.isLoggedIn) {
      this.loadCartData();
    }
  },

  // 检查登录状态
  checkLoginStatus() {
    const userInfo = wx.getStorageSync('userInfo');
    const token = wx.getStorageSync('token');
    this.setData({ isLoggedIn: !!(userInfo && token) });
  },

  // 加载购物车数据
  loadCartData() {
    // 模拟数据，实际应从API获取或本地存储
    const cartList = [
      {
        id: 1,
        productId: 101,
        title: '明代青花瓷瓶 精美绝伦 收藏价值极高',
        image: 'https://picsum.photos/180/180?random=1',
        price: '12,800.00',
        quantity: 1,
        selected: true
      },
      {
        id: 2,
        productId: 102,
        title: '清代和田白玉佩 温润细腻',
        image: 'https://picsum.photos/180/180?random=2',
        price: '5,600.00',
        quantity: 2,
        selected: false
      }
    ];
    
    this.setData({ cartList }, () => {
      this.calculateTotal();
    });
  },

  // 计算总价
  calculateTotal() {
    const { cartList } = this.data;
    let total = 0;
    let selectedCount = 0;
    
    cartList.forEach(item => {
      if (item.selected) {
        total += parseFloat(item.price.replace(/,/g, '')) * item.quantity;
        selectedCount += item.quantity;
      }
    });
    
    const isAllSelected = cartList.length > 0 && cartList.every(item => item.selected);
    
    this.setData({
      totalPrice: formatPrice(total),
      selectedCount,
      isAllSelected
    });
  },

  // 切换选中状态
  toggleSelect(e) {
    const index = e.currentTarget.dataset.index;
    const key = `cartList[${index}].selected`;
    this.setData({
      [key]: !this.data.cartList[index].selected
    }, () => {
      this.calculateTotal();
    });
  },

  // 全选/取消全选
  toggleSelectAll() {
    const { cartList, isAllSelected } = this.data;
    const newList = cartList.map(item => ({
      ...item,
      selected: !isAllSelected
    }));
    
    this.setData({ cartList: newList }, () => {
      this.calculateTotal();
    });
  },

  // 减少数量
  decreaseQuantity(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.cartList[index];
    
    if (item.quantity <= 1) return;
    
    const key = `cartList[${index}].quantity`;
    this.setData({
      [key]: item.quantity - 1
    }, () => {
      this.calculateTotal();
    });
  },

  // 增加数量
  increaseQuantity(e) {
    const index = e.currentTarget.dataset.index;
    const key = `cartList[${index}].quantity`;
    
    this.setData({
      [key]: this.data.cartList[index].quantity + 1
    }, () => {
      this.calculateTotal();
    });
  },

  // 更新数量
  updateQuantity(e) {
    const index = e.currentTarget.dataset.index;
    let value = parseInt(e.detail.value);
    
    if (isNaN(value) || value < 1) value = 1;
    
    const key = `cartList[${index}].quantity`;
    this.setData({
      [key]: value
    }, () => {
      this.calculateTotal();
    });
  },

  // 删除商品
  async deleteItem(e) {
    const confirmed = await showConfirm('确认删除', '确定要删除这个商品吗？');
    if (!confirmed) return;
    
    const index = e.currentTarget.dataset.index;
    const cartList = this.data.cartList.filter((_, i) => i !== index);
    
    this.setData({ cartList }, () => {
      this.calculateTotal();
      showSuccess('删除成功');
    });
  },

  // 结算
  settle() {
    const { selectedCount } = this.data;
    if (selectedCount === 0) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none'
      });
      return;
    }
    
    // 跳转到结算页面
    wx.showToast({
      title: '结算功能开发中',
      icon: 'none'
    });
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
