import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import ImageLoading from '../imageLoading'
import Ellipsis from '../ellipsis'
import Item from './item'
import Rate from '../rate'
import style from '~theme/style'
import { IList } from '../iconlist'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from './connect'
import { router, formatTime, isObject, routeAlias, withTry } from '~utils'
import noop from 'lodash/noop'
import { putStore, cancelStore } from '~services'

import './index.scss'

export interface IProps {
  list: Array<IList>
  style?: React.CSSProperties
  getUserInfo: () => Promise<any>
}

@connect(mapStateToProps, mapDispatchToProps)
export default class List extends Component<IProps>{
  public static defaultProps: IProps = {
    list: [],
    getUserInfo: () => Promise.resolve()
  }

  public goTo = (id: string) => {
    router.push(routeAlias.detail, { id })
  }

  //收藏
  handleStore = async (id: string, isStore?: boolean) => {
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
    const { list, style: propsStyle = {} } = this.props
    return (
      <View className='list'>
        {
          list.map((value:IList) => {
            const { image, name, type, time, hot, id, rate, description, store } = value
            return (
              <View className='list-content'
                style={{ ...(isObject(propsStyle) ? propsStyle : {}), ...style.backgroundColor('disabled') }}
                key={id}
              >
                <View 
                  className="list-content-main"
                  onClick={this.goTo.bind(this, id)}
                >
                  <View className='list-content-main-poster'>
                    <ImageLoading
                      src={image}
                    />
                    <View className="at-icon at-icon-heart list-content-icon" onClick={this.handleStore.bind(this, id, store)}></View>
                  </View>
                  <View className='list-content-main-detail'
                    style={{ ...style.backgroundColor('disabled'), ...style.color('secondary') }}
                  >
                    <View className='name'
                      style={{ ...style.color('primary') }}
                    >
                      {name}
                    </View>
                    <View className="rate">
                      <Rate
                        value={rate}
                        readonly={true}
                        rate={noop}
                        size={10}
                      ></Rate>
                    </View>
                    <Item
                      type={'类型: '}
                      value={type}
                    />
                    {/* <Item
                      type={'更新: '}
                      value={formatTime(time)}
                    /> */}
                    <Item
                      type={'人气: '}
                      value={hot}
                    />
                  </View>
                  <View className="list-content-main-slot">
                    {/**TODO */}
                  </View>
                </View>
                <View className="list-content-description">
                  <Ellipsis
                    text={description}
                    needPoint={false}
                    style={{borderRadius: '30px'}}
                  ></Ellipsis>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }
}