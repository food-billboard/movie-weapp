import Taro from '@tarojs/taro'

export const isAlipay = process.env.TARO_ENV === 'alipay'

export const system = Taro.getSystemInfoSync() || {}