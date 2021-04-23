import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { Color, defaultColor } from '~theme/color'
import { isObject, sleep } from '~utils'
import { createSystemInfo } from '~config'

import './index.scss'

export interface IProps {
  style?: any
  handleClick?: (val: any) => any
}

export interface IState {
  active: string
  color: Array<string>
}

const systemInfo = createSystemInfo()

export default class extends Component<IProps, IState> {

  public componentDidMount = () => {
    const _style = systemInfo.getColorStyle()
    const { color } = _style
    this.setState({
      active: color
    })
  }

  public state: IState = {
    active: defaultColor,
    color: [...Color]
  }

  //点击
  public handleClick = async (val: string) => {
    const { active } = this.state 
    if(active === val) return 
    Taro.showLoading({ title: '切换中...', mask: true })
    this.setState({
      active: val
    })
    await sleep()
    Taro.hideLoading()
  }

  public render() {
    const { active, color } = this.state
    const { style = {} } = this.props
    return (
      <ScrollView className='setting-color-list'
        scrollX={true}
        style={{ ...(isObject(style) ? style : {}) }}
      >
        {
          color.map((val: any) => {
            return (
              <View
                key={val}
                className='item'
                style={{ border: active === val ? `2px solid ${val}` : 'none' }}
                onClick={(e) => { this.props.handleClick ? this.props.handleClick.call(this, val) : this.handleClick.call(this, val) }}
              >
                <View className='content' style={{ backgroundColor: val }}></View>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }

}
