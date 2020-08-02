import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtGrid } from "taro-ui"
import { router, routeAlias } from '~utils'
import { TypeColor } from '~theme/color'
import style from '~theme/style'
import { SYSTEM_PAGE_SIZE } from '~config'
import { AtIconBaseProps } from 'taro-ui/types/base'

import './index.scss'

interface IIconInfo extends AtIconBaseProps {
  size?: string | number
}

export interface List {
  image?: string
  value: string
  iconInfo?: any | IIconInfo
}

export interface IProps {}

const ICON_INFO = {
  size: SYSTEM_PAGE_SIZE(28),
  color: TypeColor['thirdly']
}

export default class IconList extends Component<IProps>{

  public state: any = {
    typeColor: TypeColor
  }

  public componentDidShow = () => {
    const { typeColor } = this.state
    if (typeColor == TypeColor) return
    this.setState({ typeColor: TypeColor })
  }

  //标题配置
  readonly titleConfig = {
    attention: '关注',
    comment: 'Wo的评论',
    record: '浏览记录',
    fans: '粉丝'
  }

  readonly list: Array<List> = [
    {
      value: this.titleConfig.attention,
      iconInfo: {
        value: 'heart-2',
        ...ICON_INFO
      }
    },
    {
      value: this.titleConfig.comment,
      iconInfo: {
        value: 'bookmark',
        ...ICON_INFO
      }
    },
    {
      value: this.titleConfig.record,
      iconInfo: {
        value: 'filter',
        ...ICON_INFO
      }
    },
    {
      value: this.titleConfig.fans,
      iconInfo: {
        value: 'user',
        ...ICON_INFO
      }
    }
  ]

  //处理点击
  public handleClick = (item: any, _: number) => {
    const { value } = item
    const { titleConfig } = this
    switch (value) {
      case titleConfig.attention:
        router.push(routeAlias.attention)
        break;
      case titleConfig.comment:
        router.push(routeAlias.mycomment)
        break
      case titleConfig.record:
        router.push(routeAlias.record)
        break
      case titleConfig.fans:
        router.push(routeAlias.fans)
        break
    }
  }

  public render() {
    return (
      <View className='icon'
        style={{ ...style.border(1, 'thirdly', 'solid', 'bottom') }}
      >
        <AtGrid
          data={this.list.map((val: List) => {
            const { iconInfo } = val
            return {
              ...val,
              iconInfo: { ...iconInfo, color: TypeColor['thirdly'] }
            }
          })}
          mode={'square'}
          hasBorder={false}
          columnNum={4}
          onClick={this.handleClick}
        />
      </View>
    )
  }
}