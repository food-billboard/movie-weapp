import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import noop from 'lodash/noop'
import GDivider from '~components/divider'
import GResult from '~components/result'
import { ESourceTypeList, sleep } from '~utils'
import customStyle from '~theme/style'
import Top from '../topbutton'
import './index.scss'

export interface IProps {
  sourceType: ESourceTypeList
  style?: React.CSSProperties
  autoFetch?: boolean
  query?: any
  fetch: (...args: any[]) => any
  fixHeader?: boolean
  fixBottom?: boolean
  renderContent?: any
  renderHeader?: any
  renderBottom?: any
  divider?: boolean
  emptyShow?: boolean
}

export interface IState {
  data: Array<any>
  empty: boolean
  query: any
  loading: boolean
  [key: string]: any
}

const INIT_QUERY = { pageSize: 10, currPage: 0 }

export default class List extends Component<IProps, IState> {

  public static defaultProps = {
    query: {},
    sourceType: ESourceTypeList.Dva,
    scrollY: true,
    lowerThreshold: 50,
    scrollWithAnimation: false,
    onScroll: noop,
    fetch: noop,
    autoFetch: true,
    fixHeader: true,
    fixBottom: true,
    emptyShow: true,
  }

  public constructor(props) {
    super(props)
    this.state.query = { ...INIT_QUERY, ...this.props.query }
  }

  public state: IState = {
    data: [],
    empty: false,
    query: {},
    loading: !!this.props.autoFetch,
  }

  public componentDidMount = async () => {
    await sleep(10)
    const { autoFetch } = this.props
    if (!autoFetch) return
    const { query } = this.state
    this.fetchData(query)
  }

  public topRef = React.createRef<Top>()

  public readonly DEFAULT_QUERY = INIT_QUERY

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

  //数据请求
  public fetchData = async (query: any, isInit = false) => {
    const { sourceType, fetch } = this.props
    this.setState({ query })
    this.setState({ loading: true })
    if (sourceType === ESourceTypeList.Scope) {
      const { data } = this.state
      const newData = await fetch(query, isInit)

      const { pageSize } = this.state.query
      //判断是否存在数据
      if (newData.length < pageSize || !newData.length) {
        this.setState({ empty: true })
      } else {
        this.setState({ empty: false })
      }

      this.setState({
        data: [...(isInit ? [] : data), ...newData],
        loading: false
      })
    } else if (sourceType === ESourceTypeList.Dva) {
      await fetch(query, isInit)
      this.setState({ loading: false })
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

  public getHeight(domId: string, key: string) {
    // ! 没啥用
    // let _domId = domId
    // if (!/^#.+/.test(_domId)) _domId = `#${_domId}`
    // const that = this
    // const query = Taro.createSelectorQuery() // query 是 SelectorQuery 对象
    // query.select(_domId).boundingClientRect() // select 后是 NodesRef 对象，然后 boundingClientRect 返回 SelectorQuery 对象
    // query.selectViewport().scrollOffset() // selectViewport 后是 NodesRef 对象，然后 scrollOffset 返回 SelectorQuery 对象
    // query.exec(function (res) { // exec 返回 NodesRef 对象
    //   const [dom] = res.filter(currentDom => currentDom && currentDom.id == _domId.slice(1))
    //   if (!dom) return
    //   that.setState({
    //     [key]: dom.height || 0
    //   })
    // })
  }

  //获取header高度
  public watchHeaderHeight = () => {
    // ! 没啥用
    // const { fixHeader } = this.props
    // if (!fixHeader) return
    // setTimeout(() => {
    //   this.getHeight('scroll-header', 'headerHeight')
    // }, 10)
  }

  public watchBottomHeight = () => {
    // ! 没啥用
    // const { fixBottom } = this.props
    // if (!fixBottom) return
    // setTimeout(() => {
    //   this.getHeight('scroll-bottom', 'bottomHeight')
    // }, 10)
  }

  public render() {
    const {
      fixBottom,
      fixHeader,
      style = {},
      emptyShow
    } = this.props
    const { empty, loading } = this.state
    const { divider = true } = this.props

    return (
      <View className='component-scroll-list'>
        <View
          style={style || {}}
          className='component-scroll-list-view'
        >
          {
            !loading &&
            <View 
              id='scroll-header' 
              className={fixHeader ? 'component-scroll-list-fix-header' : 'component-scroll-list-normal-header'} 
              style={{ ...customStyle.backgroundColor('disabled') }}
            >
              {
                this.props.renderHeader && this.props.renderHeader(this.watchHeaderHeight)
              }
            </View>
          }
          <View 
            style={{ 
              ...customStyle.backgroundColor('bgColor'), 
            }}
          >
            {
              emptyShow ? (
                <GResult
                  loading={loading}
                  isEmpty={!this.data.length}
                  type='scope'
                >
                  {this.props.renderContent}
                </GResult>
              )
                :
                this.props.renderContent
            }
          </View>
          {
            !!this.data.length 
            && empty 
            && divider 
            && (
              <GDivider 
                lineColor='transparent' 
              />
            )
          }
          {/* <Top 
            ref={this.topRef} 
          /> */}
          {
            !loading &&
            <View 
              className={fixBottom ? 'component-scroll-list-fix-bottom' : 'component-scroll-list-normal-bottom'} 
              id='scroll-bottom'
            >
              {this.props.renderBottom && this.props.renderBottom(this.watchBottomHeight)}
            </View>
          }
        </View>
        <View
          className='component-scroll-list-active'
        >
          {loading &&
            <AtActivityIndicator
              size={100}
              content='玩命加载中...'
            />
          }
        </View>
      </View>
    )
  }
}