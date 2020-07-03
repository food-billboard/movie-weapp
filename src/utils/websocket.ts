import Taro from '@tarojs/taro'
const SOCKET = Symbol('socket')
let isOpen = false

// export const createSocket = (setData) => {
//   if(isOpen) return
//   const socket = Taro.connectSocket({
//     url: 'ws://localhost:8080',
//     header:{
//       'content-type': 'application/json'
//     },
//     success: (res) => {
//       isOpen = true
//     }
//   }).then(res => {

//     //监听socket开启
//     res.onOpen(() => {
//       res.send({data: 'success'})
//     })

//     //监听socket获取数据
//     res.onMessage((msg) => {
//       const data = JSON.parse(msg.data)
//       setData(data)
//       res.close({})
//     })

//     //监听socket错误
//     res.onError(() => {
//       Taro.showToast({title: '当前可能因为网络因素无法接收到新消息', icon: 'none'})
//       isOpen = false
//       res.close({})
//     })

//     //监听socket关闭
//     res.onClose((e) => {
//       Taro.showToast({title: '当前已经关闭新消息的接收', icon: 'none'})
//     })
//   })
// }

// import IO from 'socket.io-client'

// //向localstorage中查找token
// const Socket = IO('http://localhost:3001')

// Socket
// //token添加
// .use((socket, next) => {
//   next()
// })
// .on('delete', socket => {

// })
// .on('get', socket => {

// })
// .on('put', socket => {

// })
// .on('post', socket => {

// })
// .on('message', socket => {

// })
// .on('join', socket => {

// })
// .on('leave', socket => {

// })
// .on('disconnecting', socket => {

// })
// .on('remove_room', socket => {

// })
// .on('quit_room', socket => {
  
// })

  // //删除消息
  // .on("delete", deleteMessage(socket))
  // //获取消息列表
  // .on("get", getMessage(socket))
  // //阅读消息
  // .on("put", readMessage(socket))
  // //发送消息
  // .on("post", sendMessage(socket))
  // //用于获取信息详情
  // .on("message", getDetail(socket))
  // //加入聊天室
  // .on("join", joinRoom(socket))
  // //离开聊天室
  // .on('leave', leaveRoom(socket))
  // //断开连接
  // .on("disconnecting", disconnection(socket))
  // //删除当前聊天室
  // .on('remove_room', removeRoom(socket))
  // //退出聊天室
  // .on('quit_room', quitRoom(socket))