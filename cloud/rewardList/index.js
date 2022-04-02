const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud1-9gor3jg0a7f2b30a'
})

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection('reward').add({
      data: {
        rewardList: event.rewardList,
        _openid: wxContext.OPENID,
      }
    })
  } catch (e) {
    console.error(e)
  }
}