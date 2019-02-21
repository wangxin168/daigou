// pages/ziliao/ziliao.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['男', '女', ],
    index: 0,
    ziliao: {},
    date: '1996-01-20',
    gai: "",
    tel: "",
    email: "",
    avatarUrl: "",
    nickName: "",
    chongzhi: 1,
    end: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var uid = wx.getStorageSync('id')
    var that = this;
    that.setData({
      end: util.formatTime(new Date)
    })
    console.log(that.data.end)
    wx.request({
      url: getApp().globalData.url + '/index.php/api/My/my_lst/type_xiang/1',
      data: {
        uid: uid
      },
      success: res => {
        console.log(res)

        if (res.data.status == "202") {
          // wx.showToast({
          //   title: res.data.data,
          //   icon: "none"
          // })
          that.setData({
            chongzhi: 0
          })
        } else if (res.data.status == 201) {
          wx.showToast({
            title: res.data.data,
            icon: "none"
          })
        } else {
          this.setData({
            ziliao: res.data.data.data,
            index: res.data.data.data.user_sex - 1,
            date: res.data.data.data.user_birthday
          })
          var user_sex = this.data.ziliao.user_sex
          var user_birthday = this.data.ziliao.user_birthday
        }
      }
    });

  },
  // 普通
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  //时间选择器
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },

  updateName: function(e) {
    let that = this
    var gai = e.detail.value.username
    var tel = e.detail.value.user_mobile
    var email = e.detail.value.user_email
    var uid = wx.getStorageSync('id');

    // 判断手机号格式是否正确
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(tel)) {
      wx.showToast({
        title: '手机号格式不对',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    var emailzz = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if (!emailzz.test(email)) {
      wx.showToast({
        title: '邮箱格式不对',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    wx.request({
      url: 'https://safe.yuanchuangyuan.com/index.php/api/My/my_detail',
      data: {
        uid: uid,
        user_name: gai,
        user_mobile: tel,
        user_email: email,
        user_sex: e.detail.value.sex,
        user_birthday: e.detail.value.time
      },
      success: function(res) {
        wx.showToast({
          title: res.data.data,
          icon: 'loading',
          duration: 1000
        });
        that.onLoad();
        setTimeout(function() {
          wx.switchTab({
            url: '/pages/me/me'
          })
        }, 1000)
      },
      fail: function(res) {
        wx.showToast({
          title: res.data.data,
          icon: 'loading',
          duration: 1000
        });

      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})