import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { IProps } from './interface'

import './index.scss'

export default class List extends Component<IProps> {
    public static defaultProps = {
        list: []
    }
    
    public render() {
        const {list} = this.props
        const lists = list.map((value, index) => {
            const { image, id } = value
            return (
                <View className='content'
                    key={id}
                >
                    <Image 
                        src={image} 
                        className='main'
                     />
                </View>
            )
        })
        return (
            <View className='list'>
                {lists}
            </View>
        )
    }
}