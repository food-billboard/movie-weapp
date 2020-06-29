import {request} from '~utils'

//用户信息
export const getCustomerUserInfo = () => {
  return request('GET', '/api/customer/manage')
}

//获取用户关注列表
export const getCustomerAttention = ({ currPage=0, pageSize=30 }: { currPage: number, pageSize:number }) => {   
  return request('GET', '/api/customer/manage/attention', { query: { currPage, pageSize } })
}

//关注用户
export const toAttention = (id: string) => {
  return request('PUT', '/api/customer/manage/attention', {data: { _id: id }})
} 

//取消关注
export const cancelAttention = (id: string) => {
  return request('DELETE', '/api/customer/manage/attention', {data: { _id: id }})
} 

//粉丝列表
export const getCustomerFans = ({ currPage=0, pageSize=30 }: { currPage: number, pageSize:number }) => {
  return request('GET', '/api/customer/manage/fans', { query: { currPage, pageSize } })
}

//评论列表
export const getCustomerComment = ({ currPage=0, pageSize=30 }: { currPage: number, pageSize:number }) => {
  return request('GET', '/api/customer/manage/comment', { query: { currPage, pageSize } })
}

//发布电影
export const sendIssue = (data) => {
  return request('POST', '/api/customer/manage/movie', { data })
}

//修改电影
export const editIssue = (data) => {
  return request('PUT', '/api/customer/manage/movie', { data })
}

//发布电影列表
export const getCustomerIssue = ({ currPage=0, pageSize=30 }: { currPage: number, pageSize:number }) => {
  return request('GET', '/api/customer/manage/movie', { query: { currPage, pageSize }  })
}

//收藏的电影列表
export const getCustomerStore = ({ currPage=0, pageSize=30 }: { currPage: number, pageSize:number }) => {
  return request('get', '/api/customer/manage/movie/store', { query: { currPage, pageSize } })
}

//获取电影修改信息
export const getEditMovieInfo = (id: string) => {
  return request('GET', '/api/customer/manage/movie/detail', { query: { _id: id } })
}

//浏览记录
export const getCustomerGlance = ({ currPage=0, pageSize=30 }: { currPage: number, pageSize:number }) => {
  return request('get', '/api/customer/manage/movie/browser ', { query: { currPage, pageSize } })
}

//反馈
export const feedback = ({ text='', image=[], video=[] }: { text: string, image: Array<string>, video: Array<string> }) => {
    return request('POST', '/api/usr/feedback', { data: { content: { text, image, video } } })
}

//用户反馈发送预查
export const preCheckFeedback = () => {
  return request('GET', '/api/customer/movie/manage/feedback/precheck')
}

//修改用户名
export const putUsername = (value: string) => {
  return request('PUT', '/api/customer/manage/info/name', { data: { name: value } })
}

//修改头像
export const putAvatar = (value: string) => {
  return request('PUT', '/api/customer/manage/info/avatar', { data: { _id: value } })
}

//电影详情
export const getCustomerMovieDetail = (id: string) => {
  return request('GET', '/api/customer/movie/detail', {query: { _id: id }})
}

//收藏电影
export const putStore = (id: string) => {
  return request('PUT', '/api/customer/movie/detail/store', { data: { _id: id } })
}

//取消收藏电影
export const cancelStore = (id: string) => {
  return request('DELETE', '/api/customer/movie/detail/store', { query: { _id: id } })
}

//评分
export const putRate = (id: string, value: number) => {
  return request('PUT', '/api/customer/movie/detail/rate', {data: { _id: id, value }})
}

//电影评论列表
export const getCustomerMovieCommentList = ({ id, currPage=0, pageSize=30 }: { id: string, currPage: number, pageSize: number }) => {
  return request('GET', '/api/user/movie/detail/comment/list', { query: { _id: id, currPage, pageSize } })
}

//电影评论详情
export const getCustomerMovieCommentDetail = ({ id, currPage=0, pageSize=30 }: { id: string, currPage: number, pageSize: number }) => {
  return request('GET', '/api/user/movie/detail/comment/detail', { query: { _id: id, currPage, pageSize } })
}

//评论用户
export const postCommentToUser = ({ id, content: { text='', image=[], video=[] } }: { id: string, content: { text: string, image: Array<string>, video: Array<string> } }) => {
  return request('POST', '/api/customer/movie/detail/comment', {data: { _id: id, content: { text, image, video } }})
}

//评论电影
export const postCommentToMovie = ({ id, content: { text='', image=[], video=[] } }: { id: string, content: { text: string, image: Array<string>, video: Array<string> } }) => {
  return request('POST', '/api/customer/movie/detail/comment/movie', {data: { _id: id, content: { text, image, video } }})
}

//点赞
export const putLike = (id: string) => {
  return request('PUT', '/api/customer/movie/detail/comment/like', {data: { _id: id }})
}

//取消点赞
export const cancelLike = (id: string) => {
  return request('DELETE', '/api/customer/movie/detail/comment/like', {data: { _id: id }})
}

//获取他人用户信息
export const getCustomerAntoherUserInfo = (id: string) => {
  return request('GET', '/api/customer/user', { query: { _id: id } })
}

//获取他人评论信息
export const getCustomerUserComment = ({ id, currPage=0, pageSize=30 }: { id: string, currPage: number, pageSize: number }) => {
  return request('GET', '/api/customer/user/comment ', { query: { currPage, pageSize, _id: id } })
}