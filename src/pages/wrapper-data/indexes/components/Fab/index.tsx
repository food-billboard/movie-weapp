import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtFab } from 'taro-ui'
import React, { memo, useCallback } from 'react'
import './index.scss'

interface IProps {
  onClick?: () => any
}

export default memo((props: IProps) => {

  const handleClick = useCallback(() => {
    return props.onClick && props.onClick()
  }, [])
 
  return (
    <View className="indexes-button">
      <AtFab
        onClick={handleClick}
      >
        <View>完成</View>
      </AtFab>
    </View>
  )

})