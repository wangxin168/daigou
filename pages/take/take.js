
// pages/take/take.js

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
        * 页面配置
        */

    // tab切换
    navtab: ["求购", "出售"],
    currentTab: 0,
    display: false,
    luntan: [],
    luntans: [],
    zhiding: [],
    zhidings: [],
    img: "",
    page: 1,
    chongzhi: 1,
    // 置顶没数据 隐藏
    list_none: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

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
  zhiDing: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/zhiding/zhiding?zdid=' + e.currentTarget.id
    })
  },

  tiezXiang: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/tiezx/tiezx?txid=' + e.currentTarget.id
    })
  },
  qiuGou: function () {
    wx.navigateTo({
      url: '/pages/gongxu/gongxu'
    })
  },
  chuShou: function () {
    wx.navigateTo({
      url: '/pages/gongxuer/gongxuer'
    })
  },


  dianJi: function (e) {
    var that = this;
    if (that.data.chongzhi == 0) {
      wx: wx.showToast({
        title: '不是会员请充值',
        icon: 'none'
      })
    } else {
      this.setData({
        display: !this.data.display
      })
    }

  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  gong: function () {
    var that = this
    var uid = wx.getStorageSync('id')
    // 论坛
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Forum/forum_lst/',
      data: {
        uid: uid,
        type: 1
      },
      success: res => {
        if (res.data.status == 202) {
          that.setData({
            chongzhi: 0
          })
        } else if (res.data.status == 201) {
          wx.showToast({
            title: res.data.data,
            icon: "none"
          })
        } else if (res.data.status == 200) {
          let transdata = res.data.data.data
          this.setData({
            zhidings: res.data.data.data_zhiding[0],
            luntan: res.data.data.data
          })
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
          if (that.data.zhiding == undefined) {
            that.setData({
              yincang: 0
            })
          }
          if (that.data.luntan == "") {
            that.setData({
              list_none: 0
            })
          } else {
            that.setData({
              list_none: 1
            })
          }

        }
      }
    });
  },
  xu: function () {
    var that = this
    var uid = wx.getStorageSync('id')
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Forum/forum_lst/',
      data: {
        uid: uid,
        type: 2
      },
      success: res => {
        if (res.data.status == 202) {
          that.setData({
            chongzhi: 0
          })
        } else if (res.data.status == 201) {
          wx.showToast({
            title: res.data.data,
            icon: "none"
          })
        } else if (res.data.status == 200) {
          this.setData({
            zhiding: res.data.data.data_zhiding[0],
            luntans: res.data.data.data
          })
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
          if (that.data.zhidings == undefined) {
            that.setData({
              yincang: 0
            })
          }
          if (that.data.luntans == "") {
            that.setData({
              list_none: 0
            })
          } else {
            that.setData({
              list_none: 1
            })
          }

        }
      }
    });
  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {
    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      // return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    if (this.data.currentTab == 1) {
      that.gong()
    } else if (this.data.currentTab == 0) {
      that.xu()
    }
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载 
    var that = this;
    if (that.data.currentTab == 1) {
      that.gong()
      that.setData({
        currentTab: 1
      })
    } else if (this.data.currentTab == 0) {
      that.xu()
      that.setData({
        currentTab: 0
      })
    }
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  onReachBottom: function () {
    var that = this;
    var uid = wx.getStorageSync('id')
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    if (that.data.currentTab == 0) {
      // 页数+1
      let page = that.data.page + 1;
      let alldata = that.data.luntans
      wx.request({
        url: getApp().globalData.url + '/index.php/api/Forum/forum_lst/',
        data: {
          uid: uid,
          type: 2,
          page: page
        },
        success: function (res) {
          // 回调函数
          if (res.data.data.data.length!=0) {
            let shu = page;
            for (var i = 0; i < res.data.data.data.length; i++) {
              alldata.push(res.data.data.data[i]);
            }
            that.setData({
              luntans: alldata,
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
    } else if (that.data.currentTab == 1) {
      // 页数+1
      let page = that.data.page + 1;
      let alldata = that.data.luntan
      wx.request({
        url: getApp().globalData.url + '/index.php/api/Forum/forum_lst/',
        data: {
          uid: uid,
          type: 1,
          page: page
        },
        success: function (res) {
          // 回调函数
          if (res.data.data.data.length != 0) {
            let shu = page;
            for (var i = 0; i < res.data.data.data.length; i++) {
              alldata.push(res.data.data.data[i]);
            }
            that.setData({
              page: shu,
              luntan: alldata
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
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (that.data.currentTab == 1) {
      that.gong()
      that.setData({
        currentTab: 1
      })
    } else if (this.data.currentTab == 0) {
      that.xu()
      that.setData({
        currentTab: 0
      })
    }
    that.setData({
      currentTab: app.globalData.currentTab
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})