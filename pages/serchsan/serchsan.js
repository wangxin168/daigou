// pages/serch/serch.js
//获取应用实例
const app = getApp()
var Title = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Title: "",
    img:"",
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  voteTitle: function (e) {

    var value = e.detail.value;
    // this.setData({
    //   Title: value,
    // })

    var uid = wx.getStorageSync('id')

    // 搜索
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Forum/forum_lst/',
      data: {
        uid: uid,
        type: 1,
        forum_title: value,
      },
      success: res => {
        console.log(res)
        if (value == "") {
          this.setData({
            luntan: null
          })
        } else {
          if (res.data.status == 202) {
            wx.showToast({
              title: res.data.data,
              icon: "none"
            })
          } else {
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
              luntan: transdata
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
          }
        }
      }
    });

    // 搜索
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Forum/forum_lst/',
      data: {
        uid: uid,
        type: 2,
        forum_title: value
      },
      success: res => {
        // console.log(res)
        if (value == "") {
          this.setData({
            luntans: null
          })
        } else {
          if (res.data.status == "202") {
            wx.showToast({
              title: res.data.data,
              icon: "none"
            })
          } else {
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
              luntans: transdata
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
          }
        }
      }
    });
  },

  // 跳转商品详情页
  tiezXiang: function (e) {
    wx.navigateTo({
      url: '/pages/tiezx/tiezx?txid=' + e.currentTarget.id
    })
  },
  onReachBottom: function () {
    var that = this;
    var uid = wx.getStorageSync('id')
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })

    var page = that.data.page + 1;

    let alldata = that.data.luntan
    let all = that.data.luntans
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Forum/forum_lst/',
      data: {
        uid: uid,
        type:1,
        page: page
      },
      success: function (res) {
        console.log(res)
        // 回调函数
        if (res.data.data.data.length != 0) {
          let shu = page;
          for (var i = 0; i < res.data.data.data.length; i++) {
            alldata.push(res.data.data.data[i]);
          }
          
          that.setData({
            luntan: alldata,
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
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Forum/forum_lst/',
      data: {
        uid: uid,
        type: 2,
        page: page
      },
      success: function (res) {
        console.log(res)
        // 回调函数
        if (res.data.data.data.length != 0) {
          let shu = page;
          for (var i = 0; i < res.data.data.data.length; i++) {
            all.push(res.data.data.data[i]);
          }
          that.setData({
            luntans: all,
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})