import React, { memo, useMemo } from 'react'
import { Swiper, SwiperItem } from '@tarojs/components'
import { SwiperProps } from '@tarojs/components/types/Swiper'
import ImageLoading from '../../imageLoading'

export interface IProps extends Partial<SwiperProps> {
  list: string[]
}

export default memo((props: IProps) => {

  const list = useMemo(() => {
    return props.list
    .map(item => {
      return (
        <SwiperItem>
          <ImageLoading
            style={{ width: "100%", height: "100%" }}
            src={item}
            mode={'scaleToFill'}
          />
        </SwiperItem>
      )
    })
  }, [props.list])

  return (
    <Swiper
      circular={true}
      indicatorDots={props.list.length > 1}
      autoplay
      {...props}
    >
      {list}
    </Swiper>
  )
})