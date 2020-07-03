import { router, routeAlias } from '~utils'
import { signin, register, signout } from '~services'
import Taro from '@tarojs/taro'

export default {
  namespace: 'global',
  state: {
    userInfo: null
  },
  effects: {
    * getUserInfo() {
      return new Promise((resolve, reject) => {
        //未登录
        if(true) {
          Taro.hideLoading()
          Taro.showModal({
            title: '您还未登录',
            content: "是否前往登录"
          })
          .then(res => {
            if(res.confirm) {
              router.push(routeAlias.login)
              resolve()
            }else {
              reject()
            }
          })
        }else {
          resolve()
        }
      })
    },

    * signin({ mobile, password, uid }: { mobile: string, password: string, uid?: string }, { call, put }) {
      const data = yield call(signin, { mobile, password, uid })
      yield put({ type: 'setData', payload: { userInfo: data } })
      return data
    },

    * signout({}, { call, put }) {
      yield call(signout)
      yield put({ type: 'setData', payload: { userInfo: null } })
    },

    * register({ mobile, password, uid }: { mobile: string, password: string, uid?: string }, { call, put }) {
      const data = yield call(register, { mobile, password, uid })
      yield put({ type: 'setData', payload: { userInfo: data } })
      return data
    }
  },
  reducers: {
    setData(state, { payload }) {
      return { ...state, payload }
    }
  }
}