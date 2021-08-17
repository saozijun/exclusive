// pages/comment/comment.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:0,//评分的value值
    message:'',  //评论的内容
    order:''
  },
  usenow:function(e){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const order = JSON.parse(options.order)
    console.log(JSON.parse(options.order))
    this.setData({
      order:order
    })
  },
  //评分的value值双向绑定
  onChange(event) {
    this.setData({
      value: event.detail   //评分的value值
    });
  },
  //输入内容的message值双向绑定
  onInput(e){
    this.setData({
      message: e.detail   //评论的内容
    });
  },
  usenow:function(e){
    if(this.data.message != '' && this.data.value != 0){
      db.collection('order').doc(this.data.order._id).update({
        data: {
          // 表示将 done 字段置为 true
          userorder: {
            state: '已完成',
            orderComment:this.data.message,
            rate:this.data.value
          }
        },
        success: (res) => {
          console.log(res)
          wx.navigateBack()
        }
      })
    }else{
      wx.showToast({
        title: '请输入内容',
        icon: 'success',
        duration: 1000
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