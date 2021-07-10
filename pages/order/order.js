// pages/order/order.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    orderbol:true,
    tomorrows:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // batchDelete: function() {
  //   wx.cloud.callFunction({
  //     name: 'removes'
  //   }).then(res => {
  //     console.log(res)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // },
  // batchAdd: function() {
  //   wx.cloud.callFunction({
  //     name: 'add',
  //     data:{arr:this.data.arr}
  //   }).then(res => {
  //     console.log(res)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.cloud.callFunction({
      name: 'getOpenid',
      success: res=>{
        // console.log(res.result.openid)
        db.collection('order').where({
          _openid:res.result.openid
        }).get({
          success: res=> {
            // console.log(res.data)
            this.setData({
              order:res.data,
            })
            const tomorrowstemp = new Array
          }
        })
      }
    })
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