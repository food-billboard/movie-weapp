/**
 * 多行文字隐藏组件
 * props: {
 *  text: 文字内容
 * }
 * 
 * state: {
 *  show: 控制全部文字的显示隐藏
 *  maxLen: 最大文字长度
 * }
 */

export interface IProps {
  text: string
}

export interface IState {
  show: boolean
  maxLen: number
}