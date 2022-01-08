import Taro from '@tarojs/taro'
import { merge } from 'lodash'
import { TypeColor } from '~theme/color'

export function supportAndDeal(methodKey: string, ...args: any) {
  try { 
    return Taro[methodKey](...args)
  }catch(err) {}
}

export async function TaroShowModal(options: {
  /** 取消按钮的文字颜色，必须是 16 进制格式的颜色字符串 */
  cancelColor?: string
  /** 取消按钮的文字，最多 4 个字符 */
  cancelText?: string
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  complete?: (res: TaroGeneral.CallbackResult) => void
  /** 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串 */
  confirmColor?: string
  /** 确认按钮的文字，最多 4 个字符 */
  confirmText?: string
  /** 提示的内容 */
  content?: string
  /** 接口调用失败的回调函数 */
  fail?: (res: TaroGeneral.CallbackResult) => void
  /** 是否显示取消按钮 */
  showCancel?: boolean
  /** 接口调用成功的回调函数 */
  success?: (result: any) => void
  /** 提示的标题 */
  title?: string
}) {
  return Taro.showModal(merge({
    confirmColor: TypeColor().primary
  }, options))
  .then(data => {
    const { cancel, confirm, errMsg } = data 
    return {
      cancel,
      confirm: confirm || errMsg === "confirm",
      errMsg
    }
  })
}