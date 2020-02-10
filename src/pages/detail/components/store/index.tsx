import Taro, { Component } from '@tarojs/taro'
import { Text } from '@tarojs/components'

interface IProps {
  text?: string
  handleClick: (...args:any) => any
  store: boolean
}

interface IState {
  store: boolean
}

export default class extends Component<IProps, IState> {
  
  public static defaultProps:IProps = {
    text: '收藏',
    handleClick: () => {},
    store: false
  }

  public state: IState = {
    store: this.props.store
  }

  public handleClick = async() => {
    await this.props.handleClick()
    const { store } = this.state
    await this.setState({
      store: !store
    })
  }

  public render() {
    const { text } = this.props
    const { store } = this.state
    return (
      <Text
        className={ 'store ' + (store ? 'show' : 'hide') }
        onClick={this.handleClick}
      >
        {text}
      </Text>
    )
  }
}