import Taro from '@tarojs/taro'
const TOKEN = 'TOKEN'

export const getToken = (returnHeaders: boolean=false) => {
  const { token } = Taro.getStorageSync(TOKEN) || {}
  if(!token) return false
  if(!returnHeaders) return token
  return {
    Authorization: `Basic ${token}`
  }
}

export const setToken = (token: string) => {
  Taro.setStorageSync(TOKEN, { token })
}

export const clearToken = () => Taro.setStorageSync(TOKEN, {})

export const createUserAuth = ({ mobile, password }) => {
  return {
    Authorization: `Basic ${btoa(encodeURI(`${mobile}:${password}`))}`
  }
}