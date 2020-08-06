import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

export interface IProps {
  isEmpty: (() => boolean) | boolean,
  loading: boolean
}

export interface IState {} 

export default class extends Component<IProps, IState> {
  
  public render() {

    const { isEmpty, loading } = this.props

    return (
      <View className="result"> 
        {
          (( typeof isEmpty === 'function' ? isEmpty() : isEmpty ) && !loading) ?
          <View className="result-point">
            <Text className="result-text">暂时没有数据，去看看其他的吧</Text>
            <View className="at-icon at-icon-alert-circle"></View>
          </View>
          :
          this.props.children
        }
      </View>
    )
  }

}