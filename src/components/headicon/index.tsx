import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import style from '~theme/style'
import { formatNumber } from '~utils'

import './index.scss'

interface List {
  username: string,
  avatar: string,
  hot: number
  fans: number
  attentions: number
}

export interface IProps {
  list: List
}

export default class IconHead extends Component<IProps>{
  public static defaultProps: IProps = {
    list: {
      username: '用户名',
      avatar: '头像',
      hot: 0,
      fans: 0,
      attentions: 0
    }
  }

  //查看图片
  public previewImage = (image: string) => {
    if (image && image.length) {
      Taro.previewImage({
        current: image,
        urls: [image]
      })
    }
  }

  public render() {
    const { list } = this.props
    const { username = '', avatar = '', hot = 0, fans, attentions = 0 } = list
    return (
      <View id='component-user-head'
        style={{ ...style.backgroundColor('thirdly') }}
      >
        <View className='component-user-head-icon'>
          <View className='component-user-head-icon-content'
            onClick={this.previewImage.bind(this, avatar)}
          >
            <AtAvatar
              image={avatar}
              text={username}
              circle
              size='large'
              customStyle={{ width: '100%', height: '100%' }}
            />
          </View>
          <View className='component-user-head-icon-username title-font-size-class' style={{ ...style.color('disabled') }}>
            {username}
          </View>
        </View>
        <View className='component-user-head-info sub-title-font-size-class at-row'
          style={{ ...style.color('primary') }}
        >
          <View className='at-col component-user-head-info-data'>
            <Text className='component-user-head-info-data-count'
              style={{ ...style.color('disabled') }}
            >{formatNumber(fans)}</Text> 粉丝
          </View>
          <View className='at-col component-user-head-info-data'>
            <Text className='component-user-head-info-data-count'
              style={{ ...style.color('disabled') }}
            >{formatNumber(attentions)}</Text> 人关注
          </View>
          <View className='at-col component-user-head-info-data'>
            <Text className='component-user-head-info-data-count'
              style={{ ...style.color('disabled') }}
            >{formatNumber(hot)}</Text> 人觉得很赞
          </View>
        </View>
      </View>
    )
  }
}