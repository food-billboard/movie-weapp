/**
 * 用户界面头部组件
 * props: {
 *  list: 用户信息
 * }
 * 
 * list: {
 *  username: 用户名
 *  image: 头像
 *  hot: 人气
 * }
 */

interface List {
  username: string, 
  avatar: string, 
  hot: number
  fans: number
  attentions: number
}

export interface IProps {
  list: List
}