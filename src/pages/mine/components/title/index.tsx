import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { IProps } from './index.d'
import { style, TypeColor } from '~theme/global-style'
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
        switch(value) {
            case this.titleConfig.store:
                router.push(routeAlias.store, {id})
                break;
            case this.titleConfig.news:
                router.push(routeAlias.news, {id})
                break;
        }
    }

    public render(){
        return (
            <View className='title at-row at-row__justify--around'
                style={{...style.border(1, 'thirdly', 'solid', 'bottom')}}
            >
                <View className='message at-col at-col-5'
                    onClick={() => {this.handleClick.call(this, this.titleConfig.store)}}
                >
                    <AtIcon value='message' size='30' color={TypeColor['secondary']}></AtIcon>
                    <Text className='text'>{this.titleConfig.store}</Text>
                </View>
                <View className='separate'
                    style={{...style.backgroundColor('thirdly')}}
                ></View>
                <View className='folder at-col at-col-5'
                    onClick={() => {this.handleClick.call(this, this.titleConfig.news)}}
                >
                    <AtIcon value='folder' size='30' color={TypeColor['secondary']}></AtIcon>
                    <Text className='text'>{this.titleConfig.news}</Text>
                </View>
            </View>
        )
    }
}