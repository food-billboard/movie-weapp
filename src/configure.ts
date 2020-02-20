import Taro from '@tarojs/taro';
import { request, router } from '~utils';
import { requestError, getRequestCookie } from '~config'

import models from './models'

export type IConfig = [
  (app?: any)=>void,
  (app?: any)=>void,
  (app?: any)=>void,
  (app?: any)=>void,
]

const RouterConfig = {
  routes: [
    { path: 'pages/main/index', alias: '/main' },
    { path: 'pages/mine/index', alias: '/mine' },
    { path: 'pages/login/index', alias: '/login'},
    { path: 'pages/register/index', alias: '/register'},
    { path: 'pages/comment/index', alias: '/comment' },
    { path: 'pages/news/index', alias: '/news' },
    { path: 'pages/attention/index', alias: '/attention' },
    { path: 'pages/detail/index', alias: '/detail' },
    { path: 'pages/mycomment/index', alias: '/mycomment'},
    { path: 'pages/record/index', alias: '/record'},
    { path: 'pages/search/index', alias: '/search'},
    { path: 'pages/setting/index', alias: '/setting'},
    { path: 'pages/type/index', alias: '/type'},
    { path: 'pages/user/index', alias: '/user'},
    { path: 'pages/rank/index', alias: '/rank'},
    { path: 'pages/commentdetail/index', alias: '/commentdetail' },
    { path: 'pages/store/index', alias: '/store' },
    { path: 'pages/issue/index', alias: '/issue' },
    { path: 'pages/userissue/index', alias: '/userissue' }
  ]
}

const configs: IConfig = [

  // 拷贝静态资源
  () => require('./assets'),

  // 挂载 models
  (app) => models(app),

  // 初始化 request
  () => {
    request.init({
      taro: Taro,
      host: 'http://localhost:3000',
      // host: 'http://frp.bsrnykj.com:8088',
      error: requestError,
      options: {
        header: {
          'x-requested-with': 'XMLHttpRequest',
        }
      },
      async dynamicOptions() {
        // 这里可以调用本地缓存（缓存是异步的，需要使用promise），可调用其他接口
        // 这里可以使用 options 去判断当前请求是否应该添加 token 添加到什么位置（拦截白名单）
        // console.log(options);
        const cookie = getRequestCookie();
        return {
          header: {
            // 登录后拿到cookie放到请求的header
            'cookie': cookie,
          }
        }
      }
    });
  },

  // 初始化路由
  () => router.init(RouterConfig, Taro, true),

];

export default (app)=> configs.forEach( config=>config(app) ); 