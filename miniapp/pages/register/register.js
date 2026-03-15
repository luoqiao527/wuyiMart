const { authApi } = require('../../utils/api');
const { showLoading, hideLoading, showError, showSuccess } = require('../../utils/util');

Page({
  data: {
    registerType: 'user', // user: 用户注册, merchant: 商家入驻
    loading: false,
    
    // 用户注册表单
    userForm: {
      username: '',
      password: '',
      confirmPassword: '',
      phone: '',
      email: ''
    },
    
    // 商家入驻表单
    merchantForm: {
      username: '',
      password: '',
      confirmPassword: '',
      phone: '',
      realName: '',
      idCard: '',
      shopName: ''
    }
  },

  // 切换注册类型
  switchType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ registerType: type });
  },

  // 统一处理输入
  onInput(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    
    // 支持嵌套对象路径，如 "userForm.username"
    const keys = field.split('.');
    if (keys.length === 2) {
      const [obj, key] = keys;
      this.setData({
        [`${obj}.${key}`]: value
      });
    } else {
      this.setData({
        [field]: value
      });
    }
  },

  // 验证手机号
  validatePhone(phone) {
    const reg = /^1[3-9]\d{9}$/;
    return reg.test(phone);
  },

  // 验证身份证号
  validateIdCard(idCard) {
    const reg = /^\d{17}[\dXx]$/;
    return reg.test(idCard);
  },

  // 处理注册
  async handleRegister() {
    const { registerType, userForm, merchantForm } = this.data;
    
    if (registerType === 'user') {
      await this.registerUser(userForm);
    } else {
      await this.registerMerchant(merchantForm);
    }
  },

  // 用户注册
  async registerUser(form) {
    // 表单验证
    if (!form.username.trim()) {
      showError('请输入用户名');
      return;
    }

    if (!form.password || form.password.length < 6) {
      showError('密码至少6位');
      return;
    }

    if (form.password !== form.confirmPassword) {
      showError('两次密码输入不一致');
      return;
    }

    if (!form.phone) {
      showError('请输入手机号');
      return;
    }

    if (!this.validatePhone(form.phone)) {
      showError('手机号格式不正确');
      return;
    }

    this.setData({ loading: true });
    showLoading('注册中...');

    try {
      const data = {
        username: form.username.trim(),
        password: form.password,
        phone: form.phone,
        email: form.email || undefined
      };

      await authApi.registerUser(data);

      hideLoading();
      showSuccess('注册成功');

      // 延迟跳转到登录页
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/login'
        });
      }, 1500);

    } catch (error) {
      hideLoading();
      this.setData({ loading: false });
      showError(error.msg || '注册失败');
    }
  },

  // 商家入驻
  async registerMerchant(form) {
    // 表单验证
    if (!form.username.trim()) {
      showError('请输入登录账号');
      return;
    }

    if (!form.password || form.password.length < 6) {
      showError('密码至少6位');
      return;
    }

    if (form.password !== form.confirmPassword) {
      showError('两次密码输入不一致');
      return;
    }

    if (!form.phone) {
      showError('请输入手机号');
      return;
    }

    if (!this.validatePhone(form.phone)) {
      showError('手机号格式不正确');
      return;
    }

    if (!form.realName.trim()) {
      showError('请输入真实姓名');
      return;
    }

    if (!form.idCard) {
      showError('请输入身份证号');
      return;
    }

    if (!this.validateIdCard(form.idCard)) {
      showError('身份证号格式不正确');
      return;
    }

    if (!form.shopName.trim()) {
      showError('请输入店铺名称');
      return;
    }

    this.setData({ loading: true });
    showLoading('提交中...');

    try {
      const data = {
        username: form.username.trim(),
        password: form.password,
        phone: form.phone,
        realName: form.realName.trim(),
        idCard: form.idCard,
        shopName: form.shopName.trim()
      };

      await authApi.registerMerchant(data);

      hideLoading();
      
      wx.showModal({
        title: '申请已提交',
        content: '您的入驻申请已提交，请等待平台管理员审核',
        showCancel: false,
        success: () => {
          wx.navigateTo({
            url: '/pages/login/login'
          });
        }
      });

    } catch (error) {
      hideLoading();
      this.setData({ loading: false });
      showError(error.msg || '入驻申请提交失败');
    }
  },

  // 跳转到登录页
  goToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  }
});
