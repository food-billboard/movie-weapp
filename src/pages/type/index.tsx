import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View, ScrollView, Text } from '@tarojs/components'
import IconList from '~components/iconlist'
import LinearList from '~components/list'
import GScrollView from '~components/scrollList'
import Fab from './components/fab'
import { throttle } from 'lodash'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { SYSTEM_PAGE_SIZE } from '~config'
import { getClassifyList, getClassify } from '~services'
import { ESourceTypeList } from '~utils'

import './index.scss'

const INIT_QUERY = { currPage: 1, pageSize: 10 }

const SINGLE_HEADER_HEIGHT = 80

const SCROLL_MAX_SHOW_COUNT = 10

enum SHOW_TYPE {
  SHOW_MORE = 'SHOW_MORE',
  HIDE_MORE = 'HIDE_MORE'
}

export default class Index extends Component<any> {

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

  public state = {
    typeDetail: [],
    type: [],
    listShow: true,
    typeShow: false
  }

  //电影分类id
  private _id

  public get id() {
    return this._id || ''
  }

  public set id(id: string) {
    this._id = id
    this.setTitle(id)
  }

  public scrollRef = React.createRef<GScrollView>()

  public fabRef = React.createRef<Fab>()

  public componentDidMount = async () => {
    await this.fetchTypeData()
    const { params: { id=null }={} } = getCurrentInstance().router || {}
    this.id = id || ''
  }

  //获取数据
  public fetchData = async (query: any, isInit = false) => {
    const { typeDetail } = this.state
    const data = await getClassifyList({ id: this.id, ...query })

    let newData
    if (isInit) {
      newData = [...data]
    } else {
      newData = [...typeDetail, ...data]
    }
    await this.setState({
      typeDetail: newData
    })
    return data
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  //改变当前页面路由
  public getTypeDetail = async (id: string) => {
    const { typeShow } = this.state
    if (typeShow) this.setState({ typeShow: false })
    this.id = id
    this.scrollRef.current!.fetchData({ INIT_QUERY }, true)
  }

  //获取查看方式
  public listChange = () => {
    const { listShow } = this.state
    this.setState({
      listShow: !listShow
    })
  }

  //获取分类列表
  public fetchTypeData = async () => {
    const data = await getClassify(16)
    this.setState({
      type: data
    })
  }

  //设置标题
  public setTitle = (id: string) => {
    const { type } = this.state
    const [target]: any = type.filter((val: any) => { val._id === id })
    const title = target ? target.name : '分类'
    Taro.setNavigationBarTitle({ title })
  }

  //控制详细分类的显示隐藏
  public handleControlTypeDetail = (type: SHOW_TYPE) => {
    let status = false
    if (type === SHOW_TYPE.SHOW_MORE) status = true
    this.setState({
      typeShow: status
    })
  }

  public render() {
    const { typeDetail, listShow, type, typeShow } = this.state

    const bgColor = style.backgroundColor('bgColor')

    const showType = type.length <= SCROLL_MAX_SHOW_COUNT

    const list = type.map((val: any) => {
      const { name, _id: id } = val
      return (
        <View
          className={'header-list ' + (typeShow ? 'at-col at-col-2' : 'header-list-size')}
          style={{ ...style.color('primary') }}
          key={id}
          onClick={(_) => { this.getTypeDetail.call(this, id) }}
        >
          {name}
        </View>
      )
    })

    const headerHeight = (showType || !typeShow) ? SINGLE_HEADER_HEIGHT : SINGLE_HEADER_HEIGHT * (Math.ceil((type.length + 2) / 6))
    return (
      <GScrollView
        ref={this.scrollRef}
        style={{ ...bgColor }}
        sourceType={ESourceTypeList.Scope}
        scrollWithAnimation={true}
        renderContent={
          <View>
            <View className='header-type' style={{
              ...bgColor,
              height: Number(SYSTEM_PAGE_SIZE(headerHeight)) / 2 + 'px'
            }}
            >
              <Text className='text'
                style={{ ...style.color('thirdly'), ...bgColor }}
              >分类: </Text>
              {
                showType || !typeShow ?
                  <ScrollView
                    scrollX={true}
                    className='header'
                    style={{ ...bgColor }}
                  >
                    {
                      !showType ?
                        <View
                          className={'header-list header-list-size'}
                          style={{ ...style.color('primary'), fontWeight: 'normal' }}
                          onClick={(e) => { this.handleControlTypeDetail.call(this, SHOW_TYPE.SHOW_MORE) }}
                        >
                          展开
                                        </View>
                        : null
                    }
                    {list}
                  </ScrollView>
                  :
                  <View
                    className='header-type-detail at-row at-row--wrap'
                    style={{ ...bgColor }}
                  >
                    {list}
                    <View
                      className={'header-list at-col at-col-2'}
                      style={{ ...style.color('primary'), fontWeight: 'normal' }}
                      onClick={(e) => { this.handleControlTypeDetail.call(this, SHOW_TYPE.HIDE_MORE) }}
                    >
                      收起
                                    </View>
                  </View>
              }
            </View>
            <View>
              {
                listShow ? (<LinearList list={typeDetail.map(item => {
                  const { _id: id, poster, name, hot } = item
                  return {
                    id,
                    image: poster,
                    name,
                    time: Date.now(),
                    hot
                  }
                })} />) : (<IconList list={typeDetail.map(item => {
                  const { _id: id, poster, name, hot } = item
                  return {
                    id,
                    image: poster,
                    name,
                    hot
                  }
                })} />)
              }
            </View>
          </View>
        }
        fetch={this.throttleFetchData}
        bottom={80}
        renderBottom={<View className="btn">
          <Fab value={listShow} change={this.listChange} />
        </View>}
      >
      </GScrollView>
    )
  }
}