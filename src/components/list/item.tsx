import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'

import './index.scss'

export interface IItemProps {
  type: string,
  value: string | number | API_USER.ItypeList[]
}

export default class Item extends Component<IItemProps>{
  public static defaultProps: IItemProps = {
    type: '',
    value: ''
  }

  public render() {
    const { type, value } = this.props
    return (
      <View className='movie-data-list-title-content'>
        <Text className='movie-data-list-title'>{type}</Text>
        <Text className='movie-data-list-title'>
          {Array.isArray(value) ? value.join('') : value}
        </Text>
      </View>
    )
  }
}