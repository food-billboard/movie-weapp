import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { IProps } from './index.d'

export default class extends Component<IProps> {

  render() {
    const { isEmpty } = this.props
    return (
      <View className="result">
        {
          ( typeof isEmpty === 'function' ? isEmpty() : isEmpty ) ?
          <View>暂时没有数据</View>
          :
          this.props.children
        }
      </View>
    )
  }
}