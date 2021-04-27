import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import classnames from 'classnames'
import { View, Text } from '@tarojs/components'
import GRate from '~components/rate'
import GStore from '../store'
import Ellipsis from '~components/ellipsis'
import { formatTime, formatNumber, ItypeList, router, routeAlias } from '~utils'
import style from '~theme/style'
import { SYSTEM_PAGE_SIZE } from '~config'
import noop from 'lodash/noop'

import './index.scss'

export interface IProps {
  info: Info
  rate: (value: number) => any
  store: (store: boolean) => any
}

interface Info {
  name: string
  district: Array<ItypeList>
  glance: number
  director: Array<ItypeList>
  actor: Array<ItypeList>
  classify: Array<ItypeList>
  screen_time: string
  createdAt: string
  language: Array<ItypeList>
  description: string
  hot: number
  rate: number
  author_rate: number
  store: boolean
  author_description: string
  author: {
    username: string 
    _id: string 
  }
}

export interface IState { }

const Tag = ({ className=[] }: { className?: string[] }) => <View className={classnames('at-icon', 'at-icon-tag', ...className)}></View>

export default class Content extends Component<IProps, IState>{

  public static defaultProps: IProps = {
    info: {
      name: '',
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
      rate: 0,
      author_rate: 0,
      store: false,
      author_description: '',
      author: {
        username: '',
        _id: ''
      }
    },
    store: noop,
    rate: noop,
  }

  public getUserInfo = (_id: string) => {
    return router.push(routeAlias.user, { _id })
  }

  public render() {
    
    const { info } = this.props
    const {
      name = '',
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
      rate,
      author_rate,
      store,
      author_description,
      author
    } = info

    return (
      <View className='data-detail-content'>
        <View
          className={'data-detail-content-title at-row'}
          style={{ ...style.color('primary') }}
        >
          <View className='data-detail-content-title-name at-col at-col-10'>
            {name}
          </View>
          <View className='data-detail-content-title-store at-col at-col-2'>
            <GStore
              movie={name}
              value={store}
              store={this.props.store}
            />
          </View>
        </View>
        <View className='data-detail-content-main'>
          <View className='data-detail-content-main-rate'>
            <GRate
              value={rate}
              rate={this.props.rate}
            />
          </View>
          <View className='data-detail-content-main-rate'>
            <View className='up-rate'>
              <Tag className={['up-rate-icon']} />
              <View className="up-rate-title">楼主评分:</View>
            </View>
            <View className='at-row at-row__align--center'>
              <View className='at-col at-col-9'>
                <GRate
                  value={author_rate}
                  rate={() => {}}
                  readonly={true}
                />
              </View>
            </View>
          </View>
          <View className='data-detail-content-main-info'>
            <View className='data-detail-content-main-info-actor'>
              <Tag className={['data-detail-content-icon']} />
              主演: 
              <Text className='text'
                style={{ ...style.color('primary') }}
              >{actor.map((val: ItypeList) => val.value).join(' ')}</Text>
            </View>
            <View className='data-detail-content-main-info-director'>
              <View className='at-col director-content'>
                <Tag className={['data-detail-content-icon']} />
                导演: 
                <Text className={'text'}
                  style={{ ...style.color('primary') }}
                >{director.map((val: ItypeList) => {
                  const { value } = val
                  return value
                }).join(' ')}</Text>
              </View>
            </View>
            <View className='data-detail-content-main-info-type'>
              <Tag className={['data-detail-content-icon']} />
                分类: 
              <Text className={'text'}
                style={{ ...style.color('primary') }}
              >{classify.map((val: ItypeList) => {
                const { value } = val
                return value
              }).join(' ')}</Text>
            </View>
            <View className='at-row at-row__justify--between data-detail-content-main-info-time-publish'>
              <View className='at-col at-col-6' style={{paddingRight: '1em'}}>
                <Tag className={['data-detail-content-icon']} />
                时间: 
                <Text className={'text'}
                  style={{ ...style.color('primary') }}
                >{formatTime(createdAt)}</Text>
              </View>
              <View className='at-col at-col-6' style={{paddingRight: '1em'}}>
                <Tag className={['data-detail-content-icon']} />
                上映: 
                <Text className={'text'}
                  style={{ ...style.color('primary') }}
                >{formatTime(screen_time)}</Text>
              </View>
            </View>
            <View className='at-row at-row__justify--between data-detail-content-main-info-area-lang'>
              <View className='at-col at-col-6 lang' style={{paddingRight: '1em'}}>
                <Tag className={['data-detail-content-icon']} />
                语言: 
                <Text className={'text'}
                  style={{ ...style.color('primary') }}
                >{language.map((val: ItypeList) => val.value).join(' ')}</Text>
              </View>
              <View className='at-col at-col-6 area' style={{paddingRight: '1em'}}>
                <Tag className={['data-detail-content-icon']} />
                地区: 
                <Text className={'text'}
                  style={{ ...style.color('primary') }}
                >{district.map((val: ItypeList) => val.value).join(' ')}</Text>
              </View>
            </View>
            <View className='data-detail-content-main-info-hot'>
              <Tag className={['data-detail-content-icon']} />
              人气:
              <Text className={'text'}
                style={{ ...style.color('primary') }}
              >
                {formatNumber(hot)}
              </Text>
              <Text className='data-detail-content-main-info-hot-text' style={{ ...style.color('thirdly') }}> 人收藏</Text>
            </View>
            <View className='look'>
              <Tag className={['data-detail-content-icon']} />
              浏览:
              <Text className={'text'}
                style={{ ...style.color('primary') }}
              >{formatNumber(glance)}</Text>
              <Text className='data-detail-content-main-info-look-text' style={{ ...style.color('thirdly') }}> 人看过</Text>
            </View>
            <View className='data-detail-content-main-info-author'>
              <Tag className={['data-detail-content-icon']} />
              作者:
              <Text 
                className={'text'}
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
              <Tag className={['data-detail-content-icon']} />
              简介:
              <Ellipsis
                text={description}
                style={{ lineHeight: SYSTEM_PAGE_SIZE(25) + 'px', ...style.color('primary') }}
                needPoint={true}
              ></Ellipsis>
            </View>
            <View
              className='mine data-detail-content-main-info-description'
              style={{ ...style.border(1, 'disabled', 'dashed', 'left_right') }}
            >
              <Tag className={['up-description-icon']} />
                楼主认为:
                <Ellipsis
                  text={author_description}
                  style={{ lineHeight: SYSTEM_PAGE_SIZE(25) + 'px', ...style.color('primary') }}
                  needPoint={true}
                ></Ellipsis>
            </View>
          </View>
        </View>
      </View>
    )
  }
}