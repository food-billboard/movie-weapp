import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { IProps, IState, IList } from './index.d'
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
                urls: list.map((val: IList) => {
                    const { image } = val
                    return image
                })
            })
        }
    }
    
    public render() {
        const {list} = this.props
        const lists = list.map((value, index) => {
            const { image, id } = value
            return (
                <View 
                    className='content'
                    key={id}
                    onClick={() => {this.handlePreviewImage.call(this, image)}}
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