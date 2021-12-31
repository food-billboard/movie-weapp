import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import style from '~theme/style'

import './index.scss'

export interface IProps {
  text?: string
  movie: string
  store: (store: boolean) => any
  value: boolean
  className?: string 
}

export interface IState {}

export default class extends Component<IProps, IState> {
  
  public static defaultProps:IProps = {
    text: '收藏',
    movie: '',
    value: false,
    store: () => {}
  }

  public render() {
    
    const { text, value, className } = this.props

    return (
      <AtButton
        customStyle={{...style.color(value ? 'primary' : 'thirdly')}}
        onClick={this.props.store.bind(this, !value)}
        className={`page-detail-store-button ${className}`}
        size='small'
      >
        <View 
          className={`at-icon at-icon-${value ? 'star-2' : 'star'}`}
        ></View>
        {text}
      </AtButton>
    )
  }
}