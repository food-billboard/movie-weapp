import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Scroll from '~components/scrollList'
import Chat from './components/chat'
import GInput from './components/input'
import { IList, INewData } from './components/chat/index.d'
import { throttle, last } from 'lodash'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { connect } from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { newsType, responseType } from '~utils'

import './index.scss'

let FIRST = true

const { windowHeight: WINDOW_HEIGHT } = Taro.getSystemInfoSync()

interface IVideoType {
  image: string,
  video: string
}

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {

  public static config:Config = {
    enablePullDownRefresh: true,
    disableScroll: true
  }

  private scrollRef = Taro.createRef<Scroll>()

  private inputRef = Taro.createRef<GInput>()

  private chatRef = Taro.createRef<Chat>()

  //通知信息id
  private id = this.$router.params.id

  //用户id
  private userId = this.props.userInfo.id

  //底部节点
  readonly bottomNode: any = Taro.createSelectorQuery().select('#_bottom').boundingClientRect()

  public state: any = {
    info: {},
    data: [],
    bottomHeight: 0
  }

  public componentDidMount = () => {
    this.fetchBottomHeight()
  }
  
  //获取底部聊天区域高度
  public fetchBottomHeight = () => {
    const node = this.bottomNode
    node.exec(res => {
      if(res.length) this.setState({
        bottomHeight: res[0].height
      }, () => {
        this.chatRef.current!.handleReachToBottom()
      })
    })
  }

  public componentDidShow = async () => {
    colorStyleChange()
  }

  //下拉加载
  public onPullDownRefresh = async () => {
    await this.scrollRef.current!.handleToLower()
    Taro.stopPullDownRefresh()
  }

  //设置标题
  public setTitle = async () => {
    const { info } = this.state
    if(info && FIRST) {
        FIRST = false
        const { username='' } = info
        Taro.setNavigationBarTitle({title: username})
    }
  }

  /**
   * 获取数据
   */
  public fetchData = async (query: any, isInit=false) => {
    const { data: stateData } = this.state
    const data = await this.props.getNewsDetail({id: this.id, user: this.userId, ...query})
    const {info} = data
    const { data: list, ...other } = info
    let newData
    const scrollIdList = list.map((val: IList) => {
      return {
        ...val,
        scrollId: this.chatRef.current!.createScrollId()
      }
    })
    if(isInit) {
        newData = [ ...scrollIdList ]
    }else {
        newData = [ ...scrollIdList, ...stateData ]
    }
    await this.setState({
        info: other,
        data: newData,
    })

    return scrollIdList
  }

  /**
   * 节流数据获取
   */
  public throttleFetchData = throttle(this.fetchData, 2000)

  //不同类型消息发送
  public sendMediaInfo = async (type, data: string | IVideoType| Array<string>) => {
    const { data: list } = this.state

    let infoType
    switch(type) {
      case newsType.audio:
        infoType = newsType.audio
        break
      case newsType.image:
        infoType = newsType.image
        break
      case newsType.text:
        infoType = newsType.text
        break
      case newsType.video:
        infoType = newsType.video
        break
    }

    //生成消息内容格式(可能是多条数据)
    // const newData: IList  = this.createChatObject(infoType, data)
    const newData: INewData  | Array<INewData> = Array.isArray(data) ? data.map((val: string) => {
      return { 
        //数据基础结构
        ...this.inputRef.current!.createChatObject(infoType, val), 
        //loading
        loading: true,
        //scroll_id
        scrollId: this.chatRef.current!.createScrollId()
      }
    })
    : 
    {
      ...this.inputRef.current!.createChatObject(infoType, data), 
      loading: true,
      scrollId: this.chatRef.current!.createScrollId()
    }

    await this.setState({
      data: Array.prototype.concat.call(list, list, Array.isArray(newData) ? newData : [newData]) 
    }, () => {
      console.log(this.state.data.length)
      // this.inputRef.current!.handleControlLifeStatus(false)
      this.inputRef.current!.resetStatus()
      this.chatRef.current!.handleReachToBottom()
    })
    
    //发送消息
    const res = await this.props.sendNews(newData)
    const { res: response, data: resData, id: newsId } = res

    // 发送成功后处理消息的loading状态以及增加id
    if(response === responseType.success) {
      
      await this.setState({
        data: [
          ...list,
          {
            ...newData,
            news: newsId,
            loading: false
          }
        ]
      })
    }
  }

  //将消息列表滚动至最底部
  public handleInputFocus = () => {
    this.chatRef.current!.handleReachToBottom()
  }

  //监听消息列表滚动
  public handleScroll = (e) => {
    // if(this.inputRef.current!.getLifeStatus()) this.inputRef.current!.handleControlLifeStatus(false)
  }

  public render() {

    const { userInfo } = this.props

    const { info, data, bottomHeight, listAutoBottom } = this.state

    this.setTitle()

    return (
      <Scroll
        ref={this.scrollRef}
        sourceType={'Scope'}
        fetch={this.throttleFetchData}
        query={{pageSize: 20}}
        style={{...style.backgroundColor('bgColor')}}
        divider={false}
        renderContent={
          <View className='at-row detail'
            style={{flexDirection: 'column'}}
          >

            <View>
              <Chat
                ref={this.chatRef}
                height={(WINDOW_HEIGHT - bottomHeight)}
                list={data}
                mine={userInfo.id}
                onScroll={this.handleScroll}
              ></Chat>
            </View>
            <View style={{width: '100%', height: bottomHeight + 'px'}}></View>

            <View id='_bottom' className='_bottom'>
              <GInput 
                ref={this.inputRef}
                userInfo={userInfo}
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