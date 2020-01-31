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
主页：搜索栏、热搜、轮播图、分类列表、每日上新、排行榜列表

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

热搜:id name
轮播图: id img
分类: id value image
每日上新: id title img
排行榜: [{type list[{rank id img name}]]
用户关注: id name img
电影评论: user(name, time, img, id, content, hot, isHot) commentUsers({img, id})
电影评论 | 用户收藏: id name detail img
电影详情: id video(src poster id) info(name, area, people, director, actor, type, time, publishTime, description, hot, rate) image(img)
用户信息: info(id username hot icon) isAttention
通知信息: id img username description
分类列表(列表): id img name type time hot
分类列表(图标): id img name hot 
小程序信息: id time about 
购物车信息: [
    {
        商品id id
        商品图片 img
        商品数量 count
        商品选项描述 desc
        商品价格 price
    }
]


未完成
色调更改: 白天与黑夜
购物车
视频功能样式细化
转发
toast的icon
添加删除好友
上传
视频样式

