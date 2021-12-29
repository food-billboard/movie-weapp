import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtFab } from 'taro-ui'
import React, { memo } from 'react'
import './index.scss'

interface IProps {
  onClick?: () => any
  text?: string 
}

export default memo((props: IProps) => {
 
  return (
    <View className='page-indexes-button'>
      <AtFab
        onClick={props.onClick?.bind(null, undefined)}
      >
        <View>{props.text || '完成'}</View>
      </AtFab>
    </View>
  )

})