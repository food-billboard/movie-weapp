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

//报错处理
export const withTry = (method) => {
    return async (...args) => {
        try{
            const body = await method(...args)
            return [null, body]
        }catch(err) {
            return [err, null]
        }
    }
}


//判断两个对象是否相等
export const isEqualObj = (targetA, targetB) => {
    var typeA = typeof targetA,
        typeB = typeof targetB
    var keysA,
        keysB
    if(typeA !== 'object' && typeB !== 'object') return targetA == targetB
    typeA = Object.prototype.toString.call(targetA)
    typeB = Object.prototype.toString.call(targetB)
    if(typeA == '[object RegExp]' || typeB == '[object RegExp]') {
        return targetA === targetB && typeA == typeB
    }else if(typeA === '[object Null]' || typeB === '[object Null]') {
        return targetA === targetB && typeA === typeB
    }else if(typeA === '[object Array]' || typeB === '[object Array]') {
        return targetA.toString() === targetB.toString() && typeA === typeB
    }
    keysA = Object.keys(targetA),
    keysB = Object.keys(targetB)


    //属性长度不同则不同
    if(keysA.length !== keysB.length) return false
    if(keysA.length == 0 && keysB.length == 0) return true
    return keysA.some(key => {
        typeA = Object.prototype.toString.call(targetA[key])
        typeB = Object.prototype.toString.call(targetB[key])
        //类型不同则不同
        if(typeA != typeB) return false
        //内部仍是对象则递归
        if(typeA === '[object Object]') return isEqualObj(targetA[key], targetB[key])
        //数字类型中的NaN
        if(typeA === '[object number]' && (Number.isNaN(targetA[key]) || Number.isNaN(targetB[key]))) {
            return Number.isNaN(targetA[key]) && Number.isNaN(targetB[key])
        }
        if(typeA === '[object Array]') return isEqualObj(targetA[key], targetB[key])
        return targetB[key] === targetA[key]
    })
}