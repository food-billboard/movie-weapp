import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import ImageLoading from '~components/imageLoading'
import { IProps, IState } from './index.d'
import './index.scss'

export default class List extends Component<IProps, IState> {
    public static defaultProps = {
        list: []
    }

    public state: IState = {
        imageList: []
    }

    //查看图片
    public handlePreviewImage = (image: string) => {
        if(image && image.length) {
            const { list } = this.props
            Taro.previewImage({
                current: image,
                urls: list
            })
        }
    }
    
    public render() {
        const {list} = this.props
        return (
            <View className='list'>
                {
                    list.map((value, index) => {
                        return (
                            <View 
                                className='content'
                                key={index}
                                onClick={() => {this.handlePreviewImage.call(this, value)}}
                            >
                                <ImageLoading  
                                    src={value}
                                />
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}