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
    getStore,
    feedback,
    getIsStore,
    getIssue,
    editIssue,
    sendIssue
} from '~services'
var a = 0
export default {
    namespace: 'user',
    state: {
        issueSet: {
            isIssue: false,
            id: false
        }
    },
    effects: {
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
                a++
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
                a++
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
                a++
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

        //通知
        * getNews({id}, {call, put}) {

            return {
                success: true,
                data: {
                    
                }
            }

            const news = yield call(getNews, id)
            return news
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
                a++
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
                            images: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                }
                            ]
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
                            images: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                }
                            ]
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
                            images: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                }
                            ]
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
                            images: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                }
                            ]
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
                            images: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                }
                            ]
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
                            images: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                }
                            ]
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
                            images: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                }
                            ]
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
                            images: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                }
                            ]
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
                            images: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                }
                            ]
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
                            images: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                }
                            ]
                        }
                    ]
                }
                }
            }else if(a===1) {
                a++
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
                            images: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                }
                            ]
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
                            images: [
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                },
                                {
                                    image: 'http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTMvMjU4OTI3MTUxNS9UQjJOWDhJbUxCTlRLSmpTc3piWFhhRnJGWGFfISEyNTg5MjcxNTE1JDk.jpg',
                                    id: '图片id'
                                }
                            ]
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
                a++
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
                a++
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
                a++
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
                a++
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
                a++
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
                a++
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
            }else if(a===1) {
                a++
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
        }
    }
}