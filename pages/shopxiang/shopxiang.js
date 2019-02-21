// pages/shopxiang/shopxiang.js
//获取应用实例
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../img/1.jpg',
      '../../img/1.jpg',
      '../../img/1.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    xiangqing: [],
    img: "",
    tu: true,
    activeIndex: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 商品详情页
    var that = this;
    that.setData({
      collid: options.sxid,
    })
    wx.setNavigationBarTitle({
      title: options.brand_name
    })
    that.details();
  },
  details: function () {
    let that = this
    var uid = wx.getStorageSync('id')
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Shop/shop_detail/',
      data: {
        uid: uid,
        goods_id: that.data.collid
      },
      success: res => {
        if (res.data.status == 201) {
          wx.showToast({
            title: res.data.data,
            icon: "none"
          })
          that.setData({
            display: 0
          })
        } else {
          let contents = res.data.data.data[0].goods_content
          WxParse.wxParse('contents', 'html', contents, that);
          this.setData({
            xiangqing: res.data.data
          })
        }
      }
    });
  },
  shouCang: function (event) {
    var uid = wx.getStorageSync('id')
    // 折扣详情
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Public/discount_collection',
      data: {
        uid: uid,
        goods_id: that.data.collid
      },
      success: res => {
        that.details()
      }
    })
  },
  //图片点击事件
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表

    })

  },
  changeimg: function (e) {
    let that = this
    that.setData({
      activeIndex: e.detail.current + 1
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
    let that = this
    var uid = wx.getStorageSync('id')
    return {
      title: that.data.xiangqing.goods_name,
      path: '/pages/shopxiang/shopxiang?sxid=' + that.data.collid,
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