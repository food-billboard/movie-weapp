import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { ScrollView, View, Text } from '@tarojs/components'
import AtRate from '~components/rate'
import { TypeColor, colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { router, routeAlias } from '~utils'
import ImageLoading from '~components/imageLoading'

import './index.scss'

interface List {
  _id: string,
  name: string,
  poster: string
}

export interface IProps {
  count: number,
  list: API_USER.IGetDailyResData[]
}

const MAX_COUNT = 10

class News extends Component<IProps>{
  public static defaultProps: IProps = {
    count: MAX_COUNT,
    list: []
  }

  public componentDidShow = () => colorStyleChange()

  //路由跳转
  public gotTo = (id: string) => router.push(routeAlias.detail, { id })

  public render() {

    const { list } = this.props
    
    return (
      <ScrollView
        scrollX
        scrollWithAnimation
        className='news-main'
      >
        {
          list.map((value) => {
            const { _id: id, name: title, poster: image, author_rate } = value

            return (
              <View className='news-img'
                onClick={(_) => { this.gotTo.call(this, id) }}
                key={id}
              >
                <Text
                  className='news-title normal-font-size-class'
                  style={{ ...style.color('primary'), textShadow: `0 0 2px ${TypeColor()['disabled']}` }}
                >{title}</Text>
                <ImageLoading
                  src={image}
                />
                <AtRate
                  value={parseFloat((author_rate / 2).toFixed(1))}
                  readonly
                  size={8}
                  max={5}
                  origin={author_rate}
                  style={{marginTop: '12PX'}}
                />
              </View>
            )
          })
        }
      </ScrollView>
    )
  }
}

export default News