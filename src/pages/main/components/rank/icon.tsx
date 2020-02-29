import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { IIconProps as IProps } from './index.d'
import { style } from '~theme/global-style'
import './index.scss'

export default class RankIcon extends Component<IProps>{
    public static defaultProps:IProps = {
        rank: 1
    }

    render() {
        const { rank } = this.props
        return(
            <View className={'icon'}
                style={{...style.backgroundColor('disabled')}}
            >
                <Text className={'icon-text'}
                    style={{...style.color('thirdly')}}
                >▲{rank}</Text>
            </View>
        )
    }
}