const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud1-9gor3jg0a7f2b30a'
})

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log('event.id---',event.id)
  try {
    return await db.collection('order').doc(event.id).remove()
  } catch (e) {
    console.error(e)
  }
}