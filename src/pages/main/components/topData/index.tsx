import Taro from '@tarojs/taro'
import { forwardRef, useState, useRef, useEffect, useImperativeHandle, useCallback } from 'react'
import { View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import List from '~components/list'
import style from '~theme/style'
import { getSearchDataList } from '~services'

import './index.scss'

export type TopDataRef = {
  loadData: () => Promise<any>
}

const TopData = forwardRef<TopDataRef, {

}>((props, ref) => {

  const [loading, setLoading] = useState<boolean>(false)
  const [currPage, setCurrPage] = useState<number>(0)
  const [dataSource, setDataSource] = useState<API_USER.IMovieListData[]>([])

  const isMovieEmpty = useRef<boolean>(false)

  const fetchData = useCallback(async () => {
    if (loading || isMovieEmpty.current) return
    setLoading(true)
    return getSearchDataList({
      currPage,
      pageSize: 10,
      sort: 'RATE=-1'
    })
      .then(data => {

        isMovieEmpty.current = !Array.isArray(data) || data.length < 10 

        const newData = [
          ...dataSource,
          ...(Array.isArray(data) ? data : [])
        ]
        setDataSource(newData)

        setCurrPage(prev => prev + 1)
      })
      .catch(err => {})
      .then(_ => {
        setLoading(false)
      })

  }, [currPage, dataSource, loading])

  useImperativeHandle(ref, () => {
    return {
      loadData: fetchData
    }
  }, [fetchData])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View>
      <List
        list={dataSource}
        actionDisabled
      />
      <View
        className='pos-re'
      >
        <AtActivityIndicator
          mode='center'
          isOpened={loading}
          color={style.color('primary').color}
        />
      </View>
    </View>
  )

})

export default TopData