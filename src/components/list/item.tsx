import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { IItemProps } from './interface'

import './index.scss'

export default class Item extends Component<IItemProps>{
    public static defaultProps: IItemProps = {
        type: '',
        value: ''
    }   

    public render() {
        const {type, value} = this.props
        return(
            <View>
                <Text className='title'>{type}</Text>
                <Text>
                    {Array.isArray(value) ? value.join('') : value}
                </Text>
            </View>
        )
    }
}