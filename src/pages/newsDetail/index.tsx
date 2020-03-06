import Taro, { Component, Config } from '@tarojs/taro'
import { View, Textarea } from '@tarojs/components'
import Scroll from '~components/scrollList'
import { throttle } from 'lodash'
import { colorStyleChange, TypeColor } from '~theme/color'
import style from '~theme/style'
import { connect } from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { newsType, responseType } from '~utils'
import { IMAGE_CONFIG } from '~config'
import Emoj from './components/emojSwiper'

import './index.scss'

let FIRST = true

const MAX_COL_COUNT = 5

const { count } = IMAGE_CONFIG

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {

  public static config:Config = {
    enablePullDownRefresh: true
  }

  private scrollRef = Taro.createRef<Scroll>()

  private EmojRef = Taro.createRef<Emoj>()

  //通知信息id
  private id = this.$router.params.id

  //用户id
  private userId = this.props.userInfo.id

  public state: any = {
    info: {},
    data: [],
    inputDisabled: false,
    inputValue: '',
    autoHeight: true,
    detailFunc: false
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
    Taro.chooseImage({
      count: count, 
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
    }).then((res) => {
      const { errMsg } = res
      const [, msg] = errMsg.split(':')
      if(msg === 'ok') {
        const { tempFilePaths } = res //地址的字符串数组
      }
    })
  }

  //添加视频
  public handleAddVideo = () => {
    const { inputDisabled } = this.state
    if(inputDisabled) return
    Taro.chooseVideo({
      sourceType: ['album','camera'],
      camera: 'back',
    }).then((res: any) => {
      const { errMsg } = res
      const [, msg] = errMsg.split(':')
      if(msg === 'ok') {
        const { 
          tempFilePath, 
          thumbTempFilePath,
          duration,
          size,
          width,
          height
        } = res
      }
    })
  }

  //添加音频
  public handleAddAudio = () => {
    const { inputDisabled } = this.state
    if(inputDisabled) return
    
  }

  //选择表情
  public handleEmoj = () => {
    const { inputDisabled } = this.state
    if(inputDisabled) return

    this.EmojRef.current!.controlShowHide()
  }

  //显示详细功能
  public handleShowDetailFunc = () => {
    const { detailFunc } = this.state
    if(!!detailFunc) this.handleEmoj()
    this.setState({
      detailFunc: !detailFunc
    })
  }

  //发送消息
  public handleSendText = async () => {
    const { inputDisabled, inputValue } = this.state
    if(inputDisabled) return 
    if(inputValue.length) {
      await this.sendMediaInfo(newsType.text, inputValue)
      this.setState({
        inputValue: ''
      })
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

  //处理文本域内容
  public handleInputLineChange = (e) => {
    const { detail } = e
    const { lineCount } = detail
    if(lineCount >= MAX_COL_COUNT) {
      this.setState({
        autoHeight: false
      })
    }else {
      this.setState({
        autoHeight: true
      })
    }
  }

  //文本内容修改
  public handleInput = (e) => {
    const { detail } = e
    this.setState({
      inputValue: detail.value
    })
  }

  //添加emoj表情
  public handleAddEmoj = (value) => {
    const { inputValue } = this.state
    this.setState({
      inputValue: inputValue + value
    })
  }

  //基础功能按钮
  readonly basicBtnFunc = [
    {
      iconInfo: {
        value: 'image'
      },
      handle: this.handleAddImage
    },
    {
      iconInfo: {
        value: 'video'
      },
      handle: this.handleAddVideo
    },
    {
      iconInfo: {
        value: () => {return this.state.detailFunc ? 'close' : 'add'}
      },
      handle: this.handleShowDetailFunc
    },
    {
      iconInfo: {
        value: 'check'
      },
      handle: this.handleSendText
    }
  ]

  //其他功能按钮
  readonly detailBtnFunc = [
    {
      iconInfo: {
        value: 'volume-plus',
      },
      handle: this.handleAddAudio
    },
    {
      iconInfo: {
        value: 'text-strikethrough'
      },
      handle: this.handleEmoj
    }

  ]

  public render() {

    const { info, inputDisabled, data, inputValue, autoHeight, detailFunc } = this.state

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
          <View>
          </View>
        }
        bottom={0}
        renderBottom={
          <View 
            className='bottom'
            style={{...style.border(2, 'disabled', 'solid', 'top'), ...style.backgroundColor('thirdly')}}
          >
            <View className='icon at-row'>
              {
                this.basicBtnFunc.map((val: any) => {
                  const { iconInfo, handle } = val
                  const { value } = iconInfo
                  return (
                    <View 
                      key={value}
                      className={`at-col at-col-3 at-icon at-icon-${typeof value === 'string' ? value : value()} icon-content`}
                      style={{...(style.color(inputDisabled ? 'primary' : 'disabled'))}}
                      onClick={handle}
                    ></View>
                  )
                })
              }
            </View>
            <View 
              className='input'
            >
              <Textarea
                style={{
                  ...style.border(2, 'disabled', 'solid', 'all'),
                  width:'100%',
                  borderRadius: '5px',
                  padding: '10px 0',
                  boxShadow:'0 0 2px #333',
                }}
                className='content'
                disabled={inputDisabled}
                value={inputValue}
                placeholder={'在这里发消息'}
                autoHeight={autoHeight}
                fixed={true}
                onInput={this.handleInput}
                onLineChange={this.handleInputLineChange}
                maxlength={-1}
              ></Textarea>
            </View>
            <View className='other-detail'>
                <View className='emoj'>
                  <Emoj
                    ref={this.EmojRef}
                    handleAddEmoj={this.handleAddEmoj}
                  />
                </View>
            </View>
            <View 
              className='at-row at-row--wrap'
              style={{display: detailFunc ? 'flex' : 'none'}}
            > 
              {
                this.detailBtnFunc.map((val: any) => {
                  const { iconInfo, handle } = val
                  const { value } = iconInfo
                  return (
                    <View 
                      key={value}
                      className={`at-col at-col-3 at-icon at-icon-${typeof value === 'string' ? value : value()} icon-content`}
                      style={{...(style.color(inputDisabled ? 'primary' : 'disabled'))}}
                      onClick={handle}
                    ></View>
                  )
                })  
              }
            </View>
          </View>
        }
      ></Scroll>
    )
  }

}