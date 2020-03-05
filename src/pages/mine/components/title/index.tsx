import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtBadge } from 'taro-ui'
import { IProps } from './index.d'
import { TypeColor } from '~theme/color'
import style from '~theme/style'
import './index.scss'

import { router, routeAlias } from '~utils'

export default class Title extends Component<IProps>{
    public static defaultProps = {
        id: ''
    }

    //标题
    readonly titleConfig = {
        store: '收藏',
        news: '通知'
    }

    public componentDidShow = () => {
        this.setState({})
    }

    public handleClick = (value) => {
        const {id} = this.props
        const { titleConfig } = this
        switch(value) {
            case titleConfig.store:
                router.push(routeAlias.store, {id})
                break;
            case titleConfig.news:
                Taro.hideTabBarRedDot({
                    index:2
                })
                router.push(routeAlias.news, {id})
                break;
        }
    }

    public render(){

        const { titleConfig: config } = this
        const { hasNews=false } = this.props

        return (
            <View className='title at-row at-row__justify--around'
                style={{...style.border(1, 'thirdly', 'solid', 'bottom'), ...style.color('thirdly')}}
            >
                <View className='message at-col at-col-5'
                    onClick={() => {this.handleClick.call(this, config.store)}}
                >
                    <AtIcon value='message' size='30' color={TypeColor['secondary']}></AtIcon>
                    <Text className='text'>{this.titleConfig.store}</Text>
                </View>
                <View className='separate'
                    style={{...style.backgroundColor('thirdly')}}
                ></View>
                <View className='folder at-col at-col-5'
                    onClick={() => {this.handleClick.call(this, config.news)}}
                >
                    <AtBadge dot={hasNews}>
                        <AtIcon value='folder' size='30' color={TypeColor['secondary']}></AtIcon>
                    </AtBadge>
                    <Text className='text'>{this.titleConfig.news}</Text>
                </View>
            </View>
        )
    }
}