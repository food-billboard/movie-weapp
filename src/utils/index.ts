export {default as dva} from './dva'
export {default as request} from './request'
export { default as cookieParse } from './lib/cookie';
export { default as router } from './router';
export * from './tool'
export * from './format'
export * from './platform'

export const includes = (collection: any=[], value:any='') => {
    return collection.indexOf(value)>=0
}

// export const isAlipay = process.env.TARO_ENV === 'alipay'
