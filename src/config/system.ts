import Taro from '@tarojs/taro'
import debounce from 'lodash/debounce'

const SYSTEM_INFO = 'System_info'

const colorStyle = 'colorStyle'
const screenInfo = 'screenInfo'
const emojiInfo = 'emojiInfo'

interface IColorStyle {
  color: string
  style: boolean
}

interface ISystemInfo {
  colorStyle: IColorStyle
  screenInfo?: {
    widowWidth: number
    widowHeight: number
    screenWidth: number
    screenHeight: number
  }
  emojiInfo?: Array<string>
}

const DEFAULT_COLOR = '#f5222d'

class SystemInfo {

  public instance

  readonly NEARLY_EMOJI_MAX_LENGTH: number = 12

  readonly defaultColor: string = DEFAULT_COLOR

  constructor(color: string) {
    if(this.instance) return this.instance
    this.instance = this
    this.defaultColor = color
  }

  //设置系统信息
  private _setSystemInfo = (key: keyof ISystemInfo, value: any) => {
    const data: ISystemInfo = this.getSystemInfo()
    const newData = { [key]: value }
    Taro.setStorageSync(SYSTEM_INFO, { ...data, ...newData })
  }

  //获取系统信息
  private _getSystemInfo = (key?: string | Array<string>) => {
    const data: ISystemInfo = Taro.getStorageSync(SYSTEM_INFO) || {}
    if(!key) return data
    if(!Array.isArray(key)) return data[key] 
    return key.map((val: string) => {
      return data[val]
    })
  }

  //屏幕尺寸信息缓存
  public getScreenInfo = (key?) => {
    const _screenInfo = this.getSystemInfo(screenInfo)
    if(_screenInfo) return _screenInfo
    const {
      screenWidth,
      screenHeight,
      windowWidth,
      windowHeight
    } = Taro.getSystemInfoSync()
    let info = {
      screenWidth,
      screenHeight,
      windowWidth,
      windowHeight,
    }
    this.setSystemInfo(screenInfo, { ...info })
    if(!key) return info
    return info[key]
  }

  //app色调信息
  public getColorStyle = () => {
    const _colorStyle = this.getSystemInfo(colorStyle)
    if(_colorStyle) return _colorStyle
    this.setSystemInfo(colorStyle, {
      color: this.defaultColor,
      style: true
    })
    return {
      color: this.defaultColor,
      style: true
    }
  }

  //设置色调信息
  public setColorStyle = (value:IColorStyle) => {
    this.setSystemInfo(colorStyle, value)
  }

  //app的emoji信息
  public getEmojiInfo = () => {
    const _emojiInfo = this.getSystemInfo(emojiInfo)
    if(_emojiInfo) return _emojiInfo
    return []
  }

  //设置emoji
  public setEmojiInfo = (value: string) => {
    const prevData = this.getEmojiInfo()
    const prevLen = prevData.length
    const newLen = 1
    const sum = prevLen + newLen
    if(sum > this.NEARLY_EMOJI_MAX_LENGTH) {
      const removeLen = sum - this.NEARLY_EMOJI_MAX_LENGTH
      const rest = [ ...prevData.slice(removeLen), value ]
      this.setSystemInfo(emojiInfo, rest)
    }else {
      this.setSystemInfo(emojiInfo, [ ...prevData, value ])
    }
  }

  private setSystemInfo = debounce(this._setSystemInfo, 1000)

  private getSystemInfo = debounce(this._getSystemInfo, 1000)

}

export function createSystemInfo(color=DEFAULT_COLOR) {
  return new SystemInfo(color)
}