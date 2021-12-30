import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import { connect } from 'react-redux'
import noop from 'lodash/noop'
import merge from 'lodash/merge'
import style from '~theme/style'
import { putStore, cancelStore } from '~services'
import { router, routeAlias, withTry } from '~utils'
import Picker from './components/Picker'
import Swipper from '../iconlist/swipper'
import Ellipsis from '../ellipsis'
import Item from './item'
import Rate from '../rate'
import { mapDispatchToProps, mapStateToProps } from './connect'

import './index.scss'

export interface IProps {
  list: API_USER.IMovieListData[]
  style?: React.CSSProperties
  getUserInfo: TGetUserInfo
  reload: (...args: any[]) => Promise<any>
}

class List extends Component<IProps>{
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
    if (isStore) {
      method = putStore
    } else {
      method = cancelStore
    }

    const action = async (res) => {
      if (!res) return
      const [err,] = await withTry(method)(id)
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
          list.map((value: API_USER.IMovieListData) => {
            const { images, name, type, hot, _id, rate, description, store } = value
            const imageList = Array.isArray(images) ? images : [images]
            return (
              <View className='list-content'
                style={merge(propsStyle || {}, style.backgroundColor('disabled'))}
                key={_id}
              >
                <View
                  className='list-content-main at-row'
                >
                  <View className='list-content-main-poster at-col at-col-4'>
                    <Swipper
                      style={{ height: '100px' }}
                      list={imageList}
                    />
                    <View
                      className={classnames('at-icon', 'list-content-icon', 'big-icon-font-size-class', {
                        'at-icon-heart': !store,
                        'at-icon-heart-2': store
                      })}
                      style={style.color("primary")}
                      onClick={this.handleStore.bind(this, _id, !store)}
                    ></View>
                  </View>
                  <View className='list-content-main-detail at-col at-col-7'
                    style={merge(style.backgroundColor('disabled'), style.color('secondary'))}
                    onClick={this.goTo.bind(this, _id)}
                  >
                    <View className='list-content-main-detail-name title-font-size-class'
                      style={style.color('primary')}
                    >
                      {name}
                    </View>
                    <View className='list-content-main-detail-rate'>
                      <Rate
                        value={rate}
                        readonly
                        rate={noop}
                        size={10}
                      ></Rate>
                    </View>
                    <Item
                      type='类型: '
                      value={type}
                    />
                    <Item
                      type='人气: '
                      value={hot}
                    />
                  </View>
                  <View className='list-content-main-slot at-col at-col-2'>
                    {/** TODO */}
                    <Picker
                      selector={this.OP_SELECTOR_MAP}
                    >
                      <View className='at-icon at-icon-bullet-list'></View>
                    </Picker>
                  </View>
                </View>
                <View className='list-content-description'>
                  <Ellipsis
                    text={description || '这位作者什么也没有留下...'}
                    needPoint={false}
                    style={{ borderRadius: '30px' }}
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

export default connect(mapStateToProps, mapDispatchToProps)(List)