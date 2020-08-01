import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { ItypeList } from '~utils'

import './index.scss'

export interface IItemProps {
  type: string,
  value: string | number | Array<ItypeList>
}

export default class Item extends Component<IItemProps>{
  public static defaultProps: IItemProps = {
    type: '',
    value: ''
  }

  public render() {
    const { type, value } = this.props
    return (
      <View>
        <Text className='title'>{type}</Text>
        <Text>
          {Array.isArray(value) ? value.join('') : value}
        </Text>
      </View>
    )
  }
}