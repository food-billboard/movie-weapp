import Taro from '@tarojs/taro'
import { debounce } from 'lodash'

const VIDEO_KEY = 'VIDEO_KEY'

export enum EVideoMode {
  contain = 'contain',
  fill = 'fill',
  cover = 'cover'
}

interface IVideoConfig {
  mute?: number
  danmu?: boolean
  mode?: EVideoMode
}

//图片添加配置
export const IMAGE_CONFIG = {
  count: 6,
  sizeType: ['original', 'compressed'],
  sourceType: ['album', 'camera']
}

//表单提示样式
export const FORM_ERROR = {
  border: '2px solid red',
  boxShadow: '0 0 2px red'
}

//设置大小修改图标
export const SYSTEM_PAGE_SIZE = (basicSize: number=14) => {
  const { screenWidth } = Taro.getSystemInfoSync()
  if(screenWidth < 300) {
    return basicSize * 0.7
  }else if(screenWidth >= 300 && screenWidth < 700) {
    return basicSize
  }else if(screenWidth >= 700) {
    return basicSize * 2
  }else {
    return basicSize
  }
}

//视频播放器缓存配置
const _setVideoConfig = (values: IVideoConfig) => {
  const prevData = getVideoConfig()
  try {
    Taro.setStorageSync(VIDEO_KEY, { ...prevData, ...values })
  }catch(error) {
    console.log(error)
  }
}

const DEFAULT_VIDEO_CONFIG = {
  mode: EVideoMode.contain,
  danmu: true,
  //TODO
  //播放器的默认配置，音量则获取系统音量
}

const _getVideoConfig = (key?: string | string[]) => {
  let data
  try {
    data = Taro.getStorageSync(VIDEO_KEY) || DEFAULT_VIDEO_CONFIG
  }catch(error) {
    data = DEFAULT_VIDEO_CONFIG
  }
  if(!key) return data
  if(typeof key === 'string') return { [key]: data[key] }
  return key.reduce((acc, cur) => {
    acc[cur] = data[cur]
    return acc
  }, {})
}

export const setVideoConfig = debounce(_setVideoConfig, 1000)
export const getVideoConfig = debounce(_getVideoConfig, 1000)
