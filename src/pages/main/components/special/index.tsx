import Taro from '@tarojs/taro'
import React, { useCallback, useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { getSpecialWrapperList, getSpecial } from '~services'
import style from '~theme/style'
import { router, routeAlias, withTry, pMap } from '~utils'
import ImageLoading from '~components/imageLoading'

import './index.scss'

const SpecialList = () => {

  const [currPage] = useState<number>(0)
  const [value, setValue] = useState<(API_USER.IGetMovieSpecialListData & {
    movie: API_COMMON.ICommonMovieData[]
  })[]>([])

  const handleToDetail = useCallback((value: API_USER.IGetMovieSpecialListData) => {
    router.push(routeAlias.special, { id: value._id })
  }, [])

  const fetchData = async (params: API_COMMON.ICommonParams) => {
    const result = await getSpecialWrapperList({ pageSize: 10, ...params })
    const realResult = await pMap(result, async (item) => {
      const { _id } = item
      const [, value] = await withTry(getSpecial)({ currPage: 0, pageSize: 3, id: _id })
      return {
        ...item,
        movie: value?.movie || []
      }
    })
    setValue(realResult)
  }

  useEffect(() => {
    fetchData({ currPage })
  }, [currPage])

  return (
    <View className='page-home-special'>
      {
        value.map(item => {
          const { _id, poster, name, movie_count, movie } = item
          return (
            <View
              className='page-home-special-item filter-background-parent padding-16 box-sizing-border border-radius-12'
              onClick={handleToDetail.bind(null, item)}
              key={_id}
            >
              <View
                className='filter-background'
                style={{
                  backgroundImage: `url(${poster})`,
                  filter:'blur(5px)',
                  backgroundSize: '100% 100%'
                }}
              >
              </View>
              <Text 
                className='page-home-special-item-title title-font-size-class'
                style={style.color('primary')}
              >
                {name}
              </Text>
              <View className='at-row page-home-special-item-main'>
                <View className='page-home-special-item-movie at-col at-col-6'>
                  {
                    movie.map((item, index) => {
                      const { _id, poster } = item 
                      return (
                        <View
                          key={_id}
                          style={{
                            zIndex: movie.length - index,
                            left: index * 28 + "%",
                            top: index * 2 + "%"
                          }}
                          className='page-home-special-item-movie-item border-radius-16'
                        >
                          <ImageLoading
                            src={poster}
                          />
                        </View>
                      )
                    })
                  }
                </View>
                <View className='at-col at-col-6 page-home-special-item-movie-count sub-title-font-size-class padding-32' style={style.color('secondary')}>
                  +{movie_count || 0}
                </View>
              </View>
            </View>
          )
        })
      }
    </View>
  )

}

export default SpecialList