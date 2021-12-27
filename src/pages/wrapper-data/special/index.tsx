import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import Scroll from '~components/scrollList'
import throttle from 'lodash/throttle'
import IconList from '~components/iconlist'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { router, routeAlias, ESourceTypeList } from '~utils'
import { getSpecial } from '~services'

let FIRST = true

export default class extends Component<any>{

  public state: any = {
    data: [],
    title: false
  }

  //专题id
  readonly id = getCurrentInstance().router?.params.id

  private scrollRef = React.createRef<Scroll>()

  public componentDidShow = () => {
    colorStyleChange()
  }

  //上拉加载
  public onReachBottom = async () => {
    await this.scrollRef.current!.handleToLower()
  }

  //设置标题
  public setTitle = async () => {
    const { title } = this.state
    if (title && FIRST) {
      FIRST = false
      Taro.setNavigationBarTitle({ title })
    }
  }

  /**
   * 获取数据
   */
  public fetchData = async (query: any, isInit = false) => {
    const { data } = this.state
    const { name, movie } = await getSpecial({ id: this.id, ...query })

    this.setState({
      data: [...(isInit ? [] : data), ...movie.map(item => {
        const { poster, classify, publish_time, ...nextItem } = item
        return {
          ...nextItem,
          image: poster,
          type: classify.map(classData => classData.name),
          time: publish_time,
        }
      })],
      title: name
    })
    return movie
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  //获取电影详情
  public getDetail = (id: string) => router.push(routeAlias.detail, { id })

  public render() {

    const { data } = this.state

    this.setTitle()

    return (
      <Scroll
        ref={this.scrollRef}
        style={{ ...style.backgroundColor('bgColor') }}
        query={{ pageSize: 16 }}
        sourceType={ESourceTypeList.Scope}
        scrollWithAnimation
        fetch={this.throttleFetchData}
        renderContent={<IconList reload={this.fetchData.bind(this, {}, true)} list={data}></IconList>}
      ></Scroll>
    )
  }

}