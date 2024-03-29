import React, { memo, useMemo } from 'react'
import { Swiper, SwiperItem } from '@tarojs/components'
import { SwiperProps } from '@tarojs/components/types/Swiper'
import ImageLoading from '../../imageLoading'

export interface IProps extends Partial<SwiperProps> {
  list: string[]
}

export default memo((props: IProps) => {

  const list = useMemo(() => {
    return (props.list.length ? props.list : [''])
    .map((item, index) => {
      return (
        <SwiperItem
          key={index}
        >
          <ImageLoading
            style={{ width: "100%", height: "100%" }}
            src={item}
            mode='scaleToFill'
          />
        </SwiperItem>
      )
    })
  }, [props.list])

  return (
    <Swiper
      circular
      indicatorDots={false}
      autoplay={false}
      {...props}
    >
      {list}
    </Swiper>
  )
})