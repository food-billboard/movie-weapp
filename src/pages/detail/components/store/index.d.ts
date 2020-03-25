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
  getStore: (movie: any, user: any) => any
  sendStore: (user: any, movie: any) => any
  movie: string
  // id: string
  getUserInfo: () => any
}

export interface IState {
  store: boolean
}