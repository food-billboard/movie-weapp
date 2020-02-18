/**
 * 输入框表单
 * props: {
 *  value: 输入框内容
 *  placeholder: 输入框占位内容
 *  type: 输入框类型
 *  inputType: 输入框内容类型
 *  disabled: 控制输入框禁止状态
 *  style: 样式
 *  handleChange: 自定义处理输入改变
 * }
 * 
 * state: {
 *  value: 输入框内容
 *  error: 表单错误样式控制
 *  disabled: 控制输入框禁止状态
 * }
 */

export interface IProps {
  value?: string | false
  style: any
  type?: 'input' | 'textarea'
  handleChange?: (() => any) | false
  placeholder?: string | false
  inputType?:string
  disabled?: boolean
}

export interface IState {
  value: string
  error: boolean
  disabled: boolean
}