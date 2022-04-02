// pages/comment/comment.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getOrder(index){
    wx.cloud.callFunction({
      name: 'getOpenid',
      success: res=>{
        db.collection('order').get({
          success: res2=> {
            console.log('res2----',res2)
            this.setData({list:res2.data})
            setTimeout(function () {
              wx.hideLoading()
            }, 1)
          }
        })
      }
    })
  },
  topersonal(e){
    console.log(e)
    const item =  e.currentTarget.dataset.item
    if(item){
      console.log('item--',item)
      wx.navigateTo({
        url: '/pages/personal/personal?item='+JSON.stringify(item),
      })
    }else{
      wx.navigateTo({
        url: '/pages/personal/personal',
      })
    }
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
    wx.showLoading({
      title: '加载中',
    })
    this.getOrder()
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