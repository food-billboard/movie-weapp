import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

interface IContent {

}

interface IProps {
  content: IContent
}

export default class extends Component<IProps> {

  public static defaultProps: IProps = {
    content: {
      
    }
  }

  public render() {
    return (
      <View>头</View>
    )
  }

}