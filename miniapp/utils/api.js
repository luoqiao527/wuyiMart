const { http } = require('./request');

// 认证相关API
const authApi = {
  // 普通用户注册
  registerUser: (data) => http.post('/api/auth/register/user', data),
  
  // 商家入驻注册
  registerMerchant: (data) => http.post('/api/auth/register/merchant', data),
  
  // 用户登录
  login: (data) => http.post('/api/auth/login', data),
  
  // 刷新token
  refreshToken: () => http.post('/api/auth/refresh')
};

// 用户相关API
const userApi = {
  // 获取用户信息
  getUserInfo: (id) => http.get(`/api/users/${id}`),
  
  // 更新用户信息
  updateUserInfo: (id, data) => http.put(`/api/users/${id}`, data),
  
  // 更新密码
  updatePassword: (id, data) => http.put(`/api/users/${id}/password`, data),
  
  // 获取用户地址列表
  getAddresses: (userId) => http.get('/api/addresses', { userId }),
  
  // 添加地址
  addAddress: (data) => http.post('/api/addresses', data),
  
  // 更新地址
  updateAddress: (id, data) => http.put(`/api/addresses/${id}`, data),
  
  // 删除地址
  deleteAddress: (id) => http.delete(`/api/addresses/${id}`)
};

// 商品相关API
const productApi = {
  // 获取商品列表（C端）
  getProducts: (params) => http.get('/api/products', params),
  
  // 获取商品详情
  getProductDetail: (id) => http.get(`/api/products/${id}`),
  
  // 获取分类列表
  getCategories: () => http.get('/api/categories'),
  
  // 搜索商品
  searchProducts: (keyword) => http.get('/api/products/search', { keyword })
};

// 收藏相关API
const favoriteApi = {
  // 获取收藏列表
  getFavorites: (params) => http.get('/api/user/favorites', params),
  
  // 添加收藏
  addFavorite: (productId) => http.post('/api/user/favorites', { productId }),
  
  // 取消收藏
  removeFavorite: (productId) => http.delete(`/api/user/favorites/${productId}`),
  
  // 检查是否已收藏
  checkFavorite: (productId) => http.get(`/api/user/favorites/check/${productId}`)
};

// 订单相关API
const orderApi = {
  // 获取订单列表
  getOrders: (params) => http.get('/api/orders', params),
  
  // 获取订单详情
  getOrderDetail: (id) => http.get(`/api/orders/${id}`),
  
  // 根据订单号查询
  getOrderByNo: (orderNo) => http.get(`/api/orders/order-no/${orderNo}`),
  
  // 创建订单
  createOrder: (data) => http.post('/api/orders', data),
  
  // 更新订单
  updateOrder: (id, data) => http.put(`/api/orders/${id}`, data),
  
  // 取消订单
  cancelOrder: (id) => http.put(`/api/orders/${id}/cancel`),
  
  // 确认收货
  confirmReceive: (id) => http.put(`/api/orders/${id}/confirm`)
};

// 拍卖相关API
const auctionApi = {
  // 获取拍卖商品列表
  getAuctionProducts: (params) => http.get('/api/auction/products', params),
  
  // 获取拍卖商品详情
  getAuctionDetail: (id) => http.get(`/api/auction/products/${id}`),
  
  // 出价
  placeBid: (productId, amount) => http.post('/api/auction/bids', { productId, amount }),
  
  // 缴纳保证金
  payDeposit: (productId) => http.post('/api/auction/deposit', { productId }),
  
  // 获取我的出价记录
  getMyBids: () => http.get('/api/auction/my-bids'),
  
  // 支付尾款
  payFinal: (orderId) => http.post('/api/auction/pay-final', { orderId })
};

// 文件上传API
const uploadApi = {
  // 上传文件
  uploadFile: (filePath, folder = 'common') => {
    return new Promise((resolve, reject) => {
      const token = wx.getStorageSync('token');
      const userInfo = wx.getStorageSync('userInfo');
      
      let header = {};
      if (token) {
        header['Authorization'] = `Bearer ${token}`;
      }
      if (userInfo && userInfo.id) {
        header['X-User-Id'] = userInfo.id;
      }
      
      wx.uploadFile({
        url: `http://localhost:8080/api/upload`,
        filePath: filePath,
        name: 'file',
        formData: {
          folder: folder
        },
        header: header,
        success: (res) => {
          if (res.statusCode === 200) {
            const data = JSON.parse(res.data);
            if (data.code === 200) {
              resolve(data.data);
            } else {
              reject(data);
            }
          } else {
            reject(res);
          }
        },
        fail: reject
      });
    });
  }
};

module.exports = {
  authApi,
  userApi,
  productApi,
  favoriteApi,
  orderApi,
  auctionApi,
  uploadApi
};
