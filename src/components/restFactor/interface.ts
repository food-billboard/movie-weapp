import { Item } from 'taro-ui/@types/timeline'
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
 * }
 * 
 * defaultItemStyle: {
 *  icon: 图标样式
 *  color: 颜色样式
 * }
 */

interface IDefaultItemStyle {
  icon: string
  color: string
}

export interface IProps {
  title: string | false
  style?: any
  item?: Array<Item> | false
  defaultItemStyle?: IDefaultItemStyle | false
}

export interface IState {
  item: Array<Item>
  error: boolean
  disabled: boolean
}