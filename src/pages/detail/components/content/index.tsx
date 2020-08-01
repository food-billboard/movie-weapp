import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtRate } from 'taro-ui'
import GRate from '../rate'
import GStore from '../store'
import Ellipsis from '~components/ellipsis'
import { formatTime, formatNumber, ItypeList } from '~utils'
import { IProps, IState } from './index.d'
import style from '~theme/style'
import { SYSTEM_PAGE_SIZE } from '~config'
import { noop } from 'lodash'

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
  language: string
  description: string
  hot: number
  rate: number
  author_rate: number
  store: boolean
  author_description: string
  author: string
}

export interface IState { }

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
      language: '',
      description: '',
      hot: 0,
      rate: 0,
      author_rate: 0,
      store: false,
      author_description: '',
      author: ''
    },
    store: noop,
    rate: noop,
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
      language = '',
      description = '',
      hot = 0,
      rate,
      author_rate,
      store,
      author_description,
      author
    } = info

    return (
      <View className='content'>
        <View
          className={'title at-row'}
          style={{ ...style.color('primary') }}
        >
          <View className='title-name at-col at-col-10'>
            {name}
          </View>
          <View className='title-store at-col at-col-2'>
            <GStore
              movie={name}
              value={store}
              store={this.props.store}
            />
          </View>
        </View>
        <View className='main'>
          <View className='main-rate'>
            <GRate
              movie={name}
              value={rate}
              rate={this.props.rate}
            />
          </View>
          <View className='main-rate'>
            <View className='up-rate'>
              <View className='at-icon icon at-icon-tag'></View>
                            楼主评分:
                        </View>
            <View className='at-row at-row__align--center'>
              <View className='at-col at-col-9'>
                <AtRate
                  value={author_rate}
                  max={10}
                  size={SYSTEM_PAGE_SIZE(20)}
                ></AtRate>
              </View>
              <View className='at-col at-col-1 main-rate-number'>
                {author_rate}
              </View>
            </View>
          </View>
          <View className='main-info'>
            <View className='actor'>
              <View className='at-icon icon at-icon-tag'></View>
                            主演: <Text className='text'
                style={{ ...style.color('primary') }}
              >{actor.map((val: ItypeList) => {
                const { value } = val
                return value
              }).join(' ')}</Text>
            </View>
            <View className='director'>
              <View className='at-col director-content'>
                <View className='at-icon icon at-icon-tag'></View>
                                导演: <Text className={'text'}
                  style={{ ...style.color('primary') }}
                >{director.map((val: ItypeList) => {
                  const { value } = val
                  return value
                }).join(' ')}</Text>
              </View>
            </View>
            <View className='type'>
              <View className='at-icon icon at-icon-tag'></View>
                            分类: <Text className={'text'}
                style={{ ...style.color('primary') }}
              >{classify.map((val: ItypeList) => {
                const { value } = val
                return value
              }).join(' ')}</Text>
            </View>
            <View className='at-row at-row__justify--between time-publish'>
              <View className='at-col at-col-5 publish'>
                <View className='at-icon icon at-icon-tag'></View>
                                时间: <Text className={'text'}
                  style={{ ...style.color('primary') }}
                >{formatTime(createdAt)}</Text>
              </View>
              <View className='at-col at-col-5 time'>
                <View className='at-icon icon at-icon-tag'></View>
                                上映: <Text className={'text'}
                  style={{ ...style.color('primary') }}
                >{formatTime(screen_time)}</Text>
              </View>
            </View>
            <View className='at-row at-row__justify--between area-lang'>
              <View className='at-col at-col-5 lang'>
                <View className='at-icon icon at-icon-tag'></View>
                                语言: <Text className={'text'}
                  style={{ ...style.color('primary') }}
                >{language}</Text>
              </View>
              <View className='at-col at-col-5 area'>
                <View className='at-icon icon at-icon-tag'></View>
                                地区: <Text className={'text'}
                  style={{ ...style.color('primary') }}
                >{district.map((val: ItypeList) => {
                  const { value } = val
                  return value
                }).join(' ')}</Text>
              </View>
            </View>
            <View className='hot'>
              <View className='at-icon icon at-icon-tag'></View>
                            人气:
                            <Text className={'text'}
                style={{ ...style.color('primary') }}
              >{formatNumber(hot)}</Text>
              <Text className='hot-text' style={{ ...style.color('thirdly') }}> 人收藏</Text>
            </View>
            <View className='look'>
              <View className='at-icon icon at-icon-tag'></View>
                            浏览:
                            <Text className={'text'}
                style={{ ...style.color('primary') }}
              >{formatNumber(glance)}</Text>
              <Text className='look-text' style={{ ...style.color('thirdly') }}> 人看过</Text>
            </View>
            <View className='author'>
              <View className='at-icon icon at-icon-tag'></View>
                            作者:
                            <Text className={'text'}
                style={{ ...style.color('primary') }}
              >{author}</Text>
              <Text className='hot-text' style={{ ...style.color('thirdly') }}></Text>
            </View>
            <View className='description'
              style={{ ...style.border(1, 'disabled', 'dashed', 'left_right'), marginBottom: '10px' }}
            >
              <View className='at-icon icon at-icon-tag'></View>
                            简介:
                            <Ellipsis
                text={description}
                style={{ lineHeight: SYSTEM_PAGE_SIZE(25) + 'px', ...style.color('primary') }}
                needPoint={true}
              ></Ellipsis>
            </View>
            <View
              className='mine description'
              style={{ ...style.border(1, 'disabled', 'dashed', 'left_right') }}
            >
              <View className='at-icon icon at-icon-tag'></View>
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