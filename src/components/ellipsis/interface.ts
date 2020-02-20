/**
 * 多行文字隐藏组件
 * props: {
 *  text: 文字内容
 *  needPoint: 是否需要显示详情功能
 * }
 * 
 * state: {
 *  show: 控制全部文字的显示隐藏
 *  maxLen: 最大文字长度
 * }
 */

export interface IProps {
  text: string
  needPoint?: boolean
  style?: any
}

export interface IState {
  show: boolean
  maxLen: number
}