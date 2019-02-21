//logs.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
var pages = this;

Page({
  data: {
    logs: [],
    currentTab: 0,
    brand_name: "",
    brand_logo: "",
    chanpin: [],
    changes: 0,
    is_member: "",
    shop_name: "",
    shop_id: "",
    brand_id: 1,
    length: 5,
    winWidth: 0,
    winHeight: 0,
    page: 0,
    chongzhi: 1,
    list_none: 1,
    img:"",
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
  },
  onLoad: function () {
    /** 
     * 获取系统信息
     */
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: that.data.length
        });
      }
    });
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载 
    wx.showNavigationBarLoading();
    var that = this;
    that.onShow()
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
  onShow: function () {
    var that = this
    var uid = wx.getStorageSync('id')
    // 轮播
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Index/lunbo',
      data: {
        lunbo_type: 2
      },
      success: res => {
        this.setData({
          img: res.data.data
        })
      }
    });
    //获取商圈
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Shop/choice_shop/',
      data: {
        uid: uid
      },
      success: res => {
        if (res.data.status == 201 || res.data.status == 202) {
        } else {

          this.setData({
            shop_name: res.data.data.data[app.globalData.shopid]
          })
        }

      }
    });
    // 品牌列表
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Shop/shopbrand/',
      data: {
        uid: uid,
        shop_id: Number(app.globalData.shopid) + 1
      },
      success: res => {
        if (res.data.data.is_member == 4) {
          that.setData({
            chongzhi: 0
          })
        } else {
          that.setData({
            chongzhi: 1
          })
        }
        if (res.data.status == 202) {
          this.setData({
            brand_name: [],
            chongzhi: 0
          })
        } else if (res.data.status == 201) {
          this.setData({
            brand_name: []
          })
        } else if (res.data.status == 200) {
          this.setData({
            brand_name: res.data.data.data
          })
        }

      }
    });
    // 产品列表
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Shop/shop_lst/',
      data: {
        uid: uid,
        shop_id: Number(app.globalData.shopid) + 1,
        brand_id: that.data.brand_id
      },
      success: res => {
        if (res.data.data.is_member == 4) {
          that.setData({
            chongzhi: 0
          })
        } else {
          that.setData({
            chongzhi: 1
          })
        }
        if (res.data.status == 202) {
          this.setData({
            chanpin: [],
            chongzhi: 0
          })
        } else if (res.data.status == 201) {
          this.setData({
            chanpin: [],
            list_none: 0
          })
        } else if (res.data.status == 200) {
          this.setData({
            chanpin: res.data.data.data,
            is_member: res.data.data.is_member,
            length: that.data.chanpin.length,
            page: 1,
            list_none: 1
          })
        }
      }
    });
    
  },
  gengduo:function(e){
    var that=this
    wx.navigateTo({
      url: '/pages/pinpaishop/pinpaishop?brids=' + that.data.brand_id + "&showid=" + e.currentTarget.dataset.shop_id + "&brandname=" + e.currentTarget.dataset.brandname
    })
  },
  
  shangquan:function(e){
    wx.navigateTo({
      url: '/pages/shangquan/shangquan'
    })
  },
  /**
   * 点击tab切换
   */
  // 切换
  swichNav: function (e) {

    var that = this;
    var uid = wx.getStorageSync('id')
    that.setData({
      changes: e.currentTarget.dataset.indx,
      brand_id: e.currentTarget.dataset.tid,
    })
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Shop/shop_lst/',
      data: {
        uid: uid,
        shop_id: Number(app.globalData.shopid) + 1,
        brand_id: that.data.brand_id
      },
      success: res => {
        if (res.data.status == 200) {
          this.setData({
            chanpin: res.data.data.data,
            list_none: 1
          })
        } else if (res.data.status == 201) {
          that.setData({
            chanpin: [],
            list_none: 0
          })
        }
      }
    });
    that.setData({
      currentTab: e.target.dataset.current
    })

  },
  sercher: function () {
    wx.navigateTo({
      url: '/pages/sercher/sercher'
    })
  },
  duopin: function () {
    wx.navigateTo({
      url: '/pages/duopin/duopin'
    })
  },
  // 跳转商品详情页
  shopXiang: function (e) {
    var that = this;
    if(that.data.chongzhi==0){
      return;
    }else{
      if (that.data.is_member != 1) {
        wx.navigateTo({
          url: '/pages/shopxiang/shopxiang?sxid=' + e.currentTarget.id + '&brand_name=' + e.currentTarget.dataset.brand_name
        })
      } else {
        wx.showToast({
          title: "没有体验权限",
          icon: "none"
        })
        return;
      }
    }
  }
})
