Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    uid: 0
  },
  onLoad: function () {
    var that = this;
    wx.login({
      success:res=>{
        wx.request({
          url: getApp().globalData.url + "/index.php/api/Public/get_openid_api/",
          data: {
            code: getApp().globalData.code,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.data.status == 200) {
              wx.setStorageSync('id', res.data.data.uid)
              wx.setStorageSync('openid', res.data.data.openid)
              wx.setStorageSync('user_jifen', res.data.data.user_jifen)
              wx.setStorageSync('user_img', res.data.data.user_img)
              wx.setStorageSync('user_nickname', res.data.data.user_nickname)
            }
            // if (res.data.data.openid!=undefined){
            //   wx.switchTab({
            //     url: '/pages/index/index'
            //   })
            // }
          }
        })
      }
    })
  },
  //获取用户信息接口
  
  bindGetUserInfo: function (e) {
    wx.request({
      url: getApp().globalData.url + "/index.php/api/Public/get_info",
      data: {
        uid: wx.getStorageSync('id'),
        nickname: e.detail.userInfo.nickName,
        avatar: e.detail.userInfo.avatarUrl,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        getApp().globalData.userInfo = res.data;
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
  },

})
