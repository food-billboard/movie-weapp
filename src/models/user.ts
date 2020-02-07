import {
    getAttention,
    gotolike,
    publishComment,
    sendRate,
    getRecord,
    getNews,
    getUserComment,
    toAttention,
    answerComment,
    sendStore,
    getIsAttention
} from '~services'
var a = 0
export default {
    namespace: 'user',
    state: {
        
    },
    effects: {
        //点赞
        * like({comment, user, mine}, {call, put}) {
            return 
            const response = yield call(gotolike, comment, user, mine)
            return response
        },

        //发布评论
        * publishComment({value, movie, user}, {call, put}) {
            return

            
            const response = yield call(publishComment, value, movie, user)
            return response
        },  

        //电影评分
        * sendRate({value, user, movie}, {call, put}) {
            return {
                rate: 9
            }

            const response = yield call(sendRate, value, user, movie)
            return response
        },

        //电影收藏
        * sendStore({user, movie}, { call, put }) {
            return {
                store: false
            }

            const response = yield call(sendStore, user, movie)
        },

        //获取收藏
        * getRecord({id}, {call, put}) {
            if(a==0) {
                a++
                return [
                    {
                        id: 0,
                        name: '电影1',
                        image: 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 1,
                        name: '电影2',
                        image: 'http://img.zybus.com/uploads/allimg/140830/1-140S0155522-50.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 2,
                        name: '电影3',
                        image: 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 3,
                        name: '电影2',
                        image: 'http://img.zybus.com/uploads/allimg/140830/1-140S0155522-50.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 4,
                        name: '电影1',
                        image: 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 5,
                        name: '电影2',
                        image: 'http://img.zybus.com/uploads/allimg/140830/1-140S0155522-50.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 6,
                        name: '电影3',
                        image: 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 7,
                        name: '电影2',
                        image: 'http://img.zybus.com/uploads/allimg/140830/1-140S0155522-50.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 8,
                        name: '电影1',
                        image: 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 9,
                        name: '电影2',
                        image: 'http://img.zybus.com/uploads/allimg/140830/1-140S0155522-50.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 10,
                        name: '电影3',
                        image: 'http://a0.att.hudong.com/16/12/01300535031999137270128786964.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 11,
                        name: '电影2',
                        image: 'http://img.zybus.com/uploads/allimg/140830/1-140S0155522-50.jpg',
                        detail: '这里是描述'
                    }
                ]
            }else if(a===1) {
                a++
                return [
                    {
                        id: 12,
                        name: '电影1111',
                        image: 'http://a4.att.hudong.com/20/62/01000000000000119086280352820.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 13,
                        name: '电影5',
                        image: 'http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 14,
                        name: '电影6',
                        image: 'http://a4.att.hudong.com/20/62/01000000000000119086280352820.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 15,
                        name: '电影7',
                        image: 'http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 16,
                        name: '电影4',
                        image: 'http://a4.att.hudong.com/20/62/01000000000000119086280352820.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 17,
                        name: '电影5',
                        image: 'http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 18,
                        name: '电影6',
                        image: 'http://a4.att.hudong.com/20/62/01000000000000119086280352820.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 19,
                        name: '电影7',
                        image: 'http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 20,
                        name: '电影4',
                        image: 'http://a4.att.hudong.com/20/62/01000000000000119086280352820.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 21,
                        name: '电影5',
                        image: 'http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 22,
                        name: '电影6',
                        image: 'http://a4.att.hudong.com/20/62/01000000000000119086280352820.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 23,
                        name: '电影7',
                        image: 'http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg',
                        detail: '这里是描述'
                    },
                ]
            }else if(a==2) {
                a++
                return [
                    {
                        id: 8,
                        name: '电影1',
                        image: 'http://01.minipic.eastday.com/20170408/20170408143858_c25cfaadbcee035e31fc7606a06fba47_3.jpeg',
                        detail: '这里是描述'
                    },
                    {
                        id: 9,
                        name: '电影2',
                        image: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                        detail: '这里是描述'
                    },
                    {
                        id: 10,
                        name: '电影3',
                        image: 'http://01.minipic.eastday.com/20170408/20170408143858_c25cfaadbcee035e31fc7606a06fba47_3.jpeg',
                        detail: '这里是描述'
                    },
                    {
                        id: 11,
                        name: '电影2',
                        image: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                        detail: '这里是描述'
                    },
                ]
            }else {
                return []
            }
            const record = yield call(getRecord, id)
            return record
        },

        //通知
        * getNews({id}, {call, put}) {
            const news = yield call(getNews, id)
            return news
        },

        //回复用户评论
        * publishUserComment({commentId, content, user, mine}, {call, put}) {
            const response = yield call(answerComment, commentId, content, user, mine)
            return response
        },

        //获取用户评论
        * getUserComment({id}, {call, put}) {   
            const comment = yield call(getUserComment, id)
            yield put({type: 'setData', payload: {comment}})
        },

        //关注
        * toAttention({user, mine, isAttention=false}, {call, put}) {

            return {
                attention: false
            }

            const response = yield call(toAttention, user, mine, isAttention)
            return response
        },

        //获取关注
        * getAttention({id}, {call, put}) {

            if(a===0) {
                a++
                return [
                    {
                        id: 0,
                        name: '用户名',
                        image: 'http://b-ssl.duitang.com/uploads/item/201612/18/20161218182807_uzGxY.jpeg'
                    },
                    {
                        id: 1,
                        name: '用户名',
                        image: 'http://b-ssl.duitang.com/uploads/item/201612/18/20161218182807_uzGxY.jpeg'
                    },
                    {
                        id: 2,
                        name: '用户名',
                        image: 'http://b-ssl.duitang.com/uploads/item/201612/18/20161218182807_uzGxY.jpeg'
                    },
                    {
                        id: 3,
                        name: '用户名',
                        image: 'http://b-ssl.duitang.com/uploads/item/201612/18/20161218182807_uzGxY.jpeg'
                    },
                    {
                        id: 4,
                        name: '用户名',
                        image: 'http://img0.imgtn.bdimg.com/it/u=246040416,1581641406&fm=26&gp=0.jpg'
                    },
                    {
                        id: 5,
                        name: '用户名',
                        image: 'http://img0.imgtn.bdimg.com/it/u=246040416,1581641406&fm=26&gp=0.jpg'
                    },
                    {
                        id: 6,
                        name: '用户名',
                        image: 'http://img0.imgtn.bdimg.com/it/u=246040416,1581641406&fm=26&gp=0.jpg'
                    },
                    {
                        id: 7,
                        name: '用户名',
                        image: 'http://img0.imgtn.bdimg.com/it/u=246040416,1581641406&fm=26&gp=0.jpg'
                    },
                    {
                        id: 8,
                        name: '用户名',
                        image: 'http://img0.imgtn.bdimg.com/it/u=246040416,1581641406&fm=26&gp=0.jpg'
                    },
                    {
                        id: 9,
                        name: '用户名',
                        image: 'http://img0.imgtn.bdimg.com/it/u=246040416,1581641406&fm=26&gp=0.jpg'
                    },
                    {
                        id: 10,
                        name: '用户名',
                        image: 'http://tupian.qqjay.com/tou2/2018/1219/0cd5bc06f89a0269f9bc9a9fdbcd4e40.jpg'
                    },
                    {
                        id: 11,
                        name: '用户名',
                        image: 'http://tupian.qqjay.com/tou2/2018/1219/0cd5bc06f89a0269f9bc9a9fdbcd4e40.jpg'
                    },
                    {
                        id: 12,
                        name: '用户名',
                        image: 'http://img0.imgtn.bdimg.com/it/u=246040416,1581641406&fm=26&gp=0.jpg'
                    },
                    {
                        id: 13,
                        name: '用户名',
                        image: 'http://img0.imgtn.bdimg.com/it/u=246040416,1581641406&fm=26&gp=0.jpg'
                    },
                    {
                        id: 14,
                        name: '用户名',
                        image: 'http://img0.imgtn.bdimg.com/it/u=246040416,1581641406&fm=26&gp=0.jpg'
                    },
                    {
                        id: 15,
                        name: '用户名',
                        image: 'http://img0.imgtn.bdimg.com/it/u=246040416,1581641406&fm=26&gp=0.jpg'
                    },
                    {
                        id: 16,
                        name: '用户名',
                        image: 'http://img0.imgtn.bdimg.com/it/u=246040416,1581641406&fm=26&gp=0.jpg'
                    },
                    {
                        id: 17,
                        name: '用户名',
                        image: 'http://img0.imgtn.bdimg.com/it/u=246040416,1581641406&fm=26&gp=0.jpg'
                    },
                    {
                        id: 18,
                        name: '用户名',
                        image: 'http://img0.imgtn.bdimg.com/it/u=246040416,1581641406&fm=26&gp=0.jpg'
                    },
                    {
                        id: 19,
                        name: '用户名',
                        image: 'http://img0.imgtn.bdimg.com/it/u=246040416,1581641406&fm=26&gp=0.jpg'
                    }
                ]
            }else if(a===1) {
                a++
                return [
                    {
                        id: 20,
                        name: '用户名',
                        image: 'http://img0.imgtn.bdimg.com/it/u=246040416,1581641406&fm=26&gp=0.jpg'
                    },
                    {
                        id: 21,
                        name: '用户名',
                        image: 'http://img0.imgtn.bdimg.com/it/u=246040416,1581641406&fm=26&gp=0.jpg'
                    },
                    {
                        id: 22,
                        name: '用户名',
                        image: 'http://img0.imgtn.bdimg.com/it/u=246040416,1581641406&fm=26&gp=0.jpg'
                    }
                ]
            }else {
                return []
            }

            const attention = yield call(getAttention, id)
            return attention
        },

        //判断是否为关注
        * getIsAttention({user, mine}, { call, put }) {
            
            return {
                attention: true
            }

            const data = yield call(getIsAttention, user, mine)
            return data
        }
    },
    reducers: {
        setData(state, {payload}) {
            return {...state, ...payload}
        }
    }
}