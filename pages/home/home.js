// pages/game/game.js
const db = wx.cloud.database()
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  data: {
    show:true,  //判断是否登录
  },
  //用户登录
  getUserInfo:function(e){
    // console.log(e.detail.userInfo)
    wx.setStorageSync('userInfo', e.detail.userInfo)
    //把用户信息存到数据库
    db.collection('userInfos').where({}).get({
      success: res=> {
        console.log(res.data)
        wx.cloud.callFunction({
          name: 'add',
          data:{userInfo:this.data.userInfo,res:res.data},
          success: res=>{
            console.log(res)
          }
        })
      }
    })
    this.setData({
      userInfo:e.detail.userInfo,
      show:false
    })
  },
  addDiary: function (e) {
    console.log('e-----',e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      show:wx.getStorageSync('userInfo')==""?true:false
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