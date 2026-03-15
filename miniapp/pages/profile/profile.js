const { userApi, uploadApi } = require('../../utils/api');
const { showLoading, hideLoading, showSuccess, showError, chooseImage } = require('../../utils/util');
const app = getApp();

Page({
  data: {
    userInfo: {},
    saving: false
  },

  onLoad() {
    this.loadUserInfo();
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({ userInfo });
  },

  // 更换头像
  async changeAvatar() {
    try {
      const files = await chooseImage(1);
      showLoading('上传中...');
      
      const url = await uploadApi.uploadFile(files[0], 'avatars');
      
      this.setData({
        'userInfo.avatar': url
      });
      
      hideLoading();
      showSuccess('上传成功');
    } catch (error) {
      hideLoading();
      showError('上传失败');
    }
  },

  // 输入处理
  onPhoneInput(e) {
    this.setData({ 'userInfo.phone': e.detail.value });
  },

  onEmailInput(e) {
    this.setData({ 'userInfo.email': e.detail.value });
  },

  onRealNameInput(e) {
    this.setData({ 'userInfo.realName': e.detail.value });
  },

  // 保存资料
  async saveProfile() {
    const { userInfo } = this.data;
    
    // 验证手机号
    if (userInfo.phone && !/^1[3-9]\d{9}$/.test(userInfo.phone)) {
      showError('手机号格式不正确');
      return;
    }
    
    // 验证邮箱
    if (userInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      showError('邮箱格式不正确');
      return;
    }

    this.setData({ saving: true });
    showLoading('保存中...');

    try {
      await userApi.updateUserInfo(userInfo.id, {
        phone: userInfo.phone,
        email: userInfo.email,
        realName: userInfo.realName,
        avatar: userInfo.avatar
      });

      // 更新本地存储
      app.setLoginState(userInfo, wx.getStorageSync('token'));
      
      hideLoading();
      showSuccess('保存成功');
      
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    } catch (error) {
      hideLoading();
      this.setData({ saving: false });
      showError('保存失败');
    }
  }
});
