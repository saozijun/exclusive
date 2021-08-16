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
    background: ['cloud://cloud1-3gwhrat056f4c3bf.636c-cloud1-3gwhrat056f4c3bf-1306416878/image/banner1.jpg', 'cloud://cloud1-3gwhrat056f4c3bf.636c-cloud1-3gwhrat056f4c3bf-1306416878/image/banner2.jpg', 'cloud://cloud1-3gwhrat056f4c3bf.636c-cloud1-3gwhrat056f4c3bf-1306416878/image/banner3.jpg'],
    title: [],
    show:true
  },
  getUserInfo:function(e){
    console.log(e.detail.userInfo)
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
    //用户登录过期时间
    let timestamp = Date.parse(new Date());
    let expiration = timestamp + 25920000; //259200秒（3天）
    wx.setStorageSync('expiration', expiration)
  },
  onChange(event) {
    this.setData({
      value: event.detail,
    });
  },
  tomap: function (e) {
    // wx.chooseLocation({
    //   success:res=>{
    //     console.log(res)
    //   }
    // })
    wx.openLocation({
      latitude: 24.371826698,
      longitude: 109.547209349,
      name: '柳东新区文化广场'
    })
  },
  todetails: function (e) {
    const value = e.currentTarget.dataset.value
    if(wx.getStorageSync('userInfo') !=""){
      if(value !='每日下午16:00开放第二日预约'){
        wx.navigateTo({
          url: '/pages/details/details?value=' + value,
        })
      }
    }else{
      this.setData({
        show:true
      })
    }
  },
  tonotice: function (e) {
    wx.navigateTo({
      url: '/pages/notice/notice',
    })
  },
  toevaluate: function (e) {
    wx.navigateTo({
      url: '/pages/evaluate/evaluate',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      show:wx.getStorageSync('userInfo')==""?true:false
    })
    // console.log(this.data.show)
    const date = new Date()
    const month = date.getMonth()+1
    const day = date.getDate()+1
    this.setData({
      title:[month+'月'+day+'日'+'上午9:30入馆',month+'月'+day+'日'+'上午13:00入馆','每日下午16:00开放第二日预约']
    })
    let timestamp = Date.parse(new Date());
    let expiration = wx.getStorageSync('expiration')
    if(expiration != "" && (timestamp>expiration)){
      wx.clearStorageSync()
      this.setData({
        userInfo:{},
        show:true
      })
    }
    //查询数据
    // db.collection('userInfo').get({
    //   success: res => {
    //     console.log(res.data)
    //   }
    // })
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
    if(wx.getStorageSync('userInfo') !=""){
      // console.log(wx.getStorageSync('userInfo'))
      this.setData({
        userInfo:wx.getStorageSync('userInfo'),
        show:false
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