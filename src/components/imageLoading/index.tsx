import Taro from '@tarojs/taro'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { View, Image } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import { SYSTEM_PAGE_SIZE } from '~config'
import { TypeColor } from '~theme/color'
import style from '~theme/style'
import { isObject } from '~utils'
import { ImageProps } from '@tarojs/components/types/Image'
import { AtActivityIndicatorProps } from 'taro-ui/types/activity-indicator'
import fallback from '~assets/fallback.png'

import './index.scss'

export interface IProps extends ImageProps {
  loadingProps?: AtActivityIndicatorProps
  border?: false | string
  customStyle?: React.CSSProperties
  imageStyle?: React.CSSProperties
  handleClick?: (...args: any[]) => any
}

export interface IState {
  loading: boolean
  error: boolean 
}

export default memo((props: IProps) => {

  const [ loading, setLoading ] = useState<boolean>(true)
  const [ error, setError ] = useState<boolean>(false)

  const {  
    //img
    src,
    webp = false,
    mode = 'aspectFill', //scaleToFill
    lazyLoad = true,
    showMenuByLongpress = false,
    handleClick,
    //loading
    loadingProps: {
      size = 32,
      mode: loadingMode = 'center',
      color = TypeColor.primary,
      content = '加载中...'
    }={},
    customStyle = false,
    border = false,
    imageStyle = false,
    onLoad,
    onError
  } = useMemo(() => {
    return props 
  }, [props])

  const handleLoad = useCallback((event) => {
    onLoad && onLoad(event)
    setLoading(false)
  }, [onLoad])

  const handleError = useCallback((e) => {
    onError && onError(e)
    setError(true)
    setLoading(false)
  }, [])

  const onClick = useCallback((e) => {
    handleClick && handleClick(e)
  }, [])

  const contentStyle = useMemo(() => {
    return {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      ...(loading ? style.backgroundColor('disabled') : {}),
      ...(
        typeof border === 'string' ?
          { border }
          :
          {}
      ),
      ...(
        isObject(customStyle) ?
          customStyle
          :
          {}
      )
    }
  }, [loading])

  useEffect(() => {
    setError(false)
    setLoading(true)
  }, [src])

  return (
    <View
      className='loading'
      onClick={onClick}
      style={contentStyle}
    >
      {/* {
        loading ?
        <View className='avatar'>图</View>
        :
        null
      } */}
      {
        loading ?
          <AtActivityIndicator
            content={content}
            color={color}
            mode={loadingMode}
            size={SYSTEM_PAGE_SIZE(size)}
          ></AtActivityIndicator>
          : null
      }
      <Image
        style={{ visibility: loading ? 'hidden' : 'visible', width: '100%', height: '100%', ...(isObject(imageStyle) ? imageStyle : {}) }}
        src={(error && !loading || !src) ? fallback : src}
        webp={webp}
        mode={mode}
        lazyLoad={lazyLoad}
        showMenuByLongpress={showMenuByLongpress}
        onError={handleError}
        onLoad={handleLoad}
      />
    </View>
  )
})
