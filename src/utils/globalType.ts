import { IFiles } from '~components/imgPicker/index.d'
import { IItem } from '~components/mediaPicker/index.d'
import { Item } from 'taro-ui/@types/timeline'
export interface ItypeList {
  value: string
  id?: string
}

//媒体类型
export const mediaType = {
  video: 'video',
  audio: 'audio',
  image: 'image'
}

//路由简写
export const routeAlias = {
  main: '/main',
  mine: '/mine',
  comment: '/comment',
  news: '/news' ,
  attention: '/attention',
  detail: '/detail',
  mycomment: '/mycomment',
  record: '/record',
  search: '/search',
  setting: '/setting',
  type: '/type',
  user: '/user',
  rank: '/rank',
  commentdetail: '/commentdetail',
  store: '/store',
  issue: '/issue',
  userissue: '/userissue',
  special: '/special',
  fans: '/fans',
  newsdetail: '/newsdetail',
  login: '/login',
  register: '/register'
}

//路由配置
export const routeConfig = [
  { path: 'pages/main/index', alias: routeAlias.main },
  { path: 'pages/mine/index', alias: routeAlias.mine },
  { path: 'pages/comment/index', alias: routeAlias.comment },
  { path: 'pages/news/index', alias: routeAlias.news },
  { path: 'pages/attention/index', alias: routeAlias.attention },
  { path: 'pages/detail/index', alias: routeAlias.detail },
  { path: 'pages/mycomment/index', alias: routeAlias.mycomment},
  { path: 'pages/record/index', alias: routeAlias.record},
  { path: 'pages/search/index', alias: routeAlias.search},
  { path: 'pages/setting/index', alias: routeAlias.setting},
  { path: 'pages/type/index', alias: routeAlias.type},
  { path: 'pages/user/index', alias: routeAlias.user},
  { path: 'pages/rank/index', alias: routeAlias.rank},
  { path: 'pages/commentdetail/index', alias: routeAlias.commentdetail },
  { path: 'pages/store/index', alias: routeAlias.store },
  { path: 'pages/issue/index', alias: routeAlias.issue },
  { path: 'pages/userissue/index', alias: routeAlias.userissue },
  { path: 'pages/special/index', alias: routeAlias.special },
  { path: 'pages/fans/index', alias: routeAlias.fans },
  { path: 'pages/newsdetail/index', alias: routeAlias.newsdetail },
  { path: 'pages/login/index', alias: routeAlias.login },
  { path: 'pages/register/index', alias: routeAlias.register },
]

//轮播图路由跳转类型"MOVIE", "SPEICAL", "COMMENT"
export const swiperRouteType = {
  "MOVIE": "MOVIE",
  "SPEICAL": "SPEICAL",
  "COMMENT": "COMMENT"
}

//数据获取方式
export const sourceTypeList = {
  Dva: Symbol('dva'),
  Scope: Symbol('scrope')
}

//通知消息类型
export const infomationType = {
  attention: Symbol('attention'),
  app: Symbol('app')
}

//详细消息类型
export const newsType = {
  image: 'image',
  audio:'audio',
  video: 'video',
  text: 'text',
}

//响应类型
export const responseType = {
  success: 'success',
  fail: 'fail'
}

//表单通用state
export interface ICommonFormState {
  error:boolean
  value: Array<string> | Array<IFiles> |  Array<IItem> | Array<Item> | string
}

//表单通用props
export interface ICommonFormProps {
  handleChange?: (...args: any[]) => any
  error?:boolean
  style?: any
  value?: Array<string> | Array<IFiles> |  Array<IItem> | Array<Item> | string | false
  initialValue?: Array<string> | Array<IFiles> |  Array<IItem> | Array<Item> | string
}
