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
    show:null   //登录状态
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
  orderDetails:function(e){
    const state = e.currentTarget.dataset.order.userorder.state  //当前点击的订单状态
    // console.log(e.currentTarget.dataset.order.userorder.state)
    const order= JSON.stringify(e.currentTarget.dataset.order);
    if(state == '待使用'){
      wx.navigateTo({
        url: '/pages/orderdetails/orderdetails?order='+order
      })
    }else if(state == '待评价'){
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      show:wx.getStorageSync('userInfo')!=""?true:false
    })
    if(this.data.show){
      wx.cloud.callFunction({
        name: 'getOpenid',
        success: res=>{
          // console.log(res.result.openid)
          db.collection('order').where({
            _openid:res.result.openid   //找和该用户匹配的openid的订单
          }).get({
            success: res=> {
              // console.log(res.data)
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
                //把各个状态的订单分开
                if(res.data[i].userorder.state == '待使用'){
                  tmepUseds.push(res.data[i])
                }else if(res.data[i].userorder.state == '待评价'){
                  tmepComments.push(res.data[i])
                }
              }
              this.setData({
                order:res.data,
                useds:tmepUseds,
                comments:tmepComments,
                orderbol:false
              })
            }
          })
        }
      })
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