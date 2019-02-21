// pages/me/me.js

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    xinxi: {},
    etime: "",
    tan: "",
    display: false,
    user_nickname: "",
    user_img: "",
    chongzhi: 1,
    is_look:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  },
  wode: function (e) {
    var uid = wx.getStorageSync('id')
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/My/my_lst/type_xiang/1',
      data: {
        uid: uid
      },
      success: res => {
        if (res.data.status == 202) {
          that.setData({
            chongzhi: 0
          })
        } else if (res.data.status == 201) {
          that.setData({
            chongzhi: 1
          })
        } else if (res.data.status == 200){
          that.setData({
            xinxi: res.data.data,
            tan: res.data.data.tan,
            chongzhi:1,
            is_look: res.data.data.is_look
          })
          if (that.data.xinxi.is_member == 0) {
            that.setData({
              etime: that.data.xinxi.data.z_etime
            })
          } else if (that.data.xinxi.is_member == 2) {
            that.setData({
              etime: that.data.xinxi.data.y_etime
            })
          } else if (that.data.xinxi.is_member == 3) {
            that.setData({
              etime: that.data.xinxi.data.j_etime
            })
          }
          // // 列表时间
          let transdata = that.data.etime
          // for (let i = 0; i < transdata.length; i++) {
          var date = new Date(transdata * 1000);
          var Y = date.getFullYear();
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          var D = date.getDate();
          var h = date.getHours();
          var m = date.getMinutes();
          var s = date.getSeconds();
          transdata = Y + "-" + M + "-" + D
          // }
          that.setData({
            etime: transdata
          })
          if (that.data.xinxi.is_member == 1) {
            that.setData({ 
              etime: "永久"
            })
          }
        }
      }
    });
  },
  huiyuan: function (e) {
    var that = this;
    if (that.data.tan == 0) {
      that.setData({
        display: !this.data.display
      })
    } else {
      wx.navigateTo({
        url: '../huiyuan/huiyuan',
      })
    }

  },
  ziliao: function () {
    wx.navigateTo({
      url: '../ziliao/ziliao'
    })
  },
  xiaoxi:function(){
    wx.navigateTo({
      url: '../xiaoxi/xiaoxi?currentTab='+1
    })
  },
  shouc: function () {
    wx.navigateTo({
      url: '../shouc/shouc'
    })
  },

  tiezi: function () {
    wx.navigateTo({
      url: '../tiezi/tiezi'
    })
  },
  jifen: function (e) {
    wx.navigateTo({
      url: '../jifen/jifen?jifen=' + e.currentTarget.dataset.jifen,
    })
  },
  qianDao: function () {
    var that = this;
    var uid = wx.getStorageSync('id')
    wx.request({
      url: getApp().globalData.url + '/index.php/api/My/sign/',
      data: {
        uid: uid
      },
      success: res => {
        if (res.data.status == 202 || res.data.status == 201){
          wx.showToast({ 
            title: res.data.data, 
            duration: 2000,
            icon:"none"
          });
          return;
        }else{
          that.wode()
          wx.showToast({ title: res.data.data, duration: 2000 });
        }
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
    var that = this;
    that.wode()
    that.wode()
    that.setData({
      user_nickname: wx.getStorageSync('user_nickname'),
      user_img: wx.getStorageSync('user_img')
    })
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
    // wx.showNavigationBarLoading() //在标题栏中显示加载 
    // var that = this;
    // that.onShow();
    // // 隐藏导航栏加载框
    // wx.hideNavigationBarLoading();
    // // 停止下拉动作
    // wx.stopPullDownRefresh();
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