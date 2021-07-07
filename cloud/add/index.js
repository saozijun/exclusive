const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud1-3gwhrat056f4c3bf'
})

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection('userInfos').add({
      data: {
        userInfo: event.userInfo,
        _openid: wxContext.OPENID,
        expiration:event.expiration
      }
    })
  } catch (e) {
    console.error(e)
  }
}