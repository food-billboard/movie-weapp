import {
  getCustomerAttention,
  toAttention,
  cancelAttention,
  getCustomerFans,
  getCustomerComment,
  sendIssue,
  editIssue,
  getCustomerIssue,
  getCustomerStore,
  getEditMovieInfo,
  getCustomerGlance,
  feedback,
  preCheckFeedback,
  putUsername,
  putAvatar,
  getCustomerMovieDetail,
  putStore,
  cancelStore,
  putRate,
  postCommentToUser,
  postCommentToMovie,
  putLike,
  cancelLike,
  getCustomerUserInfo,
  getCustomerUserComment
} from '~services'

export default {
  namespace: 'customer',
  state: {

  },
  effects: {

    //用户关注列表
    * getCustomerAttention({ currPage, pageSize }, { call }) {
      const data = yield call(getCustomerAttention, { currPage, pageSize })
      return data
    },

    //关注用户
    * toAttention({ id }, { call }) {
      yield call(toAttention, id)
    },

    //取消关注
    * cancelAttention({ id }, { call }) {
      yield call(cancelAttention, id)
    },

    //粉丝列表
    * getCustomerFans({ currPage, pageSize }, { call }) {
      const data = yield call(getCustomerFans, { currPage, pageSize })
      return data
    },

    //评论列表
    * getCustomerComment({ currPage, pageSize }, { call }) {
      const data = yield call(getCustomerComment, { currPage, pageSize })
      return data
    },

    //发布电影
    * sendIssue(data, { call }) {
      yield call(sendIssue, data)
    },

    //修改电影
    * editIssue(data, { call }) {
      yield call(editIssue, data)
    },

    //用户发布电影列表
    * getCustomerIssue({ currPage, pageSize }, { call }) {
      const data = yield call(getCustomerIssue, { currPage, pageSize })
      return data
    },

    //收藏的电影列表
    * getCustomerStore({ currPage, pageSize }, { call }) {
      const data = yield call(getCustomerStore, { currPage, pageSize })
      return data
    },

    //电影修改的信息
    * getEditMovieInfo({ id }, { call }) {
      const data = yield call(getEditMovieInfo, { id })
      return data
    },

    //浏览记录
    * getCustomerGlance({ currPage, pageSize }, { call }) {
      const data = yield call(getCustomerGlance, { currPage, pageSize })
      return data
    },

    //反馈
    * feedback({ text='', image=[], video=[] }, { call }) {
      yield call(feedback, { text, image, video })
    },

    //用户反馈发送预查
    * preCheckFeedback(_, { call }) {
      const data = yield call(preCheckFeedback)
      return data
    },

    //修改用户名
    * putUsername({ value }, { call }) {
      yield call(putUsername, { value })
    },

    //修改头像
    * putAvatar({ value }, { call }) {
      yield call(putAvatar, { value })
    },

    //电影详情
    * getCustomerMovieDetail({ id }, { call }) {
      const data = yield call(getCustomerMovieDetail, id)
      return data
    },

    //收藏电影
    * putStore({ id }, { call }) {
      yield call(putStore, id)
    },

    //取消收藏电影
    * cancelStore({ id }, { call }) {
      yield call(cancelStore, id)
    },

    //评分
    * putRate({ id, value }, { call }) {
      yield call(putRate, { id, value })
    },

    //评论用户
    * postCommentToUser({ id, content: { text='', image=[], video=[] } }, { call }) {
      yield call(postCommentToUser, { id, content: { text, image, video } })
    },

    //评论电影
    * postCommentToMovie({ id, content: { text='', image=[], video=[] } }, { call }) {
      yield call(postCommentToMovie, { id, content: { text, image, video } })
    },

    //点赞
    * putLike({ id }, { call }) {
      yield call(putLike, id)
    },

    //取消点赞
    * cancelLike({ id }, { call }) {
      yield call(cancelLike, id)
    },

    //获取他人用户信息
    * getCustomerUserInfo({ id }, { call }) {
      const data = yield call(getCustomerUserInfo, id)
      return data
    },

    //获取他人评论信息
    * getCustomerUserComment({ id, currPage, pageSize }, { call }) {
      const data = yield call(getCustomerUserComment, { id, currPage, pageSize })
      return data
    }

  },
  reducers: {
    setData(state, {payload}) {
      return {...state, ...payload}
    }
  }
}