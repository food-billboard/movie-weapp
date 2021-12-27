import qs from 'qs'
import invariant from 'invariant'
import { merge } from 'lodash'

import { extend } from './tool'

const HTTP_METHODS = ['OPTIONS', 'GET', 'HEAD', 'POST', 'DELETE', 'PUT', 'TRACT', 'CONNECT']

const isAlipay = process.env.TARO_ENV === 'alipay'

const Taro: any = {}

const defaultOptions = {
    header: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    dataType: 'json',
    responseType: 'text'
}

let defaultHost = null

let dynamicOptions = function() {
    return {}
}

let errorHandler: any = function() {
    invariant(false, 'Error handle')
}

//拼接url
function joinUrl(path, host, query) {
    let queryString;
    let ret;
    if(query) {
        queryString = qs.stringify(query)
    }
    if(/^https?:\/\//.test(path)) {
        ret = path
    }else {
        ret = host + path
    }
    if(queryString) {
        ret += '?' + queryString
    }
    return ret
}

//初始化
const init = (settings) => {
    const {options = {}, host = '', taro, error} = settings
    extend(true, defaultOptions, options)
    if(error) errorHandler = error

    if(settings.dynamicOptions) dynamicOptions = settings.dynamicOptions

    defaultHost = host

    Taro.request = taro.request

}

const request = async function<T=any>(method, path, settings:any={}, origin: boolean=false): Promise<T> {
    const {query, data, header, ...options} = settings
    invariant(HTTP_METHODS.indexOf(method) >= 0, '错误的请求方法')

    //参数配置
    let setting: any = {
        url: joinUrl(path, defaultHost, query),
        method,
        header,
        data
    }
    
    setting = merge({}, defaultOptions, setting, options)

    // if(isType(dynamicOptions, 'Fucntion')) {
    //     const dynamicOptionsPromise = coverPromise(dynamicOptions)
    //     const args: any = []
    //     args[0] = extend(true, {path, query}, setting)
    //     const dynaicSetting = await dynamicOptionsPromise(...args)
    //     extend(true, setting, { data: qs.stringify(data) }, dynamicOptions)
    // }
    if(Object.prototype.toString.call(data) != '[object ArrayBuffer]') extend(true, setting, { data: qs.stringify(data) })
    try {
        const response = await Taro.request(setting)
        return errorHandler('REQUEST_SUCCESS', { response, origin })
    }catch(err) {
        if(!err.origin && isAlipay) {
            return errorHandler("REQUEST_SUCCESS", {response: err})
        }
        throw err
    }
}

request.init = init
export default request