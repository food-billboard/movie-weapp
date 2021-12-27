import { IFiles } from '~components/imgPicker'
import { IItem } from '~components/mediaPicker'
import { Item as TagItem } from '~components/tagList'
import { Item } from 'taro-ui/types/timeline'

//权限类型
export enum EAuthType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

//房间类型
export enum ERoomType {
  CHAT = 'CHAT',
  GROUP_CHAT = 'GROUP_CHAT',
  SYSTEM = 'SYSTEM'
}

//媒体类型
export enum EMediaType {
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT'
}

//路由简写
export const routeAlias = {
  main: '/main',
  mine: '/mine',
  comment: '/moviecom',
  news: '/news' ,
  attention: '/attention',
  detail: '/detail',
  mycomment: '/mycom',
  record: '/record',
  search: '/search',
  setting: '/setting',
  type: '/type',
  user: '/user',
  rank: '/rank',
  commentdetail: '/comdetail',
  store: '/store',
  issue: '/issue',
  userissue: '/userissue',
  special: '/special',
  fans: '/fans',
  newsdetail: '/newsdetail',
  login: '/login',
  forget: '/forget',
  register: '/register',
  toComment: '/comment',
  indexes: '/indexes',
  adminSetting: '/adminSetting'
}

//路由配置
export const routeConfig = [
  { path: 'pages/main/index', alias: routeAlias.main },
  { path: 'pages/mine/index', alias: routeAlias.mine },
  { path: 'pages/adminSetting/index', alias: routeAlias.adminSetting },
  { path: 'pages/wrapper-comment/commovie/index', alias: routeAlias.comment },
  { path: 'pages/news/index', alias: routeAlias.news },
  { path: 'pages/wrapper-user/attention/index', alias: routeAlias.attention },
  { path: 'pages/wrapper-data/detail/index', alias: routeAlias.detail },
  { path: 'pages/wrapper-comment/mycom/index', alias: routeAlias.mycomment},
  { path: 'pages/wrapper-data/record/index', alias: routeAlias.record},
  { path: 'pages/wrapper-data/search/index', alias: routeAlias.search},
  { path: 'pages/setting/index', alias: routeAlias.setting},
  { path: 'pages/wrapper-data/type/index', alias: routeAlias.type},
  { path: 'pages/wrapper-user/user/index', alias: routeAlias.user},
  { path: 'pages/wrapper-data/rank/index', alias: routeAlias.rank},
  { path: 'pages/wrapper-comment/comdetail/index', alias: routeAlias.commentdetail },
  { path: 'pages/wrapper-data/store/index', alias: routeAlias.store },
  { path: 'pages/wrapper-data/issue/index', alias: routeAlias.issue },
  { path: 'pages/wrapper-data/userissue/index', alias: routeAlias.userissue },
  { path: 'pages/wrapper-data/special/index', alias: routeAlias.special },
  { path: 'pages/wrapper-user/fans/index', alias: routeAlias.fans },
  { path: 'pages/newsdetail/index', alias: routeAlias.newsdetail },
  { path: 'pages/wrapper-login/login/index', alias: routeAlias.login },
  { path: 'pages/wrapper-login/register/index', alias: routeAlias.register },
  { path: 'pages/wrapper-comment/comment/index', alias: routeAlias.toComment },
  { path: 'pages/wrapper-data/indexes/index', alias: routeAlias.indexes },
  { path: 'pages/wrapper-login/forget/index', alias: routeAlias.forget },
]

//轮播图路由跳转类型"MOVIE", "SPECIAL", "COMMENT"
export enum ESwiperRouteType {
  MOVIE = "MOVIE",
  SPECIAL = "SPECIAL",
  COMMENT = "COMMENT"
}

//数据获取方式
export enum ESourceTypeList {
  Dva = 'Dva',
  Scope = 'Scope'
}

//通知消息类型
export enum infomationType {
  ATTENTION = 'ATTENTION',
  APP = 'APP'
}

//响应类型
export const responseType = {
  success: 'success',
  fail: 'fail'
}

//表单通用state
export interface ICommonFormState {
  error:boolean
  value: Array<string> | Array<IFiles> |  Array<IItem> | Array<Item> | string | TagItem[]
}

//表单通用props
export interface ICommonFormProps {
  handleChange?: (...args: any[]) => any
  error?:boolean
  style?: React.CSSProperties
  value?: Array<string> | Array<IFiles> |  Array<IItem> | Array<Item> | string | false | TagItem[]
  initialValue?: Array<string> | Array<IFiles> |  Array<IItem> | Array<Item> | string | TagItem[]
}


// export const API_DOMAIN = 'http://localhost:4000'
export const API_DOMAIN = 'http://47.97.27.23'