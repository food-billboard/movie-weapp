/**
 * 多选表单
 * props: {
 *  checkboxOption: 多选表单的可选项
 *  checkedList: 当前选中的项
 *  style: 样式
 *  type: 表单内容类型
 *  needHiddenList: 是否可控的表单隐藏显示
 *  extraFactor: 是否需要额外的内容添加
 *  getSwitch: 获取电影类型
 *  getAreaList: 获取电影地区
 *  getLanguageList: 获取电影语言
 *  getActorList: 获取电影演员
 *  getDirectorList: 获取电影导演
 *  getCountryList: 获取国家
 *  handleChange: 自定义的表单内容改变
 * }
 * 
 * state: {
 *  checkedList: 当前选中的表单列表
 *  show: 控制打开收起按钮的显示
 *  checkOption: 多选表单的可选项
 *  error: 控制表单的错误样式
 * }
 * 
 * option: {
 *  value: 项目的唯一id
 *  label: 项目显示的内容
 *  desc: 描述
 *  disabled: 控制禁止
 * }
 */

export interface IOption {
  value: string
  label: string
  desc?: string
  disabled?: boolean
}

export interface IProps {
  checkboxOption?: Array<IOption>
  checkedList?: Array<string> | false
  style?: any
  type: 'area' | 'actor' | 'director' | 'type' | 'country'
  needHiddenList?: boolean
  extraFactor?: boolean
  getSwitch: (count?:number) => any
  getAreaList: (count?:number) => any
  getLanguageList: (count?:number) => any
  getActorList: (count?:number) => any
  getDirectorList: (count?:number) => any
  getCountryList: (count?:number) => any
  handleChange?: (e: any) => any
}

export interface IState {
  checkedList: Array<string>
  show: boolean
  checkOption: Array<IOption>
  error: boolean
}