import { ItypeList } from '~utils'
/**
 * 内容列表形式组件
 * props: {
 *  list: 内容列表
 * }
 * 
 * list: {
 *  image: 图片
 *  name: 电影名称
 *  type: 电影类型
 *  time: 发布时间
 *  hot: 人气
 *  id: 电影id
 * }
 * 
 * itemProps: {
 *  type: 类型
 *  value: 内容
 * }
 */

interface IList {
  image: string, 
  name: string, 
  type: Array<ItypeList>, 
  time: string | number, 
  hot: number, 
  id: string
}

export interface IProps {
  list: Array<IList>
  style?: any
}

export interface IItemProps {
  type: string,
  value: string | number | Array<ItypeList>
}