// pages/zitiex/zitiex.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tiezx: [],
    pinglie: [],
    huifu: [],
    collid: "",
    meuid: "",
    type: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var uid = wx.getStorageSync('id')

    that.setData({
      collid: options.zkid
    })
    that.lie()
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        that.setData({
          winHeight: calc,
          imgHeight: clientWidth * rpxR,
          systemInfo: res,
        });
        if (res.platform == "ios") {
          that.setData({
            chang: 1
          })
        } else if (res.platform == "android") {
          that.setData({
            chang: 2
          })
        }
      }

    });
  },
  lie: function () {
    // 论坛详情列表
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Forum/forum_detail_comments/',
      data: {
        forum_id: that.data.collid
      },
      success: res => {
        console.log(res)
        if (res.data.status == 201) {
          that.setData({
            yincang: 0
          })
        } else {
          let transdata = res.data.data.pinglun
          for (let i = 0; i < transdata.length; i++) {
            var date = new Date(transdata[i].createtime * 1000);
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            transdata[i].createtime = Y + "-" + M + "-" + D
          }
          this.setData({
            pinglie: transdata,
            yincang: 1
          })
          for (var i = 0; i < that.data.pinglie.length; i++) {
            if (that.data.pinglie[i].is_member == 0) {
              this.setData({
                img: "../../img/yinpai.png"
              })
            } else if (that.data.pinglie[i].is_member == 1) {
              this.setData({
                img: "../../img/putong.png"
              })
            } else if (that.data.pinglie[i].is_member == 2) {
              this.setData({
                img: "../../img/yinpai.png"
              })
            } else if (that.data.pinglie[i].is_member == 3) {
              this.setData({
                img: "../../img/jinpai.png"
              })
            }
          }
        }
        
      }
    });
  },
  details: function () {
    // 论坛详情
    var that = this;
    var uid = wx.getStorageSync('id')
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Forum/forum_detail/',
      data: {
        uid: uid,
        id: that.data.collid
      },
      success: res => {
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
          tiezx: transdata,
          meuid: res.data.data.data[0].uid,
          shouc: res.data.data.is_shoucang,
          yuid: res.data.data.data[0].uid
        })
      }
    });
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
  shanping: function (e) {
    var that = this;
    console.log(e)
    console.log(that.data.meuid)
    // if (e.currentTarget.dataset.zijiuid == that.data.meuid) {
    //   that.setData({
    //     type: 3
    //   })
    // } else {
    //   that.setData({
    //     type: 1
    //   })
    // }
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Forum/forum_comments_del/',
      data: {
        forum_id: e.currentTarget.dataset.forum,
        uid: e.currentTarget.dataset.zijiuid,
        // type: that.data.type,
        type:3,
        id: e.currentTarget.dataset.id
      },
      success: res => {
        console.log(res)
        that.lie()
      }
    });
  },
  shanhui: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.id, )
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Forum/forum_comments_huifu_del/',
      data: {
        id: e.currentTarget.dataset.idd,
      },
      success: res => {
        console.log(res)
        that.lie()
      }
    });
  },
  huifu: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/huifu/huifu?hfuid=' + e.currentTarget.dataset.hfuid + "&fo=" + e.currentTarget.dataset.fo
    })
  },

  ping: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/pinglun/pinglun?txid=' + e.currentTarget.id + "&collid=" + that.data.collid + "&yuid=" + that.data.yuid
    })
  },
  shouCang: function (event) {
    // console.log(e)
    var uid = wx.getStorageSync('id')
    // 
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/Public/discount_collection',
      data: {
        uid: uid,
        forum_id: that.data.collid,

      },
      success: res => {
        wx.setStorageSync('forum_id ', res.data.data)
        console.log(res.data.data)

        that.details()

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
    var that = this;
    that.details(that.data.collid)
    that.lie()
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