import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import Picker from './components/Picker'
import Swipper from '../iconlist/swipper'
import Ellipsis from '../ellipsis'
import Item from './item'
import Rate from '../rate'
import style from '~theme/style'
import { IList } from '../iconlist'
import { mapDispatchToProps, mapStateToProps } from './connect'
import { router, isObject, routeAlias, withTry } from '~utils'
import noop from 'lodash/noop'
import { putStore, cancelStore } from '~services'

import './index.scss'

export interface IProps {
  list: Array<IList>
  style?: React.CSSProperties
  getUserInfo: TGetUserInfo
  reload: (...args: any[]) => Promise<any>
}

@connect(mapStateToProps, mapDispatchToProps)
export default class List extends Component<IProps>{
  public static defaultProps: IProps = {
    list: [],
    getUserInfo: () => Promise.resolve(),
    reload: () => Promise.resolve()
  }

  public goTo = (id: string) => {
    router.push(routeAlias.detail, { id })
  }

  //收藏
  handleStore = async (id: string, isStore: boolean, e: any) => {
    e.stopPropagation()
    let method
    if(isStore) {
      method = putStore
    }else {
      method = cancelStore
    }

    const action = async (res) => {
      if(!res) return 
      const [ err,  ] = await withTry(method)(id)
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
      Taro.showToast(toastConfig)
      return this.props.reload()
    }

    return this.props.getUserInfo({ action })
    .catch(_ => {
      Taro.showToast({
        title: '操作失败',
        icon: 'none',
        duration: 1000
      })
    })
    
  }

  readonly OP_SELECTOR_MAP = {

  }

  public render() {
    const { list, style: propsStyle = {} } = this.props
    return (
      <View className='list-component'>
        {
          list.map((value:IList) => {
            const { image, name, type, time, hot, _id, rate, description, store } = value
            const imageList = Array.isArray(image) ? image : [image]
            return (
              <View className='list-content'
                style={{ ...(isObject(propsStyle) ? propsStyle : {}), ...style.backgroundColor('disabled') }}
                key={_id}
              >
                <View 
                  className="list-content-main"
                >
                  <View className='list-content-main-poster'>
                    <Swipper
                      style={{height: '100px'}}
                      list={imageList}
                    />
                    <View className="at-icon at-icon-heart list-content-icon" onClick={this.handleStore.bind(this, _id, !store)}></View>
                  </View>
                  <View className='list-content-main-detail'
                    style={{ ...style.backgroundColor('disabled'), ...style.color('secondary') }}
                    onClick={this.goTo.bind(this, _id)}
                  >
                    <View className="list-content-main-detail-name"
                      style={{ ...style.color('primary') }}
                    >
                      {name}
                    </View>
                    <View className="list-content-main-detail-rate">
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
                    <Picker
                      selector={this.OP_SELECTOR_MAP}
                    >
                      <View className='at-icon at-icon-bullet-list'></View>
                    </Picker>
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