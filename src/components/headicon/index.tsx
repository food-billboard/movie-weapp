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
      <View id='user-head'
        style={{ ...style.backgroundColor('thirdly') }}
      >
        <View className='user-head-icon'>
          <View className='user-head-icon-content'
            onClick={this.previewImage.bind(this, avatar)}
          >
            <AtAvatar
              image={avatar}
              text={username}
              circle
              size={'large'}
              customStyle={{ width: '100%', height: '100%' }}
            />
          </View>
          <View className='user-head-icon-username' style={{ ...style.color('primary') }}>
            {username}
          </View>
        </View>
        <View className='user-head-info at-row'
          style={{ ...style.color('disabled') }}
        >
          <View className='at-col user-head-info-data'>
            <Text className='user-head-info-data-count'
              style={{ ...style.color('primary') }}
            >{formatNumber(fans)}</Text> 粉丝
                    </View>
          <View className='at-col user-head-info-data'>
            <Text className='user-head-info-data-count'
              style={{ ...style.color('primary') }}
            >{formatNumber(attentions)}</Text> 人关注
                    </View>
          <View className='at-col user-head-info-data'>
            <Text className='user-head-info-data-count'
              style={{ ...style.color('primary') }}
            >{formatNumber(hot)}</Text> 人觉得很赞
                    </View>
        </View>
      </View>
    )
  }
}