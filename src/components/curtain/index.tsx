import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { isObject } from '~utils'
import customeStyle from '~theme/style'
import noop from 'lodash/noop'

import './index.scss'

export interface IProps {
  contentStyle?: React.CSSProperties
  curtainStyle?: React.CSSProperties
  title: boolean
  main: boolean
  action: boolean
  other: boolean
  renderTitle?: any
  renderMain?: any
  renderAction?: any
  renderOther?: any
  handleClose: (...args: any[]) => any
  handleCancel?: (...args: any[]) => any
  cancel?: boolean
  isOpen: boolean
}

export interface IState { }

export default class extends Component<IProps, IState> {

  //取消
  public handleCancel = () => {
    this.props.handleClose()
  }

  //阻止手指滑动
  public stopMove = (e) => e.stopPropagation()

  public render() {

    const {
      contentStyle = {},
      curtainStyle = {},
      title = false,
      main = false,
      action = false,
      other = false,
      cancel = true,
      isOpen = false
    } = this.props

    return (
      <View
        className='curtain'
        onTouchMove={this.stopMove}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <View
          className='curtain-shadow'
          style={{ ...customeStyle.backgroundColor('primary'), ...(isObject(curtainStyle) ? curtainStyle : {}) }}
          onClick={() => { cancel ? (this.props.handleCancel ? this.props.handleCancel.call(this) : this.handleCancel.call(this)) : noop }}
        ></View>
        <View
          className='main'
          style={{
            ...customeStyle.backgroundColor('bgColor'),
            borderRadius: '6px',
            ...(isObject(contentStyle) ? contentStyle : {})
          }}
        >
          {
            title &&
            <View
              className='title'
              style={{ ...customeStyle.border(1, 'disabled', 'solid', 'bottom') }}
            >
              {
                this.props.renderTitle
              }
            </View>
          }
          {
            main &&
            <View className='content'>
              {this.props.renderMain}
            </View>
          }
          {
            action &&
            <View
              className='action'
              style={{ ...customeStyle.border(1, 'disabled', 'solid', 'top') }}
            >
              {this.props.renderAction}
            </View>
          }
          {
            other &&
            <View className='other'>
              {this.props.renderOther}
            </View>
          }
          <View
            className='close at-icon at-icon-close'
            style={{ ...customeStyle.backgroundColor('bgColor'), ...customeStyle.color('primary') }}
            onClick={this.props.handleClose}
          ></View>
        </View>
      </View>
    )
  }

}