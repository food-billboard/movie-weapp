import React, { Component, useMemo } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Day from 'dayjs'
import GRate from '~components/rate'
import ImageLoading from '~components/imageLoading'
import style from '~theme/style'

import GStore from '../store'

import './index.scss'

const Header = (props: {
  info: {
    poster: string
    name: string
    rate: number
    author_rate: number
    store: boolean
    createdAt: string 
    screen_time: string 
  }
  rate: (value: number) => any
  store: (store: boolean) => any
}) => {

  const {
    info: {
      name,
      store,
      rate,
      author_rate,
      screen_time,
      poster='',
    }={},
    store: storeMethod,
    rate: rateMethod
  } = props

  const createYear = useMemo(() => {
    return Day(screen_time).format("YYYY")
  }, [screen_time])

  return (
    <View className='page-detail-header'>
      <View
        className='data-detail-content-title at-row'
        style={{ ...style.color('primary') }}
      >
        <View 
          className='at-col at-col-3 filter-background-parent flex-dom-center padding-8'
        >
          <View 
            className='filter-background'
            style={{
              background: `url(${poster})`
            }}
          >
          </View>
          <Image
            src={poster}
            mode='widthFix'
            style={{ 
              width: '100%', 
              height: '100%',
              display: 'flex',
              alignItems: 'center' 
            }}
            webp
            // lazyLoad
          />
        </View>
        <View className='at-col at-col-8 at-col__offset-1 page-detail-header-main'>
          <View className='data-detail-content-title-name title-font-size-class'>
            {name}（{createYear}）
          </View>
          <View 
            className='data-detail-content-title-store title-font-size-class'
          >
            <GStore
              movie={name}
              value={store}
              store={storeMethod}
            />
          </View>
        </View>
      </View>
      <View className='data-detail-content-main-rate'>
        <GRate
          value={rate}
          rate={rateMethod}
        />
      </View>
      <View className='data-detail-content-main-rate'>
        <View className='data-detail-content-main-rate-up'>
          <View className='data-detail-content-main-rate-title sub-title-font-size-class'>楼主评分:</View>
        </View>
        <View className='at-row at-row__align--center'>
          <View className='at-col at-col-9'>
            <GRate
              value={author_rate}
              rate={() => { }}
              readonly
            />
          </View>
        </View>
      </View>
    </View>
  )

}

export default Header