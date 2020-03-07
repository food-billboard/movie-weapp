import Taro, { Component, Config } from '@tarojs/taro'
import GScrollView from '~components/scrollList'
import IconList from '~components/iconlist'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { throttle } from 'lodash'
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

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
    const data = await this.props.getIssue({id: this.id, ...query})
    const _data = data.detail
    let newData
    if(isInit) {
        newData = [ ..._data ]
    }else {
        newData = [ ...list, ..._data ]
    }
    await this.setState({
        list: newData
    })
    return _data
  }

  /**
   * 节流数据获取
   */
  public throttleFetchData = throttle(this.fetchData, 2000)

  /**
   * 修改电影内容
   */
  public editMovie = async (id: string) => {
    await this.props.setIssue({issueSet: true, id})
    Taro.switchTab({
      url: '../issue/index'
    })
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
        renderContent={<IconList list={list} handleClick={this.editMovie}></IconList>}
      >
      </GScrollView>
    )
  }

}

