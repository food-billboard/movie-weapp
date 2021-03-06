import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import ImageLoading from '~components/imageLoading'
import { SYSTEM_PAGE_SIZE } from '~config'

import './index.scss'

export interface IList {
  name: string
  image: string
 }

 export interface IProps {
  list: Array<IList>
 }

 export interface IState {}

export default class extends Component<IProps, IState> {

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
            const { image, name } = val
            return (
              <View 
                className='item' 
                key={name}
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
                  <Text>{name}</Text>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }

}