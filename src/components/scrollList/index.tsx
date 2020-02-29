import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import GDivider from '~components/divider'
import Top from '../topbutton'
import { IProps, IState } from './index.d'
import { isObject, sourceTypeList } from '~utils'
import { style as customStyle } from '~theme/global-style'

import './index.scss'

const INIT_QUERY = { pageSize: 10, currPage: 1 }

export default class List extends Component<IProps, IState> {

  public topRef = Taro.createRef<Top>()
  
  public static defaultProps = {
    query: {},
    sourceType: 'Dva',
    scrollY: true,
    lowerThreshold: 50,
    scrollWithAnimation: false,
    onScroll: () => {},
    fetch: () => {},
    header: false,
    bottom: false,
    autoFetch: true
  }

  public state: IState = {
    data: [],
    empty: false,
    query: {},
    loading: false,
  }

  public constructor() {
    super(...arguments)
    this.state.query = { ...INIT_QUERY, ...this.props.query }
  }

  //获取数据
  public get data() {
    if(this.state.data) return this.state.data
    return []
  }

  //获取loading状态
  public get loading() {
    if(typeof this.state.loading === 'boolean') return this.state.loading
    return false
  }

  public componentDidMount = () => {
    const { autoFetch } = this.props
    if(!autoFetch) return
    const { query } = this.state
    this.fetchData(query)
  }

  //数据请求
  public fetchData = async (query: any, isInit=false) => {
    const { sourceType, fetch } = this.props
    this.setState({query})
    this.setState({loading: true})
    if(sourceTypeList[sourceType] === sourceTypeList.Scope) {
      const { data } = this.state
      const newData = await fetch(query, isInit)
      const { pageSize } = this.state.query
      //判断是否存在数据
      if(newData.length < pageSize) {
        this.setState({empty: true}) 
      }else {
        this.setState({empty: false}) 
      }
      
      let nextData
      //判断是否为初始化前端数据
      if(isInit) {
        nextData = [ ...newData ]
      }else {
        nextData = [ ...data, ...newData ]
      }
      this.setState({data: nextData, loading: false})
      return
    }else if(sourceTypeList[sourceType] === sourceTypeList.Dva) {
      await fetch(query, isInit)
      await this.setState({loading: false})
      return
    }
  }

  //上拉加载
  public handleToLower = () => {
    const { query, loading, empty } = this.state
    if(loading) return
    if(empty) return
    const { currPage } = query
    const nextQuery = { ...query, currPage: currPage + 1 }
    this.fetchData(nextQuery)
  }
  
  //下拉刷新
  public handleToUpper = async () => {
    const { state, props } = this
    const nextQuery = { ...state.query, ...INIT_QUERY, ...props.query }
    await this.fetchData(nextQuery, true)
  }

  //空函数
  public defaultFn = () => {}

  public render() {
    const {
      header,
      bottom,
      style={},
    } = this.props
    const { empty, loading } = this.state
    const _header = typeof header === 'boolean'
    const _bottom = typeof bottom === 'boolean'
    return (
      <View className='list'>
        <View
          style={isObject(style) ? style : {}}
          className='scroll-view'
        >
          {
            _header ? 
            null : 
            <View className='header' style={{...customStyle.backgroundColor('disabled')}}>
              {
                this.props.renderHeader
              }
            </View>
          }
          <View style={{...customStyle.backgroundColor('bgColor'), paddingTop: (header || 0) + 'rpx'}}
          >
            {this.props.renderContent}
          </View>
          {
            empty ? <GDivider other={{paddingBottom: (bottom ? bottom + 20 : 0) + 'rpx'}} /> : null
          }
          {/* <Top 
            ref={this.topRef} 
          /> */}
          {_bottom ? null : this.props.renderBottom}
        </View>
        <View 
          className='active'
        >
          {loading &&
            <AtActivityIndicator 
              size={100}
              content={'玩命加载中...'}
            />
          }
        </View>
      </View>
    )
  }
}