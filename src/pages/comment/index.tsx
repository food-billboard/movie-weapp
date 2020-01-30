import Taro, {Component, Config} from '@tarojs/taro'
import { View } from '@tarojs/components'
import GButton from '~components/button'
import Header from '~components/newsheader'
import List from '~components/commentlist'
import CommentCom from '~components/comment'
import GScrollView from '~components/scrollList'
import { throttle } from 'lodash'

import './index.scss'

import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {
    public static config: Config = {
        navigationBarTitleText: "评论"
    }

    readonly id = this.$router.params.id

    /**
     * 获取数据
     */
    public fetchData = async (query: any, isInit=false) => {
        const { comment } = this.state
        const commentHeader = await this.props.getCommentHeader(this.id)
        const data = await this.props.getComment({id: this.id, ...query})
        let newData
        if(isInit) {
            newData = [ ...data ]
        }else {
            newData = [ ...comment, ...data ]
        }
        await this.setState({
            comment: newData,
            commentHeader
        })
        return comment || []
    }

    /**
     * 节流数据获取
     */
    public throttleFetchData = throttle(this.fetchData, 2000)

    public state = {
        comment: [],
        value: '',
        commentShow: false,
        userCall: false,
        userId: '',
        commentHeader: {name: '', detail: '', img: '', id: ''}
    }

    public constructor() {
        super(...arguments)

        this.like = this.like.bind(this)
        this.publishComment = this.publishComment.bind(this)
        this.publish = this.publish.bind(this)
        this.fetchData = this.fetchData.bind(this)
    }

    /**
     * 点赞
     */
    public like = async(userid:string) => {
        Taro.showLoading({ mask: true, title: '等我一下' })
        await this.props.getUserInfo()
        const {userInfo} = this.props
        await this.props.like(userid, userInfo.id)   //点赞
        Taro.hideLoading()
    } 

    /**
     * 发布评论
     */
    public publishComment = async (value) => {
        const {id} = this.props
        const {userId} = this.state
        Taro.showLoading({ mask: true, title: '发布中' })
        if(userId.length) {
            await this.props.publishUserComment(value, userId, id)
        }else {
            await this.props.publishComment(value, id)
        }
        Taro.hideLoading()
        await this.setState({
            commentShow: false            
        })
    }

    /**
     * 展示评论组件
     */
    public publish(isUserCall=false, user) {
        let { commentShow, userCall, userId } = this.state
        if(commentShow) return
        if(isUserCall) {
            userCall = true
            userId = user
        }else {
            userCall = false
            userId = ''
        }
        this.setState({
            commentShow: !commentShow,
            userCall,
            userId
        })
    }

    public render() {
        const {comment} = this.props
        const {commentHeader} = this.state
        const list = comment.map((value) => {
            const { id } = value
            return (
                <List 
                    comment={this.publish} 
                    like={this.like}
                    key={id}
                    list={value}
                />
            )
        })
        return (
            <GScrollView
                sourceType={'Scope'}
                scrollWithAnimation={true}
                renderContent={<View>{list}</View>}
                fetch={this.throttleFetchData}
                header={200}
                bottom={92}
                renderHeader={<Header style={{marginBottom: 60}} content={commentHeader}></Header>}
                renderBottom={<View>
                            <GButton 
                                style={{width: '100%', height: '92', position: 'fixed', bottom: 0, left: 0}}
                                value={['发布评论', '发布评论']} 
                                operate={this.publish}
                            />
                            <CommentCom
                                publishCom={this.publishComment}
                            />
                </View>}
            >
            </GScrollView>
        )
    }
}