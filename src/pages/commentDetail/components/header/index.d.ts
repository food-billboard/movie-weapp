/**
 * 评论详情头部
 * props: {
 *  content: 评论内容
 *  like: 点赞方法
 *  id: 评论id
 *  total: 评论总数
 *  getUserInfo: 获取用户信息
 * }
 * 
 * state: {
 *  content: 评论内容
 * }
 * 
 * content: {
 *  id: 用户id
 *  user: 用户名
 *  useId: 用户id
 *  content: 评论内容
 *  icon: 头像
 *  hot: 人气
 *  time: 发布时间
 *  islike: 点赞状态
 * }
 */
interface IContent {
  id: string
  user: string
  userId: string
  content: string
  icon: string
  hot: number
  time: string
  isLike: boolean
}

export interface IProps {
  content: IContent
  like: (commentId: string, user: string, mine: string) => any
  // id: string
  total: number
  getUserInfo: () => any
}

export interface IState {
  content: IContent
}