// pages/zhifu/zhifu.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    yongid: 1,
    hui: "",
    jifen: "",
    new_j:"",
    new_w:"",
    gou:"",
    th_jifen:"",
    zui_qian:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      hui: options.hui,
      new_j:options.new_j,
      new_w:options.new_w
    })
    
  },
  checkboxChange: function (e) {
    var that = this;
    var checked = that.data.checked
    var jian_qian = parseInt(that.data.th_jifen / that.data.jifen)
    var zui_qian = that.data.new_j - jian_qian+'.00'
    that.setData({
      yongid: e.currentTarget.dataset.yongid,
      zui_qian: zui_qian
    })
    if (that.data.th_jifen < 10) {
      that.setData({
        checked: checked
      })
      wx: wx.showToast({
        title: '积分不足',
        icon: 'none'
      })
    } else if (that.data.th_jifen >= 10){
      that.setData({
        checked: !checked
      })
    }
    if (that.data.checked == true) {
      that.setData({
        gou: 1
      })
    } else {
      that.setData({
        gou: 0
      })
    }
    
  },
  zhifu: function (e) {
    var that = this;
    var uid = wx.getStorageSync('id')
    var openid = wx.getStorageSync('openid')
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Public/add_member',
      data: {
        uid: uid,
        openid: openid,
        qufen_member: that.data.hui,
        is_shiyong_jifen: that.data.yongid,
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (reponse) {
        var appId = reponse.data.data.appId;
        var nonceStr = reponse.data.data.nonceStr;
        var package1 = reponse.data.data.package;
        var paySign = reponse.data.data.paySign;
        var signType = reponse.data.data.signType;
        var timeStamp = reponse.data.data.timeStamp;
        wx.requestPayment({
          'nonceStr': nonceStr,
          'package': package1,
          'signType': signType,
          'timeStamp': timeStamp,
          'paySign': paySign,
          'success': function (res) {
            wx.showToast({ 
              title: '支付成功', 
              icon: 'success', 
              duration: 2000 
            });
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/me/me',
              })
            }, 1000)
          },
          'fail': function (res) {
            wx.showToast({ 
              title: '支付失败', 
              icon: 'loading', 
              duration: 2000 
            });
          }
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
    var that = this;
    var uid = wx.getStorageSync('id')
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Public/jifen_dikou',
      data:{
        uid:uid
      },
      success: res => {
        console.log(res)
        that.setData({
          jifen: res.data.data,
          th_jifen:res.data.data2
        })
      }
    });
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