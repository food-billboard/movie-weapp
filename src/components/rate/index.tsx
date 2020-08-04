import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtRate } from 'taro-ui'
import style from '~theme/style'
import { SYSTEM_PAGE_SIZE } from '~config'
import noop from 'lodash/noop'

import './index.scss'

export interface IProps {
  rate: (value: number) => any
  value: number
  readonly?: boolean
  style?: React.CSSProperties
}

export interface IState {}

export default class GTate extends Component<IProps, IState>{

  public static defaultProps: IProps = {
    value: 0,
    rate: noop,
  }

  //监听分数变化
  public handleChange = async (value: number) => await this.props.rate(value)

  public render() {
    
    const { readonly = false, value, style: customerStyle = {} } = this.props

    return (
      <View className='rate'
        style={{ ...customerStyle }}
      >
        {
          readonly ?
            <AtRate
              className='star'
              size={SYSTEM_PAGE_SIZE(25)}
              max={10}
              value={value}
            />
            :
            <AtRate
              className='star'
              size={SYSTEM_PAGE_SIZE(25)}
              max={10}
              value={value}
              onChange={(value) => { this.handleChange.call(this, value) }}
            />
        }
        <Text
          className='number'
          style={{ ...style.color('secondary') }}
        >{value}</Text>
      </View>
    )
  }
}