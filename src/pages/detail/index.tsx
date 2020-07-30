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
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { withTry, router, routeAlias } from '~utils'
import { getCustomerMovieDetail, getUserMovieDetail, postCommentToMovie, putStore, cancelStore, putRate } from '~services'

import './index.scss'

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
        detail: {},
        tab: [],
        commentList: []
    }

    public componentDidMount = async() => {
        this.fetchData()
    }

    //设置标题
    public setTitle = async () => {
        const current = this.tabRef.current ? this.tabRef.current.getCurrent() : 0
        const { tab } = this.state
        Taro.setNavigationBarTitle({ title: tab[current] ? tab[current].same_name : '电影' })
    }

    //获取数据
    public fetchData = async () => {
        const { userInfo } = this.props
        Taro.showLoading({ mask: true, title: '凶猛加载中' })
        const method = userInfo ? getCustomerMovieDetail : getUserMovieDetail
        const data = await method(this.id)
        const { comment, same_film=[], name, _id } = data
        const baseTab = [{
            _id,
            same_name: name,
            type: 'NAMESAKE'
        }]
        this.setState({
            tab: same_film.length ? [ ...baseTab, ...same_film ] : [ ...baseTab ],
            detail: data,
            commentList: comment,
        })
        Taro.hideLoading()
    } 

    //打开评论界面
    public handleComment = async () => {
        //TODO
        Taro.showToast({
            title: '功能完善中...',
            icon: 'none',
            duration: 1000
        })
        return
        //

         //获取个人信息缓存
        await this.props.getUserInfo()
        .then(_ => {
            this.commentRef.current!.open()
        })
        .catch(err => err)
    }

    //评论
    public comment = async (value: {
        text?: string,
        image?: Array<any>,
        video?: Array<any>
    }) => {
        const { text='', image=[], video=[] } = value
        Taro.showLoading({mask: true, title: '评论中...'})
        await withTry(postCommentToMovie)({ _id: this.id, content: { text, image, video } })
        Taro.hideLoading()
    }

    //收藏
    public store = async(store: boolean) => {
        await this.props.getUserInfo()
        .then(async(_) => {
            Taro.showLoading({ mask: true, title: '稍等一下' })
            const method = store ? cancelStore : putStore
            await withTry(method)(this.id)
            Taro.hideLoading()
        })
        .catch(err => err)
    }

    //评分
    public rate = async(value: number) => {
        await this.props.getUserInfo()
        .then(async(_) => {
            Taro.showLoading({ mask: true, title: '稍等一下' })
            await withTry(putRate)({ _id: this.id, value })
            Taro.hideLoading()
        })
        .catch(err => err)
    }

    //tab切换
    public handleTabChange = async (value: string) => {
        const { tab } = this.state
        // const [ item ] = tab.filter(item => item.name === value)
        const { _id } = tab[value]
        this.id = _id
        await this.fetchData()
    }

    public render() {
        const { detail: {
            video,
            poster,
            images=[],
            info={},
            tag,
            glance,
            createdAt,
            hot,
            rate,
            author_rate,
            store,
            author_description,
            author
        }, commentList=[], tab } = this.state
        const {
            actor,
            district,
            language,
            director,
            classify,
            ...nextInfo
        } = info

        this.setTitle()
        return (
            <View className='detail' style={{...style.backgroundColor('bgColor')}}>
                {
                    tab.length ?
                    <Tab
                        values={tab.map(item => item.name)}
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
                        poster={poster}
                        id={video}
                    /> : null
                    }
                </View>
                <View className={'description'}
                    style={{...style.color('thirdly'), ...style.border(1, 'thirdly', 'solid', 'top')}}
                >
                    <Content
                        store={this.store}
                        rate={this.rate}
                        info={{
                            ...nextInfo,
                            glance,
                            district: district ? district.map(item => ({ value: item.name })) : [],
                            director: director ? director.map(item => ({ value: item.name })) : [],
                            actor: actor ? actor.map(item => ({ value: item.name })) : [],
                            classify: classify ? classify.map(item => ({ value: item.name })) : [],
                            language: language ? language.map(item => ({ value: item.name })) : [],
                            createdAt,
                            hot,
                            rate: rate || 0,
                            author_rate,
                            store,
                            author_description,
                            author: author ? author.user : ''
                        }}
                    />
                </View>
                <View className='image'>
                    <View className='title'>
                        <Title
                            title={'截图'}
                        />
                    </View>
                    <List 
                        list={images}
                    />
                </View>
                <View className='actor'>
                    <View className='title'>
                        <Title
                            title={'卡司'}
                        />
                    </View>
                    <Actor list={actor ? actor.map(item => {
                        const { name, other: { avatar } } = item
                        return {
                            name,
                            image: avatar
                        }
                    }) : []} />
                </View>
                <View className='tag'> 
                    <View className='title'>
                        <Title
                            title={'大家都说'}
                        />
                    </View>
                    <GTag
                        list={tag ? tag.map(item => {
                            const { text } = item
                            return {
                                value: text
                            }
                        }) : []}
                    ></GTag>
                </View>
                <View className='comment'>
                    <View className='title'>
                        <Title
                            title={'大家评论'}
                        />
                    </View>
                    <IconList
                        list={commentList.map(comment => {
                            const { content: { text }, _id, user_info: { avatar } } = comment
                            return {
                                id: _id,
                                content: text || '[ 媒体 ]',
                                image: avatar
                            }   
                        })}
                        handleClick={() => router.push(routeAlias.comment, { id: this.id })}      
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