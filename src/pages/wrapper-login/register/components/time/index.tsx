import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import style from '~theme/style'
import noop from 'lodash/noop'

import './index.scss'

export interface IState {
  text: string,
  open: boolean
}

export interface IProps {
  getData: () => any,
}

export default class Time extends Component<IProps>{
  public static defaultProps: IProps = {
    getData: noop,
  }

  public state: IState = {
    text: '发送验证码',
    open: true
  }

  //处理点击
  public handleClick = async () => {
    const { open } = this.state
    if (!open) return
    Taro.showLoading({ title: '发送中，请注意查收邮箱' })
    try {
      await this.props.getData()
    }catch(err) {
      Taro.showToast({
        title: '发生错误，请重试',
        icon: 'none'
      })
      console.log(err)
    }finally {
      Taro.hideLoading()
    }

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