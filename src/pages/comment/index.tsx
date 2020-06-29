import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import GButton from '~components/button'
import Header from '~components/newsheader'
import { List } from '~components/commentlist'
import CommentCom from '~components/comment'
import GScrollView from '~components/scrollList'
import style from '~theme/style'
import { colorStyleChange } from '~theme/color'
import { throttle } from 'lodash'
import { withTry } from '~utils'
import { connect } from '@tarojs/redux'
import { mapDispatchToProps, mapStateToProps } from './connect'
import { getCustomerMovieCommentList, getMovieCommentList, getMovieDetailSimple, postCommentToUser, postCommentToMovie, putLike, cancelLike } from '~services'

const INIT_QUERY = { currPage: 1, pageSize: 10 }

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {
    public static config: Config = {
        navigationBarTitleText: "评论",
        enablePullDownRefresh: true
    }

    public componentDidMount = async () => {
        this.fetchMovieData()
    }

    public componentDidShow = () => {
        colorStyleChange()
    }

    private scrollRef = Taro.createRef<GScrollView>()

    //下拉刷新
    public onPullDownRefresh = async () => {
        await this.scrollRef.current!.handleToUpper()
        Taro.stopPullDownRefresh()
    }
    
    //上拉加载
    public onReachBottom = async () => {
        await this.scrollRef.current!.handleToLower()
    }

    public state: any = {
        comment: [],
        commentId: false,
        userCall: false,
        commentHeader: {},
    }

    //评论组件
    public commentRef = Taro.createRef<CommentCom>()

    //电影id
    readonly id = this.$router.params.id

    /**
     * 获取电影数据
     */
    public fetchMovieData = async () => {
        const data = await getMovieDetailSimple(this.id)
        this.setState({
            commentHeader: data
        })
    }

    /**
     * 获取评论数据
     */
    public fetchData = async (query: any, isInit=false) => {
        const { comment } = this.state
        const { userInfo } = this.props
        const method = userInfo ? getCustomerMovieCommentList : getMovieCommentList
        const data = await method({ id: this.id, ...query })
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

    /**
     * 发布评论
     */
    public publishComment = async (value: {
        text?: string,
        image?: Array<any>,
        video?: Array<any>
    }) => {
        const { userId, commentId } = this.state
        const { text='', image=[], video=[] } = value
        let params:any = {
            content: {
                text,
                image,
                video
            }
        }
        Taro.showLoading({ mask: true, title: '发布中' })
        if(typeof userId === 'string' || 'number') {
            //评论用户
            params = {
                ...params,
                id: commentId,
            }
            await withTry(postCommentToUser)(params)
        }else {
            //评论电影
            params = {
                ...params,
                id: this.id
            }
            await withTry(postCommentToMovie)(params)
        }
        Taro.hideLoading()
        // await this.fetchData({ ...INIT_QUERY }, true)
        await this.onPullDownRefresh()
    }

    //点赞/取消点赞
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

    /**
     * 展示评论组件
     * isUserCall: 是否为回复
     * user: 用户id
     * commentId: 评论id
     */
    public publish = async (isUserCall, commentId) => {

        await this.props.getUserInfo()
        .then(_ => {
            this.commentRef.current!.open()
            if(isUserCall) {
                this.setState({
                    userCall: true,
                    commentId
                })
            }else {
                this.setState({
                    userCall: false,
                    commentId: false
                })
            }
        })
        .catch(err => err)
    }

    public render() {
        const { commentHeader: { description, _id, poster, ...nextCommentHeader }, comment } = this.state

        return (
            <GScrollView
                ref={this.scrollRef}
                sourceType={'Scope'}
                query={{pageSize: 6}}
                style={{...style.backgroundColor('bgColor')}}
                renderContent={<View>
                    {
                        comment.map((value) => {
                            const { _id } = value
                            return (
                                <List 
                                    comment={this.publish} 
                                    key={_id}
                                    list={value}
                                    like={this.like}
                                />
                            )
                        })
                    }
                </View>}
                fetch={this.throttleFetchData}
                header={200}
                bottom={92}
                renderHeader={<Header content={{
                    ...nextCommentHeader,
                    detail: description,
                    id: _id,
                    image: poster,
                }}></Header>}
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