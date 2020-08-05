import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import ImageLoading from '../imageLoading'
import Ellipsis from '../ellipsis'
import Item from './item'
import Rate from '../rate'
import style from '~theme/style'
import { router, formatTime, isObject, routeAlias, ItypeList, withTry } from '~utils'
import noop from 'lodash/noop'
import { putStore, cancelStore } from '~services'

import './index.scss'

interface IList {
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
  style?: React.CSSProperties
}

export default class List extends Component<IProps>{
  public static defaultProps: IProps = {
    list: []
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
    const data = await withTry(method)(id)
    
  }

  public render() {
    const { list, style: propsStyle = {} } = this.props
    return (
      <View className='list'>
        {
          list.map((value) => {
            const { image, name, type, time, hot, id, rate, description, store } = value
            return (
              <View className='list-content'
                style={{ ...(isObject(propsStyle) ? propsStyle : {}), ...style.backgroundColor('disabled') }}
                key={id}
                onClick={this.goTo.bind(this, id)}
              >
                <View className="list-content-main">
                  <View className='img'>
                    <ImageLoading
                      src={image}
                    />
                    <View className="at-icon at-icon-heart list-content-icon" onClick={this.handleStore.bind(this, id, store)}></View>
                  </View>
                  <View className='detail'
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
                </View>
                <View className="list-content-description">
                  <Ellipsis
                    text={description}
                    needPoint={false}
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