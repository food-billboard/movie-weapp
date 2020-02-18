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
        userInfo: {
            id: '伙食榜',
            
        },
        appInfo: {},
        colorStyle: false
    },
    effects: {

        //设置色调开启关闭
        * setColorStyle({status}, { call, put }) {
            yield put({type: 'setData', colorStyle: status})
        }

        // 发送验证码
        * sendSMS({ mobile }, { call }){
            return yield call(sendSMS, { mobile })
        },

        // 登陆
        * sendUserLogon ({data}, { call, put }){

            const { username, password } = data
            let d
            if(username === 'admin' && password === '123456') {
                d = {
                    success: true,
                    data: {
                        id: 'admin'
                    }
                }
            }else {
                d = {
                    success: false,
                    data: {}
                }
            }
            return d.success

            const userInfo = yield call(sendUserLogon, data)
            yield put({ type:'setData', payload: { userInfo } })
            return userInfo
        },

        //退出的登录
        * sendLogout({id}, {call, put}) {

            return {
                success: true,
                data: {}
            }
            return

            const response = yield call(logout, id)
            return response
        },

        // 获取用户详情
        * getUserInfo(_, { call, put}){
            const tokens = getCookie('token')
            let data = {
                success: true,
                data: {
                    info: {
                        id: 0,
                        username: '用户名',
                        hot: 10000,
                        img: 'http://img4.imgtn.bdimg.com/it/u=2359617007,2446763239&fm=26&gp=0.jpg',
                        isLike: false
                    }
                }
            }
            return data.data


            const token = getCookie('token')
            // if( !isAlipay && system.platform !=='Android' && (!token || !token.value) ){
            //     return router.replace('/login');
            // }
            const userInfo = yield call(getUserInfo)
            yield put({ type:'setData', payload: { userInfo } })
            return userInfo
        },

        //注册
        * sendNewUser({data}, {call, put}) {

            const { username } = data
            let d
            if(username === 'admin') {
                d = {
                    success: false,
                    err: '用户名有重复',
                    data: {}
                }
            }else {
                d = {
                    success: true,
                    data: {

                    }
                }
            }
            return d.success

            const response = yield call(sendNewUser, data)
            return response
        },

        //获取小程序信息
        * getAppInfo(_, {call, put}) {
            let data = {
                success: true,
                data: {
                    about: '小程序的信息，不管你看不看，但是这里是我要显示的内容',
                    id: '小程序id',
                    time: '发布时间',
                }
            }
            return data.data

            const info = yield call(getAppInfo)
            return info
        }
    },
    reducers: {
        setData(state, { payload }) {
            return { ...state, ...payload }
        },
    },
}
  
