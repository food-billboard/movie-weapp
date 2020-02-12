import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'

interface IProps {
  title: string
  mode: 'selector' | 'multiSelector' | 'time' | 'date'
  selectorChecked: any
}

interface IState {
  selectorChecked: any
}

export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    title: '选择',
    mode: 'selector'
  }

  public state: IState = {
    selectorChecked:
  }

  public render() {

    const { title } = this.props

    return (
      <View className='page-section'>
        <Text>{title}</Text>
        <View>
          <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
            <View className='picker'>
              当前选择：{this.state.selectorChecked}
            </View>
          </Picker>
        </View>
      </View>
    )
  }

} 