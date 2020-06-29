import Taro, { Component } from '@tarojs/taro'
import { Text } from '@tarojs/components'
import { IProps, IState } from './index.d'

import style from '~theme/style'

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