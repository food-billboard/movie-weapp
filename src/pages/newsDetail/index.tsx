import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Scroll from '~components/scrollList'
import Chat, { createScrollId } from './components/chat'
import GInput from './components/input'
import { INewData } from './components/chat/index.d'
import { throttle, noop } from 'lodash'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { connect } from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { createSystemInfo, mediaType, withTry } from '~utils'

import './index.scss'

let FIRST = true

interface IVideoType {
  image: string,
  video: string
}

type TBaseData = Exclude<INewData, 'content' | 'scrollId'> 

const systemInfo = createSystemInfo()

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {

  public static config:Config = {
    enablePullDownRefresh: true,
    // disableScroll: true
  }

  private scrollRef = Taro.createRef<Scroll>()

  private inputRef = Taro.createRef<GInput>()

  private chatRef = Taro.createRef<Chat>()

  //通知信息id
  private id = this.$router.params.id

  //底部节点
  readonly bottomNode: any = Taro.createSelectorQuery().select('#_bottom').boundingClientRect()

  private windowHeight: number

  public state: any = {
    info: {},
    data: [],
    bottomHeight: 0,
    previewStatus: false
  }

  public componentDidMount = () => {
    this.fetchBottomHeight()
    this.windowHeight = systemInfo.getScreenInfo().windowHeight
  }

  public componentWillUnmount = async () => {
    await this.props.leaveRoom(this.id)
  }
  
  //获取底部聊天区域高度
  public fetchBottomHeight = () => {
    const node = this.bottomNode
    node.exec(res => {
      if(res.length) this.setState({
        bottomHeight: res[0].height
      }, () => {
        this.chatRef.current!.handleReachToLocation()
      })
    })
  }

  public componentDidShow = async () => {
    colorStyleChange()
  }

  //下拉加载
  public onPullDownRefresh = async () => {
    // await this.scrollRef.current!.handleToLower()
    // Taro.stopPullDownRefresh()
  }

  //设置标题
  public setTitle = async () => {
    const { simpleList } = this.props
    if(simpleList && FIRST) {
        FIRST = false
        const [ info ] = simpleList.filter(item => item._id === this.id)
        const { info: { username } } = info
        Taro.setNavigationBarTitle({title: username})
    }
  }

  /**
   * 获取数据
   */
  public fetchData = async (query: any, isInit=false) => {
    const setLoading = this.chatRef.current ? this.chatRef.current!.setLoadLoading : noop
    setLoading(true)

    const { data: stateData } = this.state
    const data = await this.props.getMessageDetail({ id: this.id, ...query })
    let newData = [ ...stateData ]
    const scrollIdList = data.map(val => {
      return {
        ...val,
        scrollId: createScrollId()
      }
    })

    if(!isInit) {
      newData = [ ...scrollIdList, ...newData ]
    }

    this.setState({
      data: newData
    })

    setLoading(false)

    return scrollIdList
  }

  /**
   * 节流数据获取
   */
  public throttleFetchData = throttle(this.fetchData, 2000)

  //不同类型消息发送
  public sendMediaInfo = async (type, data: string | IVideoType| Array<string>) => {
    const { data: list } = this.state
    //特指暂时不用
    let baseData: TBaseData = {
      type: mediaType[type],
      _id: this.id,
      loading: true,
    }

    //生成消息内容格式(可能是多条数据)
    const newData: INewData  | Array<INewData> = Array.isArray(data) ? data.map((val: string) => {
      return { 
        ...baseData,
        content: val,
        //scroll_id
        scrollId: createScrollId()
      }
    })
    : 
    {
      ...baseData,
      content: data,
      scrollId: createScrollId()
    }

    await this.setState({
      data: [ ...list, ...(Array.isArray(newData) ? newData : [newData]) ] 
    }, () => {
      // this.inputRef.current!.handleControlLifeStatus(false)
      this.inputRef.current!.resetStatus()
      this.chatRef.current!.handleReachToLocation()
    })
    
    //发送消息
    await withTry(this.props.postMessage)(newData)

    await this.scrollRef.current!.handleToUpper()

    // // 发送成功后处理消息的loading状态以及增加id
    // if(response === responseType.success) {
      
    //   let _newData: INewData | Array<INewData>
    //   if(Array.isArray(newData)) {
    //     _newData = newData.map((val: INewData) => {
    //       return {
    //         ...val,
    //         loading: false
    //       }
    //     })
    //   }else {
    //     _newData = { ...newData, loading: false }
    //   }

    //   await this.setState({
    //     data: [ ...list, ...(Array.isArray(_newData) ? _newData : [_newData]) ]
    //   })

    // }
  }

  //将消息列表滚动至最底部
  public handleInputFocus = () => {
    // this.chatRef.current!.handleReachToBottom()
    this.fetchBottomHeight()
  }

  //监听消息列表滚动
  public handleScroll = async(e) => {

    const { detail } = e
    const { scrollTop } = detail
    if(scrollTop === 0) await this.scrollRef.current!.handleToLower()

    // if(this.inputRef.current!.getLifeStatus()) this.inputRef.current!.handleControlLifeStatus(false)
  }

  //监听预览模式改变
  public handlePreview = (status: boolean) => {
    this.setState({
      previewStatus: status
    })
  }

  public render() {

    const { userInfo } = this.props

    const { data, bottomHeight, previewStatus } = this.state

    this.setTitle()

    return (
      <Scroll
        ref={this.scrollRef}
        sourceType={'Scope'}
        fetch={this.throttleFetchData}
        query={{pageSize: 5}}
        style={{...style.backgroundColor('bgColor')}}
        divider={false}
        renderContent={
          <View className='at-row detail'
            style={{flexDirection: 'column'}}
          >
            <View>
              <Chat
                ref={this.chatRef}
                height={(this.windowHeight - bottomHeight)}
                list={data}
                onScroll={this.handleScroll}
                onPreview={this.handlePreview}
              ></Chat>
            </View>

            <View className='bottom_shadow' style={{height: bottomHeight + 'px', display: previewStatus ? 'block' : 'none'}}></View>
            <View 
              id='_bottom' 
              className='_bottom'
              style={{ display: previewStatus ? 'none' : 'block' }}
            >
              <GInput 
                ref={this.inputRef}
                inputVisible={previewStatus}
                sendInfo={this.sendMediaInfo}
                onHeightChange={this.fetchBottomHeight}
                onFocus={this.handleInputFocus}
              />
            </View>

          </View>
        }
      ></Scroll>
    )
  }

}