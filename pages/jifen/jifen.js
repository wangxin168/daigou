// pages/jifen/jifen.js

//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jifen: [],
    jifenfen:"",
    chongzhi:1,
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      jifenfen: options.jifen
    })
    var uid = wx.getStorageSync('id')
    // 我的积分
    
    wx.request({
      url: getApp().globalData.url + '/index.php/api/My/my_lst/',
      data: {
        // uid为4时没有数据
        uid: uid,
        type_xiang: 4
        
      },

      success: res => {
        console.log(res)
        if (res.data.status == "202") {
          that.setData({
            chongzhi: 0
          })
        } else if (res.data.status == "201") {
          wx.showToast({
            title: res.data.data,
            icon: "none"
          })
          
        } else {
          let transdata = res.data.data.data
          for (let i = 0; i < transdata.length; i++) {
            var date = new Date(transdata[i].create_time * 1000);
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            transdata[i].create_time = Y + "-" + M + "-" + D
          }
          this.setData({
            jifen: res.data.data.data,
          })
        }
      }
    });
  },
  jiming:function(){
    wx.navigateTo({
      url: '/pages/jiming/jiming'
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

  onReachBottom: function () {
    var that = this;
    var uid = wx.getStorageSync('id')
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    let page = that.data.page + 1;
    let alldata = that.data.jifen
    wx.request({
      url: getApp().globalData.url + '/index.php/api/My/my_lst/',
      data: {
        uid: uid,
        page: page,
        type_xiang: 4
      },
      success: function (res) {
        console.log(res)
        // 回调函数
        if (res.data.status === "200") {
          let shu = page;
          for (var i = 0; i < res.data.data.data.length; i++) {
            alldata.push(res.data.data.data[i]);
            
          }
          that.setData({
            jifen: alldata,
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})