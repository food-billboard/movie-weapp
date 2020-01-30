import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import GDivider from '~components/divider'
import Top from '../topbutton'
import './index.scss'

//header定义的同时也需要定义renderHeader才可以显示header信息
//bottom定义的同时也需要定义renderBottom才可以显示bottom信息
//bottom 内的内容只能是固定定位
interface IProps {
  sourceType: 'Scope' | 'Dva',
  query?: any,
  scrollY?: boolean
  upperThreshold?: number
  lowerThreshold?: number
  scrollWithAnimation?: boolean
  onScrollToUpper?: () => any
  onScrollToLower?: () => any
  onScroll?: () => any
  fetch: (...args: any[]) => any
  header?: false | number
  bottom?: false | number
  renderContent?: any
  renderHeader?: any
  renderBottom?: any
}

interface IState {
  data: Array<any>
  empty: boolean
  query: any
  loading: boolean
}

const INIT_QUERY = { pageSize: 10, currPage: 1 }

export default class List extends Component<IProps> {

  public topRef = Taro.createRef<Top>()
  
  public static defaultProps = {
    query: {},
    sourceType: 'Dva',
    scrollY: true,
    upperThreshold: 200,
    lowerThreshold: 50,
    scrollWithAnimation: false,
    onScroll: () => {},
    fetch: () => {},
    header: false,
    bottom: false
  }

  public state: IState = {
    data: [],
    empty: false,
    query: {},
    loading: false
  }

  public constructor() {
    super(...arguments)
    this.state.query = { ...INIT_QUERY, ...this.props.query }
  }

  //获取数据
  public get data() {
    if(this.state.data) return this.state.data
    return []
  }

  //获取loading状态
  public get loading() {
    if(typeof this.state.loading === 'boolean') return this.state.loading
    return false
  }

  public componentDidMount = () => {
    const { query } = this.state
    this.fetchData(query)
  }

  //数据请求
  public fetchData = async (query: any, isInit=false) => {
    const { sourceType, fetch } = this.props
    this.setState({query})
    this.setState({loading: true})
    if(sourceType === 'Scope') {
      const { data } = this.state
      const newData = await fetch(query, isInit)
      
      //判断是否存在数据
      if(!newData.length) this.setState({empty: true}) 
      
      let nextData
      //判断是否为初始化前端数据
      if(isInit) {
        nextData = [ ...newData ]
      }else {
        nextData = [ ...data, ...newData ]
      }
      this.setState({data: nextData, loading: false})
      return
    }else if(sourceType === 'Dva') {
      await fetch(query, isInit)
      this.setState({loading: false})
      return
    }
  }

    //上拉加载
    public handleToLower = () => {
      const { query, loading, empty } = this.state
      if(loading) return
      if(empty) return
      const { currPage } = query
      const nextQuery = { ...query, currPage: currPage + 1 }
      this.fetchData(nextQuery)
    }
  
    //下拉刷新
    public handleToUpper = () => {
      const { state, props } = this
      const nextQuery = { ...state.query, ...INIT_QUERY, ...props.query }
      this.fetchData(nextQuery)
    }

  public render() {
    const {
      scrollY,
      upperThreshold,
      lowerThreshold,
      scrollWithAnimation,
      onScrollToUpper,
      onScrollToLower,
      onScroll,
      header,
      bottom
    } = this.props
    const { empty, loading } = this.state
    return (
      <View className='list'>
        <ScrollView
          className='scroll-view'
          style={{marginBottom: bottom ? bottom : 0}}
          scrollY={scrollY}
          upperThreshold={upperThreshold}
          lowerThreshold={lowerThreshold}
          scrollWithAnimation={scrollWithAnimation}
          onScrollToUpper={onScrollToUpper ? onScrollToUpper : this.handleToUpper}
          onScrollToLower={onScrollToLower ? onScrollToLower : this.handleToLower}
          onScroll={onScroll}
        >
          {header ? this.props.renderHeader : ''}
          {this.props.renderContent}
          <GDivider
            show={empty}
          />
          {/* <Top 
            ref={this.topRef} 
          /> */}
          {bottom ? this.props.renderBottom : ''}
        </ScrollView>
        <View 
          className='active'
        >
          <AtActivityIndicator 
            size={100}
            color={'#666'}
            content={'玩命加载中...'}
            className={ loading ? 'activeShow' : 'activeHide' }
          />
        </View>
      </View>
    )
  }
}