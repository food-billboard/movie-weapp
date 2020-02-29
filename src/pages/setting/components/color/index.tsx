import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { IProps, IState } from './index.d'
import { Color } from '~theme/global-style'
import { isObject } from '~utils'
import { getStyle } from '~config'

import './index.scss'

export default class extends Component<IProps, IState> {

  public componentDidMount = () => {
    const color = getStyle()
    if(color) {
      this.setState({
        active: color
      })
    }
  }

  public state:IState = {
    active: Color[0],
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
      <View className='at-row'
        style={{...(isObject(style) ? style : {})}}
      >
        {
          color.map((val: any) => {
            return (
              <View
                key={val}
                className='at-col item'
                style={{border: active === val ? `2px solid ${val}` : 'none' }}
                onClick={(e) => {this.props.handleClick ? this.props.handleClick.call(this, val) : this.handleClick.call(this, val)}}
              >
                <View className='content' style={{backgroundColor: val}}></View>
              </View>
            )
          })
        }
      </View> 
    )
  }

}
