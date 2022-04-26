// pages/personal/personal.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    cloudPath:'',
    type:false,
    name:'',
    number:'',
    id:null,
  },
  afterRead(event) {
    const { file } = event.detail;
    console.log(file)
    this.setData({ fileList:[{url:file.url}] });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const item = options.item?JSON.parse(options.item):false
    console.log('item',item)
    if(item){
      this.setData({
        name:item.userorder.name,
        number:item.userorder.number,
        id:item._id,
      })
      if(item.userorder.url!=""){
        this.setData({fileList:[{url:item.userorder.url}]})
      }
    }
    this.setData({type:item?true:false})
  },
  getuser: function (e) {
    const value = e.currentTarget.dataset.value
    // console.log(e.detail)
    this.setData({
      [value]: e.detail
    })
  },
  delImg(){
    this.setData({fileList:[]})
  },
  addDiray(){
    if(this.data.name == ''){
      wx.showToast({
        title: '请输入任务内容',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(this.data.number == ''){
      wx.showToast({
        title: '请输入任务鸡分',
        icon: 'none',
        duration: 2000
      })
      return
    }
    const {fileList,name,number} = this.data
    if(fileList.length>0){
      wx.cloud.uploadFile({
        cloudPath: `my-photo${Date.now()}.png`,
        filePath: fileList[0].url
      }).then(data => {
        console.log('data-----',data)
        this.addcl({
          name:name,
          number:number,
          status:false,
          url:data.fileID
        })
      })
      .catch(e => {
        wx.showToast({ title: '上传失败', icon: 'none' });
        console.log(e);
      });
    }else{
      this.addcl({
        name:name,
        number:number,
        status:false,
        url:""
      })
    }
  },
  delDiray(e){
    const {id} = this.data
    console.log('id---',id)
    db.collection('order').doc(id).remove({
      success(res){
        console.log("数据删除成功",res)
        wx.showToast({
          title: '删除成功',
          duration: 500
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1000)
      },
      fail(res){
        console.log("数据删除失败",res)
      }
    })
  },
  addcl(userorder){
    const {id} = this.data
    console.log('userorder',userorder)
    if(id){
      db.collection('order').doc(id).update({
        data:{userorder},
        success(res){
          console.log("数据修改成功",res)
          wx.showToast({
            title: '保存成功',
            duration: 500
          })
          setTimeout(()=>{
            wx.navigateBack()
          },1000)
        },
        fail(res){
          console.log("数据修改失败")
        }
      })
    }else{
      wx.cloud.callFunction({
        name: 'addorder',
        data: {
          userorder: userorder
        },
        success: res => {
          console.log('resss',res)
          wx.showToast({
            title: '添加成功',
            duration: 500
          })
          setTimeout(()=>{
            wx.navigateBack()
          },1000)
        }
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