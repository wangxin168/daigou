// pages/chong/chong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    new_w: '金牌会员',
    new_j: "" ,
    hui:3,
    shopitem:{},
    changs:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    
    that.setData({
      huiyuan: [
        { jibie: "金牌会员", qian: options.jin, hui: 3 },
        { jibie: "银牌会员", qian: options.yin, hui: 2 },
        { jibie: "普通会员", qian: options.putong, hui: 1 },
      ],
      new_j: options.jin
    })
  },
  // 选择类型
  bindjin: function (event) {
    var classify = event.currentTarget.dataset.classify; 
    var that = this; 
    //输出的结果就是你点击的    
    this.setData({      
      shopitem: classify,
      new_w: classify.jibie,
      new_j: classify.qian,
      hui: classify.hui,
      changs: event.currentTarget.dataset.index
    }) 
  },
  // 充值按钮
  chong:function(e){
    wx.navigateTo({
      url: '/pages/zhifu/zhifu?new_w=' + this.data.new_w + "&new_j=" + this.data.new_j + "&hui=" + this.data.hui
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