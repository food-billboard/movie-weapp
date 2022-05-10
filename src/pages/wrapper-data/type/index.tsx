import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component, createRef } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import IconList from '~components/iconlist'
import LinearList from '~components/list'
import GScrollView from '~components/scrollList'
import throttle from 'lodash/throttle'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { getClassifyList, getCustomerClassifyList } from '~services'
import { ESourceTypeList, login4Request } from '~utils'
import Fab from './components/fab'
import ClassifyHeader, { IClassifyHeaderRef } from './components/header'
import { mapStateToProps, mapDispatchToProps } from './connect'

import './index.scss'

const INIT_QUERY = { currPage: 1, pageSize: 10 }

class Index extends Component<any> {

  public state = {
    data: [],
    listShow: true,
  }

  public componentDidMount = async () => {
    const { params: { id = null } = {} } = getCurrentInstance().router || {}
    if (!id) return
    this.getTypeDetail(id)
  }

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

  classifyHeaderRef = createRef<IClassifyHeaderRef>()

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

  //获取数据
  public fetchData = async (query: any, isInit = false) => {
    const { data } = this.state
    if (!this.id) return []
    const method = await login4Request(this.props.getUserInfo, getClassifyList, getCustomerClassifyList)
    const resData = await method({ id: this.id, ...query })

    this.setState({
      data: [...(isInit ? [] : data), ...resData.map(item => {
        const { poster, classify, publish_time, author_description, ...nextItem } = item
        return {
          ...nextItem,
          image: poster,
          type: classify.map(classData => classData.name),
          time: publish_time,
          description: author_description
        }
      })]
    })
    return resData
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  //改变当前页面路由
  public getTypeDetail = async (id: string) => {
    this.classifyHeaderRef.current && this.classifyHeaderRef.current.close()
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

  //设置标题
  public setTitle = (id: string) => {
    const classifyList = this.classifyHeaderRef.current?.classifyList || []
    const [target]: any = classifyList.filter((val: any) => val._id === id)
    const title = target ? target.name : '分类'
    Taro.setNavigationBarTitle({ title })
  }

  public render() {
    const { data, listShow } = this.state

    const bgColor = style.backgroundColor('bgColor')
  
    return (
      <GScrollView
        ref={this.scrollRef}
        style={{ ...bgColor }}
        sourceType={ESourceTypeList.Scope}
        scrollWithAnimation
        emptyShow={false}
        autoFetch={false}
        renderContent={
          <View>
            <ClassifyHeader
              ref={this.classifyHeaderRef}
              currentValue={this.id}
              onChange={this.getTypeDetail}
            />
            <View className='page-classify-list'>
              {
                listShow ? (<LinearList list={data} reload={this.fetchData.bind(this, {}, true)} />) : (<IconList list={data} reload={this.fetchData.bind(this, {}, true)} />)
              }
            </View>
          </View>
        }
        fetch={this.throttleFetchData}
        // renderBottom={
        //   (_: () => any) => {
        //     return (
        //       <View className='page-classify-btn'>
        //         <Fab value={listShow} change={this.listChange} />
        //       </View>
        //     )
        //   }
        // }
      >
      </GScrollView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index) 