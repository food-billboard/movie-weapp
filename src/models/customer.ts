import {
  sendIssue,
  editIssue,
  getEditMovieInfo,
  putUsername,
  putAvatar,
} from '~services'

export default {
  namespace: 'customer',
  effects: {

    //发布电影
    * sendIssue(data, { call }) {
      yield call(sendIssue, data)
    },

    //修改电影
    * editIssue(data, { call }) {
      yield call(editIssue, data)
    },

    //电影修改的信息
    * getEditMovieInfo({ id }, { call }) {
      const data = yield call(getEditMovieInfo, { id })
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

  },
  reducers: {
    setData(state, {payload}) {
      return {...state, ...payload}
    }
  }
}