// pages/huiyuan/huiyuan.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    huiyuan: {},
    jib: "",
    img: "",
    stime: "",
    etime: "",
    winWidth: 0,
    winHeight: 0,
    transdata: "",
    transdatas: "",
    chongzhi: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });

      }

    });
    var uid = wx.getStorageSync('id')

    // 我的会员
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/index.php/api/My/my_lst/type_xiang/2',
      data: {
        uid: uid
      },
      success: res => {
        console.log(res)
        if (res.data.status == 202) {
          that.setData({
            etime: "您还不是会员",
            chongzhi: 0
          })
        } else if (res.data.status == 201) {
          wx.showToast({
            title: res.data.data,
            icon: "none"
          })
        } else {
          that.setData({
            huiyuan: res.data.data
          })
          if (that.data.huiyuan.qufen_member == 0) {
            var zeng = "您的银牌会员体验时间为一个月 截止日期" + that.data.huiyuan.z_etime
            that.setData({
              jib: "银牌会员",
              img: "../../img/yinpai.png",
              stime: that.data.huiyuan.z_stime,
              etime: that.data.huiyuan.z_etime
            })
          } else if (that.data.huiyuan.qufen_member == 2) {
            that.setData({
              jib: "银牌会员",
              img: "../../img/yinpai.png",
              stime: that.data.huiyuan.y_stime,
              etime: that.data.huiyuan.y_etime
            })
          } else if (that.data.huiyuan.qufen_member == 3) {
            that.setData({
              jib: "金牌会员",
              img: "../../img/jinpai.png",
              stime: that.data.huiyuan.j_stime,
              etime: that.data.huiyuan.j_etime
            })
          }
          let transdata = that.data.stime
          // 起始时间
          var date = new Date(transdata * 1000);
          var Y = date.getFullYear();
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          var D = date.getDate();
          var h = date.getHours();
          var m = date.getMinutes();
          var s = date.getSeconds();
          transdata = Y + "-" + M + "-" + D

          let transdatas = that.data.etime
          // 结束时间
          var dates = new Date(transdatas * 1000);
          var Y = dates.getFullYear();
          var M = (dates.getMonth() + 1 < 10 ? '0' + (dates.getMonth() + 1) : dates.getMonth() + 1);
          var D = dates.getDate();
          var h = dates.getHours();
          var m = dates.getMinutes();
          var s = dates.getSeconds();
          transdatas = Y + "-" + M + "-" + D

          that.setData({
            stime: transdata,
            etime: transdatas
          })
          if (that.data.huiyuan.qufen_member == 1) {
            that.setData({
              jib: "普通会员",
              img: "../../img/putong.png",
              stime: that.data.huiyuan.pt_stime,
              etime: "永久"
            })
          }
        }
      }
    });
    wx.request({
      url: getApp().globalData.url + '/index.php/api/My/money',
      data: {
        uid: uid
      },
      success: res => {
        console.log(res)
        that.setData({
          jinpai_member: res.data.money.jinpai_member,
          putong_member: res.data.money.putong_member,
          yinpai_member: res.data.money.yinpai_member
        })
      }
    });
  },
  chong:function(e){
    var that=this;
    wx.navigateTo({
      url: '/pages/chong/chong?jin=' + that.data.jinpai_member + '&yin=' + that.data.yinpai_member + '&putong=' + that.data.putong_member
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

  }
})