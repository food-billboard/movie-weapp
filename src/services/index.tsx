//通知
/**
 * 通知信息
 */

import {request} from '~utils'

 //发送验证码
export const sendSMS = () => {

}

//登录
export const sendUserLogon = (data) => {
    return request('GET', `/api/user/login/user=${data.username}&password=${data.password}`)
}

//退出登录
export const logout = (id) => {
    return request('POST', '/api/user/logout', {data: {id}})
}

//获取用户信息
export const getUserInfo = () => {
    return request('GET', '/api/app/info')
}

//注册
export const sendNewUser = (data) => {
    return request('POST', '/api/user/register', {data})
}

//获取热搜
export const getHot = () => {
    return request('GET', '/api/movie/hot')
}

//获取轮播图
export const getSwiper = (count:number) => {
    return request('GET', '/api/movie/banner', {query: {size: count}})
}

//获取分类
export const getType = (count:number) => {
    return request('GET', '/api/movie/type', {query: {count}})
}

//获取每日上新
export const getDailyNew = (count:number) => {
    return request('GET', '/api/movie/daily', {query: {count}})
}

//获取排行榜
export const getRank = (rank:string) => {
    return request('GET', '/api/movie/rank', {query: {type: rank}})
}

//获取排行榜分类列表
export const getRankType = (count: number) => {
    return request('GET', '/api/movie/rank_count', { query: { count } })
}   

//获取用户关注
export const getAttention = (id) => {   
    return request('GET', '/api/user/attention', {query: {id}})
}

//获取评论
export const getComment = (movie) => {
    return request('GET', '/api/movie/comment', {query: {id: movie}})
}

//获取评论简易
export const getCommentSimple = (movie) => {
    return request('GET', '/api/movie/commentsimple', {query: {movie}})
}

//获取评论详情
export const getCommentDetail = (id) => {
    return request('GET', '/api/movie/commentdetail', { query: {id} })
}

//发布评论
export const publishComment = (value, movie, user) => {
    return request('POST', '/api/user/pushcomment', {data: {value, movie, id: user}})
}

//点赞
export const gotolike = (comment, user) => {
    return request('POST', '/api/user/like', {data: {comment, id: user}})
}

//电影评分
export const sendRate = (rate, user, movie) => {
    return request('POST', '/api/user/rate', {data: {rate, id: user, movie}})
}

//获取收藏
export const getNews = (id) => {
    return request('GET', '/api/user/record', {query: {id}})
}

//获取通知
export const getRecord = (id) => {
    return request('GET', '/api/user/news', {query: {id}})
}   

//获取用户评论
export const getUserComment = (id) => {
    return request('GET', '/api/user/usercomment', {query: {id}})
}

//搜索条件筛选
export const factorSearch = (factor) => {
    return request('GET', '/api/movie/search', {query: {factor}})
}

//关注用户
export const toAttention = (user, mine, isAttention) => {
    return request('POST', '/api/user/attention', {data: {user, id: mine, isAttention}})
}   

//获取分类具体信息
export const getTypeDetail = (type) => {
    return request('GET', '/api/movie/type/detail', {query: {type}})
}

//获取小程序信息
export const getAppInfo = () => {
    return request('GET', '/api/app/info')
}

//回复评论
export const answerComment = (commentId, content, user, mine) => {
    return request('POST', '/api/user/answercomment', {data: {comment: commentId, content, user, id: mine}})
}

//获取评论头
export const getCommentHeader = (id) => {
    return request('GET', '/api/movie/commentheader', {query: {id}})
}

//获取电影详情
export const getDetail = (id) => {
    return request('GET', '/api/movie/detail', {query: {id}})
}

//电影收藏
export const sendStore = (id, movie) => {
    return request('POST', '/api/user/store', { data: { id, movie } })
}

//查看是否为用户关注
export const getIsAttention = (user, id) => {
    return request('GET', '/api/user/isAttention', { query: {user, id} })
}
