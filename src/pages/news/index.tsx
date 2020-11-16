import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { AtList, AtListItem, AtSwipeAction } from "taro-ui"
import { colorStyleChange } from '~theme/color'
import Result from '~components/result'
import style from '~theme/style'
import { mapDispatchToProps, mapStateToProps } from './connect'
import { connect } from 'react-redux'
import { router, routeAlias, formatTime, withTry, valueOf } from '~utils'
import throttle from 'lodash/throttle'
import { SwipeActionOption } from 'taro-ui/types/swipe-action'

import './index.scss'

const BUTTON_STYLE = [
  {
    text: '已读',
    style: {
      backgroundColor: '#6190E8'
    },
    action: async (id: string, props: any) => {
      //读消息
      Taro.showLoading({ mask: true, title: '稍等' })
      await withTry(props.readMessage)(id)
      Taro.hideLoading()
    }
  },
  {
    text: '删除',
    style: {
      backgroundColor: '#FF4949'
    },
    action: async (id: string, props: any) => {
      //删除消息
      Taro.showLoading({ mask: true, title: '删除中' })
      await withTry(props.deleteMessage)(id)
      Taro.hideLoading()
    }
  }
]

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {

  private worker: any

  public componentDidShow = () => {

    //TODO
    Taro.showModal({
      title: '温馨提示',
      content: '功能还在完善中...',
      success: function (_) {
        Taro.switchTab({
          url: '../main/index'
        })
      }
    })
    return
    //
    colorStyleChange()
    this.throttleFetchData()
  }

  //下拉刷新
  public onPullDownRefresh = async () => {
    await this.throttleFetchData()
    Taro.stopPullDownRefresh()
  }

  public state: any = {
    list: this.props.list
  }

  //获取详细信息
  public getDetail = async (id: string, _: string) => {
    //读取消息
    withTry(this.props.readMessage)(id)
    router.push(routeAlias.newsdetail, { id })
  }

  //获取数据
  public fetchData = async () => {
    //消息列表获取
    await this.props.getMessageList()
    this.sort()
  }

  //处理消息操作按钮
  public handleOperate = async (target: SwipeActionOption, id: string) => {
    const index = BUTTON_STYLE.findIndex(val => val.text === target.text)
    BUTTON_STYLE[index] && await BUTTON_STYLE[index].action(id, this)
    this.sort()
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  sortMethod = list => {
    return [...list].sort(function (a, b) {
      const { message: { count: Acount, time: Atime } } = a
      const { message: { count: Bcount, time: Btime } } = b
      if (Acount === 0 && Bcount === 0) {
        return valueOf(Atime) - valueOf(Btime)
      } else if (Acount === 0) {
        return -1
      } else if (Bcount === 0) {
        return 1
      } else {
        return valueOf(Atime) - valueOf(Btime)
      }
    })
  }

  //对数据进行排序
  public sort = () => {
    const { list = [] } = this.props
    this.setState({
      list: this.sortMethod(list)
    })
  }

  public render() {
    const { list } = this.state

    return (
      <Result isEmpty={!list.length} loading={false}>
        <AtList>
          {
            list.map((val: any) => {
              const { _id, type, info: { avatar, name, description }, message: { count, lastData, time } } = val

              return (
                <AtSwipeAction
                  key={_id}
                  onClick={(target) => { this.handleOperate.call(this, target, _id) }}
                  options={BUTTON_STYLE}
                  autoClose={true}
                >
                  <AtListItem
                    className='list'
                    customStyle={{ ...style.backgroundColor('disabled') }}
                    title={name}
                    arrow='right'
                    thumb={avatar}
                    extraText={formatTime(time)}
                    note={length > 0 ? (`${count}条新消息`) : '无新消息'}
                    onClick={() => { this.getDetail.call(this, _id, type) }}
                  />
                </AtSwipeAction>
              )
            })
          }
        </AtList>
      </Result>
    )
  }
}