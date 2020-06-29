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

interface ICommentUsers {
  _id: string
  avatar: string | null
}

interface IList {
  comment_users: Array<ICommentUsers>
  content: {
    text?: string
    image?: Array<string>
    video?: Array<string>
  }
  createdAt: number | string
  updatedAt: number | string
  total_like: number
  like: boolean
  user_info: {
    avatar: string | null
    username: string
    _id: string
  },
  _id: string
}

export interface IProps {
  list: IList
  extra?: boolean
  renderExtra?: any
  like: (id: string, like: boolean) => any
  comment: (isUserCall: boolean, user: string, commentId: string) => any
  getUserInfo: () => any
}

export interface IState {
  list: IList
  activeVideo: string | null
  videoShow: boolean
  activeVideoPoster: string | null
}