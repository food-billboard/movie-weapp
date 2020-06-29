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
  info: Info
  rate: (value: number) => any
  store: (store: boolean) => any
}

interface Info {
  name: string
  district: Array<ItypeList>
  glance: number
  director: Array<ItypeList>
  actor: Array<ItypeList>
  classify: Array<ItypeList>
  screen_time: string
  createdAt: string
  language: string
  description: string
  hot: number
  rate:number
  author_rate: number
  store: boolean
  author_description: string
  author: string
}

export interface IState {
  
}