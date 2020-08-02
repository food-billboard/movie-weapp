import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'

export interface IProps {
  isEmpty: (() => boolean) | boolean
}

export interface IState {} 

export default class extends Component<IProps, IState> {
  
  public render() {

    const { isEmpty } = this.props

    return (
      <View className="result"> 
        {
          ( typeof isEmpty === 'function' ? isEmpty() : isEmpty ) ?
          <View className="at-row result-point at-row__justify--center at-row__align--center">
            <Text className="at-col at-col-12">暂时没有数据，去看看其他的吧</Text>
            <View className="at-col at-col-12 at-icon at-icon-alert-circle"></View>
          </View>
          :
          this.props.children
        }
      </View>
    )
  }

}