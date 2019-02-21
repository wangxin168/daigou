// pages/pinpaishop/pinpaishop.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pinpai: [],
    display: false,
    showid: "",
    braid: "",
    changs: "",
    is_member: "",
    checked: true,
    shai:0,
    cates:0,
    price_soft:"",
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid = wx.getStorageSync('id');
    var that = this;
    that.setData({
      showid: options.showid,
      braid: options.brids,
      brandname: options.brandname
    })
    wx.setNavigationBarTitle({
      title: options.brandname
    })
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Shop/shop_lst_all/',
      data: {
        uid: uid,
        shop_id: options.showid,
        brand_id: options.brids,
        goods_type: 0
      },
      success: res => {
        if (res.data.status == 200) {
          this.setData({
            pinpai: res.data.data.data,
            is_member: res.data.data.is_member
          })
        } else {
          wx.showToast({
            title: '暂无商品',
            icon: "none"
          })
        }
      }
    });
  },/**正价清仓筛选 */
  positives: function (event) {
    var that = this;
    var uid = wx.getStorageSync('id');
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Shop/shop_lst_all/',
      data: {
        uid: uid,
        shop_id: that.data.showid,
        brand_id: that.data.braid,
        goods_type: event.currentTarget.dataset.cates,
        price_soft: that.data.price_soft
      },
      success: res => {
        this.setData({
          pinpai: res.data.data.data,
          changs: event.currentTarget.dataset.cates
        })
      }
    });
  },
  shaixuan: function (e) {
    var uid = wx.getStorageSync('id');
    var that = this;
    if (that.data.checked == true) {
      wx.request({
        url: getApp().globalData.url + '/index.php/api/Shop/shop_lst_all/',
        data: {
          uid: uid,
          shop_id: that.data.showid,
          brand_id: that.data.braid,
          goods_type: that.data.changs,
          price_soft: "desc"
        },
        success: res => {
          if (res.data.status == 200) {
            this.setData({
              pinpai: res.data.data.data,
              is_member: res.data.data.is_member,
              checked:false,
              shai:1,
              price_soft: "desc"
            })
          } else {
            wx.showToast({
              title: '暂无商品',
              icon: "none"
            })
          }
        }
      });
    }else{
      wx.request({
        url: getApp().globalData.url + '/index.php/api/Shop/shop_lst_all/',
        data: {
          uid: uid,
          shop_id: that.data.showid,
          brand_id: that.data.braid,
          goods_type: that.data.changs,
          price_soft: "asc"
        },
        success: res => {
          if (res.data.status == 200) {
            this.setData({
              pinpai: res.data.data.data,
              is_member: res.data.data.is_member,
              checked: true,
              shai:2,
              price_soft:"asc"
            })
          } else {
            wx.showToast({
              title: '暂无商品',
              icon: "none"
            })
          }
        }
      });
    }
  },
  // 跳转商品详情页
  shopXiang: function (e) {
    var that = this;
    if (that.data.is_member != 1) {
      wx.navigateTo({
        url: '/pages/shopxiang/shopxiang?sxid=' + e.currentTarget.id + '&brand_name=' + e.currentTarget.dataset.brand_name
      })
    } else {
      wx.showToast({
        title: "你不是会员哦",
        icon: "none"
      })
    }
  },
  jiaGe: function (e) {
    this.setData({
      display: !this.data.display
    })
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
    let alldata = that.data.pinpai
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Shop/shop_lst/',
      data: {
        uid: uid,
        page: page,
        shop_id: that.data.showid,
        brand_id: that.data.braid,
        goods_type: that.data.changs,
        price_soft: that.data.price_soft
      },
      success: function (res) {
        // 回调函数
        if (res.data.status === "200") {
          let shu = page;
          for (var i = 0; i < res.data.data.data.length; i++) {
            alldata.push(res.data.data.data[i]);
          }
          that.setData({
            pinpai: alldata,
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