import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import CommentHeader, { IList } from './header'
import CommentList from './list'

import './index.scss'

export interface IProps {
  list: IList[]
  id: string 
}

export default class extends Component<IProps> {

  public static defaultProps: IProps = {
    list: [],
    id: ""
  }

  public render() {

    const { list = [], id } = this.props

    return (
      <View >
        <CommentHeader
          list={list}
          id={id}
        />
        <CommentList 
          id={id}
        />
      </View>
    )
  }
}