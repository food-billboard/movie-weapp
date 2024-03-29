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
  size?: number | string
  max?: number 
  origin?: number 
}

export interface IState { }

export default class GTate extends Component<IProps, IState>{

  public static defaultProps: IProps = {
    value: 0,
    rate: noop,
    size: 20,
    max: 10
  }

  //监听分数变化
  public handleChange = async (value: any) => await this.props.rate(value)

  public render() {

    const { readonly = false, value, style: customerStyle = {}, size = 20, max=10, origin } = this.props

    return (
      <View className='component-rate'
        style={{ ...customerStyle }}
      >
        {
          readonly ?
            <AtRate
              className='star'
              size={SYSTEM_PAGE_SIZE(Number(size))}
              max={max}
              value={value}
            />
            :
            <AtRate
              className='star'
              size={SYSTEM_PAGE_SIZE(Number(size))}
              max={max}
              value={value}
              onChange={this.handleChange}
            />
        }
        <Text
          className='component-rate-number'
          style={{ ...style.color('secondary'), fontSize: size + "px" }}
        >{origin || value}</Text>
      </View>
    )
  }
}