// pages/xiaoxi/xiaoxi.js

//获取应用实例
const app = getApp()

var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
        * 页面配置
        */

    // tab切换
    navtab: ["站内通知", "消息"],
    currentTab: 0,
    xiaoxi: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      currentTab: options.currentTab
    })
    /**
     * 获取系统信息
     */
    wx.getSystemInfo({

      success: function (res) {

        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

  },
  notice: function () {
    var uid = wx.getStorageSync('id')
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/My/my_lst/type_xiang/6',
      data: {
        uid: uid,
        xx_type: 1
      },
      success: res => {
        console.log(res)
        if (res.data.status == 201) {
          this.setData({
            xiaoxi: []
          })
        } else {


          let contents = res.data.data.data

          for (let i = 0; i < contents.length; i++) {
            var date = new Date(contents[i].notice_create_time * 1000);
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            contents[i].notice_create_time = Y + "-" + M + "-" + D
          }
          // for (let i = 0; i < contents.length;i++){
          //   WxParse.wxParse('contents' + i, 'html', contents[i].notice_content, that);
          // }
          this.setData({
            xiaoxi: res.data.data.data
          })

          // WxParse.wxParse('contents', 'html', contents.length, that);
        }
      }
    });
  },
  news: function () {
    var uid = wx.getStorageSync('id')
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/My/my_lst/type_xiang/6',
      data: {
        uid: uid,
        xx_type: 2
      },
      success: res => {
        if (res.data.status == 201) {
          this.setData({
            dope: []
          })
        } else {
          this.setData({
            dope: res.data.data.data
          })
        }

        if (res.data.data.is_member == 0) {
          this.setData({
            img: "../../img/yinpai.png"
          })
        } else if (res.data.data.is_member == 1) {
          this.setData({
            img: "../../img/putong.png"
          })
        } else if (res.data.data.is_member == 2) {
          this.setData({
            img: "../../img/yinpai.png"
          })
        } else if (res.data.data.is_member == 3) {
          this.setData({
            img: "../../img/jinpai.png"
          })
        }
      }
    });
  },
  /**
       * 滑动切换tab
       */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  see: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/tiezx/tiezx?txid=' + e.currentTarget.dataset.id
    })
  },
  notice_detail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/notice_detail/notice_detail?id=' + e.currentTarget.dataset.id + '&title=' + e.currentTarget.dataset.title
    })
  },
  shanchu: function (e) {
    var that = this;
    console.log(e)
    wx.request({
      url: getApp().globalData.url + '/index.php/api/My/comments_del',
      data: {
        id: e.currentTarget.dataset.id
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: res.data.data,
          icon: "none"
        })
        that.news()
      }
    })
  },
  del_detail: function (e) {
    var uid = wx.getStorageSync('id')
    var that = this;
    console.log(e)
    wx.request({
      url: getApp().globalData.url + '/index.php/api/My/noticedel',
      data: {
        uid: uid,
        id: e.currentTarget.dataset.id
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: res.data.data,
          icon: "none"
        })
        that.notice()
      }
    })
  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    if (this.data.currentTab == 1) {
      that.news()
    } else if (this.data.currentTab == 0) {
      that.notice()
    }
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
    // that.news();
    that.notice()
    if (this.data.currentTab == 1) {
      that.news()
    } else if (this.data.currentTab == 0) {
      that.notice()
    }
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