import Taro from '@tarojs/taro'
import { Component, createRef } from 'react'
import { View, Text } from '@tarojs/components'
import throttle from 'lodash/throttle'
import NoticeBar from '~components/noticeBar'
import { TypeColor, colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { getDailyNew, getNotice, getRank, getSwiper, getClassify } from '~services'
import SearchBar from './components/searchButton'
import Swiper from './components/swiper'
import Itemize from './components/itemize'
import News from './components/news'
import Rank from './components/rank'
import Special from './components/special'
import TopData, { TopDataRef } from './components/topData'

import './index.scss'

export default class extends Component<any> {

  public state: any = {
    swiper: [],
    classify: [],
    daily: [],
    rank: [],
    notice: {},
    typeColor: TypeColor()
  }

  public componentDidMount = async () => await this.fetchData()

  topDataRef = createRef<TopDataRef>()

  public onReachBottom = async () => {
    await this.topDataRef.current?.loadData()
  }

  //色调修改时重绘用
  public componentDidShow = () => {
    colorStyleChange(true)
    const { typeColor } = this.state
    if (typeColor == TypeColor()) return
    this.setState({ typeColor: TypeColor() })
  }

  private getDaily = async () => await getDailyNew()

  //重新加载每日上新
  public handleExchangeDaily = async () => {
    return
    Taro.showLoading({ mask: true, title: '查找中' })
    const daily = await this.throttleGetDaily()
    Taro.hideLoading()
    this.setState({ daily })
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
    const rank = await getRank(16)
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

  public render() {
    const { rank, classify, swiper, daily, notice } = this.state

    const secondaryColor = style.color('secondary')

    return (
      <View className='main-page' style={style.backgroundColor('bgColor')}>
        <View className='main-page-searchbar'>
          <SearchBar
            disabled
          />
        </View>
        <View className='main-page-swiper'>
          <NoticeBar
            text={notice.notice}
          ></NoticeBar>
          <Swiper
            list={swiper}
          />
        </View>
        <View className='main-page-itemize'>
          <Itemize
            list={classify}
          />
        </View>
        <View className='main-page-news'>
          <View className='at-row at-row__justify--between at-row__align--center'>
            <Text className='main-page-news-title title-font-size-class at-col'
              style={{ ...secondaryColor }}
            >每日上新</Text>
            <Text className='main-page-news-title title-font-size-class at-col'
              style={{ ...secondaryColor }}
              onClick={this.handleExchangeDaily}
            >换一批</Text>
          </View>
          <News
            list={daily}
          />
        </View>
        <View className='main-page-special'>
          <Text className='main-page-rank-title title-font-size-class'
            style={{ ...secondaryColor }}
          >专题集合</Text>
          <Special />
        </View>
        <View className='main-page-rank'>
          <Text className='main-page-rank-title title-font-size-class'
            style={{ ...secondaryColor }}
          >电影榜单</Text>
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
        <View className='main-page-top-data'>
          <Text className='main-page-top-data-title title-font-size-class'
            style={{ ...secondaryColor }}
          >找电影</Text>
          <TopData
            ref={this.topDataRef}
          />
        </View>
      </View>
    )
  }
}