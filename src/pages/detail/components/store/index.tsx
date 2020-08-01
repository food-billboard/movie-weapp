import Taro, { Component } from '@tarojs/taro'
import { Text } from '@tarojs/components'

import style from '~theme/style'

export interface IProps {
  text?: string
  movie: string
  store: (store: boolean) => any
  value: boolean
}

export interface IState {}

export default class extends Component<IProps, IState> {
  
  public static defaultProps:IProps = {
    text: '收藏',
    movie: '',
    value: false,
    store: () => {}
  }

  public render() {
    
    const { text, value } = this.props

    return (
      <Text
        style={{...style.color(value ? 'primary' : 'thirdly')}}
        onClick={this.props.store.bind(this, !value)}
      >
        {text}
      </Text>
    )
  }
}