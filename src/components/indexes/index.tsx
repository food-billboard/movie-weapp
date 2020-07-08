import Taro, { Component } from '@tarojs/taro'
import { AtIndexes } from 'taro-ui'
import { IProps, IState, Item } from './index.d'

export default class extends Component<IProps, IState> {

  public static defaultProps = {
    animation: true,
    isVibrate: true,
    isShowToast: true,
  }

  public handleClick = (item: Item) => {

    this.props.handleClick && this.props.handleClick(item)
  }

  public render() {

    const { list=[] } = this.props

    return (
      <AtIndexes
        list={list}
        onClick={this.handleClick}
      >
      </AtIndexes>
    )
  }
}