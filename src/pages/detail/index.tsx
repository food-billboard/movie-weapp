import Taro, {Component, Config} from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import GVideo from '~components/video'
import List from './components/imglist'
import Content from './components/content'
import GButton from '~components/button'
import IconList from './components/iconList'
import Comment from '~components/comment'
import GTag from './components/tag'
import Actor from './components/actor'
import { style } from '~theme/global-style'

import './index.scss'

import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

let FIRST = true

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {
   
    public config: Config = {
        navigationBarTitleText: ""
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

    //设置标题
    public setTitle = async () => {
        const { detail } = this.state
        const { info } = detail
        if(info && FIRST) {
            FIRST = false
            Taro.setNavigationBarTitle({title: info.name})
        }
    }

    //获取数据
    public fetchData = async () => {
        Taro.showLoading({ mask: true, title: '凶猛加载中' })
        const detail = await this.props.getDetail(this.id)
        const commentList = await this.props.getCommentSimple(this.id)
        const comment = commentList.comment
        this.setState({
            detail,
            commentList: comment
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
            image,
            tag
        } = detail
        this.setTitle()
        return (
            <View className='detail' style={{...style.backgroundColor('bgColor')}}>
                <View className='video'>
                    {
                        video ? <GVideo
                        src={video.src}
                        poster={video.poster}
                        id={video.id}
                    /> : null
                    }
                </View>
                <View className={'description'}
                    style={{...style.color('thirdly'), ...style.border(1, 'thirdly', 'solid', 'top')}}
                >
                    <Content
                        info={info}
                        movie={this.id}
                    />
                </View>
                <View className='image'>
                    <Text 
                        style={{...style.color('primary')}}
                        className='item-title'
                    >截图</Text>
                    <List 
                        list={image}
                    />
                </View>
                <View className='actor'>
                    <Text 
                        style={{...style.color('primary')}}
                        className='item-title'    
                    >演员</Text>
                    <Actor list={info ? info.actor : []} />
                </View>
                <View className='tag'> 
                    <Text 
                        style={{...style.color('primary')}}
                        className='item-title'
                    >大家都说</Text>
                    <GTag
                        list={tag}
                    ></GTag>
                </View>
                <View className='comment'>
                    <Text 
                        style={{...style.color('primary')}}
                        className='item-title'
                    >评论用户</Text>
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