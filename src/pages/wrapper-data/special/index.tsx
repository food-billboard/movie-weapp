import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import throttle from 'lodash/throttle'
import { connect } from 'react-redux'
import Scroll from '~components/scrollList'
import IconList from '~components/iconlist'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { router, routeAlias, ESourceTypeList, login4Request } from '~utils'
import { getSpecial, getCustomerSpecial } from '~services'
import { mapStateToProps, mapDispatchToProps } from './connect'

let FIRST = true

class SpecialDetail extends Component<any>{

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
    const method = await login4Request(this.props.getUserInfo, getSpecial, getCustomerSpecial)
    const { name, movie } = await method({ id: this.id, ...query })

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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialDetail)