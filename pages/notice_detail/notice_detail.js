// pages/notice_detail/notice_detail.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice_title:[],
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      id: options.id
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Index/notice_detail',
      data: {
        id: that.data.id
      },
      success: res => {
        console.log(res)
        let transdata = res.data.data[0]
        var date = new Date(transdata.notice_create_time * 1000);
        var Y = date.getFullYear();
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var D = date.getDate();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        transdata.notice_create_time = Y + "-" + M + "-" + D
        this.setData({
          notice_title: res.data.data[0]
        })
        let contents = res.data.data[0].notice_content
        WxParse.wxParse('contents', 'html', contents, that);
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