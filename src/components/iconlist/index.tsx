import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import ImageLoading from '../imageLoading'
import style from '~theme/style'
import { router, formatNumber, routeAlias } from '~utils'

import './index.scss'

export interface IList {
  id: string,
  name: string,
  image: string,
  hot: number
}

export interface IProps {
  list: Array<IList>
  handleClick: (...args: any) => any
}

export default class IconList extends Component<IProps>{
  
  public static defaultProps: IProps = {
    list: [],
    handleClick: () => { }
  }

  public handleClick = (id: string) => this.props.handleClick(id)

  /**
   * 路由跳转
   */
  public goTo = (_, id, __) => {
    router.push(routeAlias.detail, { id })
  }

  public render() {

    const { list } = this.props

    return (
      <View className='icon at-row at-row--wrap at-row__justify--around'>
        {
          list.map((value) => {
            const { id, name, image, hot } = value
            return (
              <View
                className='icon-content at-col at-col-5'
                style={{ ...style.backgroundColor('disabled') }}
                key={id}
              >
                <View
                  className='img'
                  onClick={(event) => { this.goTo.call(this, name, id, event) }}
                >
                  <ImageLoading src={image} />
                </View>
                <View>
                  <View
                    className='name'
                    style={{ ...style.color('primary') }}
                    onClick={this.handleClick.bind(this, id)}
                  >{name}</View>
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