const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud1-9gor3jg0a7f2b30a'
})

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let bol = true
  for (let i = 0; i < event.info.res.length; i++) {
    if (event.info.res[i]._openid == wxContext.OPENID) {
      bol = false
    }
  }
  if (bol) {
    try {
      return await db.collection('userInfos').add({
        data: {
          userInfo: event.info.userInfo,
          integral:0,
          _openid: wxContext.OPENID,
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
}