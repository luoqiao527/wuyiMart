const app = getApp();

// API基础配置
const BASE_URL = 'http://localhost:8080';

// 请求拦截器
const request = (options) => {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token');
    const userInfo = wx.getStorageSync('userInfo');
    
    // 构建请求头
    let header = {
      'Content-Type': 'application/json',
      ...options.header
    };
    
    // 如果有token，添加到请求头
    if (token) {
      header['Authorization'] = `Bearer ${token}`;
    }
    
    // 如果有用户信息，添加X-User-Id（用于测试阶段）
    if (userInfo && userInfo.id) {
      header['X-User-Id'] = userInfo.id;
    }
    
    wx.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data || {},
      header: header,
      timeout: 30000,
      success: (res) => {
        // 处理HTTP状态码
        if (res.statusCode === 200) {
          const data = res.data;
          // 处理业务状态码
          if (data.code === 200) {
            resolve(data.data);
          } else {
            // 业务错误
            wx.showToast({
              title: data.msg || '请求失败',
              icon: 'none'
            });
            reject(data);
          }
        } else if (res.statusCode === 401) {
          // 未授权，清除登录状态并跳转到登录页
          app.clearLoginState();
          wx.showToast({
            title: '登录已过期，请重新登录',
            icon: 'none'
          });
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/login/login'
            });
          }, 1500);
          reject(res);
        } else {
          wx.showToast({
            title: `服务器错误: ${res.statusCode}`,
            icon: 'none'
          });
          reject(res);
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '网络请求失败，请检查网络',
          icon: 'none'
        });
        reject(err);
      }
    });
  });
};

// 封装常用请求方法
const http = {
  get: (url, params = {}) => {
    // 构建查询字符串
    const queryString = Object.keys(params)
      .filter(key => params[key] !== undefined && params[key] !== null)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    
    return request({
      url: fullUrl,
      method: 'GET'
    });
  },
  
  post: (url, data = {}) => {
    return request({
      url: url,
      method: 'POST',
      data: data
    });
  },
  
  put: (url, data = {}) => {
    return request({
      url: url,
      method: 'PUT',
      data: data
    });
  },
  
  delete: (url, data = {}) => {
    return request({
      url: url,
      method: 'DELETE',
      data: data
    });
  }
};

module.exports = {
  request,
  http,
  BASE_URL
};
