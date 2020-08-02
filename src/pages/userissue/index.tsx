import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import GScrollView from '~components/scrollList'
import IconList from '~components/iconlist'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { throttle } from 'lodash'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from './connect'
import { getCustomerIssue, getUserIssue } from '~services'
import { router, routeAlias, ESourceTypeList } from '~utils'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any>{

  private scrollRef = React.createRef<GScrollView>()

  public componentDidShow = () => colorStyleChange()

  //下拉刷新
  public onPullDownRefresh = async () => {
    await this.scrollRef.current!.handleToUpper()
    Taro.stopPullDownRefresh()
  }

  //上拉加载
  public onReachBottom = async () => await this.scrollRef.current!.handleToLower()

  public state: any = {
    data: []
  }

  //用户id
  readonly id = getCurrentInstance().router?.params.id

  //获取数据
  public fetchData = async (query: any, isInit = false) => {
    const { data } = this.state
    const method = this.id ? getUserIssue : getCustomerIssue
    const args = this.id ? { id: this.id } : {}
    const resData = await method({ ...args, ...query })

    this.setState({
      data: [ ...(isInit ? [] : data), ...resData ]
    })
    return resData
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  //修改电影内容
  public editMovie = async (id: string) => {
    if (this.id) {
      Taro.showToast({
        title: '您没有修改权限',
        icon: 'none',
        duration: 1000
      })
    } else {
      await this.props.getUserInfo()
        .then(_ => {
          router.push(routeAlias.issue, { id })
        })
        .catch(err => err)
    }
  }

  public render() {

    const { data } = this.state

    return (
      <GScrollView
        ref={this.scrollRef}
        query={{ pageSize: 16 }}
        style={{ ...style.backgroundColor('bgColor') }}
        sourceType={ESourceTypeList.Scope}
        scrollWithAnimation={true}
        fetch={this.throttleFetchData}
        renderContent={<IconList list={data.map(item => {
          const { _id, poster, ...nextItem } = item
          return {
            ...nextItem,
            id: _id,
            image: poster,
          }
        })} handleClick={this.editMovie}></IconList>}
      >
      </GScrollView>
    )
  }

}

