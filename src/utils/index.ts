export {default as dva} from './dva'
export {default as request} from './request'
export { default as cookieParse } from './lib/cookie';
export { default as router } from './router';
export * from './upload'
// export * from './upload-file-wx'
export * from './tool'
export * from './format'
export * from './platform'
export * from './globalType'
export * from './websocket'
export * from './token'
export * from './global/comment_value'
export * from './string2base64'
export { default as LoginTool } from './isLogin'
// export * from './message'

export const includes = (collection: any=[], value:any='') => {
    return collection.indexOf(value)>=0
}

// export const isAlipay = process.env.TARO_ENV === 'alipay'
