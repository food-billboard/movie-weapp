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
  _id: string
  user_info: {
    avatar: string | null
    username: string
    _id: string
  }
  content: {
    image?: Array<string>
    text?: string
    video?: Array<string>
  }
  comment_users: number
  createdAt: string | number
  like: boolean
  total_like: number
}

export interface IProps {
  content: IContent
  like: (id: string, like: boolean) => any
}

export interface IState {

}