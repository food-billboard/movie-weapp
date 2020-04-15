/**
 * 单选表单
 * props: {
 *  style: 样式
 *  selector: 普通单选配置
 *  multi: 多列选择配置
 *  time: 时间选择配置
 *  date: 日期选择配置
 *  value: 选择内容
 *  title: 标题内容
 * }
 * 
 * state: {
 *  value: 选择内容
 *  error: 控制错误样式
 *  disabled: 控制禁止
 * }
 * 
 * selector: {
 *  disabled: 控制禁止
 *  onCancel: 取消触发
 *  range: 选择范围
 *  rangeKey: 当前选择
 * }
 * 
 * modeList: 单选表单选择模式
 * 
 * multi: {
 *  range: 选择范围
 *  rangeKey: 当前选择
 *  vlaue: 选择内容
 *  onColumnChange: 当列选择触发
 *  dsiabled: 控制禁止
 *  onCancel: 取消触发
 * }
 * 
 * time: {
 *  start: 起始时间
 *  end: 结束时间
 *  onCancel: 取消触发
 *  disabled: 控制禁止
 * }
 * 
 * date: {
 *  start: 起始日期
 *  end: 结束日期
 *  fields: 选择范围
 *  disabled: 控制禁止
 *  onCancel: 取消触发
 * }
 * 
 * fieldTypeList: date显示类型
 */

 import { ICommonFormProps, ICommonFormState } from '~utils'

interface ISelector {
  disabled?: boolean
  onCancel?: () => any
  range: Array<any>
  rangeKey?: string
}

export const modeList = {
  selector: Symbol('selector'),
  time: Symbol('time'),
  date: Symbol('date'),
  multiSelector: Symbol('multiSelector')
}

interface IMulti {
  range: Array<string[]> | Array<number[]> | Array<Object[]>
  rangeKey?: string
  value?: number[] | string[] | Object[]
  onColumnChange?: () => any
  disabled?: boolean
  onCancel?: () => any
}

interface ITime {
  start?: string
  end?: string
  onCancel?: () => any
  disabled?: boolean
}

interface IDate {
  start?: string
  end?: string
  fields?: keyof typeof fieldTypeList
  disabled?: boolean
  onCancel?: () => any
}

export interface IProps extends ICommonFormProps {
  selector?: ISelector | false
  multi?: IMulti | false
  time?: ITime | false
  date?: IDate | false
  value?: string | Array<any> | false
  initialValue?: string | Array<any>
  title?: string
  extraFactor?: boolean
}

export interface IState extends ICommonFormState {
  value: string | Array<any>
  disabled: boolean
}

export const fieldTypeList = {
  year: 'YYYY',
  month: 'YYYY-MM',
  day: 'YYYY-MM-DD'
}

export const fieldTypeSymbol = {
  year: Symbol('year'),
  month: Symbol('month'),
  day: Symbol('day')
}