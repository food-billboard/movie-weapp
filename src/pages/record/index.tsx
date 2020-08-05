import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
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
    const resData = await method({ ...args, ...query })

    this.setState({
      data: [...(isInit ? [] : data), ...resData.map(item => {
        const { _id, poster, classify, createdAt description, rate, ...nextItem } = item
        return item
        return {
          ...nextItem,
          image: poster,
          type: classify,
          time: createdAt,
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
          <List
            list={data}
          ></List>
        // <View>
        //   {
        //     data.map(val => {
        //       const { _id, poster, name, description } = val
        //       return <List content={{
        //         name,
        //         detail: description,
        //         image: poster,
        //         id: _id,
        //       }} key={_id} />
        //     })
        //   }
        // </View>
        }
        fetch={this.throttleFetchData}
      ></GScrollView>
    )
  }
}