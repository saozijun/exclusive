// pages/orderdetails/orderdetails.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: [],
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const order = JSON.parse(options.order)
    console.log(JSON.parse(options.order))
    this.setData({
      order: order.userorder,
      id: order._id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  usenow: function (e) {
    db.collection('order').doc(this.data.id).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        userorder: {
          state: 3
        }
      },
      success: (res) => {
        console.log(res)
        wx.navigateBack()
      }
    })
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