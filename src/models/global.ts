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

            const { username, password } = data
            if(username === 'admin' && password === '123456') {
                return {
                    id: 'admin',
                    success: true
                }
            }else {
                return {
                    success: false
                }
            }

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
            return {
                info: {
                    id: 0,
                    username: '用户名',
                    hot: 10000,
                    img: 'http://img4.imgtn.bdimg.com/it/u=2359617007,2446763239&fm=26&gp=0.jpg'
                }
            }


            const token = getCookie('token')
            // if( !isAlipay && system.platform !=='Android' && (!token || !token.value) ){
            //     return router.replace('/login');
            // }
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
  
