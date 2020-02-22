import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { IProps, IState } from './interface'
import { style } from '~theme/global-style'
import { isObject } from '~utils'

import './index.scss'

export default class extends Component<IProps, IState> {

  public static defaultProps:IProps = {
    text: ''
  }

  public state: IState = {
    show: false,
    maxLen: 40
  }

  /**
   * 获取详情
   */
  public getDetail = () => {
    this.setState({
      show: true
    })
  }

  /**
   * 获取需要展示的文本
   */
  public getText = () => {
    const { show, maxLen } = this.state
    const { text } = this.props
    if(show) {
      return text
    }
    return text.length <= maxLen ? text : (text.slice(0, maxLen) + '...')
  }

  public render() {
    const { text, needPoint, style:customStyle={} } = this.props
    const _text = this.getText()

    return (
      <View className='ellipsis'
        style={{...style.color('secondary'), ...(isObject(customStyle) ? customStyle : {})}}
      >
        <Text style={{display: 'inline-block', wordBreak: 'break-word'}}>
          {_text}
        </Text>
        {
          needPoint ? 
          <Text 
            onClick={this.getDetail} 
            style={{display: text.length !== _text.length ? 'block' : 'none', ...style.color('thirdly')}} 
            className='detail'
          >
            查看详情>
          </Text> :
          null
        }
      </View>
    )
  }

}