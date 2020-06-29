/**
 * 收藏组件
 * props: {
 *  text: 收藏文字
 *  getStore: 获取收藏状态
 *  sendStore: 收藏
 *  movie: 电影id
 *  id: 用户id
 *  getUserInfo: 获取用户信息
 * }
 * 
 * state: {
 *  store: 收藏状态
 * }
 */

export interface IProps {
  text?: string
  movie: string
  store: (store: boolean) => any
  value: boolean
}

export interface IState {
 
}