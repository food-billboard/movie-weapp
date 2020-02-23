import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtGrid } from "taro-ui"
import GScrollView from '~components/scrollList'
import Rank from '../main/components/rank'
import List from '~components/list'
import { style, TypeColor } from '~theme/global-style'
import { throttle } from 'lodash'
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { router } from '~utils'

const COLUMN_COUNT = 3

const COLUMN_MAX = 5

const SHOW_MORE = 'show_more'
const HIDE_MORE = 'hide_more'

const SHOW_ICON = {
  value: 'chevron-right',
  color: '',
  size: 32
}

const HIDE_ICON = {
  value: 'chevron-right',
  color: '',
  size: 32
}

const SHOW_MORE_CONFIG = {
  id: SHOW_MORE,
  value: '展开',
  iconInfo: {...SHOW_ICON}
}

const HIDE_MORE_CONFIG = {
  id: HIDE_MORE,
  value: '收起',
  iconInfo: {...HIDE_ICON}
}

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {

  public state: any = {
    rank: [],
    rankType: [],
    title: '',
    id: '',
    showMore: false
  }

  public componentDidMount = async () => {
    this.fetchRankTypeData()
    this.title = this.$router.params.type || '排行榜'
  }

  //排行榜id
  private _id = this.$router.params.id

  private _title

  public scrollRef = Taro.createRef<GScrollView>()

  public get id() {
    return this._id
  }

  public set id(id) {
    this._id = id
  }

  public get title() {
    return this._title
  }

  public set title(title) {
    this._title = title
    Taro.setNavigationBarTitle({title})
  }

  public static config:Config = {
    navigationBarTitleText: '排行榜'
  }

  //数据获取
  public fetchData = async (query: any, isInit=false) => {
    const { rank } = this.state
        const data = await this.props.getRank({id: this.id, ...query})
        const _data = data.rank
        if(_data.length) {
          const { list, type, id } = _data.slice(0, 1)[0]
          let newData
          if(isInit) {
              newData = [ ...list ]
          }else {
              newData = [ ...rank, ...list ]
          }
          await this.setState({
            rank: newData,
            title: type,
            id
          })
          return list
        }
        return []
  }

  //获取排行榜分类列表
  public fetchRankTypeData = async () => {
    const data = await this.props.getRankType()
    const _data = data.rank
    
    const rank = _data.map(val => {
      const { id, type, image } = val
      return {
        id,
        value: type,
        image
      }
    })
    await this.setState({
      rankType: rank
    })
  }

  /* 
  * 节流数据获取
  */
  public throttleFetchData = throttle(this.fetchData, 2000)

  //查看详细信息
  public getDetail = async (id: string) => {
    router.push('/detail', {id})
  }

  //切换排行榜
  public exchangeRank = async (item, index: number) => {
    const { id, value } = item
    if(id === HIDE_MORE || id === SHOW_MORE) return this.handleControlRank(id)
    this.id = id
    this.title = value
    await this.fetchRankTypeData()
    this.scrollRef.current!.handleToUpper()
  }

  //展开收起排行榜
  public handleControlRank = (id: 'hide_more' | 'show_more') => {
    let status = true
    if(id === 'hide_more') status = false
    this.setState({
      showMore: status
    })
  }

  public render() {
    const { rank, rankType, showMore } = this.state
    const data = rank.slice(0, 3)
    const detail = rank.slice(3)

    const color = { color: TypeColor['primary'] }
    const hideConfig = { ...HIDE_MORE_CONFIG, iconInfo: { ...HIDE_ICON, ...color } }
    const showConfig = { ...SHOW_MORE_CONFIG, iconInfo: { ...SHOW_ICON, ...color } }
    return(
      <GScrollView
        style={{...style.backgroundColor('bgColor')}}
        ref={this.scrollRef}
        sourceType={'Scope'}
        scrollWithAnimation={true}
        renderContent={
          <View>
            <Rank
              style={{padding: '0 20px', boxSizing: 'border-box'}}
              type={''}
              list={data}
            />
            <AtGrid
              hasBorder={true}
              data={
                showMore ? 
                (
                  rankType.length > COLUMN_MAX ?
                  [ ...rankType, hideConfig ] 
                  : rankType
                ) : 
                (
                  rankType.length > COLUMN_MAX ?
                  [ ...(rankType.slice(0, COLUMN_MAX - 1)), showConfig ]
                  : rankType
                )
              }
              onClick={this.exchangeRank}
              columnNum={COLUMN_COUNT}
            />
            <List list={detail} style={{marginTop: '10px'}} />
          </View>
        }
        fetch={this.throttleFetchData}
      >
      </GScrollView>
    )
  }
}