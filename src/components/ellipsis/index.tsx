import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

interface IProps {
  text: string
}

interface IState {
  show: boolean
  maxLen: number
}

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
    console.log(1111)
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
    return text.length <= maxLen ? text : text.slice(0, maxLen)
  }

  public render() {
    const { show } = this.state
    const { text } = this.props
    const _text = this.getText()
    return (
      <View className='ellipsis '>
        <Text style={{display: 'inline-block', wordBreak: 'break-word'}}>
          {_text}
        </Text>
        <Text 
            onClick={this.getDetail.bind(this)} 
            style={{display: text.length !== _text.length ? 'block' : 'none'}} 
            className='detail'
          >
            查看详情>
          </Text>
      </View>
    )
  }

}