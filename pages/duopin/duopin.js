// pages/duopin/duopin.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_name:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid = wx.getStorageSync('id')

    // 更多品牌
    var that = this;
    wx.request({
      url: getApp().globalData.url +'/index.php/api/Shop/shopbrand/',
      data: {
        uid: uid
      },
      success: res => {
        this.setData({
          goods_name: res.data.data.data
        })
      }
    });
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载 
    wx.showNavigationBarLoading();
    var uid = wx.getStorageSync('id')
    // 更多品牌
    var that = this;
    wx.request({
      url: 'https://safe.yuanchuangyuan.com/index.php/api/Shop/shopbrand/',
      data: {
        uid: uid
      },
      success: res => {
        // console.log(res)
        this.setData({
          goods_name: res.data.data.data
        })
        console.log(res.data.data.data)
      }
    });

    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
  
  xiangQing:function(e){
    wx.navigateTo({
      url: '/pages/pinpaishop/pinpaishop?brids=' + e.currentTarget.dataset.brid + "&showid=" + e.currentTarget.dataset.shop_id + "&brandname=" + e.currentTarget.dataset.brandname
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})