// import {request} from '~utils'  

// /**
//  * 搜索条件筛选
//  * @param factor 筛选条件
//  */
// export const factorSearch = (factor) => {
//     return request('GET', '/api/movie/search', {query: {factor}})
// }  

// /**
//  * 获取电影地区列表
//  * @param count 查询数量
//  */
// export const getAreaList = (count) => {
//     return request('GET', '/api/movie/getAreaList', { query: { count } })
// }

// /**
//  * 获取电影语言列表
//  * @param count 查询数量
//  */
// export const getLanguageList = (count) => {
//     return request('GET', '/api/movie/getLanguageList', { query: { count } } )
// }

// /**
//  * 获取电影导演列表
//  * @param count 查询数量
//  */
// export const getDirectorList = (count) => {
//     return request('GET', '/api/movie/getDirectorList', { query: { count } })
// }

// /**
//  * 获取演员列表
//  * @param count 查询数量
//  */
// export const getActorList = (count) => {
//     return request('GET', '/api/movie/getActorList', { query: { count } })
// }


// /**
//  * 获取排序列表
//  */
// export const getOrderList = () => {
//     return request('GET', '/api/movie/getOrderList')
// }

// /**
//  * 获取电影搜索关键字
//  * @param text 查询文字
//  */
// export const fetchSearchPoint = (text) => {
//     return request('GET', 'api/movie/fetchSearchPoint', { query: { text } })
// }

export * from './chat'
export * from './customer'
export * from './user' 
export * from './upload'