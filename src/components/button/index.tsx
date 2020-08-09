import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import style from '~theme/style'
import noop from 'lodash/noop'

type primary = 'primary'
type secondary = 'secondary'

export interface IProps {
  value: Array<string>
  active: number
  type: primary | secondary | undefined
  operate?: (...args: any) => any
  style?: React.CSSProperties
}

export interface IState {
  active: number
}

export default class Button extends Component<IProps, IState>{

  public static defaultProps: IProps = {
    value: ['是', '不是'],
    active: 0,
    type: 'primary',
    operate: noop,
    style: {}
  }

  public componentWillReceiveProps(props) {
    this.setState({
      active: props.active
    })
  }

  public state: IState = {
    active: this.props.active,
  }

  //按钮模式切换
  public modeChange = () => {
    const { active } = this.state
    this.props.operate && this.props.operate()
    this.setState({
      active: (active + 1) % 2
    })
  }

  public render() {

    const { type, style: customStyle={} } = this.props

    return (
      <View>
        <AtButton
          customStyle={{ ...style.border(1, 'primary', 'solid', 'all'), ...style.color('primary'), ...customStyle }}
          type={type}
          circle={true}
          onClick={this.modeChange}
          size='normal'
        >{this.props.value[this.state.active]}</AtButton>
      </View>
    )
  }
}
