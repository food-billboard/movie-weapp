import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtGrid } from "taro-ui"
import GScrollView from '~components/scrollList'
import Rank from '../../main/components/rank'
import List from '~components/list'
import { TypeColor, colorStyleChange } from '~theme/color'
import style from '~theme/style'
import throttle from 'lodash/throttle'
import { router, routeAlias, ESourceTypeList } from '~utils'
import { SYSTEM_PAGE_SIZE } from '~config'
import { getRankList, getRankType } from '~services'

const COLUMN_COUNT = 4

const COLUMN_MAX = 12

enum showType {
  SHOW_MORE = 'SHOW_MORE',
  HIDE_MORE = 'HIDE_MORE'
}

const SHOW_ICON = {
  value: 'chevron-right',
  color: '',
  size: SYSTEM_PAGE_SIZE(30)
}

const HIDE_ICON = {
  value: 'chevron-left',
  color: '',
  size: SYSTEM_PAGE_SIZE(30)
}

const SHOW_MORE_CONFIG = {
  id: showType.SHOW_MORE,
  value: '展开',
  iconInfo: {...SHOW_ICON}
}

const HIDE_MORE_CONFIG = {
  id: showType.HIDE_MORE,
  value: '收起',
  iconInfo: {...HIDE_ICON}
}

export default class extends Component<any> {

  public state: any = {
    data: [],
    rankType: [],
    showMore: false
  }

  public componentDidShow = () => {
    colorStyleChange()
  }

  public componentDidMount = async () => {
    this.fetchRankTypeData()
    this.title = this.current?.params.type || '排行榜'
  }

  readonly current = getCurrentInstance().router

  //排行榜id
  private _id = this.current?.params.id

  public get id() {
    return this._id
  }

  public set id(id) {
    this._id = id
  }

  public get title() {
    return this._title
  }

  public set title(title) {
    const realTitle = decodeURIComponent(title)
    this._title = realTitle
    Taro.setNavigationBarTitle({ title: realTitle })
  }

  private _title

  public scrollRef = React.createRef<GScrollView>()

  //下拉刷新
  public onPullDownRefresh = async () => {
    await this.scrollRef.current!.handleToUpper()
    Taro.stopPullDownRefresh()
  }
  
  //上拉加载
  public onReachBottom = async () => {
      await this.scrollRef.current!.handleToLower()
  }

  //数据获取
  public fetchData = async (query: any, isInit=false) => {
    const { data } = this.state
    const resData = await getRankList({id: this.id, ...query})
    this.setState({
      data: resData.length ? [ ...(isInit ? [] : data), ...resData.map(item => {
        const { poster, classify, publish_time, ...nextItem } = item
        return {
          ...nextItem,
          image: poster,
          type: classify.map(item => item.name),
          time: publish_time,
        }
      }) ] : data
    })
    return resData || [] 
  }

  //获取排行榜分类列表
  public fetchRankTypeData = async () => {
    const data = await getRankType(16)
    this.setState({
      rankType: data.map(val => {
        const { _id: id, name, icon, author_rate } = val
        return {
          id,
          value: name,
          image: icon,
          rate: author_rate
        }
      })
    })
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  //查看详细信息
  public getDetail = async ( id: string ) => router.push(routeAlias.detail, { id })

  //切换排行榜
  public exchangeRank = async (item, _: number) => {
    const { id, value } = item
    if(id === showType.HIDE_MORE || id === showType.SHOW_MORE) return this.handleControlRank(id)
    this.id = id
    this.title = value
    await this.fetchRankTypeData()
    this.scrollRef.current!.handleToUpper()
  }

  //展开收起排行榜
  public handleControlRank = (id:keyof typeof showType) => {
    let status = true
    if(showType[id] === showType.HIDE_MORE) status = false
    this.setState({
      showMore: status
    })
  }

  public render() {
    const { data, rankType, showMore } = this.state

    const color = { color: TypeColor['primary'] }
    const hideConfig = { ...HIDE_MORE_CONFIG, iconInfo: { ...HIDE_ICON, ...color } }
    const showConfig = { ...SHOW_MORE_CONFIG, iconInfo: { ...SHOW_ICON, ...color } }
    return(
      <GScrollView
        style={{...style.backgroundColor('bgColor')}}
        ref={this.scrollRef}
        sourceType={ESourceTypeList.Scope}
        query={{pageSize: 8}}
        renderContent={
          <View>
            <Rank
              style={{padding: '10px 10px 0 10px', boxSizing: 'border-box'}}
              type={''}
              list={data}
            />
            <AtGrid
              hasBorder={false}
              data={
                showMore ? 
                (
                  rankType.length > COLUMN_MAX ?
                  [ ...rankType, hideConfig ] 
                  : rankType
                ) : 
                (
                  rankType.length > COLUMN_MAX ?
                  [ ...(rankType.slice(0, COLUMN_MAX - 1)), showConfig ]
                  : rankType
                )
              }
              onClick={this.exchangeRank}
              columnNum={COLUMN_COUNT}
            />
            <List list={data} style={{marginTop: '10px'}} reload={this.fetchData.bind(this, {}, true)} />
          </View>
        }
        fetch={this.throttleFetchData}
      >
      </GScrollView>
    )
  }
}