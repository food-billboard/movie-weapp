import Taro from '@tarojs/taro'
const TOKEN = 'TOKEN'
export const getToken = (returnHeaders: boolean=false) => {
  const token = Taro.getStorageSync(TOKEN) || {}
  if(!returnHeaders) return token
  return {
    Authorization: `Basic ${token}`
  }
}

export const setToken = (token: string) => {
  Taro.setStorageSync(TOKEN, { token })
}