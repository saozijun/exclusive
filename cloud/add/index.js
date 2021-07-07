const cloud = require('wx-server-sdk')
cloud.init({
  env:'cloud1-3gwhrat056f4c3bf'
})

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    return await db.collection('users').add({
      data:[
        {
          username:'张金大郎',
          userphone:'17555441',
          _openid: wxContext.OPENID
        },
        {
          username:'张金大郎2号',
          userphone:'17441',
          _openid: wxContext.OPENID
        },
        {
          username:'张金大郎3号',
          userphone:'1744122',
          _openid: wxContext.OPENID
        }
      ]
    })
  } catch(e) {
    console.error(e)
  }
}
