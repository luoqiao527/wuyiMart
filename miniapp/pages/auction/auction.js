const { productApi } = require('../../utils/api');
const { formatPrice, formatCountdown, showError } = require('../../utils/util');

Page({
  data: {
    currentTab: 'ongoing',
    tabs: [
      { label: '正在竞拍', value: 'ongoing' },
      { label: '即将开始', value: 'upcoming' },
      { label: '已结束', value: 'ended' }
    ],
    auctions: [],
    loading: false,
    noMore: false,
    pageNum: 1,
    pageSize: 10,
    countdownTimer: null
  },

  onLoad() {
    this.loadAuctions();
  },

  onShow() {
    this.startCountdown();
  },

  onHide() {
    this.clearCountdown();
  },

  onUnload() {
    this.clearCountdown();
  },

  // 切换标签
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab,
      auctions: [],
      pageNum: 1,
      noMore: false
    }, () => {
      this.loadAuctions();
    });
  },

  // 加载拍卖列表
  async loadAuctions() {
    if (this.data.loading) return;

    this.setData({ loading: true });

    try {
      const { currentTab, pageNum, pageSize } = this.data;
      
      // 根据标签设置状态参数
      let saleStatus;
      switch (currentTab) {
        case 'ongoing':
          saleStatus = 1;
          break;
        case 'upcoming':
          saleStatus = 0;
          break;
        case 'ended':
          saleStatus = 2;
          break;
      }

      const res = await productApi.getProducts({
        saleStatus,
        pageNum,
        pageSize
      });

      const records = res.records || [];
      
      // 处理拍卖数据
      const processedAuctions = records.map(item => ({
        ...item,
        currentPrice: formatPrice(item.currentPrice || item.startPrice),
        startPrice: formatPrice(item.startPrice),
        increment: formatPrice(item.increment || 0),
        images: item.images ? JSON.parse(item.images) : ['https://picsum.photos/400/400'],
        statusText: this.getStatusText(item.saleStatus),
        statusClass: this.getStatusClass(item.saleStatus),
        countdown: this.calculateCountdown(item.endTime)
      }));

      this.setData({
        auctions: [...this.data.auctions, ...processedAuctions],
        loading: false,
        noMore: records.length < pageSize
      });

      this.startCountdown();

    } catch (error) {
      this.setData({ loading: false });
      console.error('加载拍卖列表失败:', error);
      
      // 模拟数据
      this.setData({
        auctions: [
          {
            id: 1,
            title: '明代青花瓷瓶 精美绝伦 收藏价值极高',
            images: ['https://picsum.photos/400/400?random=1'],
            currentPrice: '12,800.00',
            startPrice: '8,000.00',
            increment: '500.00',
            bidCount: 15,
            saleStatus: 1,
            statusText: '竞拍中',
            statusClass: 'bidding',
            countdown: '02:35:18'
          },
          {
            id: 2,
            title: '清代和田白玉佩 温润细腻 工艺精湛',
            images: ['https://picsum.photos/400/400?random=2'],
            currentPrice: '5,600.00',
            startPrice: '3,000.00',
            increment: '200.00',
            bidCount: 8,
            saleStatus: 1,
            statusText: '竞拍中',
            statusClass: 'bidding',
            countdown: '05:12:45'
          }
        ]
      });
    }
  },

  // 获取状态文本
  getStatusText(status) {
    const map = { 0: '即将开始', 1: '竞拍中', 2: '已结束' };
    return map[status] || '未知';
  },

  // 获取状态样式类
  getStatusClass(status) {
    const map = { 0: 'upcoming', 1: 'bidding', 2: 'ended' };
    return map[status] || '';
  },

  // 计算倒计时
  calculateCountdown(endTime) {
    if (!endTime) return '';
    
    const end = new Date(endTime.replace(/-/g, '/')).getTime();
    const now = Date.now();
    const diff = Math.floor((end - now) / 1000);
    
    if (diff <= 0) return '已结束';
    
    return formatCountdown(diff);
  },

  // 启动倒计时
  startCountdown() {
    this.clearCountdown();
    
    if (this.data.currentTab !== 'ongoing') return;
    
    this.data.countdownTimer = setInterval(() => {
      const auctions = this.data.auctions.map(item => ({
        ...item,
        countdown: this.calculateCountdown(item.endTime)
      }));
      
      this.setData({ auctions });
    }, 1000);
  },

  // 清除倒计时
  clearCountdown() {
    if (this.data.countdownTimer) {
      clearInterval(this.data.countdownTimer);
      this.data.countdownTimer = null;
    }
  },

  // 加载更多
  loadMore() {
    if (!this.data.noMore && !this.data.loading) {
      this.setData({ pageNum: this.data.pageNum + 1 });
      this.loadAuctions();
    }
  },

  // 跳转到商品详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${id}`
    });
  }
});
