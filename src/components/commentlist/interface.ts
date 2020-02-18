/**
 * 评论列表
 * props: {
 *  list: 评论内容列表
 *  like: 点赞方法
 *  comment: 评论方法
 *  id: 我的id
 *  getUserInfo: 获取用户信息
 *  commentId: 评论id
 * }
 * 
 * state: {
 *  list: 评论列表
 * }
 * 
 * user: {
 *  name: 用户名称
 *  time: 发布时间
 *  image: 用户头像
 *  id: 用户id
 *  content: 评论内容
 *  hot: 人气
 *  isHot: 点赞状态
 * }
 * 
 * commentUsers: {
 *  image: 用户头像
 *  id: 用户id
 * }
 * 
 * imageList: {
 *  image: 评论图片
 *  id: 图片id
 * }
 * 
 * list: {
 *  id: 评论id
 *  user: 用户信息
 *  commentUsers: 评论用户信息
 *  images: 评论图片
 * }
 */

interface IUser {
  name: string,
  time: string,
  image: string,
  id: string,
  content: string,
  hot: number,
  isHot: boolean
}

interface CommentUsers {
  image: string,
  id: string
}

export interface IImageList {
  image: string
  id: string
}

interface IList {
  id: string
  user: IUser
  commentUsers: Array<CommentUsers>
  images: Array<IImageList>
}

export interface IProps {
  list: IList
  id: string
  commentId: string
  like: (...args: any) => any
  comment: (isUserCall: boolean, user: string, commentId: string) => any
  getUserInfo: () => any
}

export interface IState {
  list: IList
}