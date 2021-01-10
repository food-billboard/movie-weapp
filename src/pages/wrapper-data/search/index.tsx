import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import SearchBar from '../../main/components/searchButton'
import Head from './components/head'
import List from '~components/list'
import Indexes from '../issue/components/indexes'
import IconList from '~components/iconlist'
import GScrollView from '~components/scrollList'
import RadioList from './components/radio'
import Method from './components/method'
import Forms from './components/form'
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce' 
import { FormData, searchQuery } from './interface'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { SYSTEM_PAGE_SIZE } from '~config'
import { AtDrawer } from 'taro-ui'
import { Item } from '~components/indexes'
import { EIndexesType } from '../issue/interface'
import { withTry, ESourceTypeList } from '~utils'
import {  } from '~services'

import './index.scss'

const factorySearch = () => {

}

const { screenWidth, screenHeight } = Taro.getSystemInfoSync()

//初始化页码参数
const INIT_PAGE = { currPage: 1, pageSize: 10 }

//初始化参数
const INIT_QUERY = { type: '', sort: '', query: {} }

//初始hot高度
const HOT_HEIGHT = SYSTEM_PAGE_SIZE(35)

export default class Index extends Component<any> {

  public searchBarRef = React.createRef<SearchBar>()

  public scrollRef = React.createRef<GScrollView>()

  private indexesRef = React.createRef<Indexes>()

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
    indexesVisible: false
  }

  //数据获取
  public fetchData = async (query: any, isInit = false) => {
    const { searchList } = this.state
    Taro.showLoading({ mask: true, title: '查询中' })
    const [, data] = await withTry(factorySearch)({ ...query })
    Taro.hideLoading()
    if (data) {
      const _data = data.data
      let newData
      if (isInit) {
        newData = [..._data]
      } else {
        newData = [...searchList, ..._data]
      }
      await this.setState({
        searchList: newData
      })
      return _data || []
    }
    return []
  }

  /**
   * 字段筛选
   */
  public confirm = async (value: string) => {
    Taro.showLoading({ mask: true, title: '努力搜索中' })
    const [, data] = await withTry(factorySearch)({ ...INIT_PAGE, query: { query: {}, field: value } })
    Taro.hideLoading()
    if (data) {
      const _data = data.data
      await this.setState({
        searchList: _data
      })
      this.showList(true)
    }
  }

  /**
   * 分类筛选
   */
  public typeScreen = async (type: string) => {
    const { query } = this.state
    this.setState({
      query: { ...query, type }
    })
    Taro.showLoading({ mask: true, title: '筛选中' })
    const [, data] = await withTry(factorySearch)({ ...INIT_PAGE, query: { ...INIT_QUERY, ...query, type, field: this.searchBarRef.current!.searchBarRef.current!.state!.value || '' } })
    Taro.hideLoading()
    if (data) {
      const _data = data.data
      await this.setState({
        searchList: _data
      })
    }
  }

  /**
   * 排序筛选
   */
  public sortScreen = async (sort: string) => {
    const { query } = this.state
    this.setState({
      query: { ...query, sort }
    })
    Taro.showLoading({ mask: true, title: '努力搜索中' })
    const [, data] = await withTry(factorySearch)({ ...INIT_PAGE, query: { ...INIT_QUERY, ...query, sort, field: this.searchBarRef.current!.searchBarRef.current!.state!.value || '' } })
    Taro.hideLoading()
    if (data) {
      const _data = data.data
      await this.setState({
        searchList: _data
      })
    }
  }

  /**
   * 参数筛选
   */
  public queryScreen = async (formData: FormData) => {
    const { query } = this.state
    this.setState({
      query: { ...query, query: formData }
    })
    Taro.showLoading({ mask: true, title: '努力筛选中' })
    const [, data] = await withTry(factorySearch)({ ...INIT_PAGE, query: { ...INIT_QUERY, ...query, query: formData, field: this.searchBarRef.current!.searchBarRef.current!.state.value || '' } })
    Taro.hideLoading()
    if (data) {
      const _data = data.data
      await this.setState({
        searchList: _data
      })
    }
  }

  /**
   * 节流数据获取
   */
  public throttleFetchData = throttle(this.fetchData, 2000)

  /**
   * 防抖搜索
   */
  public debounceConfirm = debounce(this.confirm, 2000)

  /**
   * 展示方式切换
   */
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

  /**
   * 筛选遮罩展示
   */
  public drawerOpen() {
    this.setState({
      selectShow: true
    })
  }

  /**
   * 关闭抽屉
   */
  public drawerClose = () => {
    this.setState({
      selectShow: false
    })
  }

  //索引显示隐藏
  public handleIndexesShow = ({ visible, type }) => {
    this.setState({
      indexesVisible: visible
    }, () => {
      setTimeout(() => {
        this.indexesRef.current!.indexesVisible(type)
      }, 0)
    })
  }

  //索引选择
  public handleSelectIndexes = (item: Item, type: EIndexesType) => {
    //隐藏索引
    this.setState({
      indexesVisible: false
    }, () => {
      setTimeout(() => {
        this.formRef.current!.handleIndexesAppend(item, type)
      }, 0)
    })
  }

  public render() {
    const { showList, searchList, listShow, hotShow, selectShow, indexesVisible } = this.state
    return (
      <GScrollView
        ref={this.scrollRef}
        style={{
          ...style.backgroundColor('bgColor')
        }}
        autoFetch={false}
        sourceType={ESourceTypeList.Scope}
        renderContent={
          !indexesVisible ?
            <Indexes
              handleClick={this.handleSelectIndexes}
              ref={this.indexesRef}
            ></Indexes>
            :
            <View>
              <AtDrawer
                show={selectShow}
                mask={false}
                right={true}
                width={SYSTEM_PAGE_SIZE(300) + 'px'}
                className='drawer'
              >
                <Forms
                  ref={this.formRef}
                  screen={this.queryScreen}
                  indexesShow={this.handleIndexesShow}
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
                style={{ width: screenWidth + 'px' }}
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
                  overflowX: 'hidden',
                  paddingTop: 150 + 'rpx',
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
      // header={150}
      // renderHeader={
      //     <View 
      //         className='search-head' 
      //         style={{width: screenWidth + 'px'}}
      //     >
      //         <SearchBar 
      //             confirm={this.debounceConfirm} 
      //             ref={this.searchBarRef}
      //             focus={false}
      //             control={this.showList}
      //             hotShow={hotShow}
      //         />
      //     </View>
      // }
      >
      </GScrollView>
    )
  }
}