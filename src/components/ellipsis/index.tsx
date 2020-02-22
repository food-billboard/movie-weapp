import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { IProps, IState } from './interface'
import { style } from '~theme/global-style'
import { isObject } from '~utils'

import './index.scss'

export default class extends Component<IProps, IState> {

  public state: IState = {
    show: false,
    maxLen: 40
  }

  /**
   * 获取详情
   */
  public getDetail = () => {
    const { show } = this.state
    this.setState({
      show: !show
    })
  }

  /**
   * 获取需要展示的文本
   */
  public getText = () => {
    const { show, maxLen } = this.state
    const { text='' } = this.props
    if(show) {
      return text
    }
    return text.length <= maxLen ? text : (text.slice(0, maxLen) + '...')
  }

  public render() {
    const { style:customStyle={}, text, needPoint=true } = this.props
    const _text = this.getText()
    const { show, maxLen } = this.state
    return (
      <View className='ellipsis'
        style={{...style.color('secondary'), ...(isObject(customStyle) ? customStyle : {})}}
      >
        <Text style={{display: 'inline-block', wordBreak: 'break-word'}}>
          {_text}
        </Text>
        {
          needPoint && (text && text.length >= maxLen) ? 
          <View 
            onClick={this.getDetail} 
            style={{...style.color('thirdly')}} 
            className='detail'
          >
            {show ? '收起' : '查看详情>'}
          </View> :
          null
        }
      </View>
    )
  }

}