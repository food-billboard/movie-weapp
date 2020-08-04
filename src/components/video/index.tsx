import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { Video } from '@tarojs/components'
import { isObject } from '~utils'
import { EVideoMode, setVideoConfig, getVideoConfig } from '~config'

import './index.scss'

export interface IDanmu {

}

export interface IProps {
  src: string
  autoplay?: boolean
  poster: string
  initialTime?: number
  id?: string
  loop?: boolean
  muted?: boolean
  style?: React.CSSProperties
  danmuList?: Array<IDanmu>
  title?: string
}

export interface IState {
  danmu: boolean
  mode: EVideoMode
  mute: number 
}

export default class Media extends Component<IProps, IState>{

  public constructor(props) {
    super(props)

    //获取播放器基础配置
    const config = getVideoConfig()
    this.state = {
      ...config
    }
  }

  public static defaultProps = {
    src: '',
    title: '',
    autoplay: false,
    poster: '',
    initialTime: 0,
    id: 'video',
    loop: false,
    muted: false,
    danmuList: [],
  }

  public error = (err) => {
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
      src,
      title,
      autoplay = false,
      poster,
      initialTime = 0,
      id = 'video',
      loop = false,
      muted = false,
      style = {},
      danmuList
    } = this.props
    const {
      mute,
      danmu,
      mode
    } = this.state
    //TODO

    return (
      <Video
        className='video'
        danmuList={danmuList}
        style={isObject(style) ? style : {}}
        src={src}
        controls={false}
        showFullscreenBtn={false}
        showPlayBtn={false}
        showCenterPlayBtn={false}
        autoplay={autoplay}
        poster={poster}
        initialTime={initialTime}
        id={id}
        loop={loop}
        muted={muted}
        onError={this.error}
        title={title}
        enablePlayGesture={true}
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