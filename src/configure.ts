import Taro from '@tarojs/taro';
import { request, router, routeConfig } from '~utils';
import { requestError, getRequestCookie } from '~config'

import models from './models'

export type IConfig = [
  (app?: any)=>void,
  (app?: any)=>void,
  (app?: any)=>void,
  (app?: any)=>void,
]

const RouterConfig = {
  routes: routeConfig
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