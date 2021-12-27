import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { AtTag } from 'taro-ui'
import { View } from '@tarojs/components'
import style from '~theme/style'
import { isObject } from '~utils'

import './index.scss'

export interface IProps {
  title: string
  fontStyle?: any
  dividerStyle?: any
  arrowText?: string
}

export default class extends Component<IProps> {

  public render() {

    const { title, fontStyle = {}, dividerStyle = {} } = this.props

    return (
      <View className='title'>
        <AtTag
          customStyle={{
            ...style.color('primary'),
            ...style.backgroundColor('disabled'),
            position: 'relative',
            top: 0,
            left: 0,
            zIndex: 2,
            ...(isObject(fontStyle) ? fontStyle : {})
          }}
          className='item-title'
        >{title}</AtTag>
        <View
          className='divider'
          style={{
            ...style.border(1, 'disabled', 'dashed', 'all'),
            ...(isObject(dividerStyle) ? dividerStyle : {})
          }}
        ></View>
      </View>
    )
  }

}