import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import style from '~theme/style'
import { isObject } from '~utils'

import './index.scss'

export interface IProps {
  text: string
  needPoint?: boolean
  style?: any
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
  public getDetail = () => {
    const { show } = this.state
    this.setState({
      show: !show
    })
  }

  //获取需要展示的文本
  public getText = () => {
    const { show, maxLen } = this.state
    const { text = '' } = this.props
    if(show) return text
    return text.length <= maxLen ? text : (text.slice(0, maxLen) + '...')
  }

  public render() {

    const { style: customStyle = {}, text, needPoint = true } = this.props
    const _text = this.getText()
    const { show, maxLen } = this.state
    
    return (
      <View className='ellipsis'
        style={{ ...style.color('secondary'), ...(isObject(customStyle) ? customStyle : {}) }}
      >
        <Text style={{ display: 'inline-block', wordBreak: 'break-word' }}>
          {_text}
        </Text>
        {
          needPoint && (text && text.length >= maxLen) ?
            <View
              onClick={this.getDetail}
              style={{ ...style.color('thirdly') }}
              className='detail'
            >
              {show ? this.textContent.retract : this.textContent.unfold}
            </View> :
            null
        }
      </View>
    )
  }

}