import Taro, { Component } from '@tarojs/taro'
import { Text } from '@tarojs/components'

import './index.scss'

import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

interface IProps {
  text?: string
  getStore: (movie: any, user: any) => any
  sendStore: (user: any, movie: any) => any
  movie: string
  id: string
  getUserInfo: () => any
}

interface IState {
  store: boolean
}

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<IProps, IState> {
  
  public static defaultProps:IProps = {
    text: '收藏',
    movie: '',
    getStore: () => {},
    getUserInfo: () => {},
    sendStore: () => {},
    id: ''
  }

  public state: IState = {
    store: false
  }

  public componentDidMount = async () => {
    this.fetchData()
  }

  //数据获取
  public fetchData = async () => {
    if(!this.props.id) return 
    const data = await this.props.getStore(this.props.movie, this.props.id) 
    const store = data.store
    this.setState({
      store
    })
  }

  //收藏
  public sendStore = async () => {
    this.props.getUserInfo()
    const { movie } = this.props
    Taro.showLoading({ mask: true, title: '联系收藏中' })
    const data = await this.props.sendStore(this.props.id, movie)
    Taro.hideLoading()
  }

  public handleClick = async() => {
    await this.sendStore()
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