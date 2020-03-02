import {
    getAttention,
    gotolike,
    publishComment,
    sendRate,
    getRecord,
    getNews,
    getNewsDetail,
    getUserComment,
    toAttention,
    answerComment,
    sendStore,
    getStore,
    feedback,
    getIsStore,
    getIssue,
    editIssue,
    sendIssue,
    getUserFans,
    sendNews,
    deleteNews,
    readNews
} from '~services'
import { findIndex } from 'lodash'

const editNews = (news, newData) => {
    let origin = [...news]
    if(!origin.length) return newData
    let newList: any[] = []
    let newNews: any[] = []
    let count = 0

    newData.map((val: any, ind: number) => {
        const { id, list, type } = val

        origin.map((value: any, index: number) => {
            const { id: originId, list: originList, type: originType } = value
            if(originId == id && originType == type) {
                newList = [ ...list, ...originList ]
                origin[index]['list'] = [ ...newList ]
            }else {
                count ++
            }
            newList = []
        })

        if(count == origin.length) {
            origin = [...origin, newData[ind]]
        }
        count = 0
    })

    return origin
}

var a = 0
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

        //临时获取新消息
        * _getnews({data}, {call, put}) {
            yield put({type: 'editData', data: 'news', callback: (news) => {
                return editNews(news, data)
            }})
        },

        //点赞
        * like({comment, user, mine}, {call, put}) {
            return {
                success: true,
                data: {}
            }
            return

            const response = yield call(gotolike, comment, user, mine)
            return response
        },

        //发布评论
        * publishComment({value, movie, user}, {call, put}) {
            let data = {
                success: true,
                data: {}
            }
            return

            
            const response = yield call(publishComment, value, movie, user)
            return response
        },  

        //电影评分
        * sendRate({value, user, movie}, {call, put}) {
            let data = {
                success: true,
                data: {
                    rate: 9
                }
            }
            return

            const response = yield call(sendRate, value, user, movie)
            return response
        },

        //电影收藏
        * sendStore({user, movie}, { call, put }) {
            let data = {
                success: true,
                data: {}
            }
            return

            const response = yield call(sendStore, user, movie)
            return response
        },

        //获取浏览记录
        * getRecord({query}, {call, put}) {
            let data
            if(a==0) {
                a=0
                data = {
                    success: true,
                    data: {
                        data:[
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
            }
            }
            }else if(a===1) {
                a=0
                data = {
                    success: true,
                    data: {
                        data: [
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
            }
            }
            }else if(a==2) {
                a=0
                data = {
                    success: true,
                    data: {
                        data:[
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
            }
            }
            }else {
                data = {
                    success: true,
                    data: {
                        data: []
                    }
                }
            }
            return data.data

            const record = yield call(getRecord, query)
            return record
        },

        //获取历史记录通知
        * getNews({id}, {call, put}) {
            let d = {
                success: true,
                data: {
                    data: [
                        {
                            id: '已读消息',
                            image: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                            username: '这是条已读消息应该在下面',
                            type: 'attention',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: true,
                                    time: 111111111111
                                }
                            ]
                        },
                        {
                            id: '未读第一条',
                            image: 'http://01.minipic.eastday.com/20170408/20170408143858_c25cfaadbcee035e31fc7606a06fba47_3.jpeg',
                            username: '未读第一条',
                            type: 'app',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 11111111111
                                },
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: '未读第2条',
                            image: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                            username: '发送人用户名',
                            type: 'attention',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: '未读第3条',
                            image: 'http://01.minipic.eastday.com/20170408/20170408143858_c25cfaadbcee035e31fc7606a06fba47_3.jpeg',
                            username: '未读第二条',
                            type: 'app',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 11111111111
                                },
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                },
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: '未读第4条',
                            image: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                            username: '发送人用户名',
                            type: 'attention',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: '未读第5条',
                            image: 'http://01.minipic.eastday.com/20170408/20170408143858_c25cfaadbcee035e31fc7606a06fba47_3.jpeg',
                            username: '发送人用户名',
                            type: 'app',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                },
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: '未读第6条',
                            image: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                            username: '发送人用户名',
                            type: 'attention',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: '未读第7条',
                            image: 'http://01.minipic.eastday.com/20170408/20170408143858_c25cfaadbcee035e31fc7606a06fba47_3.jpeg',
                            username: '发送人用户名',
                            type: 'app',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                },
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: '未读第8条',
                            image: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                            username: '发送人用户名',
                            type: 'attention',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: 'id',
                            image: 'http://01.minipic.eastday.com/20170408/20170408143858_c25cfaadbcee035e31fc7606a06fba47_3.jpeg',
                            username: '发送人用户名',
                            type: 'app',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                },
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: 'id',
                            image: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                            username: '发送人用户名',
                            type: 'attention',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: 'id',
                            image: 'http://01.minipic.eastday.com/20170408/20170408143858_c25cfaadbcee035e31fc7606a06fba47_3.jpeg',
                            username: '发送人用户名',
                            type: 'app',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                },
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: 'id',
                            image: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                            username: '发送人用户名',
                            type: 'attention',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: 'id',
                            image: 'http://01.minipic.eastday.com/20170408/20170408143858_c25cfaadbcee035e31fc7606a06fba47_3.jpeg',
                            username: '发送人用户名',
                            type: 'app',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                },
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: 'id',
                            image: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                            username: '发送人用户名',
                            type: 'attention',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: 'id',
                            image: 'http://01.minipic.eastday.com/20170408/20170408143858_c25cfaadbcee035e31fc7606a06fba47_3.jpeg',
                            username: '发送人用户名',
                            type: 'app',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                },
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: 'id',
                            image: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                            username: '发送人用户名',
                            type: 'attention',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: 'id',
                            image: 'http://01.minipic.eastday.com/20170408/20170408143858_c25cfaadbcee035e31fc7606a06fba47_3.jpeg',
                            username: '发送人用户名',
                            type: 'app',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                },
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: 'id',
                            image: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                            username: '发送人用户名',
                            type: 'attention',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                        {
                            id: 'id',
                            image: 'http://01.minipic.eastday.com/20170408/20170408143858_c25cfaadbcee035e31fc7606a06fba47_3.jpeg',
                            username: '发送人用户名',
                            type: 'app',
                            list: [
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                },
                                {
                                    description: '这里是详细描述信息，你想看的话可以看一下',
                                    read: false,
                                    time: 111111111
                                }
                            ]
                        },
                    ]
                }
            }
            yield put({type: 'editData', data: 'news', callback: (news) => {
                return editNews(news, d.data.data)
            }})
            return

            const news = yield call(getNews, id)
            yield put({type: 'setData', payload: {news: news}})
        },

        //发送消息
        * sendNews({data}, {call, put}) {
            let d = {
                success: true,
                data: {
                    res: 'success',
                    id: '消息id'
                }
            }
            return d.data

            const res = yield call(sendNews, data)
            return res
        },

        //删除通知
        * deleteNews({id, date}, {call, put}) {
            let d = {
                success: true,
                data: {
                    res: 'success',
                    id: '消息id'
                }
            }
            yield put({type: 'editData', data: 'news', callback: (news) => {
                const list = [...news]
                const index= findIndex(list, (val: any) => {
                    const { id: user } = val
                    return user === id
                })
                if(index < 0) return news
                list.splice(index, 1)
                return list
            }})
            return d.data

            const res = yield call(deleteNews, id, date)
            return res
        },

        //阅读通知
        * readNews({id, date}, {call, put}) {
            let d = {
                success: true,
                data: {
                    res: 'success',
                    id: '消息id'
                }
            }
            yield put({type: 'editData', data: 'news', callback: (news) => {
                const list = [...news]
                const index = findIndex(list, (val: any) => {
                    const { id: user } = val
                    return id === user
                })
                if(index < 0) return news
                
                list[index]['list'].map((val: any) => {
                    const { time } = val
                    // if(time < date) {
                        val.read = true
                    // }
                })
                return list
            }})
            return d.data

            const res = yield call(readNews, id, date)
            return res
        },

        //通知详情
        * getNewsDetail({query}, {call, put}) {
            const d = {
                success: true,
                data: {
                    info: {
                        id: '用户id',
                        image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg',
                        username: '用户名',
                        data: [
                            {
                                content: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg',
                                type: 'image',
                                time: 11111111111111,
                                username: '用户',
                                id: '用户id',
                                image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg'
                            },
                            {
                                content: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg',
                                type: 'video',
                                time: 11111111111111,
                                username: '用户',
                                id: '用户id',
                                image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg'
                            },
                            {
                                content: '内容内容内容内容内容内容内容内容内容内容内容内容',
                                type: 'text',
                                time: 11111111111111,
                                username: '用户',
                                id: '用户id',
                                image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg'
                            },
                            {
                                content: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg',
                                type: 'audio',
                                time: 11111111111111,
                                username: '用户',
                                id: '用户id',
                                image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg'
                            },
                            {
                                content: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg',
                                type: 'image',
                                time: 11111111111111,
                                username: '用户',
                                id: '用户id',
                                image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg'
                            }
                        ]
                    }
                }
            }

            return d.data

            const response = yield call(getNewsDetail, query)
            return response
        },

        //回复用户评论
        * publishUserComment({commentId, value, user, mine}, {call, put}) {

            let data = {
                success: true,
                data: {}
            }
            return

            const response = yield call(answerComment, commentId, value, user, mine)
            return response
        },

        //获取用户评论
        * getUserComment({ query }, {call, put}) {  

            let data
            if(a===0) {
                a=0
                data = {
                    success: true,
                    data: {
                        id: '用户id',
                    comment: [
                        {
                            user: {
                                name: '用户名',
                                time: '2020',
                                image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg',
                                id: '用户id',
                                content: '评论内容',
                                hot: 1000,
                                isHot: false
                            },
                            commentUsers: [
                                {
                                    iamge: 'http://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg',
                                    id: '用户id'
                                }
                            ],
                            id: '评论id',
                            media: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                }
                            ],
                            origin: {
                                id: '评论id',
                                origin: true,
                                image: '',
                                content: '原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容'
                            }
                        },
                        {
                            user: {
                                name: '用户名',
                                time: '2020',
                                image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg',
                                id: '用户id',
                                content: '评论内容',
                                hot: 1000,
                                isHot: false
                            },
                            commentUsers: [
                                {
                                    iamge: 'http://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg',
                                    id: '用户id'
                                }
                            ],
                            id: '评论id',
                            media: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                }
                            ],
                            origin: {
                                id: '评论id',
                                origin: true,
                                image: '',
                                content: '原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容'
                            }
                        },
                        {
                            user: {
                                name: '用户名',
                                time: '2020',
                                image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg',
                                id: '用户id',
                                content: '评论内容',
                                hot: 1000,
                                isHot: false
                            },
                            commentUsers: [
                                {
                                    iamge: 'http://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg',
                                    id: '用户id'
                                }
                            ],
                            id: '评论id',
                            media: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    type: 'image'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    type: 'image'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    type: 'image'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    type: 'image'
                                }
                            ],
                            origin: {
                                id: '评论id',
                                origin: true,
                                image: '',
                                content: '原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容'
                            }
                        },
                        {
                            user: {
                                name: '用户名',
                                time: '2020',
                                image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg',
                                id: '用户id',
                                content: '评论内容',
                                hot: 1000,
                                isHot: false
                            },
                            commentUsers: [
                                {
                                    iamge: 'http://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg',
                                    id: '用户id'
                                }
                            ],
                            id: '评论id',
                            media: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                }
                            ],
                            origin: {
                                id: '评论id',
                                origin: true,
                                image: '',
                                content: '原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容'
                            }
                        },
                        {
                            user: {
                                name: '用户名',
                                time: '2020',
                                image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg',
                                id: '用户id',
                                content: '评论内容',
                                hot: 1000,
                                isHot: false
                            },
                            commentUsers: [
                                {
                                    iamge: 'http://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg',
                                    id: '用户id'
                                }
                            ],
                            id: '评论id',
                            media: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                }
                            ],
                            origin: {
                                id: '评论id',
                                origin: true,
                                image: '',
                                content: '原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容'
                            }
                        },
                        {
                            user: {
                                name: '用户名',
                                time: '2020',
                                image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg',
                                id: '用户id',
                                content: '评论内容',
                                hot: 1000,
                                isHot: false
                            },
                            commentUsers: [
                                {
                                    iamge: 'http://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg',
                                    id: '用户id'
                                }
                            ],
                            id: '评论id',
                            media: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                }
                            ],
                            origin: {
                                id: '评论id',
                                origin: true,
                                image: '',
                                content: '原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容'
                            }
                        },
                        {
                            user: {
                                name: '用户名',
                                time: '2020',
                                image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg',
                                id: '用户id',
                                content: '评论内容',
                                hot: 1000,
                                isHot: false
                            },
                            commentUsers: [
                                {
                                    iamge: 'http://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg',
                                    id: '用户id'
                                }
                            ],
                            id: '评论id',
                            media: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                }
                            ],
                            origin: {
                                id: '评论id',
                                origin: true,
                                image: '',
                                content: '原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容'
                            }
                        },
                        {
                            user: {
                                name: '用户名',
                                time: '2020',
                                image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg',
                                id: '用户id',
                                content: '评论内容',
                                hot: 1000,
                                isHot: false
                            },
                            commentUsers: [
                                {
                                    iamge: 'http://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg',
                                    id: '用户id'
                                }
                            ],
                            id: '评论id',
                            media: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    type: 'image'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    type: 'image'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    type: 'image'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    type: 'image'
                                }
                            ],
                            origin: {
                                id: '评论id',
                                origin: true,
                                image: '',
                                content: '原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容'
                            }
                        },
                        {
                            user: {
                                name: '用户名',
                                time: '2020',
                                image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg',
                                id: '用户id',
                                content: '评论内容',
                                hot: 1000,
                                isHot: false
                            },
                            commentUsers: [
                                {
                                    iamge: 'http://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg',
                                    id: '用户id'
                                }
                            ],
                            id: '评论id',
                            media: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                }
                            ],
                            origin: {
                                id: '评论id',
                                origin: true,
                                image: '',
                                content: '原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容'
                            }
                        },
                        {
                            user: {
                                name: '用户名',
                                time: '2020',
                                image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg',
                                id: '用户id',
                                content: '评论内容',
                                hot: 1000,
                                isHot: false
                            },
                            commentUsers: [
                                {
                                    iamge: 'http://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg',
                                    id: '用户id'
                                }
                            ],
                            id: '评论id',
                            media: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    type: 'image'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    type: 'image'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    type: 'image'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    type: 'image'
                                }
                            ],
                            origin: {
                                id: '评论id',
                                origin: true,
                                image: '',
                                content: '原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容'
                            }
                        }
                    ]
                }
                }
            }else if(a===1) {
                a=0
                data = {
                    success: true,
                    data: {
                        id: '用户id',
                    comment: [
                        {
                            user: {
                                name: '用户名',
                                time: '2020',
                                image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg',
                                id: '用户id',
                                content: '评论内容',
                                hot: 1000,
                                isHot: false
                            },
                            commentUsers: [
                                {
                                    iamge: 'http://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg',
                                    id: '用户id'
                                }
                            ],
                            id: '评论id',
                            media: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                }
                            ],
                            origin: {
                                id: '评论id',
                                origin: true,
                                image: '',
                                content: '原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容'
                            }
                        },
                        {
                            user: {
                                name: '用户名',
                                time: '2020',
                                image: 'http://cdn.duitang.com/uploads/item/201610/26/20161026123307_Etf8L.jpeg',
                                id: '用户id',
                                content: '评论内容',
                                hot: 1000,
                                isHot: false
                            },
                            commentUsers: [
                                {
                                    iamge: 'http://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg',
                                    id: '用户id'
                                }
                            ],
                            id: '评论id',
                            media: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id',
                                    type: 'image',
                                    src: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg'
                                }
                            ],
                            origin: {
                                id: '评论id',
                                origin: true,
                                image: '',
                                content: '原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容原始评论给内容'
                            }
                        }
                    ]
                }
                }
            }else {
                data = {
                    success: true,
                    data: {
                    id: '用户id',
                    comment: []
                    }
                }
            }
            return data.data
            
            const comment = yield call(getUserComment, query)
            return comment
        },

        //关注
        * toAttention({user, mine, isAttention=false}, {call, put}) {

            let data = {
                success: true,
                data: {}
            }
            return data.success

            const response = yield call(toAttention, user, mine, isAttention)
            return response
        },

        //获取关注
        * getAttention({query}, {call, put}) {
            let data
            if(a===0) {
                a=0
                data = {
                    success: true,
                    data: {
                        data: [
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
            }
        }
            }else if(a===1) {
                a=0
                data = {
                    success: true,
                    data: {
                        data: [
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
            }
        }
            }else {
                data = {
                    success: true,
                    data: {
                        data: []
                    }
                }
            }

            return data.data

            const attention = yield call(getAttention, query)
            return attention
        },

        //获取关注
        * getUserFans({query}, {call, put}) {
            let data
            if(a===0) {
                a=0
                data = {
                    success: true,
                    data: {
                        data: [
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
            }
        }
            }else if(a===1) {
                a=0
                data = {
                    success: true,
                    data: {
                        data: [
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
            }
        }
            }else {
                data = {
                    success: true,
                    data: {
                        data: []
                    }
                }
            }

            return data.data

            const fans = yield call(getUserFans, query)
            return fans
        },
        
        //用户反馈
        * feedback({ user, value }, { call, put }) {

            return {
                success: true,
                data: {}
            }
            return 

            const response = yield call(feedback, user, value)
            return response
        },

        //获取收藏
        * getStore({query}, { call, put }) {
            let data
            if(a==0) {
                a=0
                data = {
                    success: true,
                    data: {
                        data:[
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
            }
            }
            }else if(a===1) {
                a=0
                data = {
                    success: true,
                    data: {
                        data: [
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
            }
            }
            }else if(a==2) {
                a=0
                data = {
                    success: true,
                    data: {
                        data:[
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
            }
            }
            }else {
                data = {
                    success: true,
                    data: {
                        data: []
                    }
                }
            }
            return data.data

            const response = yield call(getStore, query)
            return response
        },

        //获取是否收藏
        * getIsStore({movie, user}, { call, put }) {

            let d = {
                success: true,
                data: {
                    store: false,
                    id: '电影id'
                }
            }
            return d.data

            const data = yield call(getIsStore, movie, user)
            return data
        },

        //修改issue的设置
        * setIssue({value}, { call, put }) {
            yield put({ type:'setData', payload: { issueSet: value } })
        },

        //获取用户issue
        * getIssue({query}, { call, put }) {

            let d
            if(a===0) {
                a=0
                d = {
                    success: true,
                    data: {
                        id: '用户id',
                        detail: [
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            }
                        ]
                    }
                }
            }else if(a===1) {
                a=0
                d = {
                    success: true,
                    data: {
                        id: '用户id',
                        detail: [
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            },
                            {
                                id: '电影id',
                                image: 'http://b-ssl.duitang.com/uploads/item/201501/25/20150125095908_GvyWW.jpeg',
                                name: '电影名称',
                                type: ['电影类型'],
                                time: '2020',
                                hot: 1000
                            }
                        ]
                    }
                }
            }else {
                d = {
                    success: true,
                    data: {
                        id: '用户id',
                        detail: []
                    }
                }
            }
            return d.data

            const data = yield call(getIssue, query)
            return data
        },

        //修改issue
        * editIssue({ query }, { call, put }) {

            let d = {
                success: true,
                data: {
                    movie: {
                        id: '电影id',
                        video: {
                            src: '视频地址',
                            poster: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                            id: '视频id'
                        },
                        info: {
                            name: '电影名称',
                            area: [
                                {
                                    id: 0,
                                    value: '美国'
                                },
                                {
                                    id: 1,
                                    value: '英国'
                                }
                            ],
                            director: [
                                {
                                    id: 0,
                                    value: '葛凌峰'
                                },
                                {
                                    id: 1,
                                    value: 'gelingfeng'
                                }
                            ],
                            actor: [
                                {
                                    id: 0,
                                    value: '葛凌峰'
                                }
                            ],
                            type: [
                                {
                                    id: 0,
                                    value: '类型'
                                }
                            ],
                            time: '上线时间',
                            description: '电影描述',
                        },
                        image: [
                            {
                                img: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                                id: '这里是临时写的，没什么用，是海报id'
                            },
                            {
                                img: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                                id: '这里是临时写的，没什么用，是海报id'
                            },
                            {
                                img: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                                id: '这里是临时写的，没什么用，是海报id'
                            },
                            {
                                img: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                                id: '这里是临时写的，没什么用，是海报id'
                            },
                            {
                                img: 'http://www.33lc.com/article/UploadPic/2012-10/2012102514181086564.jpg',
                                id: '这里是临时写的，没什么用，是海报id'
                            }
                        ]
                    }
                }
            }
            return d.data

            const data = yield call(editIssue, query)
            return data
        },

        //发布issue
        * sendIssue({ value }, { call, put }) {
            let d = {
                success: true,
                data: {}
            }
            return d.success

            const data = yield call(sendIssue, value)
            return data
        }

    },
    reducers: {
        setData(state, {payload}) {
            return {...state, ...payload}
        },

        addData(state, { payload, data }) {
            return { ...state, [data] : [ ...state[data], ...payload[data] ] }
        },

        editData(state, { data, callback }) {
            const _data = callback(state[data])
            return { ...state, [data]: [ ..._data ] }
        }

    }
}