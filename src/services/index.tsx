//通知
/**
 * 通知信息
 */

import {request} from '~utils'

 /**
  * 发送验证码
  * @param mobile 手机号
  */
export const sendSMS = (mobile) => {

}

/**
 * 登录
 * @param data 数据信息
 */
export const sendUserLogon = (data) => {
    const { password, username } = data
    return request('POST', `/api/user/login/user=${data.username}&password=${data.password}`, { data: { password, username } })
}

/**
 * 退出登录
 * @param id 用户id
 */
export const logout = (id) => {
    return request('POST', '/api/user/logout', {data: {id}})
}

/**
 * 注册
 * @param data 数据信息
 */
export const sendNewUser = (data) => {
    const { username, phone, code, password } = data
    return request('POST', '/api/user/register', {data: { username, phone, code, password }})
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
    return request('GET', '/api/app/info')
}

/**
 * 获取热搜
 * @param count 数量
 */
export const getHot = (count) => {
    return request('GET', '/api/movie/hot', { query: { count } })
}

/**
 * 获取轮播图
 * @param count 数量
 */
export const getSwiper = (count:number) => {
    return request('GET', '/api/movie/banner', {query: {count}})
}

/**
 * 获取分类
 * @param count 数量
 */
export const getType = (count:number) => {
    return request('GET', '/api/movie/type', {query: {count}})
}

/**
 * 获取每日上新
 * @param count 数量
 */
export const getDailyNew = (count:number) => {
    return request('GET', '/api/movie/daily', {query: {count}})
}

/**
 * 获取排行榜
 * @param rank 排行榜类型id
 */
export const getRank = (query) => {
    return request('GET', '/api/movie/rank', {query})
}

/**
 * 获取排行榜分类列表
 * @param count 排行榜数量
 */
export const getRankType = (count: number) => {
    return request('GET', '/api/movie/rank_count', { query: { count } })
}   

/**
 * 获取用户关注
 * @param query 分页类参数
 */
export const getAttention = (query) => {   
    return request('GET', '/api/user/attention', {query})
}

/**
 * 获取评论
 * @param query 筛选参数
 */
export const getComment = (query) => {
    return request('GET', '/api/movie/comment', {query})
}

/**
 * 获取评论简易
 * @param movie 电影id
 */
export const getCommentSimple = (movie) => {
    return request('GET', '/api/movie/commentsimple', {query: {movie}})
}

/**
 * 获取评论详情
 * @param query 筛选条件
 */
export const getCommentDetail = (query) => {
    return request('GET', '/api/movie/commentdetail', { query })
}

/**
 * 发布评论
 * @param value 评论内容
 * @param movie 评论电影id
 * @param user 评论用户id
 */
export const publishComment = (value, movie, user) => {
    return request('POST', '/api/user/pushcomment', {data: {value, movie, id: user}})
}

/**
 * 点赞
 * @param comment 点赞的评论id
 * @param user 点赞用户id
 * @param mine 我的id
 */
export const gotolike = (comment, user, mine) => {
    return request('POST', '/api/user/like', {data: {comment, user, mine}})
}

/**
 * 电影评分
 * @param rate 评分值
 * @param user 用户id
 * @param movie 电影id
 */
export const sendRate = (rate, user, movie) => {
    return request('POST', '/api/user/rate', {data: {rate, id: user, movie}})
}

/**
 * 获取通知
 * @param id 用户id
 */
export const getNews = (id) => {
    return request('GET', '/api/user/record', {query: {id}})
}

/**
 * 获取收藏
 * @param id 用户id
 */
export const getRecord = (id) => {
    return request('GET', '/api/user/news', {query: {id}})
}   

/**
 * 获取用户评论
 * @param id 用户id
 */
export const getUserComment = (id) => {
    return request('GET', '/api/user/usercomment', {query: {id}})
}

/**
 * 搜索条件筛选
 * @param factor 筛选条件
 */
export const factorSearch = (factor) => {
    return request('GET', '/api/movie/search', {query: {factor}})
}

/**
 * 关注用户
 * @param user 用户id
 * @param mine 我的id
 * @param isAttention 是否为关注
 */
export const toAttention = (user, mine, isAttention) => {
    return request('POST', '/api/user/attention', {data: {user, id: mine, isAttention}})
}   

/**
 * 获取分类具体信息
 * @param query 筛选条件 
 */
export const getTypeDetail = (query) => {
    return request('GET', '/api/movie/type/detail', {query})
}

/**
 * 获取小程序信息
 */
export const getAppInfo = () => {
    return request('GET', '/api/app/info')
}

/**
 * 回复评论
 * @param commentId 评论id
 * @param content 评论内容
 * @param user 评论用户id
 * @param mine 我的id
 */
export const answerComment = (commentId, content, user, mine) => {
    return request('POST', '/api/user/answercomment', {data: {comment: commentId, content, user, id: mine}})
}

/**
 * 获取评论头
 * @param id 电影id
 */
export const getCommentHeader = (id) => {
    return request('GET', '/api/movie/commentheader', {query: {id}})
}

/**
 * 获取电影详情
 * @param id 电影id
 */
export const getDetail = (id) => {
    return request('GET', '/api/movie/detail', {query: {id}})
}

/**
 * 电影收藏
 * @param id 用户id
 * @param movie 电影id
 */
export const sendStore = (id, movie) => {
    return request('POST', '/api/user/store', { data: { id, movie } })
}

/**
 * 查看是否为用户关注
 * @param user 用户id
 * @param id 我的id
 */
export const getIsAttention = (user, id) => {
    return request('GET', '/api/user/isAttention', { query: {user, id} })
}
