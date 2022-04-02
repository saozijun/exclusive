// pages/personal/personal.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    getuserbtn: true,
    openId:null,
    info:wx.getStorageSync('info') || null
  },
  //获取用户信息
  getUserInfo: function (e) {
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          getuserbtn: false
        })
        console.log(this.data.userInfo)
        //存当前用户
        wx.setStorageSync('userInfo', res.userInfo)
        //把用户信息存到数据库
        db.collection('userInfos').get({
          success: res2 => {
            console.log(res2.data)
            wx.cloud.callFunction({
              name: 'add',
              data: {
                info: {
                  userInfo: this.data.userInfo,
                  res: res2.data
                }
              },
              success: res3 => {
                console.log(res3)
                this.getInfo()
              }
            })
          }
        })
      }
    })
  },
  getInfo() {
    const {openId} = this.data
    db.collection('userInfos').get({
      success: res2 => {
        const info =  res2.data.filter(item=>item._openid==openId)
        wx.setStorageSync('info', info[0])
        this.setData({info:info[0]})
      }
    })
  },
  secede: function (e) {
    this.setData({
      userInfo: null,
      getuserbtn: true,
      info:null
    })
    // wx.clearStorageSync()
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('info')
    wx.removeStorageSync('logs')
  },
  toproblem: function (e) {
    wx.navigateTo({
      url: '/pages/problem/problem',
    })
  },
  toevaluate: function (e) {
    wx.navigateTo({
      url: '/pages/evaluate/evaluate',
    })
  },
  tocomment: function (e) {
    wx.navigateTo({
      url: '/pages/comment/comment',
    })
  },
  tonotice: function (e) {
    wx.navigateTo({
      url: '/pages/notice/notice',
    })
  },
  tosecurity: function (e) {
    wx.navigateTo({
      url: '/pages/security/security',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'getOpenid',
      success: res => {
        console.log('openId',res)
        this.setData({openId:res.result.openId})
        wx.setStorageSync('openId', res.result.openId)
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
    // console.log(wx.getStorageSync('userInfo'))
    if (wx.getStorageSync('userInfo') != "") {
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
        getuserbtn: false
      })
    }
    this.getInfo()
    this.setData({info:wx.getStorageSync('info') || null})
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