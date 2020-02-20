import Taro from '@tarojs/taro'

const STYLE = 'style'

export const setStyle = (value: string | false) => {
  Taro.setStorageSync(STYLE, value)
}

export const getStyle = () => {
  const value = Taro.getStorageSync(STYLE)
  if(value.length) {
    return value
  }
  setStyle(false)
  return false
}