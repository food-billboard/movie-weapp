import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import ImageLoading from '../imageLoading'
import Item from './item'
import style from '~theme/style'
import { router, formatTime, isObject, routeAlias, ItypeList } from '~utils'

import './index.scss'

interface IList {
  image: string,
  name: string,
  type?: Array<ItypeList>,
  time: string | number,
  hot: number,
  id: string
}

export interface IProps {
  list: Array<IList>
  style?: any
}

export default class List extends Component<IProps>{
  public static defaultProps: IProps = {
    list: []
  }

  public goTo = (id: string) => {
    router.push(routeAlias.detail, { id })
  }

  public render() {
    const { list, style: propsStyle = {} } = this.props
    return (
      <View className='list'>
        {
          list.map((value) => {
            const { image, name, type, time, hot, id } = value
            return (
              <View className='list-content'
                style={{ ...(isObject(propsStyle) ? propsStyle : {}), ...style.backgroundColor('disabled') }}
                key={id}
                onClick={this.goTo.bind(this, id)}
              >
                <View className='img'>
                  <ImageLoading
                    src={image}
                  />
                </View>
                <View className='detail'
                  style={{ ...style.backgroundColor('disabled'), ...style.color('secondary') }}
                >
                  <View className='name'
                    style={{ ...style.color('primary') }}
                  >
                    {name}
                  </View>
                  <Item
                    type={'类型: '}
                    value={type}
                  />
                  <Item
                    type={'更新: '}
                    value={formatTime(time)}
                  />
                  <Item
                    type={'人气: '}
                    value={hot}
                  />
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }
}