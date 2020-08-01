import { router, routeAlias, setToken, getToken, clearToken } from '~utils'
import { signin, register, signout, getCustomerUserInfo } from '~services'
import Taro from '@tarojs/taro'

export default {
  namespace: 'global',
  state: {
    userInfo: null
  },
  effects: {
    * getUserInfo({}, { call, put }) {
      const token = yield getToken()
      if(!token) {
        Taro.hideLoading()
        const res = yield Taro.showModal({
          title: '您还未登录',
          content: "是否前往登录"
        })
        const { confirm } = res
        if(confirm) {
          router.push(routeAlias.login)
          return Promise.resolve()
        }else {
          return Promise.reject()
        }
      }else {
        const data = yield call(getCustomerUserInfo)
        yield put({ type: 'setData',  payload: { userInfo: data } })
        return Promise.resolve(data)
      }
    },

    * signin({ mobile, password, uid }: { mobile: string, password: string, uid?: string }, { call, put }) {
      const data = yield call(signin, { mobile, password, uid })
      const { token, ...nextData } = data
      yield put({ type: 'setData', payload: { userInfo: nextData } })
      setToken(token)
      return data
    },

    * signout({}, { call, put }) {
      yield call(signout)
      clearToken()
      yield put({ type: 'setData', payload: { userInfo: null } })
    },

    * register({ mobile, password, uid }: { mobile: string, password: string, uid?: string }, { call, put }) {
      const data = yield call(register, { mobile, password, uid })
      const { token, ...nextData } = data
      setToken(token)
      yield put({ type: 'setData', payload: { userInfo: nextData } })
      return data
    }
  },
  reducers: {
    setData(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}