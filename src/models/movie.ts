import {
    getHot,
    getSwiper,
    getType,
    getDailyNew,
    getRank,
    getComment,
    factorSearch,
    getTypeDetail,
    getCommentHeader,
    getDetail,
    getRankType,
    getCommentSimple,
    getCommentDetail
} from '~services'

let a = 0
let src = 'https://vdept.bdstatic.com/6c536d6579614b5a71764b5258647438/52613668726e5537/96b4a1fd470852f66852849390738d4271fc4314d91b7417e7f0a346f01d6f969c2b9199394766fa47b4baee8bfe29f9.mp4?auth_key=1580894250-0-0-384ca239053bf5d21aae82002743a1ba'

export default {
    namespace: 'movie',
    state: {  

    },
    effects: {
        //获取热搜
        * getHot({count=3}, {call, put}) {
            return [
                {
                    id: 0,
                    name: '热搜1'
                },
                {
                    id: 1,
                    name: '热搜2'
                },
                {
                    id: 2,
                    name: '热搜3'
                }
            ]
            const hot = yield call(getHot, count)
            return hot
        },

        //获取轮播图
        * getSwiper({count=5}, {call, put}) {
            return [
                {
                    id: 0,
                    image: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg'
                },
                {
                    id: 1,
                    image: 'http://a4.att.hudong.com/03/25/20300001045622130690259454464.jpg'
                },
                {
                    id: 2,
                    image: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg'
                },
                {
                    id: 3,
                    image: 'http://a4.att.hudong.com/03/25/20300001045622130690259454464.jpg'
                },
                {
                    id: 4,
                    image: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg'
                }
            ]
            const swiper = yield call(getSwiper, count)
            return swiper
        },

        //获取分类条目
        * getSwitch({count=12}, {call, put}) {
            return [
                {
                    id: 0,
                    value: '分类',
                    image: 'http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg'
                },
                {
                    id: 1,
                    value: '分类',
                    image: 'http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg'
                },
                {
                    id: 2,
                    value: '分类',
                    image: 'http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg'
                },
                {
                    id: 3,
                    value: '分类',
                    image: 'http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg'
                },
                {
                    id: 4,
                    value: '分类',
                    image: 'http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg'
                },
                {
                    id: 5,
                    value: '分类',
                    image: 'http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg'
                }
            ]
            const type = yield call(getType, count)
            return type
        },

        //获取分类具体信息
        * getSwitchDetail({query}, {call, put}) {
            const typeDetail = yield call(getTypeDetail, query)
            return typeDetail
        },

        //获取每日上新
        * getDailyNew({count=10}, {call, put}) {
            return [
                {
                    id: 0,
                    title: '第一',
                    image: 'http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg'
                },
                {
                    id: 0,
                    title: '第一',
                    image: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg'
                },
                {
                    id: 0,
                    title: '第一',
                    image: 'http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg'
                },
                {
                    id: 0,
                    title: '第一',
                    image: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg'
                }
            ]
            const daily = yield call(getDailyNew, count)
            return daily
        },

        //获取排行榜
        * getRank({query}, {call, put}) {
            if(a==0) {
                a++
                return [
                    {
                        id: 0,
                        type: '排行榜1',
                        list: [
                            {
                                id: 0,
                                rank: 0,
                                img: 'http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg',
                                name: '电影'
                            },
                            {
                                id: 1,
                                rank: 1,
                                img: 'http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg',
                                name: '电影'
                            },
                            {
                                id: 2,
                                rank: 2,
                                img: 'http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg',
                                name: '电影'
                            },
                            {
                                id: 3,
                                rank: 3,
                                img: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg',
                                name: '电影'
                            },
                            {
                                id: 4,
                                rank: 4,
                                img: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg',
                                name: '电影'
                            },
                            {
                                id: 5,
                                rank: 5,
                                img: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg',
                                name: '电影'
                            }
                        ]
                    },
                    {
                        id: 0,
                        type: '排行榜2',
                        list: [
                            {
                                id: 0,
                                rank: 0,
                                img: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg',
                                name: '电影'
                            },
                            {
                                id: 1,
                                rank: 1,
                                img: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg',
                                name: '电影'
                            },
                            {
                                id: 2,
                                rank: 2,
                                img: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg',
                                name: '电影'
                            }
                        ]
                    }
                ]
            }else if(a==1) {
                a++
                return [
                    {
                        id: 0,
                        type: '排行榜1',
                        list: [
                            {
                                id: 5,
                                rank: 0,
                                img: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg',
                                name: '电影'
                            },
                            {
                                id: 6,
                                rank: 1,
                                img: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg',
                                name: '电影'
                            },
                            {
                                id: 7,
                                rank: 2,
                                img: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg',
                                name: '电影'
                            },
                            {
                                id: 8,
                                rank: 3,
                                img: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg',
                                name: '电影'
                            },
                            {
                                id: 9,
                                rank: 4,
                                img: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg',
                                name: '电影'
                            },
                            {
                                id: 10,
                                rank: 5,
                                img: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg',
                                name: '电影'
                            }
                        ]
                    },
                    {
                        id: 0,
                        type: '排行榜2',
                        list: [
                            {
                                id: 0,
                                rank: 0,
                                img: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg',
                                name: '电影'
                            },
                            {
                                id: 1,
                                rank: 1,
                                img: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg',
                                name: '电影'
                            },
                            {
                                id: 2,
                                rank: 2,
                                img: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg',
                                name: '电影'
                            }
                        ]
                    }
                ]
            }else {
                return []
            }
            const rank = yield call(getRank, query)
            return rank
        },

        //获取排行榜类型列表
        * getRankType({count}, { call, put }) {
            return [
                {
                    id: 0,
                    type: '排行榜1',
                    image: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg'
                },
                {
                    id: 0,
                    type: '排行榜2',
                    image: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg'
                },
                {
                    id: 0,
                    type: '排行榜3',
                    image: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg'
                },
                {
                    id: 0,
                    type: '排行榜1',
                    image: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg'
                },
                {
                    id: 0,
                    type: '排行榜1',
                    image: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg'
                },
                {
                    id: 0,
                    type: '排行榜1',
                    image: 'http://img3.imgtn.bdimg.com/it/u=1208538952,1443328523&fm=26&gp=0.jpg'
                }
            ]
            const rank = yield call(getRankType, count)
            return rank
        },

        //获取电影评论
        * getComment({query}, {call, put}) {
            if(a===0) {
                a++
            return [
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },{   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                }
            ]
        }else if(a===1) {
            a++
            return [
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },
                {   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                },{   
                    user: {
                        name: '评论人姓名',
                        time: 1234324324,
                        image: 'http://img0.imgtn.bdimg.com/it/u=1339525308,2468653122&fm=11&gp=0.jpg',
                        id: 0,
                        content: '这里是评论内容，不管你看不看，我都在这里，我不管',
                        hot: 100,
                        isHot: true
                    },
                    commentUsers: [
                        {
                            image: 'http://img0.imgtn.bdimg.com/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
                            id: 1
                        }
                    ]
                }
            ]
        }else {
            return []
        }

            const comment = yield call(getComment, query)
            return comment
        },

        //获取评论详情
        * getCommentDetail({ query }, { call, put }) {

            if(a==0) {
                a++
                return {
                    header: {
                        id: '评论id',
                        user: '用户名',
                        userId: '用户id',
                        content: '评论内容，不管你看不看，我都要显示出来给你看',
                        icon: 'http://b-ssl.duitang.com/uploads/item/201803/30/20180330234706_stfoo.jpg',
                        hot: 10000,
                        time: 1997
                    },
                    comment: [
                        {
                            user: {
                                name: '用户名',
                                time: 1996,
                                image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                id: '用户id1',
                                content: '评论内容,这是另外一条评论，我想要给你看看是什么样子的',
                                hot: 10000000
                            },
                            commentUsers: [
                                {
                                    image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                    id: '123123123'
                                },
                                {
                                    image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                    id: '123123123'
                                }
                            ],
                            id: 'idddd'
                        },
                        {
                            user: {
                                name: '用户名',
                                time: 1996,
                                image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                id: '用户id1',
                                content: '评论内容,这是另外一条评论，我想要给你看看是什么样子的',
                                hot: 10000000
                            },
                            commentUsers: [
                                {
                                    image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                    id: '123123123'
                                },
                                {
                                    image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                    id: '123123123'
                                }
                            ],
                            id: 'idddd'
                        },
                        {
                            user: {
                                name: '用户名',
                                time: 1996,
                                image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                id: '用户id1',
                                content: '评论内容,这是另外一条评论，我想要给你看看是什么样子的',
                                hot: 10000000
                            },
                            commentUsers: [
                                {
                                    image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                    id: '123123123'
                                },
                                {
                                    image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                    id: '123123123'
                                }
                            ],
                            id: 'idddd'
                        },
                        {
                            user: {
                                name: '用户名',
                                time: 1996,
                                image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                id: '用户id1',
                                content: '评论内容,这是另外一条评论，我想要给你看看是什么样子的',
                                hot: 10000000
                            },
                            commentUsers: [
                                {
                                    image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                    id: '123123123'
                                },
                                {
                                    image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                    id: '123123123'
                                }
                            ],
                            id: 'idddd'
                        },
                        {
                            user: {
                                name: '用户名',
                                time: 1996,
                                image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                id: '用户id1',
                                content: '评论内容,这是另外一条评论，我想要给你看看是什么样子的',
                                hot: 10000000
                            },
                            commentUsers: [
                                {
                                    image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                    id: '123123123'
                                },
                                {
                                    image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                    id: '123123123'
                                }
                            ],
                            id: 'idddd'
                        },
                        {
                            user: {
                                name: '用户名',
                                time: 1996,
                                image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                id: '用户id1',
                                content: '评论内容,这是另外一条评论，我想要给你看看是什么样子的',
                                hot: 10000000
                            },
                            commentUsers: [
                                {
                                    image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                    id: '123123123'
                                },
                                {
                                    image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                    id: '123123123'
                                }
                            ],
                            id: 'idddd'
                        },
                        {
                            user: {
                                name: '用户名',
                                time: 1996,
                                image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                id: '用户id1',
                                content: '评论内容,这是另外一条评论，我想要给你看看是什么样子的',
                                hot: 10000000
                            },
                            commentUsers: [
                                {
                                    image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                    id: '123123123'
                                },
                                {
                                    image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                    id: '123123123'
                                }
                            ],
                            id: 'idddd'
                        },
                    ]
                }
            }else if(a===1) {
                a++
                return {
                    header: {
                        id: '评论id',
                        user: '用户名',
                        userId: '用户id',
                        content: '评论内容，不管你看不看，我都要显示出来给你看',
                        icon: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                        hot: 10000,
                        time: 1997
                    },
                    comment: [
                        {
                            user: {
                                name: '用户名',
                                time: 1996,
                                image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                id: '用户id1',
                                content: '评论内容,这是另外一条评论，我想要给你看看是什么样子的',
                                hot: 10000000
                            },
                            commentUsers: [
                                {
                                    image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                    id: '123123123'
                                },
                                {
                                    image: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                                    id: '123123123'
                                }
                            ],
                            id: 'idddd'
                        },
                    ]
                }
            }else {
                return {
                    header: {
                        id: '评论id',
                        user: '用户名',
                        userId: '用户id',
                        content: '评论内容，不管你看不看，我都要显示出来给你看',
                        icon: 'http://img0.imgtn.bdimg.com/it/u=415401095,3314669772&fm=214&gp=0.jpg',
                        hot: 10000,
                        time: 1997
                    },
                    comment: []
                }
            }
            let params
            Object.keys(query).map(val => {
                if(query[val] !== undefined) params[val] = query[val]
            })

            const comment = yield call(getCommentDetail, params)
            return comment
        },

        //获取电影评论简易
        * getCommentSimple({movie}, {call, put}) {
            return [
                {
                    image: 'http://img1.imgtn.bdimg.com/it/u=2034740944,4251903193&fm=26&gp=0.jpg',
                    id: 0,
                    content: '评论内容，真的是非常nice的电影啊，墙裂推荐！！！！'
                },
                {
                    image: 'http://b-ssl.duitang.com/uploads/item/201508/20/20150820003153_UwJfV.thumb.700_0.jpeg',
                    id: 1,
                    content: '评论内容，真的是非常nice的电影啊，墙裂推荐！！！！我是被拉过来评论的路人甲'
                },
                {
                    image: 'http://b-ssl.duitang.com/uploads/item/201703/26/20170326161532_aGteC.jpeg',
                    id: 2,
                    content: '评论内容，真的是非常nice的电影啊，墙裂推荐！！！！我是自愿过来的炮兵乙'
                },
                {
                    image: 'http://img1.imgtn.bdimg.com/it/u=2034740944,4251903193&fm=26&gp=0.jpg',
                    id: 3,
                    content: '评论内容，真的是非常nice的电影啊，墙裂推荐！！！！'
                },
                {
                    image: 'http://b-ssl.duitang.com/uploads/item/201508/20/20150820003153_UwJfV.thumb.700_0.jpeg',
                    id: 4,
                    content: '评论内容，真的是非常nice的电影啊，墙裂推荐！！！！我是被拉过来评论的路人甲'
                },
                {
                    image: 'http://b-ssl.duitang.com/uploads/item/201703/26/20170326161532_aGteC.jpeg',
                    id: 5,
                    content: '评论内容，真的是非常nice的电影啊，墙裂推荐！！！！我是自愿过来的炮兵乙'
                },
                {
                    image: 'http://img1.imgtn.bdimg.com/it/u=2034740944,4251903193&fm=26&gp=0.jpg',
                    id: 6,
                    content: '评论内容，真的是非常nice的电影啊，墙裂推荐！！！！'
                },
                {
                    image: 'http://b-ssl.duitang.com/uploads/item/201508/20/20150820003153_UwJfV.thumb.700_0.jpeg',
                    id: 7,
                    content: '评论内容，真的是非常nice的电影啊，墙裂推荐！！！！我是被拉过来评论的路人甲'
                },
                {
                    image: 'http://b-ssl.duitang.com/uploads/item/201703/26/20170326161532_aGteC.jpeg',
                    id: 8,
                    content: '评论内容，真的是非常nice的电影啊，墙裂推荐！！！！我是自愿过来的炮兵乙'
                },
                {
                    image: 'http://img1.imgtn.bdimg.com/it/u=2034740944,4251903193&fm=26&gp=0.jpg',
                    id: 9,
                    content: '评论内容，真的是非常nice的电影啊，墙裂推荐！！！！'
                },
                {
                    image: 'http://b-ssl.duitang.com/uploads/item/201508/20/20150820003153_UwJfV.thumb.700_0.jpeg',
                    id: 10,
                    content: '评论内容，真的是非常nice的电影啊，墙裂推荐！！！！我是被拉过来评论的路人甲'
                },
                {
                    image: 'http://b-ssl.duitang.com/uploads/item/201703/26/20170326161532_aGteC.jpeg',
                    id: 11,
                    content: '评论内容，真的是非常nice的电影啊，墙裂推荐！！！！我是自愿过来的炮兵乙'
                }
            ]

            const comment = yield call(getCommentSimple, movie)
            return comment
        },

        //搜索结果筛选
        * factorSearch({factor}, {call, put}) {     
            const item = yield call(factorSearch, factor)
            // yield put({type: 'setData', payload: {search: item}})
            return item
        },

        //获取评论头
        * getCommentHeader({id}, {call, put}) {

            return {
                id: 0,
                name: '电影名字',
                detail: '电影的详细信息，你想知道就点我一下试试吧',
                image: 'http://cdn.duitang.com/uploads/item/201512/19/20151219223750_VPMBC.thumb.700_0.jpeg'
            }

            const header = yield call(getCommentHeader, id)
            return header
        },

        //获取电影详情
        * getDetail({id}, {call, put}) {
            return {
                id: 0,
                video: {
                    src: src,
                    poster: 'http://images.china.cn/attachement/jpg/site1000/20140709/00e04c3600081526f96d2a.jpg',
                    id: 0
                },
                info: {
                    name: '电影名字', 
                    area: '电影产地', 
                    people: 100, 
                    director: ['导演1号', '导演2号', '导演3号'], 
                    actor: ['龙套1号', '龙套2号', '龙套3号'], 
                    type: ['惊悚', '爱情'], 
                    time: 10000000, 
                    publishTime: 1997, 
                    description: '电影的详细描述，虽然你不想看，但是我还是会写在这里', 
                    hot: 100000, 
                    rate: 8,
                    store: true
                },
                image: [
                    {
                        id: 0,
                        img: 'http://p3.pstatp.com/large/31ed00004f59a4e6f2ac'
                    },
                    {
                        id: 1,
                        img: 'http://img3.imgtn.bdimg.com/it/u=2155983538,3860699715&fm=26&gp=0.jpg'
                    },
                    {
                        id: 2,
                        img: 'http://big5.wallcoo.com/nature/Arctic_Nature/wallpapers/1680x1050/arctic3.jpg'
                    },
                    {
                        id: 3,
                        img: 'http://img3.imgtn.bdimg.com/it/u=2155983538,3860699715&fm=26&gp=0.jpg'
                    },
                    {
                        id: 4,
                        img: 'http://big5.wallcoo.com/nature/Arctic_Nature/wallpapers/1680x1050/arctic3.jpg'
                    }
                ]
            }
            const detail = yield call(getDetail, id)
            return detail
        }

    },
    reducers: {
        setData(state, {payload}) {
            return {...state, ...payload}
        }
    }
}