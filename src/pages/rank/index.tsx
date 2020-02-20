import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtGrid } from "taro-ui"
import GScrollView from '~components/scrollList'
import Rank from '../main/components/rank'
import List from '~components/list'
import { style } from '~theme/global-style'
import { throttle } from 'lodash'
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { router } from '~utils'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {

  public state: any = {
    rank: [],
    rankType: [],
    title: '',
    id: ''
  }

  public componentDidMount = async () => {
    this.fetchRankTypeData()
    this.title = this.$router.params.type || '排行榜'
  }

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
    this.id = id
    this.title = value
    await this.fetchRankTypeData()
    this.scrollRef.current!.handleToUpper()
  }

  public render() {
    const { rank, rankType } = this.state
    const data = rank.slice(0, 3)
    const detail = rank.slice(3)
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
              data={rankType}
              onClick={this.exchangeRank}
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