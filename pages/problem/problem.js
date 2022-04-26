// pages/problem/problem.js
const db = wx.cloud.database()
var util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:wx.getStorageSync('info') || null,
    list:[]
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
    wx.showLoading({
      title: '加载中',
    })
    this.getOrder()
  },
  complete(e){
    console.log(e.currentTarget.dataset.id)
    const {id,item} = e.currentTarget.dataset
    const {info} = this.data
    const that = this
    if(item.status) return
    wx.showLoading({
      title: '完成中',
    })
    db.collection('order').doc(id).update({
      data:{userorder:{status:!item.status}},
      success(res){
        wx.showToast({
          title: `太棒啦，鸡分+${item.number}`,
          icon:'none',
          duration: 2000
        })
        wx.hideLoading()
        db.collection('integral').add({
          data:{
            createTime: db.serverDate(), //添加该字段
            list:{
            number:item.number,
            name:item.name,
            type:0,
            date:Date.now(),
            url:item.url
          }},
          success(integral){
            console.log('integral---',integral)
          }
        })
        db.collection('order').get({
          success: res2=> {
            console.log('res2----',res2)
            that.setData({list:res2.data})
          }
        })
        db.collection('userInfos').doc(info._id).update({
          data:{integral:parseInt(wx.getStorageSync('info').integral)+parseInt(item.number)},
          success(res){
            console.log('res---',res)
            util.getInfo()
          }
        })
      }
    })
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