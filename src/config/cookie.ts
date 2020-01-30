import Taro from '@tarojs/taro'
import {find, findIndex} from '~lodash'
import {cookieParse, isType} from '~utils'
const COOKIE_ID = 'cookie'

//设置cookie
export const setCookie = (store, data:any={}) => {
    //数组形式
    if(Object.prototype.toString.call(store) == "[object Array]") {
        Taro.setStorageSync(COOKIE_ID, store)
        return store
    }
    //字符串形式
    const cookies = Taro.getStorageSync(COOKIE_ID) || []
    if(Object.prototype.toString.call(store) == "[object String]") {
        const name = store
        const index = findIndex(cookies, {name})
        //判断原cookie中是否存在要设置的cookie
        if(index != -1) {
            const _cookie = find(cookies, index)
            const cookie = Object.assign({}, _cookie, data || [])
            //无效cookie
            if(cookie.value === null || cookie.value === undefined) {
                cookies.splice(index, 1)
            }else {
                cookies.splice(index, 1, cookie)
            }
        }else if(data.value !== null || data.value !== undefined) {
            cookies.push({name, ...{path: '/'}, ...data})
        }
        Taro.setStorageSync(COOKIE_ID, cookies)
    }
    return cookies
}
//获取cookie
export const getCookie = (key?) => {
    const storage = Taro.getStorageSync(COOKIE_ID) || []
    const store: any = []
    //筛选过期cookie
    storage.map(val => {
        const {expires} = val
        if(!expires) {
            store.push(val)
            return
        }
        const expiresTime = new Date(expires).getTime()
        const currentTime = new Date().getTime()
        //判断是否过期
        if(currentTime < expiresTime) {
            store.push(val)
        }
    })

    //更新cookie
    setCookie(store)

    //查找单个cookie
    if(key) {
        return find(store, {name: key})
    }
    return store
}
//设置响应cookie
export const setResponseCookie = (header, setCookieName="Set-Cookie") => {
    const cookies = cookieParse.splitCookiesString(header[setCookieName])
    let store = cookieParse(cookies)
    const storeStorage = getCookie()

    //筛选cookie
    storeStorage.map(val => {
        if(!find(store, {name: val.name})) {
            store.push(val)
        }
    })
    setCookie(store)
}
//设置请求cookie
export const setRequestCookie = () => {
    const store = getCookie()
    let ret: any[]= []
    store.map(({name, value, }) => {
        ret.push(`${name}=${value}`)
    })
    return ret.join(';')
}