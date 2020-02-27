import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View, Image, Text } from '@tarojs/components'
import { IProps, IState, IList } from './interface'

import './index.scss'

export default class extends Component<IProps> {

  public handlePreviewImage = (image: string) => {
    const { list } = this.props
    Taro.previewImage({
      current: image,
      urls: list.map((val: IList) => {
        const { image } = val
        return image
      })
    })
  }

  public render() {

    const { list=[] } = this.props
    console.log(list)

    return (
      <ScrollView
        scrollX
        className='actor'
      >
        {
          list.map((val: IList) => {
            const { image, id, value } = val
            return (
              <View 
                className='item' 
                key={id}
                onClick={() => {this.handlePreviewImage.call(this, image)}}
              >
                <View className='image'>
                  <Image className='image-item' src={image}/>
                </View>
                <View className='text'>
                  <Text>{value}</Text>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }

}