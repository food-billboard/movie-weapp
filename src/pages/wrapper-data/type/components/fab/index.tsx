import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { Text } from '@tarojs/components'
import { AtFab } from 'taro-ui'
import style from '~theme/style'
import { SYSTEM_PAGE_SIZE } from '~config'

import './index.scss'

export interface IProps {
  value: boolean
  change: () => any
}

export interface IState { }

export default class Fab extends Component<IProps, IState> {

  public static defualtProps: IProps = {
    value: true,
    change: () => { }
  }

  public render() {
    const { value } = this.props
    return (
      <AtFab
        onClick={this.props.change}
      >
        <Text style={{ ...style.color('secondary'), fontSize: SYSTEM_PAGE_SIZE() + 'px' }} className={`fab-icon at-fab__icon at-icon ${(value ? 'at-icon-bullet-list' : 'at-icon-money')}`}></Text>
      </AtFab>
    )
  }

}