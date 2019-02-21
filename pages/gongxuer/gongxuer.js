// pages/gongxu/gongxu.js
// var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
    tu: '',
    siliao: "",

    tip_msg: 'toast提示信息',
    showToast: false,
    userInfo: null,
    login_member: '',         //输入的手机号
    poster_src: [],
    area_list: [],
    height: wx.getStorageSync('viewHeight'),
    area_id: null,
    upload_img: [],
    index: 0,
    choose_address: [],
    chuan:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //图片上传
  up_img: function () {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          tempFilePaths: res.tempFilePaths
        })
        // console.log(res.tempFilePaths); 
        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = res.tempFilePaths.length; //总共个数
        var i = 0; //第几个
        that.upload(res.tempFilePaths, successUp, failUp, i, length);
      }
    })
  },
  upload: function (filePaths, successUp, failUp, i, length) {
    var that = this;
    wx.uploadFile({
      url: getApp().globalData.url + '/index.php/api/Public/upload_img',
      filePath: filePaths[i],
      name: 'file',
      success: function (res) {
        var res_data = JSON.parse(res.data);

        if (res_data.status == 200) {
          successUp++;

          var arrimg = that.data.poster_src;
          var now_upload_img = that.data.upload_img

          arrimg.push(filePaths[i]);
          now_upload_img.push(res_data.data);
          that.setData({
            poster_src: arrimg,
            upload_img: now_upload_img
          });

        } else {
          wx.showToast({
            title: res_data.error,
            icon: 'loading'
          })
        }

      },
      fail: function (e) {
        failUp++;
        wx.showToast({
          title: '请求失败',
          icon: 'loading'
        })
      },
      complete: function () {
        i++;
        if (i == length) {
          wx.showToast({
            title: '总共' + successUp + '张上传成功,' + failUp + '张上传失败！',
            icon: 'loading'
          })
          that.setData({
            chuan: 1
          })
        }
        else {  //递归调用uploadDIY函数
          that.upload(filePaths, successUp, failUp, i, length);
          that.setData({
            chuan: 0
          })
        }
      }
    })
  },
  siliao: function (e) {
    var that = this
    if (this.data.siliao == "") {
      that.setData({
        siliao: "私聊"
      })
    } else {
      that.setData({
        siliao: ""
      })
    }
  },
  bindFormSubmit: function (e) {
    var that = this;
    if (that.data.chuan == 1) {


      var a = this.data.upload_img

      var b = a.join(',')

      // 判断是否为空
      if (e.detail.value.fenlei.replace(/\s+/g, '') == "" || e.detail.value.pinpai.replace(/\s+/g, '') == "" || e.detail.value.biaoti.replace(/\s+/g, '') == "" || e.detail.value.textarea.replace(/\s+/g, '') == "" || e.detail.value.dizhi.replace(/\s+/g, '') == "" || b == "" || e.detail.value.jiage.replace(/\s+/g, '') == "") {
        wx.showToast({
          title: '请将信息填写完整',
          icon: "none"
        })
        return;
      }
      var uid = wx.getStorageSync('id')

      var that = this;
      // 需需需
      wx.request({
        url: getApp().globalData.url + '/index.php/api/Forum/forum_add',
        data: {
          uid: uid,
          forum_type: 1,
          type_name: e.detail.value.fenlei,
          brand_name: e.detail.value.pinpai,
          forum_title: e.detail.value.biaoti,
          forum_content: e.detail.value.textarea,
          forum_address: e.detail.value.dizhi,
          forum_img: b,
          forum_price: e.detail.value.jiage
        },
        success: res => {
          console.log(res)
          wx.navigateTo({
            url: '/pages/success/success?leixing=' + 1
          })
        }
      });
    } else if (that.data.chuan == 0) {
      wx.showToast({
        title: '正在上传图片',
        icon: "none"
      })
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