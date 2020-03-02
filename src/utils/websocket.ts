import Taro from '@tarojs/taro'
const SOCKET = Symbol('socket')
let isOpen = false

export const createSocket = (setData) => {
  if(isOpen) return
  const socket = Taro.connectSocket({
    url: 'ws://localhost:8080',
    header:{
      'content-type': 'application/json'
    },
    success: (res) => {
      isOpen = true
    }
  }).then(res => {

    //监听socket开启
    res.onOpen(() => {
      res.send({data: 'success'})
    })

    //监听socket获取数据
    res.onMessage((msg) => {
      const data = JSON.parse(msg.data)
      setData(data)
      res.close({})
    })

    //监听socket错误
    res.onError(() => {
      Taro.showToast({title: '当前可能因为网络因素无法接收到新消息', icon: 'none'})
      isOpen = false
      res.close({})
    })

    //监听socket关闭
    res.onClose((e) => {
      Taro.showToast({title: '当前已经关闭新消息的接收', icon: 'none'})
    })
  })
}