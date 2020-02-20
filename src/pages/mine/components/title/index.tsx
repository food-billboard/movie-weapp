import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { IProps } from './interface'
import { style, TypeColor } from '~theme/global-style'
import './index.scss'

import {router} from '~utils'

export default class Title extends Component<IProps>{
    public static defaultProps = {
        id: ''
    }

    public componentDidShow = () => {
        this.setState({})
    }

    public handleClick = (value) => {
        const {id} = this.props
        switch(value) {
            case '收藏':
                router.push('/store', {id})
                break;
            case '通知':
                router.push('/news', {id})
                break;
        }
    }

    public render(){
        return (
            <View className='title at-row at-row__justify--around'
                style={{...style.border(1, 'thirdly', 'solid', 'bottom')}}
            >
                <View className='message at-col at-col-5'
                    onClick={() => {this.handleClick.call(this, '收藏')}}
                >
                    <AtIcon value='message' size='30' color={TypeColor['secondary']}></AtIcon>
                    <Text className='text'>收藏</Text>
                </View>
                <View className='separate'
                    style={{...style.backgroundColor('thirdly')}}
                ></View>
                <View className='folder at-col at-col-5'
                    onClick={() => {this.handleClick.call(this, '通知')}}
                >
                    <AtIcon value='folder' size='30' color={TypeColor['secondary']}></AtIcon>
                    <Text className='text'>通知</Text>
                </View>
            </View>
        )
    }
}