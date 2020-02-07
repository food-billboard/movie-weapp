import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import IconHead from '~components/headicon'
import List from '~components/linearlist'
import GButton from '~components/button'
import './index.scss'

import {mapStateToProps, mapDispatchToProps} from './connect'
import {router} from '~utils'
import {connect} from '@tarojs/redux'

@connect(mapStateToProps, mapDispatchToProps)
export default class User extends Component<any>{
    
    public static config: Config = {
        navigationBarTitleText: '用户界面',
    }

    public state: any = {
        userInfo: {},
        isAttention: false
    }

    //用户id
    readonly id = this.$router.params

    //我的id
    readonly mineId = this.props.id

    public constructor() {
        super(...arguments)
        
        this.attention = this.attention.bind(this)
    }

    public componentDidMount = async () => {
        this.fetchData()
    }

    //数据获取
    public fetchData = async () => {
        Taro.showLoading({mask: true, title: '加载中'})
        const userInfo = await this.props.getUserInfo()
        if(this.mineId) {
            const attentionData = await this.props.getIsAttention(this.id, this.mineId)
            const { attention } = attentionData
            await this.setState({
                isAttention: attention
            })
        }
        const { info } = userInfo
        await this.setState({
            userInfo: info,
        })
        Taro.hideLoading()
    }

    //关注/取消关注
    public attention = async () => {
        await this.props.getUserInfo()
        const { isAttention } = this.state
        Taro.showLoading({mask: true, title: '操作中'})
        const data = await this.props.toAttention(this.id, this.mineId, isAttention)
        const { attention } = data
        await this.setState({
            isAttention: attention
        })
        Taro.hideLoading()
    }

    //查看收藏
    public handleCheckStore = async () => {
        router.push('/record', {id: this.id})
    }

    //查看关注
    public handleCheckAttention = async () => {
        router.push('/attention', {id: this.id})
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
                <View className='list'>
                    <List 
                        list={this.userInfo}
                    />
                </View>
                <GButton
                    style={{width: '100%', height: 120, position: 'fixed', left: 0, bottom: 0}}
                    active={isAttention ? 1 : 0}
                    value={['关注', '取消关注']}
                    operate={this.attention}
                />
            </View>
        )
    }
}