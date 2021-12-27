import React, { memo, useMemo } from 'react'
import { View } from '@tarojs/components'

interface IPropsType {
  type?: 'array' | 'other'
  value: any
  [key: string]: any
}

export default memo((props: IPropsType) => {

  const { type="array", value } = useMemo(() => {

    return props 
  }, [props])

  if(type === 'array' && Array.isArray(value) && !!value.length) {
    //@ts-ignore
    return props.children
  }else if(type === 'other' && !!value) {
    //@ts-ignore
    return props.children
  }
  return <View></View> 
})