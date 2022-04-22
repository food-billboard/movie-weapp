import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Ellipsis from '~components/ellipsis'
import { formatTime, formatNumber, router, routeAlias } from '~utils'
import style from '~theme/style'
import { SYSTEM_PAGE_SIZE } from '~config'

import './index.scss'

interface Info {
  district: API_USER.ItypeList[]
  glance: number
  director: API_USER.ItypeList[]
  actor: API_USER.ItypeList[]
  classify: API_USER.ItypeList[]
  screen_time: string
  createdAt: string
  language: API_USER.ItypeList[]
  description: string
  hot: number
  author_description: string
  author: {
    username: string 
    _id: string 
  }
}
export interface IProps {
  info: Info
}

export interface IState { }

export default class Content extends Component<IProps, IState>{

  public static defaultProps: IProps = {
    info: {
      district: [],
      glance: 0,
      director: [],
      actor: [],
      classify: [],
      screen_time: '',
      createdAt: '',
      language: [],
      description: '',
      hot: 0,
      author_description: '',
      author: {
        username: '',
        _id: ''
      }
    },
  }

  public getUserInfo = (_id: string) => {
    return router.push(routeAlias.user, { _id })
  }

  public render() {
    
    const { info } = this.props
    const {
      district = [],
      glance = 0,
      director = [],
      actor = [],
      classify = [],
      screen_time = 0,
      createdAt = 0,
      language = [],
      description = '',
      hot = 0,
      author_description,
      author
    } = info

    return (
      <View className='data-detail-content'>
        <View className='data-detail-content-main'>
          <View className='data-detail-content-main-info normal-font-size-class'>
            <View className='data-detail-content-main-info-actor'>
              主演: 
              <Text className='text'
                style={{ ...style.color('primary') }}
              >{actor.map((val: API_USER.ItypeList) => val.value).join(' ')}</Text>
            </View>
            <View className='data-detail-content-main-info-director'>
              <View className='at-col director-content'>
                导演: 
                <Text className='text'
                  style={{ ...style.color('primary') }}
                >{director.map((val: API_USER.ItypeList) => {
                  const { value } = val
                  return value
                }).join(' ')}</Text>
              </View>
            </View>
            <View className='data-detail-content-main-info-type'>
                分类: 
              <Text className='text'
                style={{ ...style.color('primary') }}
              >{classify.map((val: API_USER.ItypeList) => {
                const { value } = val
                return value
              }).join(' ')}</Text>
            </View>
            <View className='at-row at-row__justify--between data-detail-content-main-info-time-publish'>
              <View className='at-col at-col-6' style={{paddingRight: '1em'}}>
                时间: 
                <Text className='text'
                  style={{ ...style.color('primary') }}
                >{formatTime(createdAt)}</Text>
              </View>
              <View className='at-col at-col-6' style={{paddingRight: '1em'}}>
                上映: 
                <Text className='text'
                  style={{ ...style.color('primary') }}
                >{formatTime(screen_time)}</Text>
              </View>
            </View>
            <View className='at-row at-row__justify--between data-detail-content-main-info-area-lang'>
              <View className='at-col at-col-6 lang' style={{paddingRight: '1em'}}>
                语言: 
                <Text className='text'
                  style={{ ...style.color('primary') }}
                >{language.map((val: API_USER.ItypeList) => val.value).join(' ')}</Text>
              </View>
              <View className='at-col at-col-6 area' style={{paddingRight: '1em'}}>
                地区: 
                <Text className='text'
                  style={{ ...style.color('primary') }}
                >{district.map((val: API_USER.ItypeList) => val.value).join(' ')}</Text>
              </View>
            </View>
            <View className='data-detail-content-main-info-hot'>
              人气:
              <Text className='text'
                style={{ ...style.color('primary') }}
              >
                {formatNumber(hot)}
              </Text>
              <Text className='data-detail-content-main-info-hot-text' style={{ ...style.color('thirdly') }}> 人收藏</Text>
            </View>
            <View className='data-detail-content-main-info-look'>
              浏览:
              <Text className='text'
                style={{ ...style.color('primary') }}
              >{formatNumber(glance)}</Text>
              <Text className='data-detail-content-main-info-look-text' style={{ ...style.color('thirdly') }}> 人看过</Text>
            </View>
            <View className='data-detail-content-main-info-author'>
              作者:
              <Text 
                className='text'
                style={{ ...style.color('primary') }}
                onClick={this.getUserInfo.bind(this, author?._id)}
              >
                {author?.username}
              </Text>
              <Text className='data-detail-content-main-info-hot-text' style={{ ...style.color('thirdly') }}></Text>
            </View>
            <View className='data-detail-content-main-info-description'
              style={{ ...style.border(1, 'disabled', 'dashed', 'left_right'), marginBottom: '10px' }}
            >
              简介:
              <Ellipsis
                text={description}
                style={{ lineHeight: SYSTEM_PAGE_SIZE(25) + 'px', ...style.color('primary') }}
                needPoint
              ></Ellipsis>
            </View>
            <View
              className='mine data-detail-content-main-info-description'
              style={{ ...style.border(1, 'disabled', 'dashed', 'left_right') }}
            >
                楼主认为:
                <Ellipsis
                  text={author_description}
                  style={{ lineHeight: SYSTEM_PAGE_SIZE(25) + 'px', ...style.color('primary') }}
                  needPoint
                ></Ellipsis>
            </View>
          </View>
        </View>
      </View>
    )
  }
}