/**
 * 图标列表组件
 * props: {
 *  list: 列表内容
 *  handleClick: 自定义点击方法
 * }
 * 
 * list: {
 *  id: 电影id
 *  name: 电影名称
 *  image: 电影图片
 *  hot: 人气
 * }
 */

export interface IList {
  id: string, 
  name: string, 
  image: string, 
  hot: number
}

export interface IProps {
  list: Array<IList>
  handleClick: (...args: any) => any
}