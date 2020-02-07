import Taro, {Component, Config} from '@tarojs/taro'
import { View } from '@tarojs/components'
import GVideo from './components/video'
import List from './components/imglist'
import Content from './components/content'
import GButton from '~components/button'
import IconList from './components/iconList'
import Comment from '~components/comment'

import './index.scss'

import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {
   
    public config: Config = {
        navigationBarTitleText: "详情"
    }

    public commentRef = Taro.createRef<Comment>()

    public state: any = {
        detail: {},
        commentList: []
    }

    //电影id
    readonly id = this.$router.params.id

    //我的id
    readonly mineId = this.props.id

    public componentDidMount = async() => {
        this.fetchData()
    }

    //获取数据
    public fetchData = async () => {
        Taro.showLoading({ mask: true, title: '凶猛加载中' })
        const detail = await this.props.getDetail(this.id)
        const commentList = await this.props.getCommentSimple(this.id)
        this.setState({
            detail,
            commentList
        })
        Taro.hideLoading()
    }

    //打开评论界面
    public handleComment = () => {
        this.props.getUserInfo()
        this.commentRef.current!.open()
    }

    //评论
    public comment = async (value: string) => {
        const { id } = this.props
        Taro.showLoading({mask: true, title: '评论中...'})
        await this.props.comment(value, this.id, id)
        Taro.hideLoading()
    }

    public render() {
        const { detail, commentList=[] } = this.state
        const {
            video,
            info,
            image
        } = detail
        return (
            <View className='detail'>
                <View className='video'>
                    {
                        video ? <GVideo
                        src={video.src}
                        poster={video.poster}
                        id={video.id}
                    /> : null
                    }
                </View>
                <View className='description'>
                    <Content
                        info={info}
                        movie={this.id}
                    />
                </View>
                <View className='image'>
                    <List 
                        list={image}
                    />
                </View>
                <View className='comment'>
                    <IconList
                        list={commentList}
                        id={this.id}        
                    />
                </View>
                <View className='other'>
                    <GButton
                        type={'secondary'}
                        value={['我有话说', '我有话说']}
                        operate={this.handleComment}
                    />
                </View>
                <Comment
                    buttonText={'俺说完了'} 
                    ref={this.commentRef} 
                    publishCom={this.comment}   
                />
            </View>
        )
    }
}