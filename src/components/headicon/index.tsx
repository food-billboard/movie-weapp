import Taro, {Component} from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import { IProps } from './interface'
import { style } from '~theme/global-style'
import './index.scss'

export default class IconHead extends Component<IProps>{
    public static defaultProps: IProps = {
        list: {
            username: '用户名',
            image: '头像',
            hot: 0
        }
    }

    //查看图片
    public previewImage = (image: string) => {
        Taro.previewImage({
            current: image,
            urls: [image]
        })
    }

    public render() {
        const {list} = this.props
        const {username='', image='', hot=0} = list
        return (
            <View className='head'
                style={{...style.backgroundColor('thirdly')}}
            >
                <View className='icon'>
                    <View className='img'
                        onClick={this.previewImage.bind(this, image)}
                    >
                        <AtAvatar
                            image={image} 
                            className='content' 
                            text={'头像'}
                            circle
                            size={'large'}
                            customStyle={{width: '100%', height: '100%'}}
                         />
                    </View>
                    <Text className='username' style={{...style.color('primary')}}>{username}</Text>
                </View>
                <View className='hot'
                    style={{...style.color('disabled')}}
                >
                    <Text className='count'
                        style={{...style.color('primary')}}
                    >{hot}</Text>人觉得很赞
                </View>
            </View>
        )
    }
}