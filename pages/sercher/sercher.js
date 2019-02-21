// pages/serch/serch.js
//获取应用实例
const app = getApp()
var Title = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Title: "",
    chanpin:[],
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  voteTitle: function (e) {

    var value = e.detail.value;
    // this.setData({
    //   Title: value,
    // })
    console.log(value)

    var uid = wx.getStorageSync('id')

    // 搜索
    var that = this;
    wx.request({
      url: getApp().globalData.url +'/index.php/api/Shop/shop_lst/',
      data: {
        uid: uid,
        goods_check:value
      },
      success: res => {
        // console.log(res)
        if (value == "") {
          this.setData({
            chanpin: null
          })
        } else {
          if (res.data.status == "201") {
            wx.showToast({
              title: res.data.data,
              icon: "none"
            })
          } else {
          this.setData({
            chanpin: res.data.data.data
          })
          }
        }
      }
    });
  },
  // 跳转商品详情页
  shopXiang: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/shopxiang/shopxiang?sxid=' + e.currentTarget.id
    })
  },
  onReachBottom: function () {
    var that = this;
    var uid = wx.getStorageSync('id')
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })

    var page = that.data.page + 1;

    let alldata = that.data.chanpin
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Shop/shop_lst/',
      data: {
        uid: uid,
        page: page
      },
      success: function (res) {
        // 回调函数
        if (res.data.status === "200") {
          let shu = page;
          for (var i = 0; i < res.data.data.data.length; i++) {
            alldata.push(res.data.data.data[i]);
          }
          that.setData({
            chanpin: alldata,
            page: shu
          })
          // 隐藏加载框
          wx.hideLoading();
        } else {
          // 隐藏加载框
          wx.hideLoading();
          wx.showToast({
            title: "没有数据了",
            icon: "none"
          })
        }
      }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})