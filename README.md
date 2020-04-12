# movie-weapp
电影推荐微信小程序（纯属娱乐）

这是一个电影推荐的小程序
下面是小程序的页面相关内容介绍
个人中心：头部、头像、底栏（收藏/通知，选项按钮，条形列表）
关注：头部、条形列表
浏览记录：头部、信息头展示列表
评论界面：头部、信息头展示列表、评论输入框、评论内容列表
设置：头部、条形列表、退出按钮
收藏列表：头部、信息头展示列表
搜索界面：搜索栏、热搜、大筛选、小筛选（综合（条形列表），查看方式，筛选（图标选项列表））、条形查看组件、图标查看组件）
通知列表：头部、消息条列表
通知细节：头部、消息详细列表
我的评论：头部、评论内容列表
详情页面：头部、视频、详情、截图列表
用户界面：头部、头像、条形列表、关注按钮
主页：搜索栏、热搜、轮播图、分类列表、每日上新、排行榜列表 √
排行榜

common组件：
    头部：标题、副标题、（插槽）
    评论组件：按钮文字
    条形列表：图标、标题、右边内容、功能（选择/跳转）
    按钮：文字内容
    信息头展示列表：纯影视内容
    评论内容列表：无需改变
    头像：无需改变
    搜索栏：功能（跳转/输入）
    热搜：无需改变

热搜: {
    success: 是否成功,
    data: {
        hot: [
            {
                id: '热搜id',
                name: '热搜名字
            }
        ]
    }
}

轮播图: {
    success: 是否成功,
    data: {
        swiper: [
            {
                id: '路由id',
                image: '图片',
                type: '图片路由类型',
            }
        ]
    }
}

分类: {
    success: '是否成功',
    data: {
        switch: [
            {
                id: 'id',
                value: '分类名称',
                image: '分类图标'
            }
        ]
    }
}

分类列表具体信息(列表 | 图标): {
    success: '是否成功',
    data: {
        detail: [
            {
                id: '电影id',
                image: '电影海报',
                name: '电影名称',
                type: ['电影类型'],
                time: '发布时间',
                hot: '人气'
            }
        ]
    }
}

每日上新: {
    success: '是否成功',
    data: {
        daily: [
            {
                id: 'id',
                title: '名称',
                image: '图片'
            }
        ]
    }
}

排行榜: {
    success: '是否成功',
    data: {
        rank: [
            {
                id: '排行榜类型id ( 0, 1, 2, 3, 4, 5, ... ) ',
                type: '排行榜名称',
                list: [
                    {
                        rank: '排名',
                        id: '电影id',
                        image: '电影海报',
                        name: '电影名称',
                        type: '类型',
                        time: '发布时间',
                        hot: '人气'
                    }
                ]
            }
        ]
    }
}

排行榜分类: {
    success: '是否成功',
    data: {
        rank: [
            {
                id: '排行榜类型id',
                type: '排行榜类型名称',
                image: '排行榜图标'
            }
        ]
    }
}

电影评论: {
    success: '是否成功',
    data: {
        id: '电影id'
        comment: [
            user: {
                    name: '用户名',
                    time: '发布时间',
                    image: '用户头像',
                    id: '用户id',   
                    content: '评论内容',
                    hot: '人气',
                    isHot: '是否点过赞 ( 传入个人id才会返回，否则返回统一为false ) ',
                    commentId: '评论id'
                },
            commentUsers: [
                {
                    image: '用户头像',
                    id: '用户id'
                }
            ],
            media: [
                {
                    image: '评论图片',
                    id: '图片id',
                    type: '媒体类型(video image)',
                    src:'地址'
                }
            ],
            id: '评论id'
        ]
    }
}

评论详细: {
    success: '是否成功',
    data: {
        header: {
            id: '评论id',
            user: '用户名',
            userId: '用户id',
            content: '评论内容',
            icon: '用户头像',
            hot: '人气',
            time: '发布时间',
            isLike: '是否为点赞 ( 只有在用户登录的时候才会返回数据 否则返回时false ) ',
            total: '评论总数'
        },
        comment: [
            {
                user: {
                    name: '用户名',
                    time: '发布时间',
                    image: '用户头像',
                    id: '用户id',
                    content: '评论内容',
                    hot: '人气',
                    isHot: '是否点过赞 ( 传入个人id才会返回，否则返回统一为false ) '
                },
                commentUsers: [
                    {
                        iamge: '用户头像',
                        id: '用户id'
                    }
                ],
                media: [
                    {
                        image: '评论图片',
                        id: '图片id',
                        type: '媒体类型(video image)',
                        src:'地址'
                    }
                ],
                id: '评论id'
            }
        ]
    }
}

电影评论简易(详情展示): {
    success: '是否成功',
    data: {
        comment: [
            {
                id: '评论id',
                image: '用户头像',
                content: '评论内容'
            }
        ]
    }
} 

电影评论(头部用) | 用户收藏 | 浏览记录: {
    success: '是否成功',
    data: {
        data: {
            id: '电影id',
            name: '电影名称',
            detail: '电影描述',
            image: '电影海报'
        }
    }
}

电影详情: {
    success: '是否成功',
    data: {
        values: 是否存在tab,
        data: [
            id: '电影id',
            video: {
                src: '视频地址',
                poster: '视频海报',
                id: '视频id'
            },
            info: {
                name: '电影名称',
                area: [
                    {
                        id: '地区id',
                        value: '地区'
                    }
                ],
                people: '查看人数',
                director: [
                    {
                        id: '导演id',
                        value: '导演'
                    }
                ],
                actor: [
                    {
                        id: '演员id',
                        value: '演员,
                        image: '演员海报'
                    }
                ],
                type: [
                    {
                        id:'类型id',
                        value: '类型'
                    }
                ],
                time: '上线时间',
                publishTime: '发布时间',
                description: '电影描述',
                mine: '楼主认为的电影真实情况'
                hot: '人气',
                rate: '评分',
                rateMine: '个人认为评分',
                author: '帖子作者',
                store: '是否为收藏 ( 只有在传入用户id的情况下返回，否则统一返回false ) '
            },
            image: [
                {
                    img: '电影截图海报',
                    id: '这里是临时写的，没什么用，是海报id'
                }
            ],
            tag: [
                {
                    id: 'tag的id',
                    value: 'tag内容'
                }
            ]
        ]
    }
}

用户关注 | 粉丝: {
    success: '是否成功',
    data: {
        data: [
            {
                id: '用户id',
                name: '用户名称',
                image: '用户头像'
            }
        ]
    }   
}

点赞: {
    success: '是否成功',
    data: {}
}

评论: {
    success: '是否成功',
    data: {}
}

评分: {
    success: '是否成功',
    data: {
        rate: '评分',
    }
}

收藏: {
    success: '是否成功',
    data: {}
}

关注: {
    success: '是否成功',
    data: {}
}

用户信息: {
    success: '是否成功',
    data: {
        info: {
            id: '用户id',
            username: '用户名',
            hot: '人气',
            icon: '用户头像',
            isLike: '是否关注 ( 只有用户登录且为非本人用户才会返回数据，否则为false ) '
        }
    }
}

用户评论: {
    success: '是否成功',
    data: {
        id: '用户id'
        comment: [
            {
                user: {
                    name: '用户名',
                    time: '发布时间',
                    image: '用户头像',
                    id: '用户id',
                    content: '评论内容',
                    hot: '人气',
                    isHot: '是否点过赞 ( 传入个人id才会返回，否则返回统一为false ) '
                },
                commentUsers: [
                    {
                        iamge: '用户头像',
                        id: '用户id'
                    }
                ],
                media: [
                    {
                        image: '评论图片',
                        id: '图片id',
                        type: '媒体类型(video image)',
                        src:'地址'
                    }
                ],
                origin: {
                    id: '评论id',
                    image: '图片',
                    content: '评论内容',
                    origin: '是否为原始评论',
                    hasImage: '是否有图片',
                    hasVideo: '是否有视频'
                },
                id: '评论id'
            }
        ]
    }
}

小程序信息: {
    success: '是否成功',
    data: {
        id: '小程序id',
        time: '发布时间',
        about: '相关信息'
    }
}

登录: {
    success: '是否成功',
    data: {
        id: '用户id'
    }
}

退出登录: {
    success: '是否成功',
    data: {}
}

注册: {
    success: '是否成功',
    data: {}
}

获取电影评分: {
    success: '是否成功',
    data: {
        rate: '电影评分',
        id: '电影id'
    }
}

获取电影是否收藏: {
    success: '是否成功',
    data: {
        store: '电影是否收藏',
        id: '电影id'
    }
}

发布电影: {
    success: '是否成功',
    data: {
        data: {}
    }
}

修改电影: {
    success: '是否成功',
    data: {
        movie: {
            id: '电影id',
            video: {
                src: '视频地址',
                poster: '视频海报',
                id: '视频id'
            },
            info: {
                name: '电影名称',
                area: [
                    {
                        id: '地区id',
                        value: '地区名称'
                    }
                ],
                director: [
                    {
                        id: '导演id',
                        value: '导演名称'
                    }
                ],
                actor: [
                    {
                        id: '演员id',
                        value: '演员名称'
                    }
                ],
                type: [
                    {
                        id: '类型id',
                        value: '类型名称'
                    }
                ],
                time: '上线时间',
                description: '电影描述',
            },
            image: [
                {
                    img: '电影截图海报',
                    id: '这里是临时写的，没什么用，是海报id'
                }
            ]
        }
    }
}

获取电影发布: {
    success: '是否成功',
    data: {
        id: '用户id',
        detail: [
            {
                id: '电影id',
                image: '电影海报',
                name: '电影名称',
                type: ['电影类型'],
                time: '发布时间',
                hot: '人气'
            }
        ]
    }
}

获取电影语言列表: {
    success: '是否成功',
    data: {
        data: [
            {
                id: '语言的id',
                value: '名称',
                image: '图片'
            }
        ]
    }
}

获取电影导演列表: {
    success: '是否成功',
    data: {
        data: [
            {
                id: '导演的id',
                value: '名称',
                image: '图片'
            }
        ]
    }   
}

获取电影演员列表: {
    success: '是否成功',
    data: {
        data: [
            {
                id: '演员的id',
                value: '名称',
                image: '图片'
            }
        ]
    }
}

获取电影地区列表: {
    success: '是否成功',
    data: {
        data: [
            {
                id: '地区的id',
                value: '名称',
                image: '图片'
            }
        ]
    }
}

获取跑马灯: {
    success: '是否成功',
    data: {
        data: {
            text: '跑马灯内容'
        }
    }
}

获取排序列表: {
    success: '是否成功',
    data: {
        data: [
            { 
                label: '显示内容', 
                id: 'id'
            },
        ]
    }
}

获取专题电影列表: {
    success: '是否成功',
    data: {
        title: '专题标题'
        data: [
            {
                id: '电影id',
                name: '电影名称',
                detail: '电影描述',
                image: '电影海报',
                hot: '人气'
            }
        ]
    }
}

通知信息: {
    success: '是否成功',
    data: {
        data: [
            {
                id: '消息id',
                image: '消息头像',
                username: '发送人用户名',
                type: '通知类型',
                list: [
                    {
                        description: '描述',
                        read: '是否为已读',
                        time: '时间'
                    }
                ]
            }
        ]
    }   
}

信息读取: {
    success: '是否成功',
    data: {
        res: '是否成功'
    }
}

通知详情: {
    success: '是否成功',
    data: {
        info: {
            username: '用户名',
            id: '用户id',
            image: '用户头像',
            data: [
                {
                    content: {
                        text: '文字内容',
                        video: '视频地址',
                        image: '图片和视频海报地址',
                        audio: '音频地址'
                    },
                    type: '消息类型',
                    time: '消息时间',
                    username: '用户',
                    id: '用户id',
                    image: '用户头像',
                    news: '消息id'
                }
            ]
        }
    }
}

发送消息: {
    success: '是否成功',
    data: {
        res: '是否成功'
    }
}

搜索栏搜索关键字获取: {
    success: '是否成功',
    data: {
        data: [
            {
                value: '查询的字段'
            }
        ]
    }
}


未完成
视频样式
视频功能样式细化
添加删除好友
发布语音评论

路由相关优化


重置不刷新的原因是外部value已经无法影响到内部的状态了
提交出错需要刷新（对fieldsStore的更新进行设置）
媒体选择器的error



!!!!注意完成时config里面对响应数据的处理
!真机测试: 相同图片的添加 视频快进
后端
    对用户发布的电影添加publishTime(发布时间)字段
    对电影评论中出现的常见词汇汇总生成tag
    图片上传后端可能需要Taro.uploadFile



