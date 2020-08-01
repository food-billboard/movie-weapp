import Taro  from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import ImageLoading from '~components/imageLoading'

import './index.scss'

export interface IProps {
  list: Array<string>
}

export interface IState {}

export default class List extends Component<IProps, IState> {
  public static defaultProps = {
    list: []
  }

  //查看图片
  public handlePreviewImage = (image: string) => {
    if (image && image.length) {
      const { list } = this.props
      Taro.previewImage({
        current: image,
        urls: list
      })
    }
  }

  public render() {
    
    const { list } = this.props

    return (
      <View className='list'>
        {
          list.map(value => {
            return (
              <View
                className='content'
                key={value}
                onClick={() => { this.handlePreviewImage.call(this, value) }}
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