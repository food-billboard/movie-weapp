import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { IProps, IState } from './index.d'
import { Color, defaultColor } from '~theme/color'
import { isObject } from '~utils'
import { getStyle } from '~config'

import './index.scss'

export default class extends Component<IProps, IState> {

  public componentDidMount = () => {
    const _style = getStyle()
    const { color } = _style
    this.setState({
      active: color
    })
  }

  public state:IState = {
    active: defaultColor,
    color: [ ...Color ]
  }

  //点击
  public handleClick = (val) => {
    this.setState({
      active: val
    })
  }

  public render() {
    const { active, color } = this.state
    const { style={} } = this.props
    return (
      <ScrollView className='list'
        scrollX={true}
        style={{...(isObject(style) ? style : {})}}
      >
        {
          color.map((val: any) => {
            return (
              <View
                key={val}
                className='item'
                style={{border: active === val ? `2px solid ${val}` : 'none' }}
                onClick={(e) => {this.props.handleClick ? this.props.handleClick.call(this, val) : this.handleClick.call(this, val)}}
              >
                <View className='content' style={{backgroundColor: val}}></View>
              </View>
            )
          })
        }
      </ScrollView> 
    )
  }

}
