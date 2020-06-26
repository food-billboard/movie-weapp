// import {request} from '~utils'

// //删除消息
// export const deleteMessage = (socket, { id: token }: { id: string, token: string }) => {
//   socket.emit('delete', { _id: id, token })
// }

// //断开连接
// export const disconnecting = socket => {
  
// }

// //阅读消息
// export const readNews = (socket, { id, token } : { id: string, token: string }) => {
//   socket.emit('put', { _id: id, token })
// }

// //发送消息
// export const sendNews = (data) => {
//   return request('POST', '/api/user/sendNews', {data})
// }

// //消息列表
// export const getNews = (id) => {
//   return request('GET', '/api/user/record', {query: {id}})
// } 

// //获取通知信息详情
// export const getNewsDetail = (query) => {
//   return request('GET', '/api/user/newsdetail', { query })
// }

// //加入创建房间

// //删除聊天室

// //离开聊天室