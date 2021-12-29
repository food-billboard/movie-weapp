import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { Swiper, SwiperItem, Image } from '@tarojs/components'
import { router, routeAlias, ESwiperRouteType } from '~utils'
import { TypeColor } from '~theme/color'

interface List {
  _id: string,
  poster: string
  type: ESwiperRouteType
}

export interface IProps {
  list: Array<List>
}

class Index extends Component<IProps>{
  public static defaultProps = {
    list: []
  }

  //轮播图地址跳转
  public getDetail = (id: string, type: ESwiperRouteType) => {
    switch (type) {
      case ESwiperRouteType.COMMENT:
        router.push(routeAlias.comment, { id })
        break
      case ESwiperRouteType.MOVIE:
        router.push(routeAlias.detail, { id })
        break
      case ESwiperRouteType.SPECIAL:
        router.push(routeAlias.special, { id })
        break
    }
  }

  public render() {

    const { list } = this.props
    const typeColor = TypeColor()

    return (
      <Swiper
        indicatorColor={typeColor['primary']}
        indicatorActiveColor={typeColor['disabled']}
        circular
        indicatorDots
        className='main-swiper'
      >
        {list.map((value) => {
          const { _id: id, poster: image, type } = value
          return (
            <SwiperItem
              key={id}
              onClick={(_) => { this.getDetail.call(this, id, type) }}
            >
              <Image
                style={{ width: "100%", height: "100%" }}
                src={image}
              />
            </SwiperItem>
          )
        })}
      </Swiper>
    )
  }
}

export default Index