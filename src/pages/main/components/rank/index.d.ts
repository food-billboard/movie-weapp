/**
 * 排行榜组件
 * props: {
 *  count: 排行榜显示数量
 *  type: 排行榜类型
 *  list: 列表内容
 *  id: 排行榜id
 *  style: 样式
 * }
 * 
 * list: {
 *  rank: 排行榜名称
 *  id: 电影id
 *  image: 电影图片
 *  name: 电影名称
 * }
 * 
 * iconProps: {
 *  rank: 排行
 * }
 */

interface List {
  // rank: number,
  _id: string,
  poster: string,
  name: string
}

export interface IProps {
  count: number
  type: string
  list: Array<List>
  id: string
  style?: any
}

export interface IIconProps {
  rank: number
}

export interface IState {
}