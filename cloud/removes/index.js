
const cloud = require('wx-server-sdk')
cloud.init({
  env:'cloud1-3gwhrat056f4c3bf'
})

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection('users').where({
      _openid:'o7VCs5KATk6rE8CpmYtyFFsUs0E8'
    }).remove()
  } catch(e) {
    console.error(e)
  }
}