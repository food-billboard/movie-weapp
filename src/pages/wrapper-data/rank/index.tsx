import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { AtTag } from "taro-ui"
import { connect } from 'react-redux'
import throttle from 'lodash/throttle'
import GScrollView from '~components/scrollList'
import List from '~components/list'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { router, routeAlias, ESourceTypeList, login4Request } from '~utils'
import { getRankList, getRankType, getCustomerRankList } from '~services'
import Rank from '../../main/components/rank'
import { mapStateToProps, mapDispatchToProps } from './connect'

enum showType {
  SHOW_MORE = 'SHOW_MORE',
  HIDE_MORE = 'HIDE_MORE'
}
class RankList extends Component<any> {

  public state: any = {
    data: [],
    rankType: [],
  }

  public componentDidMount = async () => {
    this.fetchRankTypeData()
    this.title = this.current?.params.type || '排行榜'
  }

  public componentDidShow = () => {
    colorStyleChange()
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
    this.scrollRef.current!.handleToLower()
  }

  //数据获取
  public fetchData = async (query: any, isInit=false) => {
    const { data } = this.state
    const method = await login4Request(this.props.getUserInfo, getRankList, getCustomerRankList)
    const resData = await method({id: this.id, ...query})
    this.setState({
      data: resData.length ? [ ...(isInit ? [] : data), ...resData.map(item => {
        const { classify, publish_time, ...nextItem } = item
        return {
          ...nextItem,
          type: classify.map(classData => classData.name),
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
        const { _id: id, name, author_rate } = val
        return {
          id,
          value: name,
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
    if(id === showType.HIDE_MORE || id === showType.SHOW_MORE) return
    this.id = id
    this.title = value
    await this.fetchRankTypeData()
    this.scrollRef.current!.handleToUpper()
  }

  public render() {
    const { data, rankType } = this.state

    return(
      <GScrollView
        style={{...style.backgroundColor('bgColor')}}
        ref={this.scrollRef}
        sourceType={ESourceTypeList.Scope}
        query={{pageSize: 8}}
        emptyShow={false}
        renderContent={
          <View>
            <Rank
              style={{padding: '10px 10px 0 10px', boxSizing: 'border-box'}}
              type=''
              list={data}
              autoplay
            />
            <ScrollView
              scrollX
              style={{whiteSpace: 'nowrap', padding: '10px 10px 10px 5px', boxSizing: 'border-box', width: '100%'}}
            >
              {
                rankType.map(item => {
                  const { id, value } = item
                  return (
                    <AtTag 
                      customStyle={{ display: 'inline-block', marginLeft: '5px', ...style.color('primary') }}
                      circle
                      onClick={this.exchangeRank.bind(this, item)}
                      key={id}
                      className='sub-title-font-size-class'
                      active={id === this.id}
                    >
                      {value}
                    </AtTag>
                  ) 
                })
              }
            </ScrollView>
            <List list={data} style={{marginTop: '10px'}} reload={this.fetchData.bind(this, {}, true)} />
          </View>
        }
        fetch={this.throttleFetchData}
      >
      </GScrollView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RankList)