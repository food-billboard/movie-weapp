import Taro, {Component, Config} from '@tarojs/taro'
import { View } from '@tarojs/components'
import GVideo from '~components/video'
import List from './components/imglist'
import Content from './components/content'
import GButton from '~components/button'
import IconList from './components/iconList'
import Comment from '~components/comment'
import GTag from './components/tag'
import Actor from './components/actor'
import Title from './components/title'
import Tab from './components/tab'
import style from '~theme/style'
import { colorStyleChange } from '~theme/color'
import { getCookie } from '~config'
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { size, withTry } from '~utils'

import './index.scss'

let FIRST = true

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {

    public config: Config = {
        navigationBarTitleText: ""
    }

      //电影id
    private id = this.$router.params.id

    public componentDidShow = () => {
        colorStyleChange()
    }

    private commentRef = Taro.createRef<Comment>()

    private tabRef = Taro.createRef<Tab>()

    public state: any = {
        detail: [],
        tab: false,
        commentList: []
    }

    //我的id
    private mineId

    public componentDidMount = async() => {
        this.fetchData()
    }

    //设置标题
    public setTitle = async () => {
        const { detail } = this.state
        const current = this.tabRef.current ? this.tabRef.current.getCurrent() : 0
        const { info={} } = detail[current] ? detail[current] : {}
        const { name='' } = info
        if(info && FIRST) {
            FIRST = false
            Taro.setNavigationBarTitle({title: name})
        }
    }

    //获取数据
    public fetchData = async () => {
        const { tab } = this.state
        let _tab = tab
        Taro.showLoading({ mask: true, title: '凶猛加载中' })
        const detail = await this.props.getDetail(this.id)
        const commentList = await this.props.getCommentSimple(this.id)
        const comment = commentList.comment
        const {data, values} = detail
        if(!_tab && values) {
            _tab = data.map(val => {
                const { info: {name} } = val
                return name
            })
        }
        this.setState({
            detail: data,
            commentList: comment,
            tab: _tab
        })
        Taro.hideLoading()
    } 

    //打开评论界面
    public handleComment = () => {
         //获取个人信息缓存
         const userInfo = getCookie('user') || {}
         if(!size(userInfo)) {
             this.props.getUserInfo()
             return 
         }
         const { id } = JSON.parse(userInfo)
         this.mineId = id 

        this.commentRef.current!.open()
    }

    //评论
    public comment = async (value: string) => {

        Taro.showLoading({mask: true, title: '评论中...'})
        await withTry(this.props.comment)(value, this.id, this.mineId)
        Taro.hideLoading()
    }

    //tab切换
    public handleTabChange = (value) => {
        const { detail } = this.state
        const { id, info: {name} } = detail[value]
        this.id = id
        this.setState({})
    }

    public render() {
        const { detail, commentList=[], tab } = this.state
        let current = this.tabRef.current ? this.tabRef.current!.getCurrent() : 0
        const {
            video={},
            info={},
            image=[],
            tag=[]
        } = detail[current] ? detail[current] : {}
        this.setTitle()
        return (
            <View className='detail' style={{...style.backgroundColor('bgColor')}}>
                {
                    tab ?
                    <Tab
                        values={tab}
                        handleClick={this.handleTabChange}
                        ref={this.tabRef}
                        tabToggle={1000}
                    />
                    : null
                }
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
                    <View className='title'>
                        <Title
                            title={'截图'}
                        />
                    </View>
                    <List 
                        list={image}
                    />
                </View>
                <View className='actor'>
                    <View className='title'>
                        <Title
                            title={'卡司'}
                        />
                    </View>
                    <Actor list={info ? info.actor : []} />
                </View>
                <View className='tag'> 
                    <View className='title'>
                        <Title
                            title={'大家都说'}
                        />
                    </View>
                    <GTag
                        list={tag}
                    ></GTag>
                </View>
                <View className='comment'>
                    <View className='title'>
                        <Title
                            title={'大家评论'}
                        />
                    </View>
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