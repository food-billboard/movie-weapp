import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { List } from '~components/commentlist'
import GScrollView from '~components/scrollList'
import Comment from '~components/comment'
import Origin from './components/originComment'
import { throttle } from 'lodash'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { withTry } from '~utils'
import { mapDispatchToProps, mapStateToProps } from './connect'
import { connect } from '@tarojs/redux'
import { getCustomerComment, getCustomerUserComment, getUserComment, postCommentToUser, cancelLike, putLike } from '~services'

import './index.scss'

const INIT_QUERY = { currPage:1, pageSize: 10 }

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any>{

    public static config: Config = {
        navigationBarTitleText: '评论',
        enablePullDownRefresh: true
    }

    private commentRef = Taro.createRef<Comment>()

    private scrollRef = Taro.createRef<GScrollView>()

    //用户id
    readonly id = this.$router.params.id

    public state: any = {
        comment: []
    }

    public componentDidShow = () => {
        colorStyleChange()
    }

    //下拉刷新
    public onPullDownRefresh = async () => {
        await this.scrollRef.current!.handleToUpper()
        Taro.stopPullDownRefresh()
    }
    
    //上拉加载
    public onReachBottom = async () => {
        await this.scrollRef.current!.handleToLower()
    }

    /**
     * 获取数据
     */
    public fetchData = async (query: any, isInit=false) => {
        let method
        let params = {}
        const { comment } = this.state
        if(!this.id) {
            method = getCustomerComment
        }else {
            const isLogin = await this.props.getUserInfo()
            .then(_ => true)
            .catch(_ => false)
            method = isLogin ? getCustomerUserComment : getUserComment
            params = { ...params, id: this.id }
        }
        const data = await method({ ...params, ...query })

        let newData
        if(isInit) {
            newData = [ ...data ]
        }else {
            newData = [ ...comment, ...data ]
        }
        this.setState({
            comment: newData
        })
        return data
    }

    /**
     * 节流数据获取
     */
    public throttleFetchData = throttle(this.fetchData, 2000)

    /**
     * 展示评论组件
     * isUserCall: 是否为回复
     * user: 用户id
     * commentId: 评论id
     */
    public publish = async (_, commentId) => {
        await this.props.getUserInfo()
        .then(_ => {
            this.commentRef.current!.open()
            this.setState({
                commentId
            })
        })
        .catch(err => err)   
    }

    /**
     * 发布评论
     */
    public publishComment = async (value: {
        text: string,
        image: Array<any>,
        video: Array<any>
    }) => {
        const { commentId } = this.state
        const { text='', image=[], video=[] } = value
        Taro.showLoading({ mask: true, title: '发布中' })
        await withTry(postCommentToUser)({ id: commentId, content: { text, image, video } })
        Taro.hideLoading()
        await this.onPullDownRefresh()
    }

    //点赞
    public like = async(id: string, like: boolean) => {
        await this.props.getUserInfo()
        .then(async (_) => {
            const method = like ? cancelLike : putLike
            Taro.showLoading({ mask: true, title: '操作中' })
            await withTry(method)(id)
            Taro.hideLoading()
            //刷新
            await this.onPullDownRefresh()
        })
        .catch(err => err)
    }

    public render() {
        const { comment } = this.state
        return (
            <GScrollView 
                ref={this.scrollRef}
                query={{pageSize: 6}}
                style={{...style.backgroundColor('bgColor')}}
                sourceType={'Scope'}
                scrollWithAnimation={true}
                renderContent={
                    comment.map((value) => {
                        const { _id, source_type, source, ...nextValue } = value
                        const list = {
                            ...nextValue,
                            _id
                        }
                        const info = {
                            source,
                            source_type
                        }
                        return (
                            <View>
                                <List 
                                    comment={this.publish} 
                                    key={_id}
                                    like={this.like}
                                    list={list}
                                    extra={true}
                                    renderExtra={
                                        <Origin
                                            info={info}
                                        />
                                    }
                                />
                            </View>
                        )
                    })
                }
                fetch={this.throttleFetchData}
                bottom={92}
                renderBottom={
                    <Comment 
                        buttonText={'写完了'}
                        ref={this.commentRef}
                        publishCom={this.publishComment}
                    >
                    </Comment>
                }
            ></GScrollView>
        )
    }
}