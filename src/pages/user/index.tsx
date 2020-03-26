import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import IconHead from '~components/headicon'
import List from '~components/linearlist'
import GButton from '~components/button'
import { TypeColor, colorStyleChange } from '~theme/color'
import {mapStateToProps, mapDispatchToProps} from './connect'
import { router, routeAlias, size } from '~utils'
import {connect} from '@tarojs/redux'
import style from '~theme/style'
import { getCookie } from '~config'

import './index.scss'

@connect(mapStateToProps, mapDispatchToProps)
export default class User extends Component<any>{
    
    public static config: Config = {
        navigationBarTitleText: '用户',
    }

    public state: any = {
        userInfo: {},
        isAttention: false
    }

    //用户id
    readonly id = this.$router.params

    //我的id
    private mineId

    public componentDidShow = () => {
        colorStyleChange()
    }

    public componentDidMount = async () => {
        this.fetchData()
    }

    //数据获取
    public fetchData = async () => {
        Taro.showLoading({mask: true, title: '加载中'})
        const userInfo = await this.props.getUserInfo()
        const { info } = userInfo
        const isLike = info.isLike
        await this.setState({
            userInfo: info,
            isAttention: isLike
        })
        Taro.hideLoading()
    }

    //关注/取消关注
    public attention = async () => {
        const userInfo = getCookie('user') || {}
        if(!size(userInfo)) {
            await this.props.getUserInfo()
            return
        }
        const { id } = userInfo
        this.mineId = id

        const { isAttention } = this.state
        Taro.showLoading({mask: true, title: '操作中'})
        const data = await this.props.toAttention(this.id, this.mineId, isAttention)
        if(data) {
            await this.setState({
                isAttention: !isAttention
            })
        }
        Taro.hideLoading()
    }

    //查看收藏
    public handleCheckStore = async () => {
        router.push(routeAlias.store, {id: this.id})
    }

    //查看关注
    public handleCheckAttention = async () => {
        router.push(routeAlias.attention, {id: this.id})
    }

    //查看浏览记录
    public handleCheckRecord = async () => {
        router.push(routeAlias.record, { id: this.id })
    }

    //查看电影发布
    public handleCheckIssue = async () => {
        router.push(routeAlias.userissue, { id: this.id })
    }

    //查看评论
    public handleCheckComment = async () => {
        router.push(routeAlias.mycomment, { id: this.id })
    }

    //查看粉丝
    public handleCheckFans = async() => {
        router.push(routeAlias.fans, { id: this.id })
    }

    //用户界面的相关信息
    readonly userInfo = [
        {
            title: 'Ta的收藏',
            iconInfo: {
                value: 'heart', 
                // size: SYSTEM_PAGE_SIZE(14), 
                color: TypeColor['primary']
            },
            handle:this.handleCheckStore,
            id: Symbol('store')
        },
        {
            title: 'Ta的关注',
            iconInfo: {
                value: 'star', 
                // size: SYSTEM_PAGE_SIZE(14), 
                color: TypeColor['primary']
            },
            handle:this.handleCheckAttention,
            id: Symbol('attention')
        },
        {
            title: 'Ta的粉丝',
            iconInfo: {
                value: 'user',
                // size: SYSTEM_PAGE_SIZE(14), 
                color: TypeColor['primary']
            },
            handle: this.handleCheckFans,
            id: Symbol('fans')
        },
        {
            title: 'Ta的浏览记录',
            iconInfo: {
                value: 'list',
                // size: SYSTEM_PAGE_SIZE(14), 
                color: TypeColor['primary']
            },
            handle: this.handleCheckRecord,
            id: Symbol('record')
        },
        {
            title: 'Ta的评论',
            iconInfo: {
                value: 'bookmark',
                // size: SYSTEM_PAGE_SIZE(14), 
                color: TypeColor['primary']
            },
            handle: this.handleCheckComment,
            id: Symbol('comment')
        },
        {
            title: 'Ta的电影',
            iconInfo: {
                value: 'share-2',
                // size: SYSTEM_PAGE_SIZE(14), 
                color: TypeColor['primary']
            },
            handle: this.handleCheckIssue,
            id: Symbol('issue')
        }
    ]

    public render() {
        const {isAttention, userInfo} = this.state
        return (
            <View className='user'>
                <View className='icon'>
                    <IconHead
                        list={userInfo}
                    />
                </View>
                <View className='list'
                    // style={{...style.border(1, 'disabled', 'solid', 'bottom')}}
                    style={{borderBottom: '1px solid rgb(237, 243, 248)'}}
                >
                    <List 
                        list={this.userInfo}
                    />
                </View>
                <GButton
                    type={'secondary'}
                    style={{width: '100%', height: 120, position: 'fixed', left: 0, bottom: 0, ...style.backgroundColor('bgColor')}}
                    active={isAttention ? 1 : 0}
                    value={['关注', '取消关注']}
                    operate={this.attention}
                />
            </View>
        )
    }
}