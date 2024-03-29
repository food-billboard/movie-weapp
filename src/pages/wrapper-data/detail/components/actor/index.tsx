import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { ScrollView, View, Text } from '@tarojs/components'
import ImageLoading from '~components/imageLoading'
import { SYSTEM_PAGE_SIZE } from '~config'
import style from '~theme/style'

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
        return val.image
      })
    })
  }

  public render() {

    const { list=[] } = this.props

    return (
      <ScrollView
        scrollX
        className='data-actor-icon-list'
      >
        {
          list.map((val: IList) => {
            const { image, name } = val
            return (
              <View 
                className='data-actor-icon-list-item' 
                key={name}
                onClick={() => {this.handlePreviewImage.call(this, image)}}
              >
                <ImageLoading 
                  src={image} 
                  customStyle={{
                    height: `${SYSTEM_PAGE_SIZE(85)}px`,
                    borderRadius: '4PX',
                    overflow: 'hidden'
                  }} 
                  loadingProps={{content: ''}}
                />
                <View style={style.color('secondary')} className='data-actor-icon-list-text small-font-size-class'>
                  <Text className='text-ellipsis w-100 dis-b'>{name}</Text>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }

}