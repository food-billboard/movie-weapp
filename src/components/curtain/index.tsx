import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { isObject } from '~utils'
import customeStyle from '~theme/style'

import './index.scss'

export interface IProps {
  contentStyle?: React.CSSProperties
  curtainStyle?: React.CSSProperties
  renderTitle?: React.ReactElement | string
  renderMain: React.ReactElement | string
  renderAction?: React.ReactElement | string
  renderOther?: React.ReactElement | string
  handleClose?: () => any
  handleShow?: () => any
  isOpen?: boolean
}

export interface IState {
  show: boolean
}

export default class extends Component<IProps, IState> {

  public state: IState = {
    show: !!this.props.isOpen
  }

  public handleClose = () => {
    this.setState({
      show: false
    })
    this.props.handleClose && this.props.handleClose()
  }

  public handleShow = () => {
    this.setState({
      show: true
    })
    this.props.handleShow && this.props.handleShow()
  }

  //阻止手指滑动
  public stopMove = (e) => e.stopPropagation()

  public render() {

    const {
      contentStyle = {},
      curtainStyle = {},
    } = this.props
    const { show } = this.state

    return (
      <View
        id='curtain'
        className={`curtain-${show ? 'show' : 'hidden'}`}
        onTouchMove={this.stopMove}
      >
        <View
          className='curtain-mask'
          style={{ ...customeStyle.backgroundColor('primary'), ...(isObject(curtainStyle) ? curtainStyle : {}) }}
        ></View>
        <View
          className='curtain-main'
          style={{
            ...customeStyle.backgroundColor('bgColor'),
            borderRadius: '6px',
            ...(isObject(contentStyle) ? contentStyle : {})
          }}
        >
          {
            !!this.props.renderTitle &&
            <View
              className='curtain-main-title'
              style={{ ...customeStyle.border(1, 'disabled', 'solid', 'bottom') }}
            >
              {
                this.props.renderTitle
              }
            </View>
          }
          <View className='curtain-main-content'>
            {this.props.renderMain}
          </View>
          {
            !!this.props.renderAction &&
            <View
              className='curtain-main-action'
              style={{ ...customeStyle.border(1, 'disabled', 'solid', 'top') }}
            >
              {this.props.renderAction}
            </View>
          }
          {
            !!this.props.renderOther &&
            <View className='curtain-main-other'>
              {this.props.renderOther}
            </View>
          }
          {/* <View
            className='curtain-main-close at-icon at-icon-close'
            style={{ ...customeStyle.backgroundColor('bgColor'), ...customeStyle.color('primary') }}
            onClick={this.props.handleClose}
          ></View> */}
        </View>
      </View>
    )
  }

}