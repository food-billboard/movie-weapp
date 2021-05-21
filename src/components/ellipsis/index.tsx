import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import style from '~theme/style'
import { isObject } from '~utils'

import './index.scss'

export interface IProps {
  text: string
  needPoint?: boolean
  style?: React.CSSProperties
  onChange?: (...args: any[]) => any
}

export interface IState {
  show: boolean
  maxLen: number
}

export default class extends Component<IProps, IState> {

  public state: IState = {
    show: false,
    maxLen: 40
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

  // //获取需要展示的文本
  // public getText = () => {
  //   const { show, maxLen } = this.state
  //   // const { text = '' } = this.props
  //   const text = '22233'.repeat(60)
  //   if(show) return text
  //   return text.length <= maxLen ? text : (text.slice(0, maxLen) + '...')
  // }

  public render() {

    const { style: customStyle = {}, text, needPoint = true } = this.props
    // const _text = this.getText()
    const { show, maxLen } = this.state
    
    return (
      <View 
        className='text-ellipsis'
        style={{ ...style.color('secondary'), ...(isObject(customStyle) ? customStyle : {}) }}
        onClick={this.getDetail}
      >
        <Text 
          onClick={(e) => {!needPoint && this.getDetail(e)}}
          className={`ellipsis-${show ? 'show' : 'hidden'}`}
          // style={{ display: 'inline-block', wordBreak: 'break-word' }}
        >
          {text}
        </Text>
        {/* {
          needPoint && (text && text.length >= maxLen) ?
            <View
              style={{ ...style.color('thirdly') }}
              className='ellipsis-detail'
              onClick={(e) => needPoint && this.getDetail(e)}
            >
              {show ? this.textContent.retract : this.textContent.unfold}
            </View> :
            null
        } */}
      </View>
    )
  }

}