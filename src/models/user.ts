import {
    getAttention,
    gotolike,
    publishComment,
    sendRate,
    getRecord,
    getNews,
    getUserComment,
    toAttention,
    answerComment
} from '~services'
export default {
    namespace: 'user',
    state: {
        //评论
        comment:[],

        //关注
        attention: []
    },
    effects: {
        //点赞
        * like({comment, user}, {call, put}) {
            const response = yield call(gotolike, comment, user)
            return response
        },

        //发布评论
        * publishComment({movie, user}, {call, put}) {
            const response = yield call(publishComment, movie, user)
            return response
        },  

        //电影评分
        * sendRate({value, user, movie}, {call, put}) {
            const response = yield call(sendRate, value, user, movie)
            return response
        },

        //收藏
        * getRecord({id}, {call, put}) {
            const record = yield call(getRecord, id)
            return record
        },

        //通知
        * getNews({id}, {call, put}) {
            const news = yield call(getNews, id)
            return news
        },

        //回复用户评论
        * publishUserComment({content, user, mine}, {call, put}) {
            const response = yield call(answerComment, content, user, mine)
            return response
        },

        //获取用户评论
        * getUserComment({id}, {call, put}) {   
            const comment = yield call(getUserComment, id)
            yield put({type: 'setData', payload: {comment}})
        },

        //关注
        * toAttention({user, mine, isAttention=false}, {call, put}) {
            const response = yield call(toAttention, user, mine, isAttention)
            return response
        },

        //获取关注
        * getAttention({id}, {call, put}) {
            const attention = yield call(getAttention, id)
            return attention
        }
    },
    reducers: {
        setData(state, {payload}) {
            return {...state, ...payload}
        }
    }
}