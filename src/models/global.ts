import Taro from '@tarojs/taro'
import { noop } from 'lodash'
import { router, routeAlias, setToken, getToken, clearToken, TaroShowModal } from '~utils'
import { signin, register, signout, getCustomerUserInfo, sendSMS, forget } from '~services'

export default {
  namespace: 'global',
  state: {
    userInfo: null
  },
  effects: {
    * getUserInfo({ prompt=true, action, unloginAction=noop }, { call, put }) {
      const token = yield getToken()

      function * unlogin() {
        Taro.hideLoading()
        if(!prompt) return false 
        const res = yield TaroShowModal({
          title: '您还未登录',
          content: "是否前往登录"
        })
        const { confirm } = res
        if(confirm) {
          router.push(routeAlias.login)
        }else {
          yield unloginAction()
        }
        return Promise.resolve(false)
      }

      if(!token) {
        return yield unlogin()
      }else {
        try {
          const data = yield call(getCustomerUserInfo)
          yield put({ type: 'setData', payload: { userInfo: data } })
          return action ? action(data) : data
        }catch(err) {
          clearToken()
          return yield unlogin()
        }
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

    * register({ mobile, password, uid, email, captcha }: { mobile: string, password: string, uid?: string, captcha: string, email: string }, { call, put }) {
      const data = yield call(register, { mobile, password, uid, email, captcha })
      const { token, ...nextData } = data
      setToken(token)
      yield put({ type: 'setData', payload: { userInfo: nextData } })
      return data
    },

    * sendSMS({ email, emailType }, { call, put }) {
      return yield call(sendSMS, { email, type: emailType })
    },

    * forget({ email, captcha, password }, { call, put }) {
      const data = yield call(forget, { password, email, captcha })
      return data
    }

  },
  reducers: {
    setData(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}