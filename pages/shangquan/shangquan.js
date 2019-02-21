// pages/shangquan/shangquan.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_name:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // uid
    // console.log(wx.getStorageSync('id'))
    var uid = wx.getStorageSync('id')
    // console.log(uid)

    // 选择商圈
    var that = this;
    wx.request({
      url: getApp().globalData.url +'/index.php/api/Shop/choice_shop/',
      data:{
        uid: uid,      },
      success: res => {
        console.log(res)
        this.setData({
          shop_name: res.data.data.data
        })
        // console.log(this.data.shop_name)
      }
    });
  },

  tapName: function (event) {
    console.log(event)
    app.globalData.shopid = event.currentTarget.id
    wx.switchTab({
      url: '/pages/logs/logs'
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
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