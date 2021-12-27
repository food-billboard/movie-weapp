import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Divider from '../divider'
import './index.scss'

export interface IProps {
  isEmpty: (() => boolean) | boolean,
  loading: boolean
  type?: 'global' | 'scope'
}

export interface IState {} 

const GlobalEmpty = () => {
  return (
    <View className='result-point'>
      <Text className='result-text'>暂时没有数据，去看看其他的吧</Text>
      <View className='at-icon at-icon-alert-circle'></View>
    </View>
  )
}

const ScopeEmpty = (props) => {
  return (
    props.children 
  )
}

export default class extends Component<IProps, IState> {
  
  public render() {

    const { isEmpty, loading, type='global' } = this.props
    const empty = ( typeof isEmpty === 'function' ? isEmpty() : isEmpty ) && !loading

    return (
      <View className='result'> 
        {
          empty ? 
            <Divider />
          :
          this.props.children
        }
      </View>
    )
  }

}