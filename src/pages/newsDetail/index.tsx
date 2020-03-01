import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import Scroll from '~components/scrollList'
import GInput from '~components/input'
import { throttle } from 'lodash'
import { style, colorStyleChange } from '~theme/global-style'
import { connect } from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { newsType, responseType } from '~utils'

import './index.scss'

let FIRST = true

const type = Object.values(newsType)

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {

  public static config:Config = {
    enablePullDownRefresh: true
  }

  private scrollRef = Taro.createRef<Scroll>()

  private inputRef = Taro.createRef<GInput>()

  //通知信息id
  private id = this.$router.params.id

  //用户id
  private userId = this.props.userInfo.id

  public state: any = {
    info: {},
    data: [],
    inputDisabled: false
  }

  public componentDidShow = () => {
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
    if(isInit) {
        newData = [ ...list ]
    }else {
        newData = [ ...list, ...stateData ]
    }
    await this.setState({
        info: other,
        data: newData
    })
    return list
  }

  /**
   * 节流数据获取
   */
  public throttleFetchData = throttle(this.fetchData, 2000)

  //添加图片
  public handleAddImage = () => {
    const { inputDisabled } = this.state
    if(inputDisabled) return

  }

  //添加视频
  public handleAddVideo = () => {
    const { inputDisabled } = this.state
    if(inputDisabled) return

  }

  //添加音频
  public handleAddAudio = () => {
    const { inputDisabled } = this.state
    if(inputDisabled) return

  }

  //发送消息
  public handleSend = async () => {
    const { inputDisabled } = this.state
    if(inputDisabled) return 
    const data = await this.inputRef.current!.getData(false)
    if(typeof data === 'string' && data.length) {
      await this.sendMediaInfo(newsType.text, data)
      this.inputRef.current!.reset()
    } 
  }

  //不同类型消息发送
  public sendMediaInfo = async (type, data: any) => {
    const { data: list } = this.state
    const { userInfo } = this.props
    const { id, username, image } = userInfo
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

    const newData = {
      loading: true,
      content: data,
      type: infoType,
      time: new Date().getTime(),
      username,
      id,
      image
    }

    const dataIndex = data.length

    await this.setState({
      data: [
        ...list,
        newData
      ]
    })
    
    //发送消息
    const res = await this.props.sendNews()
    const { res: response, id: newsId } = res

    //发送成功后处理消息的loading状态以及增加id
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

  public render() {

    const { info, inputDisabled, data } = this.state

    this.setTitle()

    return (
      <Scroll
        ref={this.scrollRef}
        sourceType={'Scope'}
        fetch={this.throttleFetchData}
        query={{pageSize: 20}}
        style={{...style.backgroundColor('bgColor')}}
        renderContent={
          <View></View>
        }
        bottom={0}
        renderBottom={
          <View 
            className='bottom'
            style={{...style.border(2, 'disabled', 'solid', 'top')}}
          >
            <View className='icon at-row at-row__justify--center'>
              <View 
                className='at-col at-col-2 at-icon at-icon-image icon-content'
                style={{...(style.color(inputDisabled ? 'primary' : 'disabled'))}}
                onClick={this.handleAddImage}
              ></View>
              <View 
                className='at-col at-col-2 at-icon at-icon-video icon-content'
                style={{...(style.color(inputDisabled ? 'primary' : 'disabled'))}}
                onClick={this.handleAddVideo}
              ></View>
              <View 
                className='at-col at-col-2 at-icon at-icon-volume-plus icon-content'
                style={{...(style.color(inputDisabled ? 'primary' : 'disabled'))}}
                onClick={this.handleAddAudio}
              ></View>
            </View>
            <View className='input at-row at-row__align--center'>
              <View className='at-col at-col-9'>
                <GInput
                  style={{
                    ...style.backgroundColor('disabled'), 
                    ...style.border(1, 'primary', 'solid', 'all')
                  }}
                  ref={this.inputRef}
                  disabled={inputDisabled}
                  value={'在这里发消息'}
                  placeholder={'在这里发消息'}
                ></GInput>
              </View>
              <View className='at-col at-col-3'>
                <Button 
                  style={{
                    ...style.backgroundColor(inputDisabled ? 'bgColor' :'secondary'),
                    borderRadius: 0
                  }}
                  onClick={this.handleSend}
                >发送</Button>
              </View>
            </View>
          </View>
        }
      ></Scroll>
    )
  }

}