import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce' 
import merge from 'lodash/merge'
import SearchBar from '../../main/components/searchButton'
import Head from './components/head'
import List from '~components/list'
import IconList from '~components/iconlist'
import GScrollView from '~components/scrollList'
import RadioList from './components/radio'
import Method from './components/method'
import Forms from './components/form'
import { FormData } from './interface'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { SYSTEM_PAGE_SIZE } from '~config'
import { AtDrawer } from 'taro-ui'
import { withTry, ESourceTypeList } from '~utils'
import { getSearchDataList } from '~services'

import './index.scss'

//初始化页码参数
const INIT_PAGE = { currPage: 0, pageSize: 10 }

//初始化参数
const INIT_QUERY = { type: '', sort: '' }

//初始hot高度
const HOT_HEIGHT = SYSTEM_PAGE_SIZE(35)

export default class Index extends Component<any> {

  public searchBarRef = React.createRef<SearchBar>()

  public scrollRef = React.createRef<GScrollView>()

  private formRef = React.createRef<Forms>()

  private scrollTop = 0

  public componentDidShow = () => {
    colorStyleChange()
  }

  //上拉加载
  public onReachBottom = async () => {
    await this.scrollRef.current!.handleToLower()
  }

  public state = {
    hotShow: HOT_HEIGHT,
    showList: true,
    listShow: false,
    searchList: [],
    query: { ...INIT_QUERY },
    selectShow: false,
  }

  //数据获取
  public fetchData = async (query: API_USER.ISearchDataParams, isInit = false) => {
    const { searchList } = this.state
    Taro.showLoading({ mask: true, title: '查询中' })
    const [, data] = await withTry(getSearchDataList)(query)
    Taro.hideLoading()
    if (data) {
      const _data = data
      let newData: any
      if (isInit) {
        newData = [..._data]
      } else {
        newData = [...searchList, ..._data]
      }
      this.setState({
        searchList: newData
      })
      return _data || []
    }
    return []
  }

  //内容筛选
  public confirm = async (value: string) => {
    const params = { ...INIT_PAGE, content: value }
    await this.fetchData(params, true)
  }

  private get searchValue() {
    return this.searchBarRef.current?.searchBarRef.current?.state?.value || ''
  }

  //分类筛选
  public typeScreen = async (type: string) => {
    const { query } = this.state
    // this.setState({
    //   query: { ...query, type }
    // })
    const params = { ...INIT_PAGE, ...query, content: this.searchValue }
    this.fetchData(params, true)
  }

  //排序筛选
  public sortScreen = async (sort: string) => {
    const { query } = this.state
    const newQuery = merge({}, query, {
      sort: `${sort}=-1`
    })
    this.setState({
      query: newQuery
    })
    const params = { ...INIT_PAGE, ...newQuery, content: this.searchValue }
    this.fetchData(params, true)
  }

  //参数筛选
  public queryScreen = async (formData: Partial<FormData>) => {
    const { query } = this.state
    const newQuery = merge({}, query, formData)
    this.setState({
      query: newQuery,
      selectShow: false
    })
    const params = { ...INIT_PAGE, ...newQuery, content: this.searchValue, }
    this.fetchData(params as any, true)
  }

  //节流数据获取
  public throttleFetchData = throttle(this.fetchData, 2000)

  //防抖搜索
  public debounceConfirm = debounce(this.confirm, 200)

  //展示方式切换
  public showMethod = () => {
    const { showList } = this.state
    this.setState({
      showList: !showList
    })
  }

  //获取搜索栏是否为选中状态
  public getSearchBarStatus = () => {
    const { current } = this.searchBarRef
    if (!current) return false
    return !current!.searchBarRef.current!.state.focus
  }

  //是否显示列表
  public showList = (show: boolean) => {
    this.setState({
      listShow: show
    })
  }

  //控制热搜显示隐藏
  public onPageScroll = (e) => {
    const { scrollTop } = e
    this.scrollTop += scrollTop
    const { hotShow } = this.state
    if (scrollTop >= HOT_HEIGHT) {
      if (hotShow === 0) return
      this.setState({
        hotShow: 0
      })
    }
    if (scrollTop < HOT_HEIGHT) {
      if (hotShow === HOT_HEIGHT) return
      this.setState({
        hotShow: HOT_HEIGHT
      })
    }
  }

  //筛选遮罩展示
  public drawerOpen = () => {
    this.setState({
      selectShow: true
    })
  }

  //关闭抽屉
  public drawerClose = () => {
    this.setState({
      selectShow: false
    })
  }

  public render() {
    const { showList, searchList, listShow, hotShow, selectShow } = this.state

    return (
      <GScrollView
        ref={this.scrollRef}
        style={{
          ...style.backgroundColor('bgColor')
        }}
        emptyShow={false}
        autoFetch={false}
        sourceType={ESourceTypeList.Scope}
        renderContent={
          <View>
            <AtDrawer
              show={selectShow}
              mask={false}
              right={true}
              width={"90vw"}
              className='drawer'
            >
              <Forms
                visible={selectShow}
                ref={this.formRef}
                screen={this.queryScreen}
              />
            </AtDrawer>
            {
              selectShow ?
                <View
                  className='curtain'
                  onClick={this.drawerClose}
                  style={{
                    opacity: selectShow ? '0.3' : '0',
                  }}
                  onTouchMove={(e) => { e.stopPropagation() }}
                ></View>
                : null
            }
            <View
              className='search-head'
            >
              <SearchBar
                confirm={this.debounceConfirm}
                ref={this.searchBarRef}
                focus={false}
                control={this.showList}
                hotShow={hotShow}
                disabled={false}
              />
            </View>
            <View
              className='search-main'
              style={{
                display: listShow && searchList.length ? 'block' : 'none',
              }}
            >
              <View
                className='head'
              >
                <Head screen={this.typeScreen} />
              </View>
              <View
                className='head-sub'
              >
                <View className='at-row at-row__justify--around sub'>
                  <View className='at-col at-col-5 select'>
                    <RadioList screen={this.sortScreen} />
                  </View>
                  <View className='at-col at-col-3 look'>
                    <Method
                      screen={this.showMethod}
                    />
                  </View>
                  <View className='at-col at-col-5 screen'>
                    <Text
                      className='text'
                      onClick={this.drawerOpen}>筛选</Text>
                  </View>
                </View>
              </View>
              {showList ? <List list={searchList} /> : <IconList list={searchList} />}
            </View>
          </View>
        }
        fetch={this.throttleFetchData}
      >
      </GScrollView>
    )
  }
}