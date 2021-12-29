import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { AtDivider } from 'taro-ui'
import { merge } from 'lodash'
import { TypeColor } from '~theme/color'

import './index.scss'

export interface IProps {
  content?: string
  fontColor?: string
  fontSize?: number
  lineColor?: string
  childNode?: any
  other?: any
}

export default class Divider extends Component<IProps> {
  public static defaultProps: IProps = {
    content: '没有更多了',
    fontSize: 32,
    childNode: '',
    other: {}
  }

  public render() {

    const {
      content,
      fontSize,
      childNode,
      other,
      fontColor = TypeColor()['thirdly'],
      lineColor = TypeColor()['thirdly']
    } = this.props

    return (
      <AtDivider
        content={content}
        fontColor={fontColor}
        fontSize={fontSize}
        lineColor={lineColor}
        customStyle={merge({ backgroundColor: TypeColor()['bgColor'] }, other || {})}
      >
        {content ? '' : childNode}
      </AtDivider>
    )
  }

}