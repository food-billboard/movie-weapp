import Taro, { Component, Config } from '@tarojs/taro'
import Scroll from '~components/scrollList'
import { throttle } from 'lodash'
import IconList from '~components/iconlist'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { router, routeAlias } from '~utils'
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

let FIRST = true

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any>{

  public static config: Config = {
   
  }

  //专题id
  readonly id = this.$router.params.id

  public state: any = {
    list: [],
    title: false
  }

  private scrollRef = Taro.createRef<Scroll>()

  public colorStyleChange = () => {
    colorStyleChange()
  }
    
  //上拉加载
  public onReachBottom = async () => {
      await this.scrollRef.current!.handleToLower()
  }

  //设置标题
  public setTitle = async () => {
    const { title } = this.state
    if(title && FIRST) {
        FIRST = false
        Taro.setNavigationBarTitle({title})
    }
  }

  /**
   * 获取数据
   */
  public fetchData = async (query: any, isInit=false) => {
    const { list } = this.state
    const data = await this.props.getSpecial({id: this.id, ...query})
    const _data = data.data
    const title = data.title
    let newData
    if(isInit) {
        newData = [ ..._data ]
    }else {
        newData = [ ...list, ..._data ]
    }
    await this.setState({
        list: newData,
        title
    })
    return _data
  }

  /**
   * 节流数据获取
   */
  public throttleFetchData = throttle(this.fetchData, 2000)

  /**
   * 获取电影详情
   */
  public getDetail = (id: string) => {
    router.push(routeAlias.detail, {id})
  }

  public render() {

    const { list } = this.state

    this.setTitle()

    return (
      <Scroll
        ref={this.scrollRef}
        style={{...style.backgroundColor('bgColor')}}
        query={{pageSize: 16}}
        sourceType={'Scope'}
        scrollWithAnimation={true}
        fetch={this.throttleFetchData}
        renderContent={<IconList list={list}></IconList>}
      ></Scroll>
    )
  }

}