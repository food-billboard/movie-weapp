import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { Video } from '@tarojs/components'
import { EVideoMode, setVideoConfig, getVideoConfig } from '~config'

import './index.scss'

export interface IDanmu {
  _id: string
  hot: number
  like: boolean
  time_line: number
  content: string
  updatedAt: string
}

export interface IProps {
  src: string
  autoplay?: boolean
  poster: string
  id?: string
  muted?: boolean
  style?: React.CSSProperties
  danmuList?: Array<IDanmu> | false
  title?: string
  mode?: EVideoMode
}

export interface IState extends IProps {}

export default class Media extends Component<IProps, IState> {

  public static defaultProps = {
    src: '',
    title: '',
    autoplay: false,
    poster: '',
    id: 'video',
    loop: false,
    muted: false,
    danmuList: [],
    mode: EVideoMode.cover
  }

  public constructor(props: IProps) {
    super(props)

    //获取播放器基础配置
    const config = getVideoConfig()

    this.state = {
      ...config
    }
  }

  public componentDidMount = () => {
    const { style, ...nextProps } = this.props
    //初始化配置
    const newState = Object.keys(nextProps).reduce((acc: any, cur: string) => {
      if(typeof nextProps[cur] !== 'undefined') acc[cur] = nextProps[cur]
      return acc
    }, {})
    this.setState({
      ...newState
    })

    //定时将video配置放入缓存
    this.timer = setInterval(() => {
      this.storeConfig()
    }, 10000)

  }

  public componentDidUpdate = (prevProps) => {
    const { src: prevSrc, poster: prevPoster } = prevProps
    const { src: nowSrc, poster: nowPoster } = this.props
    if(prevSrc != nowSrc || prevPoster != nowPoster) {
      this.forceUpdate()
    }
  }

  public componentWillUnmount = () => {
    clearInterval(this.timer)
  }

  instance = Taro.createVideoContext(this.props.id || 'video', this)

  timer: any

  configHistory: any[] = []

  //配置改变
  private changeConfig = (key: string, value: any) => {
    this.configHistory.push({
      [key]: value
    })
  }

  //video配置保存
  private storeConfig = () => {
    if(!this.configHistory.length) return
    const newConfig = this.configHistory.reduce((acc: any, cur: any) => {
      const [ [ key, value ] ] = Object.entries(cur)
      acc[key] = value
      return acc
    }, {})
    setVideoConfig(newConfig)
    this.configHistory = []
  }

  // //src
  // public changeConfigSrc = (src: string) => {
  //   this.setState({ src })
  // }
  
  //seek
  public seek = (time: number) => this.instance && this.instance.seek(time)

  //停止视频
  public stop = () => this.instance && this.instance.stop()

  //播放视频
  public play = () => {
    this.instance && this.instance.play()
  }

  //暂停视频
  public pause = () => this.instance && this.instance.pause()

  public error = (err: any) => {
    console.log(err)
  }

  public handleControlDanmu = () => {
    //TODO
    //处理缓存逻辑用于在不同页面的视频中控制弹幕的显示隐藏
    this.forceUpdate()
  }

  public handleControlMute = () => {
    //TODO
    //处理缓存逻辑用语不同页面的视频中的静音控制
    this.forceUpdate()
  }

  public handleOnPlay = () => {

  }

  public handleOnPause = () => {

  }

  public handleTimeUpdate = () => {

  }

  public handleFullScreenChange = () => {

  }

  public handleProgress = () => {

  }

  public handleCompleteLoad = () => {

  }

  public render() {
    const {
      style,
      id='video',
      src,
      poster,
    } = this.props
    const {
      mode,
      title,
      autoplay = true,
      muted = false,
      danmuList,
    } = this.state
    //TODO

    return (
      <Video
        className='video'
        //待开发
        // danmuList={danmuList}
        style={style}
        src={src}
        controls
        showFullscreenBtn
        showPlayBtn
        showCenterPlayBtn
        autoplay={autoplay}
        poster={poster}
        id={id}
        loop={false}
        muted={muted}
        onError={this.error}
        title={title}
        enablePlayGesture
        onPlay={this.handleOnPlay}
        onPause={this.handleOnPause}
        onTimeUpdate={this.handleTimeUpdate}
        onFullscreenChange={this.handleFullScreenChange}
        onProgress={this.handleProgress}
        onLoadedMetaData={this.handleCompleteLoad}
        // objectFit={'contain'}
      ></Video>
    )
  }
}

//静音
//进度条
//中间播放暂停按钮
//全屏按钮
//视频与容器不一致时的显示形式 contrain 包含 fill 填充 cover 覆盖
//视频加载动画
//音量拖动条
//弹幕(全屏显示弹幕)
//弹幕输入框
//弹幕点赞
//监听暂停播放事件后的按钮显示切换等
//获取文件的播放时长
//设置播放器的相关配置缓存(音量、弹幕显隐、视频显示状态(contain/fill/cover))