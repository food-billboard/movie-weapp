import Taro from '@tarojs/taro'
import React, { useCallback, useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { getSpecialWrapperList } from '~services'
import style from '~theme/style'
import { router, routeAlias } from '~utils'
import ImageLoading from '~components/imageLoading'

import './index.scss'

export interface IProps {
  
}

const SpecialList = (props: IProps) => {

  const [ currPage, setCurrPage ] = useState<number>(0)
  const [ value, setValue ] = useState<API_USER.IGetMovieSpecialListData[]>([])

  const handleToDetail = useCallback((value: API_USER.IGetMovieSpecialListData) => {
    router.push(routeAlias.special, { id: value._id })
  }, [])

  const fetchData = useCallback(async (params: API_COMMON.ICommonParams) => {
    const result = await getSpecialWrapperList({ pageSize: 10, ...params })
    setValue(result)
  }, [])

  useEffect(() => {
    fetchData({ currPage })
  }, [currPage])


  return (
    <View className='page-home-special'>
      {
        value.map(item => {
          const {  } = item 
          return (
            <View
              className='page-home-special-item'
              onClick={handleToDetail.bind(null, item)}
            >

            </View>
          )
        })
      }
    </View>
  )

}

export default SpecialList