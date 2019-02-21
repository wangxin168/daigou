// pages/zhekou/zhekou.js
//获取应用实例
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discount:{},
    tempFilePaths: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 折扣详情
    var that = this;
    that.setData({
      collid:options.zkid
    })

    that.details(options.zkid)
    
  },
  details:function(zid){
    let that = this
    var uid = wx.getStorageSync('id');
    wx.request({
      url: getApp().globalData.url +'/index.php/api/Index/discount_detail',
      data: {
        uid: uid,
        id: zid
      },
      success: res => {
        if(res.data.status==201){
          wx.showToast({
            title: res.data.data,
            icon:"none"
          })
          that.setData({
            display:0
          })
        }else{
          console.log(res)
          let transdata = res.data.data
          // for (let i = 0; i < transdata.length; i++) {
          var date = new Date(transdata.data.discount_create_time * 1000);
          var Y = date.getFullYear();
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          var D = date.getDate();
          var h = date.getHours();
          var m = date.getMinutes();
          var s = date.getSeconds();
          transdata.data.discount_create_time = Y + "-" + M + "-" + D
          // }

          this.setData({
            discount: res.data.data
          })
          let contents = res.data.data.data.discount_content
          WxParse.wxParse('contents', 'html', contents, that);
        }
        
      }
    });

  },
  shouCang:function(event){
    var uid = wx.getStorageSync('id')
    // 折扣详情
    var that = this;
    wx.request({
      url: getApp().globalData.url +'/index.php/api/Public/discount_collection',
      data: {
        uid: uid,
        discount_id: that.data.collid
      },
      success: res => {
        wx.setStorageSync( 'discount_id', res.data.data )
        wx.showToast({
          title: res.data.data,
          icon:"none"
        })
        that.details(that.data.collid)
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
    var that=this;
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
    let that = this
    var uid = wx.getStorageSync('id')
    return {
      title: that.data.discount.discount_title,
      path: '/pages/zhekou/zhekou?zkid=' + that.data.collid,
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
        // 我的积分
        var that = this;
        wx.request({
          url: 'https://safe.yuanchuangyuan.com/index.php/api/My/my_lst/',
          data: {
            // uid为4时没有数据
            uid: uid,
            type_xiang: 4
          },

          success: res => {
            console.log(res)
          }
        });
      } 
    }
  }
})