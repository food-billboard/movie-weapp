import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtBadge } from 'taro-ui'
import { router, routeAlias } from '~utils'
import { TypeColor } from '~theme/color'
import style from '~theme/style'
import './index.scss'

export interface IProps {}

export default class Title extends Component<IProps>{

  //标题
  readonly titleConfig = {
    store: '收藏',
    issue: '发布'
  }

  public componentDidShow = () => {
    this.forceUpdate()
  }

  public handleClick = (value) => {
    const { titleConfig } = this
    switch (value) {
      case titleConfig.store:
        router.push(routeAlias.store)
        break;
      case titleConfig.issue:
        // Taro.hideTabBarRedDot({
        //     index:2
        // })

        //TODO
        Taro.showToast({
          title: '功能完善中...',
          icon: 'none',
          duration: 1000
        })
        //
        router.push(routeAlias.issue)
        break;
    }
  }

  public render() {
    const { titleConfig: config } = this

    return (
      <View className='title at-row at-row__justify--around'
        style={{ ...style.border(1, 'thirdly', 'solid', 'bottom') }}
      >
        <View className='message at-col at-col-5'
          onClick={() => { this.handleClick.call(this, config.store) }}
        >
          <AtIcon value='message' size='30' color={TypeColor['secondary']}></AtIcon>
          <Text className='text'>{this.titleConfig.store}</Text>
        </View>
        <View className='separate'
          style={{ ...style.backgroundColor('thirdly') }}
        ></View>
        <View className='folder at-col at-col-5'
          onClick={() => { this.handleClick.call(this, config.issue) }}
        >
          {/* <AtBadge dot={hasNews}> */}
          <AtIcon value='folder' size='30' color={TypeColor['secondary']}></AtIcon>
          {/* </AtBadge> */}
          <Text className='text'>{this.titleConfig.issue}</Text>
        </View>
      </View>
    )
  }
}