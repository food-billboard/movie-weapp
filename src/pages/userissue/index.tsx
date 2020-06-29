import Taro, { Component, Config } from '@tarojs/taro'
import GScrollView from '~components/scrollList'
import IconList from '~components/iconlist'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { throttle } from 'lodash'
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { getCustomerIssue, getUserIssue } from '~services'
import { router, routeAlias } from '~utils'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any>{ 

  public static config: Config = {
    navigationBarTitleText: '某人的发布',
    enablePullDownRefresh: true
  }

  private scrollRef = Taro.createRef<GScrollView>()

  public componentDidShow = () => {
    colorStyleChange()
  }

  //下拉刷新
  public onPullDownRefresh = async () => {
    await this.scrollRef.current!.handleToUpper()
    Taro.stopPullDownRefresh()
  }
  
  //上拉加载
  public onReachBottom = async () => {
      await this.scrollRef.current!.handleToLower()
  }

  public state: any = {
    list: []
  }

  //用户id
  readonly id = this.$router.params.id

  /**
   * 获取数据
   */
  public fetchData = async (query: any, isInit=false) => {
    const { list } = this.state
    const method = this.id ? getUserIssue : getCustomerIssue
    const args = this.id ? { id: this.id } : {}
    const data = await method({ ...args, ...query })
    let newData
    if(isInit) {
        newData = [ ...data ]
    }else {
        newData = [ ...list, ...data ]
    }
    await this.setState({
        list: newData
    })
    return data
  }

  /**
   * 节流数据获取
   */
  public throttleFetchData = throttle(this.fetchData, 2000)

  /**
   * 修改电影内容
   */
  public editMovie = async (id: string) => {
    if(this.id) {
      Taro.showToast({
        title: '您没有修改权限',
        icon: 'none',
        duration: 1000
      })
    }else {
      await this.props.getUserInfo()
      .then(_ => {
        router.push(routeAlias.issue, { id })
      })
      .catch(err => err)
    }
  }

  public render() {

    const { list } = this.state

    return (
      <GScrollView
        ref={this.scrollRef}
        query={{pageSize: 16}}
        style={{...style.backgroundColor('bgColor')}}
        sourceType={'Scope'}
        scrollWithAnimation={true}
        fetch={this.throttleFetchData}
        renderContent={<IconList list={list.map(item => {
          const { _id, poster, ...nextItem } = item
          return {
            ...nextItem,
            id: _id,
            image: poster,
          }
        })} handleClick={this.editMovie}></IconList>}
      >
      </GScrollView>
    )
  }

}

