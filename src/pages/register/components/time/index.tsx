import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import style from '~theme/style'
import './index.scss'
import { Toast } from '~components/toast'
import noop from 'lodash/noop'

export interface IState {
  text: string,
  open: boolean
}

export interface IProps {
  getData: () => any,
  phone: string
}

export default class Time extends Component<IProps>{
  public static defaultProps: IProps = {
    getData: noop,
    phone: ''
  }

  public state: IState = {
    text: '发送验证码',
    open: true
  }

  //处理点击
  public handleClick = () => {
    const { open } = this.state
    const { phone } = this.props
    if (!/^1[346789]\d{9}$/g.test(phone)) {
      Toast({ title: '请输入正确的手机号~!', icon: 'fail' })
      return
    }
    if (!open) {
      return
    }
    this.props.getData()
    const _text = 's后重发'
    let count = 60
    this.setState({
      open: false,
      text: count + _text
    })
    let timer = setInterval(() => {
      if (count > 0) {
        count--
        this.setState({
          text: count + _text
        })
      } else {
        this.setState({
          open: true,
          text: '发送验证码'
        })
        clearInterval(timer)
      }
    }, 1000)
  }

  public render() {
    const { open, text } = this.state
    return (
      <View
        className={'time'}
        style={{ ...style.color(open ? 'primary' : 'thirdly') }}
        onClick={this.handleClick}
      >
        {text}
      </View>
    )
  }
}