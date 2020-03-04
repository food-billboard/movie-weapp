import Taro from '@tarojs/taro'
import { defaultColor } from '~theme/color'

const STYLE = 'style'

interface IValue {
  style: boolean
  color: string
}

const DEFAULT_STYLE = {
  style: true,
  color: defaultColor
}

export const setStyle = (value: IValue) => {
  Taro.setStorageSync(STYLE, value)
}

export const getStyle = () => {
  const value = Taro.getStorageSync(STYLE)
  if(!value.color) {
    setStyle(DEFAULT_STYLE)
    return DEFAULT_STYLE
  }
  return value
}