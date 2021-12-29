import Taro  from '@tarojs/taro'
import React, { memo, useCallback, useMemo, useState } from 'react'
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

  const handlePreviewImage = useCallback((image: string) => {
    if (image && image.length) {
      Taro.previewImage({
        current: image,
        urls: props.list || []
      })
    }
  }, [props.list])

  const list = useMemo(() => {
    if(status === 'icon') {
      return (
        <View className='data-detail-image-content-list'>
          <Swipper list={(props.list || [])} />
        </View>
      )
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
              mode='widthFix'
              src={value}
            />
          </View>
        )
      })
    )
  }, [props.list, status, handlePreviewImage])

  const changeStatus = useCallback(() => {
    if(status === 'list') setStatus('icon')
    if(status === 'icon') setStatus('list')
  }, [status])

  return (
    <View className='data-detail-image-list'>
      <View onClick={changeStatus} className={classnames('at-icon', 'data-detail-image-content', 'image-list-icon', 'big-icon-font-size-class', { 'at-icon-image': status === 'icon' }, { 'at-icon-list': status === 'list' })}></View>
      {list}
    </View>
  )

})
