import { ItypeList } from '~utils'
/**
 * 详情主要内容
 * props: {
 *  movie: 电影名称
 *  id: 电影id
 *  info: 电影详细信息
 *  sendRate: 评分
 *  sendStore: 收藏
 *  getUserInfo: 获取用户信息
 * }
 * 
 * info: {
 *  name: 电影名称
 *  area: 地区
 *  people: 查看人数
 *  director: 导演
 *  actor: 演员
 *  type: 类型
 *  time: 上映时间
 *  publishTime: 发布时间
 *  language: 语言
 *  description: 描述
 *  hot: 人气
 *  rate: 评分
 *  rateMine: 个人评分
 *  store: 收藏
 *  mine: 楼主认为的电影描述
 * }
 * 
 * state: {
 *
 * }
 */

export interface IProps {
  movie: string
  id: string
  info: Info
  sendRate: (value: any, user: any, movie: any) => any
  sendStore: (user: any, movie: any) => any
  getUserInfo: () => any
}

interface Info {
  name: string
  area: Array<ItypeList>
  people: number
  director: Array<ItypeList>
  actor: Array<ItypeList>
  type: Array<ItypeList>
  time: string
  publishTime: string
  language: string
  description: string
  hot: number
  rate:number
  rateMine: number
  store: boolean
  mine: string
}

export interface IState {
  
}