import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import List from '~components/list'
import GScrollView from '~components/scrollList'
import throttle from 'lodash/throttle'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { getUserStore, getCustomerStore } from '~services'
import { ESourceTypeList } from '~utils'

export default class Index extends Component<any> {

  public state: any = {
    data: []
  }

  private scrollRef = React.createRef<GScrollView>()

  public componentDidShow = () => colorStyleChange()

  //下拉刷新
  public onPullDownRefresh = async () => {
    await this.scrollRef.current!.handleToUpper()
    Taro.stopPullDownRefresh()
  }

  //上拉加载
  public onReachBottom = async () => await this.scrollRef.current!.handleToLower()

  //用户id
  readonly id = getCurrentInstance().router?.params.id

  //获取数据
  public fetchData = async (query: any, isInit = false) => {
    const { data } = this.state
    const method = this.id ? getUserStore : getCustomerStore
    const args = this.id ? { id: this.id } : {}
    const resData = await method({ ...args, ...query })

    await this.setState({
      data: [...(isInit ? [] : data), ...resData.map(item => {
        const { poster, classify, _id, publish_time, ...nextItem } = item
        return {
          ...nextItem,
          image: poster,
          type: classify.map(item => item.name),
          id: _id,
          time: publish_time,
        }
      })]
    })
    return resData
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  public render() {

    const { data } = this.state

    return (
      <GScrollView
        ref={this.scrollRef}
        style={{ ...style.backgroundColor('bgColor') }}
        sourceType={ESourceTypeList.Scope}
        scrollWithAnimation={true}
        renderContent={
          <List list={data} />
        // <View>
        //   {
        //     data.map(val => {
        //       const { _id: id, poster, description, ...nextVal } = val
        //       return <List content={{
        //         ...nextVal,
        //         id,
        //         image: poster,
        //         detail: description,
        //       }} key={id} />
        //     })
        //   }
        // </View>
        }
        fetch={this.throttleFetchData}
      ></GScrollView>
    )
  }
}