//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 首页通知
    notice_title: [],
    // 轮播
    img: "",
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    // 首页类别
    type_name: [],
    //折扣列表
    zhekou: [],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    discount_create_time: 0,
    discount_title: "",
    notice_content: "",
    is_member: "",
    page: 1,
    chongzhi: 1,
    list_none: 1,
    scrollLeft: 500,
    tid: "",
    type_id: 1
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    var that = this
    var uid = wx.getStorageSync('id')
    // 首页折扣列表
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Index/discount/',
      data: {
        uid: uid
      },
      success: res => {
        if (res.data.status == 202) {
          that.setData({
            chongzhi: 0
          })
        } else {
          let transdata = res.data.data.data
          for (let i = 0; i < transdata.length; i++) {
            var date = new Date(transdata[i].discount_create_time * 1000);
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            transdata[i].discount_create_time = Y + "-" + M + "-" + D
          }

          this.setData({
            zhekou: res.data.data.data,
            is_member: res.data.data.is_member,
            chongzhi: 1
          })
        }
      }
    });
    if (wx.getStorageSync('openid') == "") {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }

    /**
     * 获取系统信息
     */
    wx.getSystemInfo({

      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: 200
        });
      }

    });
  },

  onShow: function(e) {
    var that = this;
    var uid = wx.getStorageSync('id')
    // 首恶轮播

    wx.request({
      url: getApp().globalData.url + '/index.php/api/Index/lunbo',
      data: {
        lunbo_type: 1
      },
      success: res => {
        this.setData({
          img: res.data.data
        })
      }
    });

    // 首页站内通知
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Index/notice',
      success: res => {
        this.setData({
          notice_title: res.data.data
        })
      }
    });
    // 首页类别
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Index/type/',
      data: {
        uid: uid
      },
      success: res => {
        if (res.data.status == 202) {
          that.setData({
            chongzhi: 0
          })
        } else {
          that.setData({
            type_name: res.data.data.data,
            chongzhi: 1
          })
        }
      }
    });
    
    that.setData({
      currentTab:0,
      list_none: 1
    })
  },
  sousuo: function() {
    wx.navigateTo({
      url: '/pages/serch/serch'
    })
  },
  xiaoxi: function(e) {
    wx.navigateTo({
      url: '/pages/notice_detail/notice_detail?id=' + e.currentTarget.dataset.id + '&title=' + e.currentTarget.dataset.title
    })
  },
  /**
   * 点击tab切换
   */
  swichNav: function(e) {
    var that = this;
    var idx = e.detail.index
    var uid = wx.getStorageSync('id')
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Index/discount/',
      data: {
        uid: uid,
        type_id: that.data.type_name[idx].id
      },
      success: res => {
        if (res.data.status == 200) {
          let transdata = res.data.data.data
          for (let i = 0; i < transdata.length; i++) {
            var date = new Date(transdata[i].discount_create_time * 1000);
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            transdata[i].discount_create_time = Y + "-" + M + "-" + D
          }
          that.setData({
            zhekou: res.data.data.data,
            list_none: 1,
            type_id: that.data.type_name[idx].id
          })
        } else if (res.data.status == 201) {
          that.setData({
            zhekou: [],
            list_none: 0,
            type_id: that.data.type_name[idx].id
          })
        }
      }
    });
    that.setData({
      currentTab: e.detail.index
    })
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载 
    // 显示顶部刷新图标
    var uid = wx.getStorageSync('id')
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Index/discount/',
      data: {
        uid: uid,
        type_id: that.data.type_id
      },
      success: res => {
        if (res.data.ststua == 200) {
          let transdata = res.data.data.data
          for (let i = 0; i < transdata.length; i++) {
            var date = new Date(transdata[i].discount_create_time * 1000);
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            transdata[i].discount_create_time = Y + "-" + M + "-" + D
          }
          this.setData({
            zhekou: res.data.data.data,
            is_member: res.data.data.is_member
          })
        } else if (res.data.status == 201) {

        }

      }
    });
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Index/type/',
      data: {
        uid: uid
      },
      success: res => {
        if (res.data.status == 202) {} else {
          this.setData({
            type_name: res.data.data.data
          })
        }
      }
    });

    // 首页站内通知
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Index/notice',
      success: res => {
        this.setData({
          notice_title: res.data.data
        })
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    });
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
  zheKou: function(e) {
    var that = this;
    if (that.data.chongzhi == 0){
      return;
    }else{
      wx.navigateTo({
        url: '/pages/zhekou/zhekou?zkid=' + e.currentTarget.dataset.id
      })
    }
    
  },
  onReachBottom: function() {
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
      success: function(res) {
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
})