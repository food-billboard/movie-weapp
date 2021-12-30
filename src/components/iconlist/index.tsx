import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { AtAvatar } from 'taro-ui'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'
import noop from 'lodash/noop'
import style from '~theme/style'
import { router, formatNumber, routeAlias, withTry } from '~utils'
import { putStore, cancelStore } from '~services'
import { mapDispatchToProps, mapStateToProps } from './connect'
import Rate from '../rate'
import Swipper from './swipper'

import './index.scss'

export interface IProps {
  list: API_USER.IMovieListData[]
  handleClick: (...args: any) => any
  getUserInfo: TGetUserInfo
  reload: (...args: any[]) => Promise<any>
}
class IconList extends Component<IProps>{

  public static defaultProps: IProps = {
    list: [],
    handleClick: noop,
    getUserInfo: () => Promise.resolve(),
    reload: () => Promise.resolve()
  }

  public handleClick = (id: string) => this.props.handleClick(id)

  //路由跳转
  public goTo = (_, id, __) => router.push(routeAlias.detail, { id })

  //收藏
  public handleStore = async (id: string, isStore?: boolean) => {
    let method
    if (typeof isStore === 'undefined' || isStore) {
      method = putStore
    } else {
      method = cancelStore
    }
    const action = async (res) => {
      if (res) return
      const [err] = await withTry(method)(id)
      let toastConfig: Taro.showToast.Option = {
        icon: 'none',
        duration: 1000,
        title: ''
      }
      if (err) {
        toastConfig = {
          ...toastConfig,
          title: '网络错误，请重试'
        }
      } else {
        toastConfig = {
          ...toastConfig,
          title: '操作成功~'
        }
      }
      Taro.showToast(toastConfig)
    }
    await this.props.getUserInfo({ action })
      .catch(_ => {
        Taro.showToast({
          title: '未登录无法操作',
          icon: 'none',
          duration: 1000
        })
      })
    return this.props.reload()
  }

  private getUserInfo = (e, id: string) => {
    e.stopPropagation()
    router.push(routeAlias.user, { id })
  }

  public render() {

    const { list } = this.props
    const listLen = list.length
    const realList = listLen % 2 == 0 ? list : [...list, null]

    return (
      <View className='component-icon-list at-row at-row--wrap at-row__justify--around'>
        {
          realList.map((value: API_USER.IMovieListData) => {
            if (!value) return (
              <View
                className='at-col at-col-5'
              ></View>
            )
            const { _id, name, images, hot, rate, store, author } = value
            const imageList = Array.isArray(images) ? images : [images]
            return (
              <View
                className='component-icon-list-content at-col at-col-5'
                style={{ ...style.backgroundColor('disabled') }}
                key={_id}
              >
                <View
                  className='component-icon-list-content-poster'
                  onClick={(event) => { this.goTo.call(this, name, _id, event) }}
                >
                  {/* <ImageLoading src={image} mode={'scaleToFill'} /> */}
                  <Swipper style={{ height: '100%' }} list={imageList} />
                  <View
                    onClick={this.handleStore.bind(this, _id, store)}
                    className='at-icon at-icon-heart component-icon-list-content-poster-store'
                  ></View>
                </View>
                <View className='component-icon-list-content-main'>
                  <View
                    className='component-icon-list-content-main-name title-font-size-class'
                    style={{ ...style.color('primary') }}
                    onClick={this.handleClick.bind(this, _id)}
                  >{name}</View>
                  <View className='component-icon-list-content-main-rate'>
                    <Rate
                      value={rate}
                      readonly
                      rate={noop}
                      size={8}
                    ></Rate>
                  </View>
                  <View className='component-icon-list-content-main-extra sub-title-font-size-class'
                    style={{ ...style.color('secondary') }}
                  >
                    <View className='component-icon-list-content-main-extra-count'>
                      {formatNumber(hot)}
                      <Text style={{ fontSize: '70%' }}>人看</Text>
                    </View>
                    <View onClick={(e) => this.getUserInfo.call(this, e, author._id)}>
                      <AtAvatar size='small' circle image={author.avatar} text={author.username}></AtAvatar>
                    </View>
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconList)

