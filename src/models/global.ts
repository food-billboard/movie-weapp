import {
    sendSMS, 
    sendUserLogon, 
    getUserInfo,
    sendNewUser,
    getAppInfo,
    logout,
    getNotice
} from '~services'
import { isAlipay, system, router } from '~utils';
import { getCookie } from '~config'
import Taro from '@tarojs/taro'

export default {
    namespace: 'global',
    state: {
        userInfo: {
            id: '伙食榜',
        },
        appInfo: {}
    },
    effects: {

        // 登陆
        * sendUserLogon ({data}, { call, put }){

            let d = {
                success: true,
                data: {
                    info: {
                        id: 0,
                        username: data.userInfo.nickName,
                        hot: 10000,
                        attention: 10000,
                        fans: 10000,
                        image: data.userInfo.avatarUrl,
                        isLike: false,
                        gender: data.userInfo.gender
                    }
                }
            }
            return d.data

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

            const isAuth = yield new Promise((resolve, reject) => {
                Taro.getSetting({
                    success: (res) => {
                        const { authSetting } = res
                        resolve(authSetting['scope.userInfo'])
                    },
                    fail: () => {
                        reject(false)
                    }
                })
            })

            if(!isAuth) {
                Taro.showModal({
                    title: '温馨提示',
                    content: '你还没有登录，要不去登录一下?',
                    success: (res) => {
                        const { confirm } = res
                        if(confirm) router.push('/mine', { login: false })
                    }
                })
            }else {

                let data = {
                    success: true,
                    data: {
                        info: {
                            id: 0,
                            username: '用户名',
                            hot: 10000,
                            attention: 10000,
                            fans: 10000,
                            image: 'http://img4.imgtn.bdimg.com/it/u=2359617007,2446763239&fm=26&gp=0.jpg',
                            isLike: false
                        }
                    }
                }
                return data.data

                const userInfo = yield call(getUserInfo)
                return yield put({put: 'setData', payload: { userInfo }})

            }


            // const token = getCookie('token')
            // // if( !isAlipay && system.platform !=='Android' && (!token || !token.value) ){
            // //     return router.replace('/login');
            // // }
            // const userInfo = yield call(getUserInfo)
            // yield put({ type:'setData', payload: { userInfo } })
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
            yield put({type: 'setData', payload: { appInfo: data.data }})
            return data.data

            const info = yield call(getAppInfo)
            yield put({type: 'setData', payload: { appInfo: info.data }})
            return info
        },

        //获取跑马灯
        * getNotice(_, { call, put }) {
            let _data = {
                success: true,
                data: {
                    data: {
                        text: '我是一个快乐的跑马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马灯灯灯灯灯灯'
                    }
                }
            }
            return _data.data

            const data = yield call(getNotice)
            return data
        }
    },
    reducers: {
        setData(state, { payload }) {
            return { ...state, ...payload }
        },
    },
}
  
