import Taro from '@tarojs/taro'
import { TaroShowModal } from '~utils'
import router from './router'
import { routeAlias } from './globalType'
import { getToken } from './token'

function internalResolve(params={}) {
  router.push(routeAlias.login, params)
}

function internalReject(params={}) {
  Taro.showToast({
    title: "未登录无法操作",
    ...params 
  })
}

function isLogin() {
  try {
    return !!(getToken())
  }catch(err) {
    return false 
  }
}

export default {
  isLogin,
  client2Login() {
    
  },
  async confirm2Login(context, {
    done,
    resolve,
    reject,
    dialog={}
  }) {
    if(isLogin()) {
      if(done) await done()
      return 
    } 
    return TaroShowModal({
      title: '提示',
      content: '当前未登录，是否前往登录',
      ...dialog
    })
    .then(_ => {
      if(resolve) return resolve(internalResolve())
      return internalResolve()
    })
    .catch(() => {
      if(reject) return reject(internalReject())
      return internalReject()
    })
  }
}