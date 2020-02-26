import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View, Image } from '@tarojs/components'
import './index.scss'
import { router, routeAlias } from '~utils'
import { style } from '~theme/global-style'
import { IState, IProps } from './interface'

export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    list: [],
    id: ''
  }

  public timer

  public state: IState = {
    active: '',
    activeShow: false,
  }

  //查看评论
  public handleClick = (vlaue: string) => {
    clearTimeout(this.timer)
    this.setState({
      activeShow: true,
      active: vlaue
    })
    this.timer = setTimeout(() => {
      this.setState({
        activeShow: false
      })
    }, 6000)
  }

  public render() {
    const { list } = this.props
    const { activeShow, active } = this.state
    const showList = list.length > 30 ? list.slice(0, 30) : list
    return (
      <View className='icon-list'>
        <View 
            className='content' 
            style={{visibility: activeShow ? 'visible' : 'hidden', ...style.backgroundColor('primary'), ...style.color('disabled')}}
            onClick={() => {router.push(routeAlias.commentdetail, {id: this.props.id})}}
          >
            {active}
            <View 
              className='arrow'
              style={{...style.border(20, 'primary', 'solid', 'top')}}
            ></View>
          </View>
        <ScrollView
          scrollX={true}
          className='list'
          style={{...style.border(1, 'disabled', 'dashed', 'all')}}
        >
          {
            showList.map(val => {
              const { image, content } = val
              return (
                <View className='icon'
                  onClick={this.handleClick.bind(this, content)}
                >
                  <Image src={image} style={{width:'100%', height:'100%'}}></Image>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}