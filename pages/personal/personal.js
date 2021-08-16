// pages/personal/personal.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    getuserbtn: true
  },
  //获取用户信息
  getUserInfo: function (e) {
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          getuserbtn: false
        })
        console.log(this.data.userInfo)
        //存当前用户
        wx.setStorageSync('userInfo', res.userInfo)
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
        //用户登录过期时间
        let timestamp = Date.parse(new Date());
        let expiration = timestamp + 25920000; //259200秒（3天）
        wx.setStorageSync('expiration', expiration)
      }
    })
  },
  secede: function (e) {
    this.setData({
      userInfo: {},
      getuserbtn: true
    })
    wx.clearStorageSync()
  },
  toproblem: function (e) {
    wx.navigateTo({
      url: '/pages/problem/problem',
    })
  },
  tophone: function (e) {
    wx.makePhoneCall({
      phoneNumber: '17677350137' //仅为示例，并非真实的电话号码
    })
  },
  tosecurity: function (e) {
    wx.navigateTo({
      url: '/pages/security/security?userInfo=' + JSON.stringify(this.data.userInfo),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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