// pages/huifu/huifu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hfuid:"",
    fo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this;
    that.setData({
      hfuid: options.hfuid,
      fo:options.fo
    })
  },
  bindFormSubmit: function (e) {

    console.log(e)

    var uid = wx.getStorageSync('id')

    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Forum/fabiao_comments',
      data: {
        uid: uid,
        type:2,
        huifu_uid: that.data.hfuid,
        content: e.detail.value.textarea,
        forum_id: that.data.fo,
      },
      success: res => {
        console.log(res)
        wx.navigateBack({
          delta: 1
        })
      }
    });

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