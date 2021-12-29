import Taro from '@tarojs/taro'

export const isAlipay = process.env.TARO_ENV === 'alipay'

export const isH5 = process.env.TARO_ENV === "h5"

export const system = Taro.getSystemInfoSync() || {}