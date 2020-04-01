import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import ImageLoading from '~components/imageLoading'
import { IProps, IState, IList } from './index.d'
import { SYSTEM_PAGE_SIZE } from '~config'

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
                  <ImageLoading 
                    src={image} 
                    customStyle={{
                      height: `${SYSTEM_PAGE_SIZE(85)}px`
                    }} 
                    loadingProps={{content: ''}}
                  />
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