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

    readonly id = this.$router.params.id

    public constructor() {
        super(...arguments)
        
        this.attention = this.attention.bind(this)
    }

    public componentDidMount = async () => {
        Taro.showLoading({mask: true, title: '加载中'})
        await this.props.getUserInfo(this.id)
        Taro.hideLoading()
    }

    public attention = async () => {
        const {id} = this.props
        Taro.showLoading({mask: true, title: '操作中'})
        await this.props.toAttention(this.id, id, this.props.info.isAttention)
        Taro.hideLoading()
    }

    public render() {
        const {info} = this.props
        const {isAttention} = info
        return (
            <View className='user'>
                <View className='icon'>
                    <IconHead
                        list={info}
                    />
                </View>
                <View className='list'>
                    <List />
                </View>
                {/* <View className='button'> */}
                <GButton
                    style={{width: '100%', height: 120, position: 'fixed', left: 0, bottom: 0}}
                    active={isAttention ? 0 : 1}
                    value={['关注', '取消关注']}
                    operate={this.attention}
                />
                {/* </View> */}
            </View>
        )
    }
}