import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

interface IProps {
    rank: number
}

export default class RankIcon extends Component<IProps>{
    public static defaultProps = {
        rank: 1
    }

    public constructor() {
        super(...arguments)
    }
    render() {
        const { rank } = this.props
        return(
            <View className='icon'>
                <Text className='icon-text'>▲{rank}</Text>
            </View>
        )
    }
}