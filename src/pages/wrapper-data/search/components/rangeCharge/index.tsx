import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import GInput from '~components/input'
import style from '~theme/style'
import './index.scss'

export interface IProps {
  value: {
    max: string
    min: string
  }
  onChange: (...args: any[]) => any
  disabled?: boolean
 }

 export interface IState {
  disabled: boolean
 }

export default class extends Component<IProps, IState>{ 

  public state: IState = {
    disabled: !!this.props.disabled
  }

  public minChange = (value) => {
    const { onChange, value: propsValue = {max:''} } = this.props
    const { max='' } = propsValue
    let data = value
    if(max.toString().length && ~~max <= value) {
      data = max
      Taro.showToast({
        title: '价格错误默认会忽略',
        icon: 'none'
      })
    }
    onChange({min: data})
  }

  public maxChange = (value) => {
    const { onChange, value:propsValue = {min:''} } = this.props
    const { min='' } = propsValue
    let data = value
    if(min.toString().length && ~~min >= value) {
      data = min
      Taro.showToast({
        title: '价格错误默认会忽略',
        icon: 'none'
      })
    }

    onChange({max: data})
  }

  public setDisabled = (status: boolean) => {
    this.setState({
      disabled: status
    })
  }

  public render() {

    const { 
      value: { max='', min='' } = {}
    } = this.props
    const {  
      disabled
    } = this.state

    return (
      <View className="at-row">
        <View className='at-col'>
          <GInput
              style={{...style.backgroundColor('disabled'), marginBottom: '10px'}}
              inputType={'number'}
              placeholder={'最低价格'}
              handleChange={this.minChange}
              disabled={disabled}
              value={min}
          ></GInput>
        </View>
        <View className='at-col'>
          <GInput
              style={{...style.backgroundColor('disabled')}}
              inputType={'number'}
              placeholder={'最高价格'}
              handleChange={this.maxChange}
              disabled={disabled}
              value={max}
          ></GInput>
        </View>
      </View>
    )
  }

}