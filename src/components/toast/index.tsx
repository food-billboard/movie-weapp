import Taro from '@tarojs/taro'
import success from '../../assets/success.png'
import error from '../../assets/error.png'
import ask from '../../assets/ask.png'
import important from '../../assets/important.png'

interface IQuery {
  title: string
  icon?: 'success' | 'fail' | 'none' | 'important' | 'ask'
  duration?: number
  mask?: boolean
}

const IMAGE = {
  success,
  fail: error,
  ask,
  important
}

export const Toast = (query: IQuery) => {
  const { icon='success', ...other } = query
  Taro.showToast({
    mask: true,
    duration: 3000,
    title: '成功',
    image: IMAGE[icon],
    ...other
  })
}