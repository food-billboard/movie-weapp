import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { AtIndexes } from 'taro-ui'

export interface Item {
  name: string

  [propName: string]: any
}

interface ListItem {
  title: string

  key: string

  items: Array<Item>
}

export interface IProps {
  animation?: boolean
  isVibrate?: boolean
  isShowToast?: boolean
  list: Array<ListItem>
  topKey?: string
  handleClick?: (item: Item) => void
}

export interface IState {}

export default class extends Component<IProps, IState> {

  public static defaultProps = {
    animation: true,
    isVibrate: true,
    isShowToast: true,
  }

  public handleClick = (item: Item) => this.props.handleClick && this.props.handleClick(item)

  public render() {

    const { list=[], ...nextProps } = this.props

    return (
      <AtIndexes
        list={list}
        {...nextProps}
        onClick={this.handleClick}
      >
      </AtIndexes>
    )
  }
}