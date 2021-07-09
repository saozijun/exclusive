const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud1-3gwhrat056f4c3bf'
})

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let bol = true
  for (let i = 0; i < event.res.length; i++) {
    if (event.res[i]._openid == wxContext.OPENID) {
      bol = false
    }
  }
  if (bol) {
    try {
      return await db.collection('userInfos').add({
        data: {
          userInfo: event.userInfo,
          _openid: wxContext.OPENID,
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
}