import Taro  from '@tarojs/taro'
import React, { Component, memo, useCallback, useMemo, useState } from 'react'
import classnames from 'classnames'
import { View } from '@tarojs/components'
import ImageLoading from '~components/imageLoading'
import Swipper from '~components/iconlist/swipper'

import './index.scss'

export interface IProps {
  list: Array<string>
}

export interface IState {}

export default memo((props: IProps) => {

  const [ status, setStatus ] = useState<'icon' | 'list'>('icon')

  const list = useMemo(() => {
    if(status === 'icon') {
      return <Swipper className='data-detail-image-content-list' list={(props.list || [])} />
    }
    return (
      (props.list || []).map(value => {
        return (
          <View
            className='data-detail-image-content-list'
            key={value}
            onClick={() => { handlePreviewImage.call(this, value) }}
          >
            <ImageLoading
              mode={'widthFix'}
              src={value}
            />
          </View>
        )
      })
    )
  }, [props.list, status])

  const handlePreviewImage = useCallback((image: string) => {
    if (image && image.length) {
      const { list } = props
      Taro.previewImage({
        current: image,
        urls: list || []
      })
    }
  }, [props.list])

  const changeStatus = useCallback(() => {
    if(status === 'list') setStatus('icon')
    if(status === 'icon') setStatus('list')
  }, [status])

  return (
    <View className='list'>
      <View onClick={changeStatus} className={classnames('at-icon', 'data-detail-image-content', 'image-list-icon', { 'at-icon-image': status === 'icon' }, { 'at-icon-list': status === 'list' })}></View>
      {list}
    </View>
  )

})
