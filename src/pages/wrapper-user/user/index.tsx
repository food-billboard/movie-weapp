import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import IconHead from '~components/headicon'
import List from '~components/linearlist'
import GButton from '~components/button'
import { TypeColor, colorStyleChange } from '~theme/color'
import { router, routeAlias, withTry } from '~utils'
import style from '~theme/style'
import { getUserInfo, getCustomerAntoherUserInfo, toAttention, cancelAttention } from '~services'
import { mapStateToProps, mapDispatchToProps } from './connect'

import './index.scss'

class User extends Component<any>{

  public state: any = {
    data: {}
  }

  public componentDidMount = async () => {
    await this.refresh()
  }

  readonly router = getCurrentInstance().router

  get id() {
    return this.router?.params.id
  }

  public componentDidShow = () => colorStyleChange()

  public refresh = async () => await this.fetchData()

  //数据获取
  public fetchData = async () => {
    if (!this.id) {
      Taro.showToast({
        title: '网络错误，请重试',
        icon: 'none',
        duration: 1000
      })
      return
    }
    const userInfo = await this.props.getUserInfo({ prompt: false })
    const method = userInfo ? getCustomerAntoherUserInfo : getUserInfo
    Taro.showLoading({ mask: true, title: '加载中...' })
    const data = await method(this.id)
    Taro.hideLoading()
    this.setState({
      data
    })
  }

  //关注/取消关注
  public attention = async () => {
    const { data: { like } } = this.state
    const method = like ? cancelAttention : toAttention
    const action = async (res) => {
      if (!res) return
      Taro.showLoading({ mask: true, title: '操作中' })
      await withTry(method)(this.id)
      Taro.hideLoading()
      await this.refresh()
    }
    return this.props.getUserInfo({ action })
      .catch(() => {
        Taro.showToast({
          title: '操作失败，请重试',
          icon: 'none'
        })
      })
  }

  //查看收藏
  public handleCheckStore = () => router.push(routeAlias.store, { id: this.id })

  //查看关注
  public handleCheckAttention = () => router.push(routeAlias.attention, { id: this.id })

  //查看浏览记录
  public handleCheckRecord = () => router.push(routeAlias.record, { id: this.id })

  //查看电影发布
  public handleCheckIssue = () => router.push(routeAlias.userissue, { id: this.id })

  //查看评论
  public handleCheckComment = () => router.push(routeAlias.mycomment, { id: this.id })

  //查看粉丝
  public handleCheckFans = () => router.push(routeAlias.fans, { id: this.id })

  //用户界面的相关信息
  readonly userInfo = [
    {
      title: 'Ta的收藏',
      iconInfo: {
        value: 'heart',
        // size: SYSTEM_PAGE_SIZE(14), 
        color: TypeColor()['primary']
      },
      handle: this.handleCheckStore,
      id: Symbol('store')
    },
    {
      title: 'Ta的关注',
      iconInfo: {
        value: 'star',
        // size: SYSTEM_PAGE_SIZE(14), 
        color: TypeColor()['primary']
      },
      handle: this.handleCheckAttention,
      id: Symbol('attention')
    },
    {
      title: 'Ta的粉丝',
      iconInfo: {
        value: 'user',
        // size: SYSTEM_PAGE_SIZE(14), 
        color: TypeColor()['primary']
      },
      handle: this.handleCheckFans,
      id: Symbol('fans')
    },
    {
      title: 'Ta的浏览记录',
      iconInfo: {
        value: 'list',
        // size: SYSTEM_PAGE_SIZE(14), 
        color: TypeColor()['primary']
      },
      handle: this.handleCheckRecord,
      id: Symbol('record')
    },
    {
      title: 'Ta的评论',
      iconInfo: {
        value: 'bookmark',
        // size: SYSTEM_PAGE_SIZE(14), 
        color: TypeColor()['primary']
      },
      handle: this.handleCheckComment,
      id: Symbol('comment')
    },
    {
      title: 'Ta的电影',
      iconInfo: {
        value: 'share-2',
        // size: SYSTEM_PAGE_SIZE(14), 
        color: TypeColor()['primary']
      },
      handle: this.handleCheckIssue,
      id: Symbol('issue')
    }
  ]

  public render() {

    const { data: { like, ...nextInfo } } = this.state

    return (
      <View id='user'
        style={{ ...style.backgroundColor('bgColor') }}
      >
        <View className='page-user-icon'>
          <IconHead
            list={nextInfo}
          />
        </View>
        <View className='page-user-list'
          style={{ borderBottom: '1px solid rgb(237, 243, 248)' }}
        >
          <List
            list={this.userInfo}
          />
        </View>
        <GButton
          type='secondary'
          style={{ width: '100%', height: '100rpx', position: 'fixed', bottom: 0 }}
          active={like ? 1 : 0}
          value={['关注', '取消关注']}
          operate={this.attention}
        />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)