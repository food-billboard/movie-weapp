import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import classnames from 'classnames'
import { connect } from 'react-redux'
import Day from 'dayjs'
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
  reload?: (...args: any[]) => Promise<any>
  actionDisabled?: boolean
}

class List extends Component<IProps>{
  public static defaultProps: IProps = {
    list: [],
    getUserInfo: () => Promise.resolve(),
    reload: () => Promise.resolve(),
    actionDisabled: false
  }

  public goTo = (id: string) => {
    router.push(routeAlias.detail, { id })
  }

  //收藏
  handleStore = async (id: string, isStore: boolean, e: any) => {
    e.stopPropagation()
    if (this.props.actionDisabled) return
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
            const { images, name, type, hot, _id, rate, description, store, time } = value
            const imageList = Array.isArray(images) ? images : [images]
            return (
              <View className='list-content'
                style={merge(propsStyle || {})}
                key={_id}
              >
                <View
                  className='list-content-main at-row'
                >
                  <View className='list-content-main-poster at-col at-col-3'>
                    <Swipper
                      style={{ height: '100px' }}
                      list={imageList}
                    />
                    <View
                      className={classnames('at-icon', 'list-content-icon', 'sub-icon-font-size-class', {
                        'at-icon-heart': !store,
                        'at-icon-heart-2': store
                      })}
                      style={style.color("primary")}
                      onClick={this.handleStore.bind(this, _id, !store)}
                    ></View>
                  </View>
                  <View className='list-content-main-detail at-col at-col-7'
                    style={merge(style.color('secondary'))}
                    onClick={this.goTo.bind(this, _id)}
                  >
                    <View className='list-content-main-detail-name normal-font-size-class'
                      style={style.color('primary')}
                    >
                      {name}
                      {
                        !!time && (
                          <Text
                            className='list-content-main-detail-name-sub'
                          >
                            （{Day(time).format('YYYY')}）
                          </Text>
                        )
                      }
                    </View>
                    <View className='list-content-main-detail-rate'>
                      <Rate
                        value={parseFloat((rate / 2).toFixed(1))}
                        readonly
                        rate={noop}
                        size={14}
                        max={5}
                        origin={rate}
                      ></Rate>
                    </View>
                    <Item
                      type='filter'
                      value={type}
                    />
                    <Item
                      type='eye'
                      value={hot}
                    />
                  </View>
                  <View className='list-content-main-slot at-col at-col-2'>
                    {/** TODO */}
                    <Picker
                      selector={this.OP_SELECTOR_MAP}
                    >
                      <View className='at-icon at-icon-bullet-list' style={style.color("primary")}></View>
                    </Picker>
                  </View>
                </View>
                <View className='at-row'>
                  <View
                    className='list-content-description at-col__offset-3'
                  >
                    <View
                      className='list-content-description-wrapper'
                    >
                      <Ellipsis
                        text={description || '这位作者什么也没有留下...'}
                        needPoint={false}
                        style={{ borderRadius: '30px', ...style.color('thirdly') }}
                        sizeClassName='small-font-size-class'
                      />
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

export default connect(mapStateToProps, mapDispatchToProps)(List)