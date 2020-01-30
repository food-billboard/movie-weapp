import {
    sendSMS, 
    sendUserLogon, 
    getUserInfo,
    sendNewUser,
    getAppInfo,
    logout
} from '~services'
import { isAlipay, system } from '~utils';

import { router } from '~utils';
import { getCookie } from '~config'

export default {
    namespace: 'global',
    state: {
        userInfo: {},
        siteInfo: {},
        appInfo: {}
    },
    effects: {

        // 发送验证码
        * sendSMS({ mobile }, { call }){
            return yield call(sendSMS, { mobile })
        },

        // 登陆
        * sendUserLogon ({data}, { call, put }){
            const userInfo = yield call(sendUserLogon, data)
            yield put({ type:'setData', payload: { userInfo } })

        },

        //退出的登录
        * sendLogout({id}, {call, put}) {
            const response = yield call(logout, id)
            return response
        },

        // 获取用户详情
        * getUserInfo(_, { call, put}){
            const token = getCookie('token')
            if( !isAlipay && system.platform !=='Android' && (!token || !token.value) ){
                return router.replace('/login');
            }
            const userInfo = yield call(getUserInfo)
            yield put({ type:'setData', payload: { userInfo } })
        },

        //注册
        * sendNewUser({data}, {call, put}) {
            yield call(sendNewUser, data)
        },

        //获取小程序信息
        * getAppInfo(_, {call, put}) {
            const info = yield call(getAppInfo)
            yield put({type: 'setData', payload: {appInfo: info}})
            return info
        }
    },
    reducers: {
        setData(state, { payload }) {
            return { ...state, ...payload }
        },
    },
}
  
