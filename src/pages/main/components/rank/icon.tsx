import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import style from '~theme/style'
import { IIconProps as IProps } from './index'

import './index.scss'

export default class RankIcon extends Component<IProps>{
  public static defaultProps: IProps = {
    rank: 1
  }

  render() {
    const { rank } = this.props
    return (
      <View className='main-rank-icon'
        style={{ ...style.backgroundColor('disabled') }}
      >
        <Text 
          className='main-rank-icon-text normal-font-size-class'
          style={{ ...style.color('thirdly') }}
        >▲{rank}</Text>
      </View>
    )
  }
}