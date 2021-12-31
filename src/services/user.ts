import { request, getToken, createUserAuth } from '~utils'

//其他用户信息
export const getUserInfo = (id: string) => {
  return request('GET', '/api/user/customer', { query: { _id: id } })
}

//其他用户粉丝
export const getUserFans = ({ id, currPage=0, pageSize=30 }: { id: string, currPage: number, pageSize: number }) => {
  return request('GET', '/api/user/customer/fans', { query: { _id: id, currPage, pageSize } })
}

//其他用户评论
export const getUserComment = ({ id, currPage=0, pageSize=30  }: { id: string, currPage: number, pageSize: number }) => {
  return request('GET', '/api/user/customer/comment', { query: { _id: id, currPage, pageSize } })
}

//其他用户关注
export const getUserAttention = ({ id, currPage=0, pageSize=30  }: { id: string, currPage: number, pageSize: number }) => {
  return request('GET', '/api/user/customer/attention', { query: { _id: id, currPage, pageSize } })
}

//其他用户发布的电影
export const getUserIssue = ({ id, currPage=0, pageSize=30  }: { id: string, currPage: number, pageSize: number }) => {
  return request('GET', '/api/user/customer/movie', { query: { _id: id, currPage, pageSize } })
}

//其他用户浏览记录
export const getUserGlance = ({ id, currPage=0, pageSize=30  }: { id: string, currPage: number, pageSize: number }) => {
  return request('GET', '/api/user/customer/movie/browser', { query: { _id: id, currPage, pageSize } })
}

//其他用户收藏的电影
export const getUserStore = ({ id, currPage=0, pageSize=30  }: { id: string, currPage: number, pageSize: number }) => {
  return request('GET', '/api/user/customer/movie/store', { query: { _id: id, currPage, pageSize } })
}

//每日上新
export const getDailyNew = (count:number=10) => {
  return request<API_USER.IGetDailyRes>('GET', '/api/user/home/daily', {query: { count }})
}

//热搜
export const getHot = (count:number=3) => {
  return request('GET', '/api/user/home/hot', { query: { count } })
}

//跑马灯
export const getNotice = () => {
  return request('GET', '/api/user/setting/info/notice')
}

//排行榜(首页)
export const getRank = (count:number=6) => {
  return request('GET', '/api/user/home/rank', {query: { count }})
}

//专题
export const getSpecial = ({
  id,
  currPage,
  pageSize 
}: {
  id: string,
  currPage?: number
  pageSize?: number 
}) => {
  return request('GET', '/api/user/home/special', { query: { _id: id, currPage, pageSize } })
}

//轮播图
export const getSwiper = (count:number=6) => {
  return request('GET', '/api/user/home/swiper', {query: { count }})
}

//登录
export const signin = ({ mobile, password, uid }: { mobile: string, password: string, uid?: string | undefined }) => {
  // return request('POST', `/api/user/logon/account`, { data: { uid }, header: createUserAuth({ mobile, password }) })
  return request('POST', `/api/user/logon/account`, { data: { uid, mobile, password } })
}

//注册
export const register = ({ mobile, password, uid, email, captcha }: { mobile: number, password: string, uid: string | undefined, captcha: string, email: string }) => {
  return request('POST', '/api/user/logon/register', { data: { uid, email, mobile, password, captcha } })
}

//退出
export const signout = () => {
  return request('POST', '/api/user/logon/signout', { header: getToken(true) })
}

//忘记密码
export const forget = (data: { password: string, email: string, captcha: string }) => {
  return request('POST', '/api/user/logon/forget', { header: getToken(true), data })
}

//验证码
export const sendSMS = ({ email, type }) => {
  return request('POST', '/api/user/logon/email', { data: { email, type } })
}

//分类(首页)
export const getClassify = (count?:number) => {
  return request('GET', '/api/user/movie/classify/specDropList', {query: { count }})
}

//分类列表
export const getClassifyList = ({ id, currPage=0, pageSize=30, sort }: { id: string, currPage: number, pageSize: number, sort: any }) => {
  return request('GET', '/api/user/movie/classify', {query: { _id: id, currPage, pageSize, sort }})
}

//电影详情
export const getUserMovieDetail = (id:string) => {
  return request('GET', '/api/user/movie/detail', { query: { _id: id } })
}

//简易评论(电影页面)
export const getCommentSimple = ({ id, count=30 }: { id: string, count?: number }) => {
  return request('GET', '/api/user/movie/detail/comment', {query: { _id: id, count }})
}

//电影详情简易
export const getMovieDetailSimple = (id: string) => {
  return request('GET', '/api/user/movie/detail/simple', { query: { _id: id } })
}

//电影评论列表
export const getMovieCommentList = ({ id, currPage=0, pageSize=30 }: { id: string, currPage: number, pageSize: number }) => {
  return request('GET', '/api/user/movie/detail/comment/list', { query: { _id: id, currPage, pageSize } })
}

//电影评论详情
export const getUserMovieCommentDetail = ({ id, currPage=0, pageSize=30 }: { id: string, currPage: number, pageSize: number }) => {
  return request('GET', '/api/user/movie/detail/comment/detail', { query: { _id: id, currPage, pageSize } })
}

//排行榜
export const getRankList = ({ id, currPage=0, pageSize=30 }: { id: string, currPage: number, pageSize: number }) => {
  return request('GET', '/api/user/movie/rank', { query: { _id: id, currPage, pageSize } })
}

//排行榜列表
export const getRankType = (count: number) => {
  return request('GET', '/api/user/movie/rank/specDropList', { query: { count } })
}   

//小程序信息
export const getAppInfo = () => {
  return request('GET', '/api/user/setting/info')
} 

//语言列表
export const getLanguageList = (count:number=-1) => {
  return request('GET', '/api/user/movie/language', { query: { count } })
}

//地区列表
export const getDistrictList = (count:number=-1) => {
  return request('GET', '/api/user/movie/district', { query: { count } })
}

//导演列表
export const getDirectorList = (count:number=-1) => {
  return request('GET', '/api/user/movie/director', { query: { count } })
}

//演员列表
export const getActorList = (count: number = -1) => {
  return request('GET', '/api/user/movie/actor', { query: { count } })
}

//排序列表
export const getOrderList = () => {
  return request<API_USER.ISearchOrderFieldListRes>('GET', '/api/user/movie/order')
}

//数据搜索
export const getSearchDataList = (params: API_USER.ISearchDataParams) => {
  return request<API_USER.ISearchDataRes>('GET', '/api/user/movie/search', {
    query: params
  })
}