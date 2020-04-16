import Taro, { Component } from '@tarojs/taro'
import { Text } from '@tarojs/components'
import { IProps, IState } from './index.d'
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { getCookie } from '~config'
import { size, withTry } from '~utils'

import style from '~theme/style'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<IProps, IState> {
  
  public static defaultProps:IProps = {
    text: '收藏',
    movie: '',
    getStore: () => {},
    getUserInfo: () => {},
    sendStore: () => {},
  }

  public state: IState = {
    store: false
  }

  public componentDidMount = async () => {
    this.fetchData()
  }

  //用户id
  private id

  //数据获取
  public fetchData = async () => {

    const userInfo = getCookie('user') || {}
    if(!size(userInfo)) {
      return
    }
console.log(userInfo)
    const { id } = userInfo
    this.id = id
    Taro.showLoading({mask: true, title: '收藏中'})
    const [,data] = await withTry(this.props.getStore)(this.props.movie, id) 
    Taro.hideLoading()
    if(data) {
      const store = data.store
      this.setState({
        store
      })
    }
  }

  //收藏
  public sendStore = async () => {
  
    if(!this.id) {
      this.props.getUserInfo()
      return
    }

    const { movie } = this.props
    Taro.showLoading({ mask: true, title: '联系收藏中' })
    const data = await this.props.sendStore(this.id, movie)
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
        style={{...style.color(store ? 'primary' : 'thirdly')}}
        onClick={this.handleClick}
      >
        {text}
      </Text>
    )
  }
}