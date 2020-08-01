import { FormData } from '../../interface'
/**
 * 筛选表单
 * props: {
 *  screen: 筛选方法
 *  getLanguageList: 获取语言列表
 * }
 * 
 * state: {
 *  lang: 语言列表
 *  open: 控制表单的显示隐藏
 * }
 * 
 * lang: {
 *  id: 语言id
 *  value: 语言名称
 *  image: 图片
 * }
 * 
 * feeOption: {
 *  value: id
 *  label: 名称
 *  disabled: 控制禁止
 * }
 * 
 * FormDefault: {
 *  feeOption: 价格配置
 * }
 */

export interface IProps {
  screen: (formData: FormData) => void
  indexesShow: (...args: Array<any>) => any
}

interface FeeOption {
  value: string,
  label: string,
  disabled: boolean
}

export interface FormDefault {
  feeOptions: Array<FeeOption>
}

export interface IState {
  open: boolean
}