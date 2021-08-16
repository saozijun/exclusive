// pages/details/details.js
const Utils = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    title:'',
    name:'',
    phone:'',
    card:'',
    cost:'免费',
    ticketnumber:100,
    Newdate:'',
    buynumber:1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const date = new Date()
    let dateTemp = date.setDate(date.getDate()+1)
    if(options!=""){
      this.setData({
        title:options.value,
        Newdate:Utils.formatTime(new Date(dateTemp)),
        tomorrow:Utils.formatTime(new Date(dateTemp)).slice(5)
      })
    }
  },
  buynumber:function(e){
    this.setData({
      buynumber:e.detail
    })
  },
  getuser:function(e){
    const value = e.currentTarget.dataset.value
    // console.log(e.detail)
    this.setData({
      [value]:e.detail
    })
  },
  reserve:function(e){
    const date = new Date()
    let day = date.getDay();
    let weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    if(this.data.name != "" && this.data.phone != "" && this.data.card != ""){
      // 存用户的下单信息
      wx.cloud.callFunction({
        name: 'addorder',
        data:{userorder:{
          title:this.data.title,               //票的主题
          name:this.data.name,                 //用户的姓名
          phone:this.data.phone,               //用户的手机号
          card:this.data.card,                 //用户的身份证
          cost:this.data.cost,                 //票的费用
          state:'待使用',                      //票的状态
          buynumber:this.data.buynumber,       //买的票数量
          week:weeks[day],                     //周几下的单
          ordernumber:Utils.formatTime2(date),   //订单编号
          time:new Date()                        //下单时间
        }},
        success: res=>{
          console.log(res)
        }
      })

      wx.showToast({
        title: '预订成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(()=>{
        wx.navigateBack()
      },1000)
    }else{
      wx.showToast({
        title: '预订失败',
        icon: 'success',
        duration: 2000
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