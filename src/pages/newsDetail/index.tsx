import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Scroll from '~components/scrollList'
import Chat, { createScrollId } from './components/chat'
import GInput from './components/input'
import { IList, INewData } from './components/chat/index.d'
import { throttle, noop } from 'lodash'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { connect } from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { newsType, responseType, createSystemInfo } from '~utils'

import './index.scss'

let FIRST = true

interface IVideoType {
  image: string,
  video: string
}

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

  //用户id
  private userId = this.props.userInfo.id

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
    const setLoading = this.chatRef.current ? this.chatRef.current!.setLoadLoading : noop
    setLoading(true)

    const { data: stateData } = this.state
    const data = await this.props.getNewsDetail({id: this.id, user: this.userId, ...query})
    const {info} = data
    const { data: list, ...other } = info
    let newData
    const scrollIdList = list.map((val: IList) => {
      return {
        ...val,
        scrollId: createScrollId()
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
    }, () => {
      setLoading(false)
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
        scrollId: createScrollId()
      }
    })
    : 
    {
      ...this.inputRef.current!.createChatObject(infoType, data), 
      loading: true,
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
    const res = await this.props.sendNews(newData)
    const { res: response, data: resData, id: newsId } = res

    // 发送成功后处理消息的loading状态以及增加id
    if(response === responseType.success) {
      
      let _newData: INewData | Array<INewData>
      if(Array.isArray(newData)) {
        _newData = newData.map((val: INewData) => {
          return {
            ...val,
            loading: false
          }
        })
      }else {
        _newData = { ...newData, loading: false }
      }

      await this.setState({
        data: [ ...list, ...(Array.isArray(_newData) ? _newData : [_newData]) ]
      })

      // await this.setState({
      //   data: [
      //     ...list,
      //     {
      //       ...newData,
      //       news: newsId,
      //       loading: false
      //     }
      //   ]
      // })
    }
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

    const { info, data, bottomHeight, previewStatus } = this.state

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
                mine={userInfo.id}
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
                userInfo={userInfo}
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