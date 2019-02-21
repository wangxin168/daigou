App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var that = this;
    wx.login({
      success: res => {
        // console.log(res)
        if (res.code) {
          // console.log(res.code)
          that.globalData.code = res.code;
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  

  /**
   * 设置全局变量
   */
  globalData: {
    openid: 0,
    code:"",
    shopid:0,
    url: "https://safe.yuanchuangyuan.com",
    currentTab:0
  }
})


