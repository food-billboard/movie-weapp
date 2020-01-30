import {
    getHot,
    getSwiper,
    getType,
    getDailyNew,
    getRank,
    getComment,
    factorSelect,
    getTypeDetail,
    getCommentHeader,
    getDetail,
    sort
} from '~services'
export default {
    namespace: 'movie',
    state: {

        //热搜
        hot: [],

        //分类
        type: [],
        
        //排行榜
        rank: [],
        
        //评论
        comment: [],
        
        //搜索结果
        search: []
    },
    effects: {
        //获取热搜
        * getHot(_, {call, put}) {
            const hot = yield call(getHot)
            yield put({type: 'setData', payload: {hot}})
            return hot
        },

        //获取轮播图
        * getSwiper({count}, {call, put}) {
            const swiper = yield call(getSwiper, count)
            return swiper
        },

        //获取分类条目
        * getSwitch({count}, {call, put}) {
            const type = yield call(getType, count)
            yield put({type: 'setData', payload: {type}})
            return type
        },

        //获取分类具体信息
        * getSwitchDetail({type}, {call, put}) {
            const typeDetail = yield call(getTypeDetail, type)
            return typeDetail
        },

        //获取每日上新
        * getDailyNew({count}, {call, put}) {
            const daily = yield call(getDailyNew, count)
            return daily
        },

        //获取排行榜
        * getRank({rankName}, {call, put}) {
            const rank = yield call(getRank, rankName)
            yield put({type: 'setData', payload: {rank}})
            return rank
        },

        //获取评论
        * getComment({movie}, {call, put}) {
            const comment = yield call(getComment, movie)
            yield put({type: 'setData', payload: {comment}})
            return comment
        },

        //搜索结果筛选
        * factorSelect({factor}, {call, put}) {     
            const item = yield call(factorSelect, factor)
            // yield put({type: 'setData', payload: {search: item}})
            return item
        },

        //获取评论头
        * getCommentHeader({id}, {call, put}) {
            const header = yield call(getCommentHeader, id)
            return header
        },

        //获取电影详情
        * getDetail({id}, {call, put}) {
            const detail = yield call(getDetail, id)
            return detail
        },

        //排序
        * sort({query}, {call, put}) {
            const response = yield call(sort, query)
            return response
        }
    },
    reducers: {
        setData(state, {payload}) {
            return {...state, ...payload}
        }
    }
}