import { mediaType } from '~utils'
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
 *  activeVideo: 当前显示的视频
 *  videoShow: 控制视频的显示隐藏
 *  activeVideoPoster: 当前显示视频的海报
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
 * mediaList: {
 *  image: 评论图片
 *  id: 图片id
 *  src: '媒体地址'
 *  type: '媒体类型'
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

export interface IMediaList {
  image: string
  id: string
  type: keyof typeof mediaType
  src: string
}

export interface IInfo {
  origin: boolean
  image: string | null
  id: string
  content: string
  hasImage: boolean
  hasVideo: boolean
}

interface IList {
  id: string
  user: IUser
  commentUsers: Array<CommentUsers>
  media: Array<IMediaList>
  info: IInfo
}

export interface IProps {
  list: IList
  id: string
  commentId: string
  extra?: boolean
  renderExtra?: any
  like: (...args: any) => any
  comment: (isUserCall: boolean, user: string, commentId: string) => any
  getUserInfo: () => any
}

export interface IState {
  list: IList
  activeVideo: string
  videoShow: boolean
  activeVideoPoster: string
}