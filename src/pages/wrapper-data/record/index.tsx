import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import List from '~components/list'
import GScrollView from '~components/scrollList'
import throttle from 'lodash/throttle'
import style from '~theme/style'
import { colorStyleChange } from '~theme/color'
import { getCustomerGlance, getUserGlance } from '~services'
import { ESourceTypeList } from '~utils'

export default class Index extends Component<any> {

  public state: any = {
    data: []
  }

  //用户id
  readonly id = getCurrentInstance().router?.params.id

  private scrollRef = React.createRef<GScrollView>()

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

  //获取数据
  public fetchData = async (query: any, isInit = false) => {
    const { data } = this.state
    const method = this.id ? getUserGlance : getCustomerGlance
    const args = this.id ? { id: this.id } : {}
    const { glance } = await method({ ...args, ...query })

    this.setState({
      data: [...(isInit ? [] : data), ...glance.map(item => {
        const { poster, classify, publish_time, ...nextItem } = item
        return {
          ...nextItem,
          image: poster,
          type: classify.map(classData => classData.name),
          time: publish_time,
        }
      })]
    })
    return glance
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  public render() {

    const { data } = this.state

    return (
      <GScrollView
        ref={this.scrollRef}
        style={{ ...style.backgroundColor('bgColor') }}
        sourceType={ESourceTypeList.Scope}
        scrollWithAnimation
        renderContent={
          <List
            reload={this.fetchData.bind(this, {}, true)}
            list={data}
          ></List>
        }
        fetch={this.throttleFetchData}
      ></GScrollView>
    )
  }
}