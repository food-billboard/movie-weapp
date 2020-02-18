export {default as extend} from './lib/extend'

//uid生成
export const uuid = () => {
    const s: string[] = []
    const hexDigits = '0123456789abcdef'
    for(let i = 0; i < 10; i ++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr(8, 1)
    return s.join('')
}

//Promise分离
export const defer = () => {
    const deferred: IDictionary = {}
    deferred.promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve
        deferred.reject = reject
    })
    return deferred
}

const is = (type) => (val) => Object.prototype.toString.call(val) === `[object ${type}]`

export const isNumber = is('Number')

export const isObject = is('Object')

export const isArray = is('Array')

export const isUndef = val => val === null || val === undefined

export const isDef = val => val !== null || val !== undefined

export const isTrue = val => val === true

export const isFalse = val => val === false

//合并对象
export const merge = (...args) => {
    return Object.assign({}, ...args)
}

//类型判断
export const isType = (detect, type) => {
    const types = ['String', 'Object', 'Number', 'Array', 'Undefined', 'Fucntion', 'Null', 'Symbol']
    const prototype = Object.prototype.toString.call(detect)
    if(!prototype) return false
    const detectType = prototype.replace(/^\[object\s([A-Za-z]+)\]$/, '$1')
    if(types.indexOf(detectType) < 0) return false
    return detectType === type
}

//判断内容是否为空
export const size = (detect) => {
    if(detect === undefined || detect === null) {
        return 0
    }
    if(isType(detect, 'Number')) {
        return detect
    }
    if(isType(detect, 'String')) {
        return detect.length
    }
    if(isType(detect, 'Object')) {
        return Object.keys(detect).length  
    }
    if(isType(detect, 'Array')) {
        return detect.length
    }
}

//判断是否为Promise的返回，全部转换为promise返回
export const coverPromise = (func) => {
    return (...args) => {
        const ret = func.apply(null, args)
        if(isType(ret.then, 'Function')) {
            return ret
        }
        return Promise.resolve(ret)
    }
}