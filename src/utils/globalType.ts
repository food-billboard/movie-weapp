export interface ItypeList {
  value: string
  id: string
}

//媒体类型
export const mediaType = {
  video: Symbol('video'),
  audio: Symbol('audio'),
  image: Symbol('image')
}

//路由简写
export const routeAlias = {
  main: '/main',
  mine: '/mine',
  login: '/login',
  register: '/register',
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
  userissue: '/userissue'
}

//路由配置
export const routeConfig = [
  { path: 'pages/main/index', alias: routeAlias.main },
  { path: 'pages/mine/index', alias: routeAlias.mine },
  { path: 'pages/login/index', alias: routeAlias.login},
  { path: 'pages/register/index', alias: routeAlias.register},
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
  { path: 'pages/userissue/index', alias: routeAlias.userissue }
]
