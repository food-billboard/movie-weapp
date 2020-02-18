import Taro, { Component, Config } from '@tarojs/taro'
import List from '~components/commentlist'
import GScrollView from '~components/scrollList'
import Comment from '~components/comment'

import { throttle } from 'lodash'

import './index.scss'

import {mapDispatchToProps, mapStateToProps} from './connect'
import {connect} from '@tarojs/redux'

const INIT_QUERY = { currPage:1, pageSize: 10 }

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any>{

    public static config: Config = {
        navigationBarTitleText: '评论'
    }

    public commentRef = Taro.createRef<Comment>()

    //用户id
    readonly id = this.$router.params.id

    //我的id
    readonly mineId = this.props.id

    public state: any = {
        comment: []
    }

    /**
     * 获取数据
     */
    public fetchData = async (query: any, isInit=false) => {
        const { comment } = this.state
        const data = await this.props.getUserComment({id: this.id, ...query})
        const _data = data.comment
        let newData
        if(isInit) {
            newData = [ ..._data ]
        }else {
            newData = [ ...comment, ..._data ]
        }
        await this.setState({
            comment: newData
        })
        return _data
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
    public publish = (isUserCall=true, user, commentId) => {
        this.props.getUserInfo()
        this.commentRef.current!.open()
        this.setState({
            userId: user,
            commentId
        })
    }

    /**
     * 发布评论
     */
    public publishComment = async (value) => {
        const { userId, commentId } = this.state
        Taro.showLoading({ mask: true, title: '发布中' })
        await this.props.publishUserComment(commentId, value, userId, this.mineId)
        Taro.hideLoading()
        await this.fetchData({...INIT_QUERY}, true)
    }

    public render() {
        const {comment} = this.state
        const list = comment.map(( value ) => {
            const { id } = value
            return (
                <List 
                    key={id}
                    list={value}
                />
            )
        })
        return (
            <GScrollView 
                sourceType={'Scope'}
                scrollWithAnimation={true}
                renderContent={
                    comment.map((value) => {
                        const { id } = value
                        return (
                            <List 
                                comment={this.publish} 
                                key={id}
                                list={value}
                                commentId={id}
                            />
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