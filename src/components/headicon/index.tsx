import Taro, {Component} from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'

import './index.scss'

interface List {
    username: string, 
    img: string, 
    hot: number
}

interface IProps {
    list: List
}

export default class IconHead extends Component<IProps>{
    public static defaultPrps: IProps = {
        list: {
            username: '用户名',
            img: '头像',
            hot: 0
        }
    }

    public render() {
        const {list} = this.props
        const {username, img, hot} = list
        return (
            <View className='head'>
                <View className='icon'>
                    <View className='img'>
                        <AtAvatar
                            image={img} 
                            className='content' 
                            text={'头像'}
                            circle
                            size={'large'}
                            customStyle={{width: '100%', height: '100%'}}
                         />
                    </View>
                    <Text className='username'>{username}</Text>
                </View>
                <View className='hot'>
                    <Text className='count'>{hot}</Text>觉得很赞
                </View>
            </View>
        )
    }
}