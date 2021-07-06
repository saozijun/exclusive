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
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    title: ['7月4日上午9:30入管', '7月4日上午13:00入管', '每日下午16:00开放第二日预约'],
    value: 4,
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
    wx.navigateTo({
      url: '/pages/details/details?value='+value,
    })
  },
  tonotice:function(e){
    wx.navigateTo({
      url: '/pages/notice/notice',
    })
  },
  toevaluate:function(e){
    wx.navigateTo({
      url: '/pages/evaluate/evaluate',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //增加数据
    // db.collection('users').add({
    //   data:[
    //     {
    //     username:'岑新灿',
    //     userphone:'102',
    //     deposit:1000
    //     }
    //   ],
    //   success: res=>{
    //     console.log(res)
    //   }
    // })
    //删除数据
    // db.collection('users').where({
    //   _openid:'o7VCs5KATk6rE8CpmYtyFFsUs0E8'
    // }).remove({
    //   success:res=>{
    //     console.log(res)
    //   }
    // })
    //查询数据
    // db.collection('users').doc('28ee4e3e60e41272282f6f92348179a4').set({
    //   data:{
    //     username:'韦克林',
    //     userphone:'1002',
    //     deposit:100000
    //   },
    //   success: res => {
    //     console.log(res)
    //   }
    // })
    //通过获取长度循环删除全部数据
    // db.collection('users').where({
    //   _openid: 'o7VCs5KATk6rE8CpmYtyFFsUs0E8'
    // }).get({
    //   success: res => {
    //     console.log(res.data.length)
    //     for (let i = 0; i < res.data.length; i++) {
    //       db.collection('users').where({
    //         _openid: 'o7VCs5KATk6rE8CpmYtyFFsUs0E8'
    //       }).remove({
    //         success: res => {
    //           console.log(res)
    //         }
    //       })
    //     }
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