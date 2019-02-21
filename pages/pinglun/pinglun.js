// pages/pinglun/pinglun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {   
    focus: false,
    tempFilePaths:[],
    yuid:"",
    poster_src: [],
    upload_img:[],
    coll:"",
    forum_id:""
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 论坛详情
    var that = this;
    that.setData({
      coll: options.collid,
      yuid:options.yuid,
      forum_id: options.txid
    })
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
        console.log(res)
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
            icon: 'loading',
            duration: 1000
          })
        }

      },
      fail: function (e) {
        failUp++;
        wx.showToast({
          title: '请求失败',
          icon: 'loading',
          duration: 1000
        })
      },
      complete: function () {
        i++;
        if (i == length) {
          wx.showToast({
            title: '总共' + successUp + '张上传成功,' + failUp + '张上传失败！',
            icon: 'loading',
            duration: 1000
          })
        }
        else {  //递归调用uploadDIY函数
          that.upload(filePaths, successUp, failUp, i, length);
        }
      }
    })
  },
  bindFormSubmit: function (e) {
    var a = this.data.upload_img
    console.log(a)
    return;
    var b = a.join(',')
    var uid = wx.getStorageSync('id')
    
    var that = this;
    if (that.data.yuid==uid){
      that.setData({
        type:3
      })
    }else{
      that.setData({
        type: 1
      })
    }
    var that=this
    wx.request({
      url: getApp().globalData.url +'/index.php/api/Forum/fabiao_comments',
      data: {
        uid: uid,
        forum_id: that.data.coll,
        type: that.data.type,
        comments_img: b,
        content: e.detail.value.textarea
      },
      success: res => {
        wx:wx.showToast({
          title: res.data.data,
          icon: 'none'
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },1000)
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
    var that = this
    // that.onLoad()
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