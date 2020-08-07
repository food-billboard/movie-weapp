import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, ScrollView, Text } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import GDivider from '~components/divider'
import GResult from '~components/result'
import Top from '../topbutton'
import { isObject, ESourceTypeList } from '~utils'
import customStyle from '~theme/style'
import noop from 'lodash/noop'

import './index.scss'

export interface IProps {
  sourceType: ESourceTypeList
  style?: React.CSSProperties
  autoFetch?: boolean
  query?: any
  fetch: (...args: any[]) => any
  header?: false | number
  bottom?: false | number
  renderContent?: any
  renderHeader?: any
  renderBottom?: any
  divider?: boolean
}

export interface IState {
  data: Array<any>
  empty: boolean
  query: any
  loading: boolean
}

const INIT_QUERY = { pageSize: 10, currPage: 1 }

export default class List extends Component<IProps, IState> {

  public topRef = React.createRef<Top>()

  public static defaultProps = {
    query: {},
    sourceType: ESourceTypeList.Dva,
    scrollY: true,
    lowerThreshold: 50,
    scrollWithAnimation: false,
    onScroll: noop,
    fetch: noop,
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

  public constructor(props) {
    super(props)
    this.state.query = { ...INIT_QUERY, ...this.props.query }
  }

  //获取数据
  public get data() {
    if (this.state.data) return this.state.data
    return []
  }

  //获取loading状态
  public get loading() {
    if (typeof this.state.loading === 'boolean') return this.state.loading
    return false
  }

  public componentDidMount = () => {
    const { autoFetch } = this.props
    if (!autoFetch) return
    const { query } = this.state
    this.fetchData(query)
  }

  //数据请求
  public fetchData = async (query: any, isInit = false) => {
    const { sourceType, fetch } = this.props
    this.setState({ query })
    this.setState({ loading: true })
    if (sourceType === ESourceTypeList.Scope) {
      const { data } = this.state
      const newData = await fetch(query, isInit)

      //空数据提示
      Taro.showToast({
        title: '没有更多内容了',
        icon: 'none',
        duration: 500
      })

      const { pageSize } = this.state.query
      //判断是否存在数据
      if (newData.length < pageSize) {
        this.setState({ empty: true })
      } else {
        this.setState({ empty: false })
      }

      this.setState({ 
        data: [ ...(isInit ? [] : data), newData ], 
        loading: false 
      })
    } else if (sourceType === ESourceTypeList.Dva) {
      await fetch(query, isInit)
      await this.setState({ loading: false })
    }
  }

  //上拉加载
  public handleToLower = () => {
    const { query, loading, empty } = this.state
    if (loading) return
    if (empty) return
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

  //获取header高度
  public getHeaderHeight() {
    const query = Taro.createSelectorQuery().in(this)
    query.select('#scroll-header').boundingClientRect()
    // .exec()
    console.log(query)
    // query.selectViewport().scrollOffset()
    // // console.log(query)
    // query.exec(function(res){
    //   console.log(res)
    //   // res[0].top       
    //   // res[1].scrollTop // 显示区域的竖直滚动位置
    // })
  }

  public render() {
    const {
      header,
      bottom,
      style = {},
    } = this.props
    const { empty, loading } = this.state
    const { divider = true } = this.props
    const _header = typeof header === 'boolean'
    const _bottom = typeof bottom === 'boolean'

this.getHeaderHeight()

    return (
      <View className='list'>
        <View
          style={isObject(style) ? style : {}}
          className='scroll-view'
        >
          {
            !_header && loading &&
              <View id="scroll-header" className='header' style={{ ...customStyle.backgroundColor('disabled') }}>
                {
                  this.props.renderHeader
                }
              </View>
          }
          <View style={{ ...customStyle.backgroundColor('bgColor'), paddingTop: (header || 0) + 'rpx' }}
          >
            <GResult
              loading={loading}
              isEmpty={!this.data.length}
            >
              {this.props.renderContent}
            </GResult>
          </View>
          {
            empty && divider && <GDivider other={{ paddingBottom: (bottom ? bottom + 20 : 0) + 'rpx' }} />
          }
          {/* <Top 
            ref={this.topRef} 
          /> */}
          { !_bottom && !loading && this.props.renderBottom}
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