import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import SearchBar from './components/searchButton'
import Swipers from './components/swiper'
import Itemize from './components/itemize'
import News from './components/news'
import Rank from './components/rank'
import NoticeBar from '~components/noticeBar'
import { TypeColor, colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { throttle } from 'lodash'
import { getDailyNew, getNotice, getRank, getSwiper, getClassify } from '~services'

import './index.scss'

export default class extends Component<any> {

  public state: any = {
    swiper: [],
    classify: [],
    daily: [],
    rank: [],
    notice: {},
    typeColor: TypeColor
  }

  //色调修改时重绘用
  public componentDidShow = () => {
    colorStyleChange(true)
    const { typeColor } = this.state
    if(typeColor == TypeColor) return
    this.setState({ typeColor: TypeColor })
  }

  public componentDidMount = async () => await this.fetchData()

  private getDaily = async () => await getDailyNew()

  //重新加载每日上新
  public hanleExchangeDaily = async () => {
    Taro.showLoading({ mask: true, title: '查找中' })
    const daily = await this.throttleGetDaily()
    Taro.hideLoading()
    this.setState({ daily: daily.daily })
  }

  public throttleGetDaily = throttle(this.getDaily, 2000)

  public fetchData = async () => {
    Taro.showLoading({ title: '加载中' })
    //获取轮播图
    const swiper = await getSwiper()
    //获取分类
    const classify = await getClassify(16)
    //获取每日上新
    const daily = await this.getDaily()
    //获取排行榜
    const rank = await getRank()
    //获取跑马灯内容
    const notice = await getNotice()

    this.setState({
      swiper,
      classify,
      daily,
      rank,
      notice,
    })
    Taro.hideLoading();
  }

  public render () {
    const { rank, classify, swiper, daily, notice } = this.state

    const secondaryColor = style.color('secondary')

    return (
      <View className='index' style={{...style.backgroundColor('bgColor')}}>
        <View className='searchbar'>
          <SearchBar 
            disabled={true}
          />
        </View>
        <View className='swiper'>
          <NoticeBar
            text={notice.notice}
          ></NoticeBar>
          <Swipers
            list={swiper}
          />
        </View>
        <View className='itemize'>
          <Itemize
            list={classify}
          />
        </View>
        <View className='news'>
          <View className='at-row at-row__justify--between at-row__align--center'>
            <Text className='news-title at-col'
              style={{...secondaryColor}}
            >每日上新</Text>
            <Text className='news-title at-col'
              style={{...secondaryColor}}
              onClick={this.hanleExchangeDaily}
            >换一批</Text>
          </View>
          <News 
            list={daily}
          />
        </View>
        <View className='rank'>
          <Text className='rank-title'
            style={{...secondaryColor}}
          >排行榜</Text>
          {
            rank.filter(item => !!item.match.length).map(value => {
              const { match, name, _id } = value
              return (
                <Rank 
                  id={_id}
                  key={_id}
                  type={name} 
                  list={match}
                />
              )
            })
          }
        </View>
      </View>
    )
  }
}