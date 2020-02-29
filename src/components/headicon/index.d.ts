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
  image: string, 
  hot: number
}

export interface IProps {
  list: List
}