const { userApi } = require('../../utils/api');
const { showLoading, hideLoading, showSuccess, showError, showConfirm } = require('../../utils/util');

Page({
  data: {
    addresses: [],
    showPopup: false,
    isEdit: false,
    form: {
      id: null,
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      detail: '',
      isDefault: false
    }
  },

  onLoad() {
    this.loadAddresses();
  },

  // 加载地址列表
  async loadAddresses() {
    try {
      const res = await userApi.getAddresses();
      this.setData({ addresses: res || [] });
    } catch (error) {
      // 模拟数据
      this.setData({
        addresses: [
          {
            id: 1,
            name: '张三',
            phone: '13800138000',
            province: '北京市',
            city: '北京市',
            district: '朝阳区',
            detail: '建国路88号SOHO现代城A座1201',
            isDefault: true
          }
        ]
      });
    }
  },

  // 选择地址（如果是从下单页进入）
  selectAddress(e) {
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    if (prevPage && prevPage.route.includes('checkout')) {
      prevPage.setData({ selectedAddress: e.currentTarget.dataset.item });
      wx.navigateBack();
    }
  },

  // 添加地址
  addAddress() {
    this.setData({
      showPopup: true,
      isEdit: false,
      form: {
        id: null,
        name: '',
        phone: '',
        province: '',
        city: '',
        district: '',
        detail: '',
        isDefault: false
      }
    });
  },

  // 编辑地址
  editAddress(e) {
    const item = e.currentTarget.dataset.item;
    this.setData({
      showPopup: true,
      isEdit: true,
      form: { ...item }
    });
  },

  // 删除地址
  async deleteAddress(e) {
    const confirmed = await showConfirm('确认删除', '确定要删除这个地址吗？');
    if (!confirmed) return;

    const id = e.currentTarget.dataset.id;
    showLoading('删除中...');

    try {
      await userApi.deleteAddress(id);
      hideLoading();
      showSuccess('删除成功');
      this.loadAddresses();
    } catch (error) {
      hideLoading();
      showError('删除失败');
    }
  },

  // 关闭弹窗
  closePopup() {
    this.setData({ showPopup: false });
  },

  preventClose() {},

  // 表单输入
  onNameInput(e) {
    this.setData({ 'form.name': e.detail.value });
  },

  onPhoneInput(e) {
    this.setData({ 'form.phone': e.detail.value });
  },

  onDetailInput(e) {
    this.setData({ 'form.detail': e.detail.value });
  },

  onRegionChange(e) {
    const [province, city, district] = e.detail.value;
    this.setData({
      'form.province': province,
      'form.city': city,
      'form.district': district
    });
  },

  onDefaultChange(e) {
    this.setData({ 'form.isDefault': e.detail.value });
  },

  // 保存地址
  async saveAddress() {
    const { form, isEdit } = this.data;

    // 验证
    if (!form.name.trim()) {
      showError('请输入收货人姓名');
      return;
    }
    if (!form.phone || !/^1[3-9]\d{9}$/.test(form.phone)) {
      showError('请输入正确的手机号');
      return;
    }
    if (!form.province) {
      showError('请选择所在地区');
      return;
    }
    if (!form.detail.trim()) {
      showError('请输入详细地址');
      return;
    }

    showLoading('保存中...');

    try {
      if (isEdit) {
        await userApi.updateAddress(form.id, form);
      } else {
        await userApi.addAddress(form);
      }

      hideLoading();
      showSuccess('保存成功');
      this.setData({ showPopup: false });
      this.loadAddresses();
    } catch (error) {
      hideLoading();
      showError('保存失败');
    }
  }
});
