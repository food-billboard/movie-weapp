/**
 * 评分组件
 * props: {
 *  getUserInfo: 获取用户信息
 *  sendRate: 评分
 *  getRate: 获取评分
 *  movie: 电影id
 *  id: 用户id
 * }
 * 
 * state: {
 *  value: 评分内容
 * }
 */
export interface IProps {
  getUserInfo: () => any
  sendRate: (rate: any, user: string, movie: string) => any
  getRate: (movie: string) => any
  movie: string
  id: string
}

export interface IState {
  value: number
}