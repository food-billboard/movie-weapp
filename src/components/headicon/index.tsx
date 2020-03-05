import Taro, {Component} from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import { IProps } from './index.d'
import style from '~theme/style'
import { formatNumber } from '~utils'

import './index.scss'

export default class IconHead extends Component<IProps>{
    public static defaultProps: IProps = {
        list: {
            username: '用户名',
            image: '头像',
            hot: 0,
            fans: 0,
            attention: 0
        }
    }

    //查看图片
    public previewImage = (image: string) => {
        if(image && image.length) {
            Taro.previewImage({
                current: image,
                urls: [image]
            })
        }
    }

    public render() {
        const {list} = this.props
        const {username='', image='', hot=0, fans, attention} = list
        return (
            <View className='head'
                style={{...style.backgroundColor('thirdly')}}
            >
                <View className='icon'>
                    <View className='content'
                        onClick={this.previewImage.bind(this, image)}
                    >
                        <View className='img'>
                            <AtAvatar
                                image={image} 
                                text={'头像'}
                                circle
                                size={'large'}
                                customStyle={{width: '100%', height: '100%'}}
                            />
                         </View>
                    </View>
                    <View className='username' style={{...style.color('primary')}}>
                        <Text 
                            className='user-text'
                        >{username}</Text>
                    </View>
                </View>
                <View className='hot at-row'
                    style={{...style.color('disabled')}}
                >
                    <View className='at-col text'>
                        <Text className='count'
                            style={{...style.color('primary')}}
                        >{formatNumber(fans)}</Text> 粉丝
                    </View>
                    <View className='at-col text'>
                        <Text className='count'
                            style={{...style.color('primary')}}
                        >{formatNumber(attention)}</Text> 人关注
                    </View>
                    <View className='at-col text'>
                        <Text className='count'
                            style={{...style.color('primary')}}
                        >{formatNumber(hot)}</Text> 人觉得很赞
                    </View>
                </View>
            </View>
        )
    }
}