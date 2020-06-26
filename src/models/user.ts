import {
  getUserInfo,
  getUserFans,
  getUserComment,
  getUserAttention,
  getUserMovie,
  getUserGlance,
  getUserStore,
  getDailyNew,
  getHot,
  getNotice,
  getRank,
  signin,
  register,
  signout,
  getClassify,
  getClassifyList,
  getUserMovieDetail,
  getCommentSimple,
  getMovieDetailSimple,
  getMovieCommentList,
  getMovieCommentDetail,
  getRankList,
  getRankType,
  getAppInfo
} from '~services'
import { findIndex } from 'lodash'

// const editNews = (news, newData) => {
//     let origin = [...news]
//     if(!origin.length) return newData
//     let newList: any[] = []
//     let newNews: any[] = []
//     let count = 0

//     newData.map((val: any, ind: number) => {
//         const { id, list, type } = val

//         origin.map((value: any, index: number) => {
//             const { id: originId, list: originList, type: originType } = value
//             if(originId == id && originType == type) {
//                 newList = [ ...list, ...originList ]
//                 origin[index]['list'] = [ ...newList ]
//             }else {
//                 count ++
//             }
//             newList = []
//         })

//         if(count == origin.length) {
//             origin = [...origin, newData[ind]]
//         }
//         count = 0
//     })

//     return origin
// }

export default {
    namespace: 'user',
    state: {
        issueSet: {
            isIssue: false,
            id: false
        },
        news: [],
        hasNews: false
    },
    effects: {

      //用户信息
      * getUserInfo({ id }, { call }) {
        const data = yield call(getUserInfo, id)
        return data
      },

      //其他用户粉丝
      * getUserFans({ id, currPage, pageSize }, { call }) {
        const data = yield call(getUserFans, { id, currPage, pageSize })
        return data
      },

      //其他用户评论
      * getUserComment({ id, currPage, pageSize }, { call }) {
        const data = yield call(getUserComment, { id, currPage, pageSize })
        return data
      },

      //其他用户关注
      * getUserAttention({ id, currPage, pageSize }, { call }) {
        const data = yield call(getUserAttention, { id, currPage, pageSize })
        return data
      },

      //其他用户发布的电影
      * getUserMovie({ id, currPage, pageSize }, { call }) {
        const data = yield call(getUserMovie, { id, currPage, pageSize })
        return data
      },

      //其他用户浏览记录
      * getUserGlance({ id, currPage, pageSize }, { call }) {
        const data = yield call(getUserGlance, { id, currPage, pageSize })
        return data
      },

      //其他用户收藏的电影
      * getUserStore({ id, currPage, pageSize }, { call }) {
        const data = yield call(getUserStore, { id, currPage, pageSize })
        return data
      },

      //每日上新
      * getDailyNew({ count }, { call }) {
        const data = yield call(getDailyNew, count)
        return data
      },

      //热搜
      * getHot({ count }, { call }) {
        const data = yield call(getHot, count)
        return data
      },

      //跑马灯
      * getNotice(_, { call }) {
        const data = yield call(getNotice)
        return data
      },

      //排行榜(首页)
      * getRank({ count }, { call }) {
        const data = yield call(getRank, count)
        return data
      },

      //专题
      * getSpecial({ id }, { call }) {
        const data = yield call(getRank, id)
        return data
      },

      //轮播图
      * getSwiper({ count }, { call }) {
        const data = yield call(getRank, count)
        return data
      },
      
      //登录
      * signin({ mobile, password, uid }, { call, put }) {
        const data = yield call(signin, { mobile, password, uid })
        yield put({ type: 'setData', payload: { userInfo: data } })
        return data
      },

      //注册
      * register({ mobile, password, uid }, { call, put }) {
        const data = yield call(register, { mobile, password, uid })
        yield put({ type: 'setData', payload: { userInfo: data } })
        return data
      },

      //退出
      * signout(_, { call }) {
        yield call(signout)
      },

      //分类(首页)
      * getClassify({ count }, { call }) {
        const data = yield call(getClassify, count)
        return data
      },

      //分类列表
      * getClassifyList({ id, currPage, pageSize, sort }, { call }) {
        const data = yield call(getClassifyList, { id, currPage, pageSize, sort })
        return data
      },

      //电影详情
      * getUserMovieDetail({ id }, { call }) {
        const data = yield call(getUserMovieDetail, id)
        return data
      },

      //简易评论(电影页面)
      * getCommentSimple({ id, count }, { call }) {
        const data = yield call(getCommentSimple, { id, count })
        return data
      },

      //电影详情简易
      * getMovieDetailSimple({ id }, { call }) {
        const data = yield call(getMovieDetailSimple, id)
        return data
      },

      //电影评论列表
      * getMovieCommentList({ id, currPage, pageSize }, { call }) {
        const data = yield call(getMovieDetailSimple, { id, currPage, pageSize })
        return data
      },

      //电影评论详情
      * getMovieCommentDetail({ id, currPage, pageSize }, { call }) {
        const data = yield call(getMovieCommentDetail, { id, currPage, pageSize })
        return data
      },

      //排行榜
      * getRankList({ id, currPage, pageSize }, { call }) {
        const data = yield call(getRankList, { id, currPage, pageSize })
        return data
      },

      //排行榜列表
      * getRankType({ count }, { call }) {
        const data = yield call(getRankType, count)
        return data
      },

      //小程序信息
      * getAppInfo(_, { call }) {
        const data = yield call(getAppInfo)
        return data
      }

    },
    reducers: {
      setData(state, {payload}) {
          return {...state, ...payload}
      },
    }
}