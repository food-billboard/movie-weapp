import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Rate from '../rate'
import ImageLoading from '../imageLoading'
import Swipper from './swipper'
import style from '~theme/style'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from './connect'
import { router, formatNumber, routeAlias, ItypeList, withTry } from '~utils'
import { putStore, cancelStore } from '~services'
import noop from 'lodash/noop'

import './index.scss'

export interface IList {
  image: string
  name: string
  type?: Array<ItypeList>
  time: string | number
  hot: number
  id: string
  rate: number
  description: string
  store?: boolean
}

export interface IProps {
  list: Array<IList>
  handleClick: (...args: any) => any
  getUserInfo: () => Promise<any>
}

@connect(mapStateToProps, mapDispatchToProps)
export default class IconList extends Component<IProps>{
  
  public static defaultProps: IProps = {
    list: [],
    handleClick: noop,
    getUserInfo: () => Promise.resolve()
  }

  public handleClick = (id: string) => this.props.handleClick(id)

  //路由跳转
  public goTo = (_, id, __) => router.push(routeAlias.detail, { id })

  //收藏
  public handleStore = async (id: string, isStore?: boolean) => {
    let method
    if(typeof isStore === 'undefined' || isStore) {
      method = putStore
    }else {
      method = cancelStore
    }
    await this.props.getUserInfo()
    .then(_ => {
      return withTry(method)(id)
    })
    .then(([err, ]) => {
      let toastConfig:Taro.showToast.Option = {
        icon: 'none',
        duration: 1000,
        title: ''
      }
      if(err) {
        toastConfig = {
          ...toastConfig,
          title: '网络错误，请重试'
        }
      }else {
        toastConfig = {
          ...toastConfig,
          title: '操作成功~'
        }
      }
    })
    .catch(_ => {
      Taro.showToast({
        title: '未登录无法操作',
        icon: 'none',
        duration: 1000
      })
    })
    
  }

  public render() {

    const { list } = this.props

    return (
      <View className='icon-list at-row at-row--wrap at-row__justify--around'>
        {
          list.map((value: IList) => {
            const { id, name, image, hot, rate, store } = value
            const imageList = Array.isArray(image) ? image : [image]
            return (
              <View
                className='icon-list-content at-col at-col-5'
                style={{ ...style.backgroundColor('disabled') }}
                key={id}
              >
                <View
                  className='icon-list-content-poster'
                  onClick={(event) => { this.goTo.call(this, name, id, event) }}
                >
                  {/* <ImageLoading src={image} mode={'scaleToFill'} /> */}
                  <Swipper style={{height: '100%'}} list={imageList} />
                  <View 
                    onClick={this.handleStore.bind(this, id, store)}
                    className="at-icon at-icon-heart icon-list-content-poster-store"
                  ></View>
                </View>
                <View className="icon-list-content-main">
                  <View
                    className='icon-list-content-main-name'
                    style={{ ...style.color('primary') }}
                    onClick={this.handleClick.bind(this, id)}
                  >{name}</View>
                  <View className="rate">
                    <Rate
                      value={rate}
                      readonly={true}
                      rate={noop}
                      size={10}
                    ></Rate>
                  </View>
                  <View className='count'
                    style={{ ...style.color('secondary') }}
                  >
                    {formatNumber(hot)}
                    <Text className='text'>人看</Text>
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