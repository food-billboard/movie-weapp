import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import IconHead from '~components/headicon'
import List from '~components/linearlist'
import GButton from '~components/button'
import { style } from '~theme/global-style'
import './index.scss'

import {mapStateToProps, mapDispatchToProps} from './connect'
import {router} from '~utils'
import {connect} from '@tarojs/redux'

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
    readonly mineId = this.props.id

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
        await this.props.getUserInfo()
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
        router.push('/store', {id: this.id})
    }

    //查看关注
    public handleCheckAttention = async () => {
        router.push('/attention', {id: this.id})
    }

    //查看浏览记录
    public handleCheckRecord = async () => {
        router.push('/record', { id: this.id })
    }

    //查看电影发布
    public handleCheckIssue = async () => {
        router.push('/userissue', { id: this.id })
    }

    //用户界面的相关信息
    readonly userInfo = [
        {
            title: 'Ta的收藏',
            iconInfo: {
                value: 'heart', 
                size: 32, 
            },
            handle:this.handleCheckStore,
            id: 'store'
        },
        {
            title: 'Ta的关注',
            iconInfo: {
                value: 'star', 
                size: 32, 
            },
            handle:this.handleCheckAttention,
            id: 'attention'
        },
        {
            title: 'Ta的浏览记录',
            iconInfo: {
                value: 'list',
                size: 32
            },
            handle: this.handleCheckRecord,
            id: 'record'
        },
        {
            title: 'Ta的电影',
            iconInfo: {
                value: 'share-2',
                size: 32
            },
            handle: this.handleCheckIssue,
            id: 'issue'
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
                    style={{...style.border(1, 'disabled', 'solid', 'bottom')}}
                >
                    <List 
                        list={this.userInfo}
                    />
                </View>
                <GButton
                    type={'secondary'}
                    style={{width: '100%', height: 120, position: 'fixed', left: 0, bottom: 0}}
                    active={isAttention ? 1 : 0}
                    value={['关注', '取消关注']}
                    operate={this.attention}
                />
            </View>
        )
    }
}