// pages/order/order.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [], //全部订单
    reserves:[], //预待定订单
    useds:[], //待使用订单
    comments:[], //待评论订单
    orderbol:true,  //是否登录
    show:null,   //登录状态
    index:0,
    titleArr:['全部','预待定','待使用','待评论'],
    titlesort:['预待定','待使用','待评论'],
    userUrl:'../../images/1111.jpg'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
  },
  tabsChange:function(e){
    this.setData({
      order:[],
      index:e.detail.index
    })
    console.log(e)
    if(this.data.show){
      wx.showLoading({
        title: '加载中',
      })
      this.getOrder(this.data.index)
    }else{
      this.setData({
        order:[],
        orderbol:true
      })
    }
  },
  orderDetails:function(e){
    const state = e.currentTarget.dataset.order.userorder.state  //当前点击的订单状态
    // console.log(e.currentTarget.dataset.order.userorder.state)
    const order= JSON.stringify(e.currentTarget.dataset.order);
    if(state == 1){
      wx.navigateTo({
        url: '/pages/orderdetails/orderdetails?order='+order
      })
    }else if(state == 3){
      wx.navigateTo({
        url: '/pages/comment/comment?order='+order
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getOrder(index){
    wx.cloud.callFunction({
      name: 'getOpenid',
      success: res=>{
        db.collection('order').where(index==0?{
          _openid:res.result.openid,   //找和该用户匹配的openid的订单
        }:{
          _openid:res.result.openid,   //找和该用户匹配的openid的订单
          'userorder.state':index
        }).get({
          success: res=> {
            // console.log(res)
            //待使用临时数组
            const tmepUseds = []
            //待评价临时数组
            const tmepComments = []
            for(let i = 0;i<res.data.length;i++){
              const date = new Date(res.data[i].userorder.time)  //获取订单下单时间
              const Year = date.getFullYear()   //获取年份
              const month = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1) 
              const day = date.getDate()<10?'0'+date.getDate():date.getDate()
              res.data[i].userorder.buytime = month +'月'+day+'日'   //赋值购买时间格式
              res.data[i].userorder.expiretime = Year+'-'+month+'-'+day  //赋值过期时间格式
            }
            this.setData({
              order:res.data,
              useds:tmepUseds,
              comments:tmepComments,
              orderbol:false
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 1)
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      show:wx.getStorageSync('userInfo')!=""?true:false
    })
    if(this.data.show){
      wx.showLoading({
        title: '加载中',
      })
      this.getOrder(this.data.index)
    }else{
      this.setData({
        order:[],
        orderbol:true
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