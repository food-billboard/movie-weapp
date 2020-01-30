import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import SearchBar from '~components/searchbutton'
import Swipers from './components/swiper'
import Itemize from './components/itemize'
import News from './components/news'
import Rank from './components/rank'

import './index.scss'

import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {

  public config: Config = {
    navigationBarTitleText: '电影推荐'
  }

  public swiper
  public type
  public daily

  public componentDidMount = async () => {
    Taro.showLoading({ title: '加载中' })
    //获取热搜
    await this.props.getHot()
    //获取轮播图
    const swiper = await this.props.getSwiper(5)
    //获取分类
    const type = await this.props.getType()
    //获取每日上新
    const daily = await this.props.getDailyNew()
    //获取排行榜
    await this.props.getRank()
    this.swiper = swiper
    this.type = type
    this.daily = daily
    Taro.hideLoading();
  }

  public componentWillReceiveProps (nextProps) {
    
  }

  public componentWillUnmount () { }

  public componentDidShow () { }

  public componentDidHide () { }

  public render () {
    const {hot, rank} = this.props
    //排行榜列表
    const ranks = rank.map((value, index) => {
      const { type, list } = value
      return (
        <Rank 
          key={type}
          type={type} 
          list={list}
        />
      )
    })
    return (
      <View className='index'>
        <View className='searchbar'>
          <SearchBar 
            disabled={true}
            hot={hot}
          />
        </View>
        <View className='swiper'>
          <Swipers
            list={this.swiper}
          />
        </View>
        <View className='itemize'>
          <Itemize
            list={this.type}
          />
        </View>
        <View className='news'>
          <Text className='news-title'>每日上新</Text>
          <News 
            list={this.daily}
          />
        </View>
        <View className='rank'>
          <Text className='rank-title'>排行榜</Text>
          {ranks}
        </View>
      </View>
    )
  }
}
