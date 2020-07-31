import IO from 'socket.io-client'   
import Taro from '@tarojs/taro'
import dva from './dva'         
import { ERoomType, EMediaType, getToken } from '~utils'
import router from './router'
import { routeAlias } from './globalType'

const dispatch = dva.getDispatch()
const socket = IO('http://localhost:3001')
socket
//连接
.on('connect', () => {
    Taro.showToast({ mask: false, title: '当前自动接收新消息', duration: 300 })
})
//连接错误
.on('connect_error', () => {
    Taro.showModal({
        title: '错误',
        content: '消息获取失败，是否重试'
    })
    .then(res => {
        const { confirm } = res
        if(confirm) {
            socket.connect()
        }
    })
})
//消息详情
.on('message', async (data) => {
    await dispatch({ type: 'chat/getMessageDetail', data })
})
//消息列表
.on('get', async(data) => {
  await dispatch({ type: 'chat/getMessageList', data })
})
//加入 | 创建房间
.on('join', () => {})
//删除消息
.on('delete', () => {})
//发送消息
.on('post', () => {})
//阅读消息
.on('read', () => {})
//离开房间
.on('leave', () => {})
// //删除聊天室
// .on('remove_room', () => {})
// //退出聊天室
// .on('quit_room', () => {})

enum TMessageType{
  CHAT = 'CHAT',
  GROUP_CHAT = 'GROUP_CHAT',
  SYSTEM = 'SYSTEM'
}

export interface IGetMessageDetail {
  _id: string
  currPage?: number
  pageSize?:number
  messageId?: string
}

export interface IGetMessageDetailResponse {
  type: EMediaType
  content: string
  createdAt: string | number
  _id: string
  origin: {
    _id: string
    avatar: string
    username: string
    isMime: boolean
  }
}

export interface IGetMessageListResponse {
  _id: string
  type: TMessageType
  info: {
    avatar: string
    name: string
    description: string
  }
  message: {
    count: number
    lastData: string
    time: string | number
  }
}

export interface IJoinRoom {
  type?: TMessageType
  _id?: string
  members?: Array<string>
}

export interface IDeleteMessage {
  _id: string
}

export interface IPostMessage {
  _id: string
  content: string
  type: EMediaType
  point_to?: string
}

export interface IReadMessage {
  _id: string
}

export interface ILeaveRoom {
  _id: string
}

//获取消息详情
export const getMessageDetail = (data:IGetMessageDetail) => {
  socket.emit('message', { ...data, token: getToken() })
}

//获取消息列表
export const getMessageList = (_) => {
  socket.emit('get', { token: getToken })
}

//加入房间
export const joinRoom = (data: IJoinRoom) => {
  socket.emit('join', { ...data, token: getToken() })
}

//创建房间
export const createRoom = (data: IJoinRoom) => {
  socket.emit('join', { ...data, token: getToken() })
}

//删除消息
export const deleteMessage = (data: IDeleteMessage) => {
  socket.emit('delete', { ...data, token: getToken() })
}

//发送消息
export const postMessage = (data: IPostMessage) => {
  const token = getToken()
  if(!token) {
    Taro.showModal({
      title: '提示',
      content: '您还未登录，是否去登录?',
    })
    .then(res => {
      const { confirm } = res
      if(confirm) {
        router.push(routeAlias.login)
      }else {
        Taro.switchTab({ url: '../main/index' })
      }
    })
    return
  }
  socket.emit('post', { ...data, token })
}

//阅读消息
export const readMessage = (data: IReadMessage) => {
  const token = getToken()
  if(!token) {
    Taro.showModal({
      title: '提示',
      content: '您还未登录，是否去登录?',
    })
    .then(res => {
      const { confirm } = res
      if(confirm) {
        router.push(routeAlias.login)
      }else {
        Taro.switchTab({ url: '../main/index' })
      }
    })
    return
  }
  socket.emit('read', { ...data, token })
}

//离开房间
export const leaveRoom = (data: ILeaveRoom) => {
  socket.emit('leave', { ...data, token: getToken() })
}