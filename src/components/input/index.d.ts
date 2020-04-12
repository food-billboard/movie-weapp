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
 *  height: 文本域的高度
 *  textareaFixed: 控制文本域禁止滑动
 *  handleLineChange: 处理行数变化
 * }
 * 
 * state: {
 *  value: 输入框内容
 *  error: 表单错误样式控制
 *  disabled: 控制输入框禁止状态
 * }
 */

 import { ICommonFormState, ICommonFormProps } from '~utils'

export interface IProps extends ICommonFormProps {
  value?: string
  initialValue?: string
  type?: 'input' | 'textarea'
  placeholder?: string | false
  inputType?:string
  disabled?: boolean
  height?: number
  count?: boolean
  textareaFixed?: boolean
  handleLineChange?: (e: any) => any
}

export interface IState extends ICommonFormState {
  value: string
  disabled: boolean
}