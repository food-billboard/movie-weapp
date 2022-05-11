import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import classnames from 'classnames'
import { View, Text } from '@tarojs/components'
import style from '~theme/style'
import { isObject } from '~utils'

import './index.scss'

export interface IProps {
  text: string
  needPoint?: boolean
  style?: React.CSSProperties
  className?: string 
  sizeClassName?: string 
  onChange?: (...args: any[]) => any
}

export interface IState {
  show: boolean
}

export default class extends Component<IProps, IState> {

  public state: IState = {
    show: false,
  }

  //展开收起文字
  readonly textContent = {
    unfold: '查看详情 >',
    retract: '收起'
  }

  //获取详情
  public getDetail = (e) => {
    e.stopPropagation()
    const { show } = this.state
    this.setState({
      show: !show
    })
    this.props.onChange && this.props.onChange(!show)
  }

  public render() {

    const { style: customStyle = {}, text, needPoint = true, className, sizeClassName } = this.props
    const { show } = this.state

    return (
      <View
        className={classnames('component-text-ellipsis', sizeClassName || 'normal-font-size-class', className)}
        style={{ ...style.color('secondary'), ...(isObject(customStyle) ? customStyle : {}) }}
      >
        <Text
          onClick={(e) => { needPoint && this.getDetail(e) }}
          className={`component-ellipsis-${show ? 'show' : 'hidden'}`}
        >
          {text}
        </Text>
      </View>
    )
  }

}