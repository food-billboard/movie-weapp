import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import GPicker from '~components/picker'
import './index.scss'

export interface IProps {
  onChange: (...args: any[]) => any
  value: {
    start: string
    end: string
  }
 }

 export interface IState {

 }

export default class extends Component<IProps, IState> {

  public state: IState = {
    
  }

  private startRef = React.createRef<GPicker>()
  private endRef = React.createRef<GPicker>()

  public startChange = async (value) => {
    const { onChange, value: { end=new Date().getFullYear() }={} } = this.props
    let data = value
    if(end.toString().length && ~~value >= ~~end) {
      data = end
      Taro.showToast({
        title: '时间错误会默认忽略',
        icon: 'none'
      })
    }
    onChange && onChange({start: data})
  }

  public endChange = async (value) => {
    const { onChange, value: { start=1970 }={} } = this.props
    let data = value
    if(start.toString().length && ~~value <= ~~start) {
      data = start
      Taro.showToast({
        title: '时间错误会默认忽略',
        icon: 'none'
      })
    }
    onChange && onChange({end: data})
  }

  public render() {

    const { value: { start='', end='' }={} } = this.props

    return (
      <View className="at-row">
        <View className="at-col">
          <GPicker
            ref={this.startRef}
            date={{
              fields: 'day',
            }}
            title={'起始时间'}
            style={{marginBottom: '5px'}}
            handleChange={this.startChange}
            value={start}
          >
          </GPicker>
        </View>
        <View className='at-col'>
          <GPicker
            ref={this.endRef}
            date={{
              fields: 'day'
            }}
            title={'结束时间'}
            style={{paddingBottom:'20px'}}
            handleChange={this.endChange}
            value={end}
          >
          </GPicker>
        </View>
      </View>
    )
  }

}