// pages/shouc/shouc.js
//获取应用实例
const app = getApp()
import zhekou from '../zhekou/zhekou'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
        * 页面配置
        */

    // tab切换
    navtab: ["折扣信息", "商品信息", "交易论坛"],
    currentTab: 0,
    shouc: [],
    shangpin: [],
    jiaoyi: [],
    list_none:1,
    img:"",
    dis:1,
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
  agio:function(){
    var uid = wx.getStorageSync('id')

    // 折扣信息
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/My/my_lst',
      data: {
        uid: uid,
        type_xiang: 3,
        type: 1
      },
      success: res => {

        if (res.data.status == 202) {
          that.setData({
            chongzhi: 0
          })
        } else if (res.data.status == 201) {
          that.setData({
            list_none: 0
          })
        } else {
          let transdata = res.data.data.data
          for (let i = 0; i < transdata.length; i++) {
            var date = new Date(transdata[i].collection_create_time * 1000);
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            transdata[i].collection_create_time = Y + "-" + M + "-" + D
          }
          this.setData({
            shouc: res.data.data.data
          })
        }
      }
    });
  },
  // 商品信息
  shopdetail:function(){
    var uid = wx.getStorageSync('id')
    var that = this;
    // 商品信息
    wx.request({
      url: getApp().globalData.url + '/index.php/api/My/my_lst',
      data: {
        uid: uid,
        type_xiang: 3,
        type: 2
      },
      success: res => {
        if (res.data.status == 202) {
          that.setData({
            chongzhi: 0
          })
        } else if (res.data.status == 201) {
          that.setData({
            list_none: 0
          })
        } else {
          this.setData({
            shangpin: res.data.data.data
          })
          that.setData({
            list_none: 1
          })
        }

      }
    });
  },
  // 交易论坛
  trading:function(){
    var uid = wx.getStorageSync('id')
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/My/my_lst',
      data: {
        uid: uid,
        type_xiang: 3,
        type: 3
      },
      success: res => {
        if (res.data.status == 202) {
          that.setData({
            chongzhi: 0
          })
        } else if (res.data.status == 201) {
          that.setData({
            list_none: 0
          })
        } else {
          let transdata = res.data.data.data
          for (let i = 0; i < transdata.length; i++) {
            var date = new Date(transdata[i].collection_create_time * 1000);
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            transdata[i].collection_create_time = Y + "-" + M + "-" + D
          }
          this.setData({
            jiaoyi: res.data.data.data
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
          that.setData({
            list_none: 1
          })
        }

      }
    });
  },
  onReachBottom: function () {
    var that = this;
    var uid = wx.getStorageSync('id')
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    if (that.data.currentTab==2){
      // 页数+1
      let page = that.data.page+1;
      let alldata = that.data.jiaoyi
      wx.request({
        url: getApp().globalData.url + '/index.php/api/My/my_lst',
        data: {
          uid: uid,
          page: page,
          type_xiang: 3,
          type: 3
        },
        success: function (res) {
          // 回调函数
          if (res.data.status == 200) {
            let shu = page;
            for (var i = 0; i < res.data.data.data.length; i++) {
              alldata.push(res.data.data.data[i]);
            }
            that.setData({
              jiaoyi: alldata,
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
      let page = that.data.page+1;
      let alldata = that.data.shangpin
      wx.request({
        url: getApp().globalData.url + '/index.php/api/My/my_lst',
        data: {
          uid: uid,
          page: page,
          type_xiang: 3,
          type: 2
        },
        success: function (res) {
          // 回调函数
          if (res.data.status == 200) {
            let shu = page;
            for (var i = 0; i < res.data.data.data.length; i++) {
              alldata.push(res.data.data.data[i]);
            }
            that.setData({
              shangpin: alldata,
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
    } else if (that.data.currentTab == 0) {
      // 页数+1
      let page = that.data.page+1;
      let alldata = that.data.shouc
      wx.request({
        url: getApp().globalData.url + '/index.php/api/My/my_lst',
        data: {
          uid: uid,
          page: page,
          type_xiang: 3,
          type: 1
        },
        success: function (res) {
          // 回调函数
          if (res.data.status == 200) {
            let shu = page;
            for (var i = 0; i < res.data.data.data.length; i++) {
              alldata.push(res.data.data.data[i]);
            }
            that.setData({
              shouc: alldata,
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
  // 删除折扣详情
  shan: function (e) {
    var uid = wx.getStorageSync('id')
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Public/discount_collection',
      data: {
        uid: uid,
        discount_id: e.currentTarget.dataset.ids
      },
      success: res => {
        wx.showToast({
          title: "删除成功",
          icon: "none"
        })
        wx.request({
          url: getApp().globalData.url + '/index.php/api/My/my_lst',
          data: {
            "uid": uid,
            "type_xiang": 3,
            "type": 1
          },
          success: res => {
            if (res.data.status == 200) {
              this.setData({
                shouc: res.data.data.data
              })
              
            } else if (res.data.status == 201) {
              that.agio()
              this.setData({
                shouc: []
              })
            }
          }
        });
      }
    });
  },
  // 删除商品信息
  shaner: function (e) {
    var uid = wx.getStorageSync('id')
    
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Public/discount_collection',
      data: {
        uid: uid,
        goods_id: e.currentTarget.dataset.idh
      },
      success: res => {
        wx.showToast({
          title: "删除成功",
          icon: "none"
        })
        wx.request({
          url: getApp().globalData.url + '/index.php/api/My/my_lst',
          data: {
            "uid": uid,
            "type_xiang": 3,
            "type": 2
          },
          success: res => {
            if (res.data.status == 200) {
              
              this.setData({
                shangpin: res.data.data.data
              })
            } else if (res.data.status == 201) {
              that.shopdetail();
              this.setData({
                shangpin: []
              })
            }
          }
        });
      }
    });
  },
  // 删除论坛
  shansan: function (e) {
    var uid = wx.getStorageSync('id')
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Public/discount_collection',
      data: {
        uid: uid,
        forum_id: e.currentTarget.dataset.ida
      },
      success: res => {
        wx.showToast({
          title: "删除成功",
          icon: "none"
        })
        wx.request({
          url: getApp().globalData.url + '/index.php/api/My/my_lst',
          data: {
            "uid": uid,
            "type_xiang": 3,
            "type": 3
          },
          success: res => {
            if (res.data.status == 200) {
              this.setData({
                jiaoyi: res.data.data.data
              })
            } else if (res.data.status == 201) {
              that.trading();
              this.setData({
                jiaoyi: []
              })
            }
          }
        });
      }
    });
  },

  tiezXiang: function (e) {
    wx.navigateTo({
      url: '/pages/tiezx/tiezx?txid=' + e.currentTarget.dataset.id
    })
  },
  showdetais: function (event) {
    let that = this

    wx.navigateTo({
      url: '/pages/shopxiang/shopxiang?sxid=' + event.currentTarget.dataset.ids
    })

  },
  details: function (event) {
    wx.navigateTo({
      url: '/pages/zhekou/zhekou?zkid=' + event.currentTarget.dataset.ids
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
    if (this.data.currentTab ==1){
      that.shopdetail()
    } else if (this.data.currentTab == 2) {
      that.trading()
    } else if (this.data.currentTab == 0) {
      that.agio()
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
      that.shopdetail()
    } else if (this.data.currentTab == 2) {
      that.trading()
    } else if (this.data.currentTab == 0) {
      that.agio()
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

  // 下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载 
    var that = this;
    if (this.data.currentTab == 1) {
      that.shopdetail()
      that.setData({
        currentTab: 1
      })
    } else if (this.data.currentTab == 2) {
      that.trading()
      that.setData({
        currentTab: 2
      })
    } else if (this.data.currentTab == 0) {
      that.agio()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})