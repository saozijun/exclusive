// pages/orderdetails/orderdetails.js
const db = wx.cloud.database()
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: null,
    date2: null,
    show2: false,
    show: false,
    number: '',
    active: 0,
    list: [],
    start: null,
    end: null,
  },
  onClose2(event) {
    const {
      position,
      instance
    } = event.detail;
    const {
      id
    } = event.currentTarget;
    const that = this
    console.log('event', event)
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          instance.close();
          db.collection('ymList').doc(id).remove({
            success(res) {
              wx.showToast({
                title: '删除成功',
                duration: 500
              })
              setTimeout(() => {
                that.getList()
              }, 1)
            }
          })
        });
        break;
    }
  },
  onChange(event) {
    this.setData({
      active: event.detail.index
    });
  },
  onDisplay() {
    this.setData({
      show: true
    });
  },
  onDisplay2() {
    this.setData({
      show2: true
    });
  },
  onClose() {
    this.setData({
      show: false,
      show2: false
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      start: event.detail.getTime(),
      date: this.formatDate(event.detail),
    });
  },
  onConfirm2(event) {
    this.setData({
      show2: false,
      end: event.detail.getTime(),
      date2: this.formatDate(event.detail),
    });
  },
  getDaysBetween(dateString1, dateString2) {
    let endTime = new Date(dateString1) / 1000 - parseInt(dateString2 / 1000);
    return Math.abs(endTime / 60 / 60 / 24);
  },
  addym() {
    const {start,end,list,date,date2} = this.data
    wx.showLoading({
      title: '记录中',
    })
    if (!start) {
      wx.showToast({
        title: `请选择姨妈来的日期`,
        icon: 'none',
        duration: 2000
      })
      return
    }
    db.collection('ymtemp').where({all:null}).remove() //删除记录
    if (start && end) {
      // console.log(this.getDaysBetween(list[list.length-1].list.end,start))
      // return
      db.collection('ymList').add({
        data: {
          createTime: db.serverDate(), //添加该字段
          list: {
            start,
            end,
            startdate:date,
            enddate:date2,
            number:list.length>0?Math.floor(this.getDaysBetween(list[0].list.end,start)):0,
          }
        },
        success: res => {
          wx.hideLoading()
          this.setData({
            start: null,
            end: null,
            date: null,
            date2: null,
          })
          this.getList(true)
        }
      })
    } else {
      db.collection('ymtemp').add({
        data: {
          list: {
            start,
            date: Date.now()
          }
        },
        success: res => {
          wx.showToast({
            title: '记录成功',
            duration: 2000
          })
          wx.hideLoading()
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  getTemp() {
    const that = this
    db.collection('ymtemp').get({
      success: res => {
        console.log('res----', res)
        if (res.data.length > 0) {
          that.setData({
            start: res.data[0].list.start,
            date: this.formatDate(res.data[0].list.start)
          })
        }
      }
    })
  },
  getList(show=false) {
    wx.showLoading({
      title: '加载中',
    })
    db.collection('ymList').orderBy('createTime','desc').get({
      success: res => {
        console.log('res----', res)
        res.data.map(item=>{
          item.day = (item.list.enddate.split('-')[2]-item.list.startdate.split('-')[2])+1
        })
        this.setData({
          list: res.data
        })
        if(show){
          wx.showToast({
            title: '记录成功',
            duration: 2000
          })
        }
        wx.hideLoading()
      }
    })
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
    this.getTemp()
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