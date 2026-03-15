const { authApi } = require('../../utils/api');
const { showLoading, hideLoading, showError } = require('../../utils/util');
const app = getApp();

Page({
  data: {
    username: '',
    password: '',
    showPassword: false,
    loading: false,
    agreed: false
  },

  onLoad(options) {
    // 如果有重定向参数，保存起来
    if (options.redirect) {
      this.redirectUrl = decodeURIComponent(options.redirect);
    }
  },

  // 用户名输入
  onUsernameInput(e) {
    this.setData({ username: e.detail.value });
  },

  // 密码输入
  onPasswordInput(e) {
    this.setData({ password: e.detail.value });
  },

  // 切换密码可见性
  togglePasswordVisibility() {
    this.setData({
      showPassword: !this.data.showPassword
    });
  },

  // 切换协议同意状态
  toggleAgreement() {
    this.setData({
      agreed: !this.data.agreed
    });
  },

  // 处理登录
  async handleLogin() {
    const { username, password, agreed } = this.data;

    // 表单验证
    if (!username.trim()) {
      showError('请输入用户名');
      return;
    }

    if (!password) {
      showError('请输入密码');
      return;
    }

    if (!agreed) {
      showError('请同意用户协议和隐私政策');
      return;
    }

    this.setData({ loading: true });
    showLoading('登录中...');

    try {
      const res = await authApi.login({
        username: username.trim(),
        password: password
      });

      // 保存登录状态
      app.setLoginState(res.user, res.token);

      hideLoading();
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });

      // 延迟跳转
      setTimeout(() => {
        if (this.redirectUrl) {
          wx.redirectTo({
            url: this.redirectUrl
          });
        } else {
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }, 1500);

    } catch (error) {
      hideLoading();
      this.setData({ loading: false });
      showError(error.msg || '登录失败');
    }
  },

  // 手机号登录
  onPhoneLogin(e) {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      // 获取手机号成功，调用后端解密接口
      // 这里需要后端支持微信手机号解密
      wx.showToast({
        title: '功能开发中',
        icon: 'none'
      });
    } else {
      showError('请授权获取手机号');
    }
  },

  // 跳转到注册页
  goToRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    });
  },

  // 忘记密码
  goToForgotPassword() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 显示用户协议
  showUserAgreement() {
    wx.showModal({
      title: '用户协议',
      content: '这里是用户协议内容...',
      showCancel: false
    });
  },

  // 显示隐私政策
  showPrivacyPolicy() {
    wx.showModal({
      title: '隐私政策',
      content: '这里是隐私政策内容...',
      showCancel: false
    });
  }
});
