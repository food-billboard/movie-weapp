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

const INIT_QUERY = { currPage: 1, pageSize: 10 }

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {
    public static config: Config = {
        navigationBarTitleText: "评论"
    }

    public componentDidMount = async () => {
        this.fetchMovieData()
    }

    //评论组件
    public commentRef = Taro.createRef<CommentCom>()

    //电影id
    readonly id = this.$router.params.id

    /**
     * 获取电影数据
     */
    public fetchMovieData = async () => {
        const commentHeader = await this.props.getCommentHeader(this.id)
        this.setState({
            commentHeader
        })
    }

    /**
     * 获取评论数据
     */
    public fetchData = async (query: any, isInit=false) => {
        const { comment } = this.state
        const data = await this.props.getComment({id: this.id, ...query})
        let newData
        if(isInit) {
            newData = [ ...data ]
        }else {
            newData = [ ...comment, ...data ]
        }
        await this.setState({
            comment: newData
        })
        return data
    }

    /**
     * 节流数据获取
     */
    public throttleFetchData = throttle(this.fetchData, 2000)

    public state = {
        comment: [],
        commentId: false,
        value: '',
        commentShow: false,
        userCall: false,
        userId: false,
        commentHeader: {name: '', detail: '', image: '', id: ''}
    }

    public constructor() {
        super(...arguments)

        this.publishComment = this.publishComment.bind(this)
        this.publish = this.publish.bind(this)
        this.fetchData = this.fetchData.bind(this)
    }

    /**
     * 发布评论
     */
    public publishComment = async (value) => {
        const {id} = this.props
        const { userId, commentId } = this.state
        Taro.showLoading({ mask: true, title: '发布中' })
        if(userId) {
            //评论用户
            await this.props.publishUserComment(commentId, value, userId, id)
        }else {
            //评论电影
            await this.props.publishComment(value, this.id, id)
        }
        Taro.hideLoading()
        await this.fetchData({...INIT_QUERY}, true)
    }

    /**
     * 展示评论组件
     * isUserCall: 是否为回复
     * user: 用户id
     * commentId: 评论id
     */
    public publish(isUserCall=false, user, commentId) {
        this.commentRef.current!.open()
        if(isUserCall) {
            this.setState({
                userCall: true,
                userId: user,
                commentId
            })
        }else {
            this.setState({
                userCall: false,
                userId: false,
                commentId: false
            })
        }
    }

    public render() {
        const { commentHeader, comment } = this.state

        return (
            <GScrollView
                sourceType={'Scope'}
                scrollWithAnimation={true}
                query={{pageSize: 6}}
                renderContent={<View>
                    {
                        comment.map((value) => {
                            const { id } = value
                            return (
                                <List 
                                    comment={this.publish} 
                                    key={id}
                                    list={value}
                                    id={id}
                                />
                            )
                        })
                    }
                </View>}
                fetch={this.throttleFetchData}
                header={200}
                bottom={92}
                renderHeader={<Header content={commentHeader}></Header>}
                renderBottom={<View>
                            <GButton 
                                style={{width: '100%', height: '92', position: 'fixed', bottom: 0, left: 0, zIndex: '999'}}
                                type={'secondary'}
                                value={['发布评论', '发布评论']} 
                                operate={this.publish}
                            />
                            <CommentCom
                                buttonText={'写完了'}
                                publishCom={this.publishComment}
                                ref={this.commentRef}
                            />
                </View>}
            >
            </GScrollView>
        )
    }
}