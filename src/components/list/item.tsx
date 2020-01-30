import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

interface IProps {
    type: string,
    value: string | number
}

export default class Item extends Component<IProps>{
    public static defaultProps: IProps = {
        type: '',
        value: ''
    }   

    public render() {
        const {type, value} = this.props
        return(
            <View>
                <Text className='title'>{type}</Text>
                <Text>
                    {value}
                </Text>
            </View>
        )
    }
}