import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import SearchBar from '~components/searchbutton'
import Swipers from './components/swiper'
import Itemize from './components/itemize'
import News from './components/news'
import Rank from './components/rank'
import { colorChange, style } from '~theme/global-style'
import { dateStyleChange } from '~utils'
import './index.scss'

import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

const INIT_RANK_QUERY = { currPage: 1, pageSize: 3 }

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {

  public config: Config = {
    navigationBarTitleText: '电影推荐'
  }

  public state: any = {
    hot: [],
    swiper: [],
    type: [],
    daily: [],
    rank: []
  }

  public componentDidMount = async () => {
    this.colorStyle()
    this.fetchData()
  }

  public colorStyle = () => {
    const { colorStyle } = this.props
    if(!colorStyle) return  
    const status = dateStyleChange()
    if(status) {
      colorChange('day')
    }else {
      colorChange('night')
    } 
  }

  public fetchData = async () => {
    Taro.showLoading({ title: '加载中' })
    //获取热搜
    const hot = await this.props.getHot()
    //获取轮播图
    const swiper = await this.props.getSwiper()
    //获取分类
    const type = await this.props.getSwitch()
    //获取每日上新
    const daily = await this.props.getDailyNew()
    //获取排行榜
    const rank = await this.props.getRank({ ...INIT_RANK_QUERY, id: 0 })

    const _hot = hot.hot
    const _swiper = swiper.swiper
    const _type = type.switch
    const _daily = daily.daily
    const _rank = rank.rank

    this.setState({
      hot: _hot,
      swiper: _swiper,
      type: _type,
      daily: _daily,
      rank: _rank
    })
    Taro.hideLoading();
  }

  public componentWillReceiveProps (nextProps) {
    
  }

  public componentWillUnmount () { }

  public componentDidShow () { }

  public componentDidHide () { }

  public render () {
    const { rank, type, swiper, hot, daily } = this.state
    //排行榜列表
    const ranks = rank.map(value => {
      const { type, list } = value
      return (
        <Rank 
          key={type}
          type={type} 
          list={list.length >= 3 ? list.slice(0, 3) : list}
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
            list={swiper}
          />
        </View>
        <View className='itemize'>
          <Itemize
            list={type}
          />
        </View>
        <View className='news'>
          <Text className='news-title'
            style={{...style.color('secondary')}}
          >每日上新</Text>
          <News 
            list={daily}
          />
        </View>
        <View className='rank'>
          <Text className='rank-title'
            style={{...style.color('secondary')}}
          >排行榜</Text>
          {ranks}
        </View>
      </View>
    )
  }
}
