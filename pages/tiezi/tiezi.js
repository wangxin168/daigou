// pages/tiezi/tiezi.js

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
    tiezi: [],
    tiezis: [],
    img: "",
    chongzhi: 1,
    list_none: 1,
    page:1
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
  xu: function () {
    var uid = wx.getStorageSync('id')

    // 我的帖子
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/My/my_lst/',
      data: {
        uid: uid,
        type_xiang: 5,
        forum_type: 2
      },
      success: res => {
        if (res.data.data == "没有数据") {
          this.setData({
            tiezi: []
          })
        }

        if (res.data.status == 202) {
          that.setData({
            chongzhi: 0
          })
        } else if (res.data.status == 201) {
          wx.showToast({
            title: res.data.data,
            icon: "none"
          })
          that.setData({
            list_none: 0
          })
        } else if (res.data.status == 200) {
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
          let transdata = res.data.data.data
          for (let i = 0; i < transdata.length; i++) {
            var date = new Date(transdata[i].forum_create_time * 1000);
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            transdata[i].forum_create_time = Y + "-" + M + "-" + D
          }
          this.setData({
            tiezi: transdata
          })
          that.setData({
            list_none: 1
          })
        }
      }

    });
  },
  gong: function () {
    var that = this;
    var uid = wx.getStorageSync('id')
    wx.request({
      url: getApp().globalData.url + '/index.php/api/My/my_lst/',
      data: {
        uid: uid,
        type_xiang: 5,
        forum_type: 1
      },
      success: res => {
        if (res.data.data == "没有数据") {
          this.setData({
            tiezis: []
          })
        }
        if (res.data.status == 202) {
          that.setData({
            chongzhi: 0
          })
        } else if (res.data.status == 201) {
          wx.showToast({
            title: res.data.data,
            icon: "none"
          })
          that.setData({
            list_none: 0
          })
        } else if (res.data.status == 200) {
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
          let transdata = res.data.data.data
          for (let i = 0; i < transdata.length; i++) {
            var date = new Date(transdata[i].forum_create_time * 1000);
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            transdata[i].forum_create_time = Y + "-" + M + "-" + D
          }
          this.setData({
            tiezis: transdata
          })
          that.setData({
            list_none: 1
          })
        }
      }
    });
  },
  del: function (e) {
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          wx.request({
            url: getApp().globalData.url + '/index.php/api/My/forum_del',
            data: {
              forum_id: e.currentTarget.dataset.id
            },
            success: res => {
              //用onLoad周期方法重新加载，实现当前页面的刷新
              wx.showToast({
                title: res.data.data,
                icon: "none"
              })
              that.xu();
            }
          });
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  deler: function (e) {
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          wx.request({
            url: getApp().globalData.url + '/index.php/api/My/forum_del',
            data: {
              forum_id: e.currentTarget.dataset.id
            },
            success: res => {
              //用onLoad周期方法重新加载，实现当前页面的刷新
              wx.showToast({
                title: res.data.data,
                icon: "none"
              })
              that.gong();
            }
          });
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  bianji: function (e) {

    wx.navigateTo({
      url: '/pages/gongxugai/gongxugai?ltid=' + e.currentTarget.dataset.id+'&type='+e.currentTarget.dataset.type
    })

  },
  zitiex: function (e) {

    wx.navigateTo({
      url: '/pages/zitiex/zitiex?zkid=' + e.currentTarget.dataset.id
    })
  },
  /**
       * 滑动切换tab
       */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

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
      that.gong()
    } else if (this.data.currentTab == 0) {
      that.xu()
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
    if (this.data.currentTab == 1) {
      that.gong()
      that.setData({
        currentTab:1
      })
    } else if (this.data.currentTab == 0) {
      that.xu()
      that.setData({
        currentTab: 0
      })
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
  /**
   * 页面上拉触底事件的处理函数
   */
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
      let alldata = that.data.tiezi
    wx.request({
      url: getApp().globalData.url + '/index.php/api/My/my_lst/',
      data: {
        uid: uid,
        type_xiang: 5,
        forum_type: 2,
        page:page
      },
      success: function (res) {
        // 回调函数
        if (res.data.status === "200") {
          let shu = page;
          for (var i = 0; i < res.data.data.data.length; i++) {
            alldata.push(res.data.data.data[i]);
          }
          that.setData({
            tiezi: alldata,
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
      let alldata = that.data.tiezis
      wx.request({
        url: getApp().globalData.url + '/index.php/api/My/my_lst/',
        data: {
          uid: uid,
          type_xiang: 5,
          forum_type: 1,
          page: page
        },
        success: function (res) {
          // 回调函数
          if (res.data.status === "200") {
            let shu = page;
            for (var i = 0; i < res.data.data.data.length; i++) { 
              alldata.push(res.data.data.data[i]);
            }
            that.setData({
              tiezis: alldata,
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
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})