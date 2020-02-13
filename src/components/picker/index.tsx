import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import { PickerSelectorProps, PickerMultiSelectorProps, PickerTimeProps, PickerDateProps, PickerRegionProps } from '@tarojs/components/types/Picker'

interface IProps {
  title: string
  // selectMode: 'configSelect' | 'configMulti' | 'configTime' | 'configDate'
  // configSelect?: PickerSelectorProps | false
  // configMulti?: PickerMultiSelectorProps | false
  // configTime?: PickerTimeProps | false
  // configDate?: PickerDateProps | false
  config: PickerSelectorProps | PickerMultiSelectorProps | PickerTimeProps | PickerDateProps
}

interface IState {
  // selectorChecked: any
}

export default class extends Component<IProps, IState> {

  public state: IState = {
    // selectorChecked:
  }

  public render() {
    const { title, config } = this.props
    // const {
    //   mode,
      
    // } = config
    return (
      <View className='page-section'>
        <Text>{title}</Text>
        <View>
          {/* <Picker 
            mode={this.props[selectMode].mode} 
            range={config.range ? range : []} 
            onChange={this.onChange}>
            <View className='picker'>
              当前选择：{this.state.selectorChecked}
            </View>
          </Picker> */}
        </View>
      </View>
    )
  }

} 