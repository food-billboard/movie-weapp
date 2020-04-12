import { Item } from 'taro-ui/@types/timeline'
import { ICommonFormProps, ICommonFormState } from '~utils'
/*
 * 额外内容的显示组件
 * props: {
 *  title: 标题
 *  style: 样式
 *  item: 显示内容列表
 *  defaultItemStyle: 默认样式
 * }
 * 
 * state: {
 *  item: 显示内容列表
 *  error: 控制错误
 *  disabled: 控制禁止
 *  status: 最近操作类型
 *  statusData: 最近操作内容信息
 * }
 * 
 * defaultItemStyle: {
 *  icon: 图标样式
 *  color: 颜色样式
 * }
 * 
 * status: 操作类型
 *  
 * statusData: {
 *  value: 操作值,
 *  index: 操作索引
 * }
 */

interface IDefaultItemStyle {
  icon: string
  color: string
}

interface IOperate<T> {
  add: T
  cancel: T
}

export const operateType: IOperate<TStatus> = {
  add: 'add',
  cancel: 'cancel'
}

export type TStatus = 'add' | 'cancel'

export interface IStatusData {
  value: Item
  index: number
}

export interface IProps extends ICommonFormProps {
  title: string | false
  value?: Array<Item>
  initialValue?:  Array<Item>
  defaultItemStyle?: IDefaultItemStyle | false
  handleError: (status) => any
}

export interface IState extends ICommonFormState {
  value: Array<Item>
  disabled: boolean
  status: Array<TStatus>
  statusData: Array<IStatusData>
}