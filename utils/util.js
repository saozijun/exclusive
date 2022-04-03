const db = wx.cloud.database()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')}`
}
const formatTime2 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day,hour, minute, second].map(formatNumber).join('')}`
}
const formatTime3 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return ((month<10?'0'+month:month)+'月'+(day<10?'0'+day:day)+'日')
}
const getInfo = () => {
  const openId = wx.getStorageSync('openId')
  db.collection('userInfos').get({
    success: res2 => {
      const info =  res2.data.filter(item=>item._openid==openId)
      wx.setStorageSync('info', info[0])
      return info[0]
    }
  })
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime,
  formatTime2,
  formatTime3,
  getInfo
}
