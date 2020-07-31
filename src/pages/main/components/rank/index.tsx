import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import RankIcon from './icon'
import { router, routeAlias } from '~utils'
import style from '~theme/style'
import ImageLoading from '~components/imageLoading'

import './index.scss'

export interface List {
  // rank: number,
  _id: string,
  poster: string,
  name: string
}

export interface IProps {
  count: number
  type: string
  list: Array<List>
  id: string
  style?: any
}

export interface IIconProps {
  rank: number
}

export interface IState {
}

export default class Rank extends Component<IProps, IState>{
  public static defaultProps = {
    count: 3,
    type: '综合排行榜',
    list: [],
    id: 0
  }

  /**
   * 获取详细信息
   */
  public getDetail = (id: string) => {
    router.push(routeAlias.detail, { id })
  }

  public classify = () => {
    const { list = [] } = this.props
    let newList: Array<any> = []
    const len = (i) => {
      if (i == 0) return 1
      if (i == 1) return 4
      return len(i - 1) * 4
    }
    let i = 0
    list.forEach((item: List) => {
      if (!Array.isArray(newList[i])) newList[i] = []
      if (newList[i].length < len(i)) {
        newList[i].push(item)
      } else {
        i++
        if (!Array.isArray(newList[i])) newList[i] = []
        newList[i].push(item)
      }
    })
    return newList.slice(0, 3)
  }

  public render() {
    const { type, id, style: propsStyle = {} } = this.props
    const list = this.classify()

    return (
      <View className='rank-main' style={propsStyle}>
        <Text
          className={'rank-title'}
          style={{ ...style.backgroundColor('secondary'), ...style.color('disabled') }}
          onClick={() => { router.push(routeAlias.rank, { id, type }) }}
        >{type}</Text>
        <Swiper className="rank-content">
          {
            list.map((value: Array<List>, index: number) => {
              return (
                <SwiperItem
                  key={value.length}
                >
                  {
                    value.map((item: List) => {
                      const { _id, poster } = item
                      return (
                        <View
                          className='rank-list'
                          style={{ width: `${100 / Math.pow(2, index) - 1}%`, height: `${100 / Math.pow(2, index) - 1}%` }}
                          key={_id}
                          onClick={this.getDetail.bind(this, _id)}
                        >
                          <ImageLoading
                            src={poster}
                          />
                          <RankIcon rank={index + 1} />
                        </View>
                      )
                    })
                  }
                </SwiperItem>
              )
            })
          }
        </Swiper>
      </View>
    )
  }
}



