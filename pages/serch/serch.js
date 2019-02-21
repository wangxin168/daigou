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
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  voteTitle: function (e) {

    var value = e.detail.value;
    console.log(value)

    var uid = wx.getStorageSync('id')

    // 搜索
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Index/discount/',
      data: {
        uid: uid,
        discount_title: value
      },
      success: res => {
        console.log(res)
        if (value == "") {
          this.setData({
            zhekou: null
          })
        } else {
          if (res.data.status == 202) {
            wx.showToast({
              title: res.data.data,
              icon: "none"
            })
          } else if (res.data.status == 200) {
            let transdata = res.data.data.data
            for (let i = 0; i < transdata.length; i++) {
              var date = new Date(transdata[i].discount_create_time * 1000);
              var Y = date.getFullYear();
              var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
              var D = date.getDate();
              var h = date.getHours();
              var m = date.getMinutes(); 
              var s = date.getSeconds();
              transdata.discount_create_time = Y + "-" + M + "-" + D
              console.log(transdata[i].discount_create_time = Y + "-" + M + "-" + D)
            }
            console.log(transdata)

            this.setData({
              zhekou: transdata
            })
          } else if (res.data.status == 201) {
            wx.showToast({
              title: res.data.data,
              icon: "none"
            })
          }
        }
      }
    });

  },
  zheKou: function (e) {
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/zhekou/zhekou?zkid=' + e.currentTarget.id
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

    let alldata = that.data.zhekou
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Index/discount/',
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
            zhekou: alldata,
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