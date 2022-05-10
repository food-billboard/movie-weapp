import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import { merge } from 'lodash'
import style from '~theme/style'
import ImageLoading from '~components/imageLoading'
import { router, routeAlias } from '~utils'

import './index.scss'

export interface List {
  _id: string,
  poster: string,
  name: string
}

export interface IProps {
  count: number
  type: string
  list: Array<List>
  id: string
  style?: React.CSSProperties
}

export interface IIconProps {
  rank: number
}

export interface IState {
}

export default class Rank extends Component<IProps, IState>{
  public static defaultProps = {
    count: 3,
    type: '综合排行榜',
    list: [],
    id: 0
  }

  //获取详细信息
  public getDetail = (id: string) => router.push(routeAlias.detail, { id })

  public render() {
    const { type, id, style: propsStyle = {}, list } = this.props

    return (
      <View className='rank-main-wrapper' style={propsStyle}>
        <View className='rank-main filter-background-parent'>
          {
            !!list[0]?.poster && (
              <View
                className='filter-background'
                style={{
                  backgroundImage: `url(${list[0].poster})`,
                  filter:'blur(5px)',
                  backgroundSize: '100% 100%'
                }}
              >
              </View>
            )
          }
          <View
            className='rank-title sub-title-font-size-class pos-re'
            onClick={() => { router.push(routeAlias.rank, { id, type }) }}
          >
            {type}
          </View>
          <View
            className='rank-content pos-re normal-font-size-class'
          >
            {
              list.slice(0, 3).map((item, index) => {
                const { name, _id } = item 
                return (
                  <View
                    className='rank-content-item'
                    key={item._id}
                    onClick={this.getDetail.bind(this, _id)}
                  >
                    <Text
                      className='rank-content-item-index'
                    >
                      {index + 1}.
                    </Text>
                    <Text
                      className='rank-content-item-content'
                    >
                      {name}
                    </Text>
                  </View>
                )
              })
            }
          </View>
        </View>
      </View>
    )
  }
}



