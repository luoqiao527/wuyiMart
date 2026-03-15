// 格式化价格
const formatPrice = (price) => {
  if (!price && price !== 0) return '0.00';
  return parseFloat(price).toFixed(2);
};

// 格式化时间
const formatTime = (date, format = 'yyyy-MM-dd hh:mm:ss') => {
  if (!date) return '';
  
  if (typeof date === 'string') {
    date = new Date(date.replace(/-/g, '/'));
  } else if (typeof date === 'number') {
    date = new Date(date);
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  
  return format
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', day)
    .replace('hh', hour)
    .replace('mm', minute)
    .replace('ss', second);
};

// 格式化日期（仅年月日）
const formatDate = (date) => {
  return formatTime(date, 'yyyy-MM-dd');
};

// 倒计时格式化
const formatCountdown = (seconds) => {
  if (seconds <= 0) return '00:00:00';
  
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (days > 0) {
    return `${days}天${String(hours).padStart(2, '0')}小时`;
  }
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

// 防抖函数
const debounce = (fn, delay = 300) => {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

// 节流函数
const throttle = (fn, interval = 300) => {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
};

// 检查登录状态
const checkLogin = (showTip = true) => {
  const token = wx.getStorageSync('token');
  const userInfo = wx.getStorageSync('userInfo');
  
  if (!token || !userInfo) {
    if (showTip) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
    }
    return false;
  }
  return true;
};

// 跳转到登录页
const goToLogin = () => {
  wx.navigateTo({
    url: '/pages/login/login'
  });
};

// 显示加载中
const showLoading = (title = '加载中...') => {
  wx.showLoading({
    title: title,
    mask: true
  });
};

// 隐藏加载
const hideLoading = () => {
  wx.hideLoading();
};

// 显示成功提示
const showSuccess = (title = '操作成功') => {
  wx.showToast({
    title: title,
    icon: 'success'
  });
};

// 显示错误提示
const showError = (title = '操作失败') => {
  wx.showToast({
    title: title,
    icon: 'error'
  });
};

// 确认对话框
const showConfirm = (title, content) => {
  return new Promise((resolve) => {
    wx.showModal({
      title: title,
      content: content,
      success: (res) => {
        resolve(res.confirm);
      }
    });
  });
};

// 选择图片
const chooseImage = (count = 1, sourceType = ['album', 'camera']) => {
  return new Promise((resolve, reject) => {
    wx.chooseMedia({
      count: count,
      mediaType: ['image'],
      sourceType: sourceType,
      success: (res) => {
        resolve(res.tempFiles.map(file => file.tempFilePath));
      },
      fail: reject
    });
  });
};

// 预览图片
const previewImage = (urls, current = 0) => {
  wx.previewImage({
    urls: urls,
    current: typeof current === 'number' ? urls[current] : current
  });
};

// 复制到剪贴板
const copyToClipboard = (data) => {
  wx.setClipboardData({
    data: data,
    success: () => {
      wx.showToast({
        title: '复制成功',
        icon: 'success'
      });
    }
  });
};

// 拨打电话
const makePhoneCall = (phoneNumber) => {
  wx.makePhoneCall({
    phoneNumber: phoneNumber
  });
};

// 获取系统信息
const getSystemInfo = () => {
  return wx.getSystemInfoSync();
};

// 计算两个日期之间的天数差
const getDaysDiff = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// 生成唯一ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// 深拷贝
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (obj instanceof Object) {
    const copy = {};
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone(obj[key]);
    });
    return copy;
  }
  return obj;
};

module.exports = {
  formatPrice,
  formatTime,
  formatDate,
  formatCountdown,
  debounce,
  throttle,
  checkLogin,
  goToLogin,
  showLoading,
  hideLoading,
  showSuccess,
  showError,
  showConfirm,
  chooseImage,
  previewImage,
  copyToClipboard,
  makePhoneCall,
  getSystemInfo,
  getDaysDiff,
  generateId,
  deepClone
};
