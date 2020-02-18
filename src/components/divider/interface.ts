/**
 * 分割线
 * props: {
 *  content: 文字内容
 *  fontSize: 文字大小
 *  chidlNode: 额外文字内容
 *  other: 额外样式
 * }
 */

export interface IProps {
  content?: string
  // fontColor?: string
  fontSize?: number
  // lineColor?: string
  childNode?: any
  other?: any
}