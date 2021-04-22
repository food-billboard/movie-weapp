import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import GVideo from '../video'
import { IMAGE_CONFIG, SYSTEM_PAGE_SIZE, FORM_ERROR } from '~config'
import style from '~theme/style'
import { isObject, EMediaType, ICommonFormProps, ICommonFormState } from '~utils'

import './index.scss'

export enum EType {
  VIDEO = "VIDEO",
  IMAGE = "IMAGE"
}

export interface IFile {
 path: string,
 size: number
}

export interface IItem {
 url: string
 file?: IFile
 type: EType
 poster?: string
}

export interface IProps extends ICommonFormProps {
 initialValue?: Array<IItem>
 value?: Array<IItem>
 length?: number
 style?: React.CSSProperties
 close?: boolean
}

export interface IState extends ICommonFormState {
  value: Array<IItem>
  maxCount: number
  activeVideo: string
  isVideo: boolean
}

const { count } = IMAGE_CONFIG

const FLEX_MAX_SIZE = 12

const MEDIA_COMPONENT_STYLE = {
  ...style.color('primary'),
  fontSize: SYSTEM_PAGE_SIZE() * 1.5 + 'px',
}

export default class extends Component<IProps, IState> {

  private initialValue: Array<IItem> = []

  public state: IState = {
    value: [],
    maxCount: count,
    error: false,
    activeVideo: '',
    isVideo: false
  }

  private videoRef:GVideo

  //表单value
  private _value

  private get value() {
    const { value:propsValue, initialValue } = this.props
    const { value: stateValue } = this.state
    if(typeof propsValue !== 'undefined') {
      return propsValue
    }else {
      if(this.initialValue === undefined && typeof initialValue !== 'undefined') {
        return initialValue
      }
      return stateValue
    }
  }

  private set value(value) {
    this.setState({
      value
    })
  }

  //媒体选择
  public handleSelect = (type:EMediaType) => {
    if(type === EMediaType.IMAGE) {
      return Taro.chooseImage({
        count: IMAGE_CONFIG.count, 
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
      })
    }else if(type === EMediaType.VIDEO) {
      return Taro.chooseVideo({
        sourceType: ['album']
      })
    }
  }

  //视频选择
  public handleVideoChange = async () => {
    const response: any = await this.handleSelect(EMediaType.VIDEO)
    const { errMsg } = response
    if(errMsg.split(':')[1] !== 'ok') {
      return
    }
    const { tempFilePath, thumbTempFilePath } = response
    const { value:stateValue, maxCount } = this.state

    const itemLen = this.value.length
    if(maxCount < itemLen + 1) {
      Taro.showToast({
        title: '超出添加数量',
        icon: 'none',
        duration: 1000
      })
      return
    }

    const newStateValue = [
      {url: tempFilePath, type: EMediaType.VIDEO, poster: thumbTempFilePath},
      ...stateValue,
    ]


    this.onChange(newStateValue)
    this.value = newStateValue   
  }

  //图片选择
  public handleImageChange = async () => {
    const response: any = await this.handleSelect(EMediaType.IMAGE)
    const { errMsg } = response
    if(errMsg.split(':')[1] !== 'ok') {
      return
    }
    const { tempFiles=[] } = response
    const { maxCount, value:stateValue } = this.state

    const itemLen = this.value.length
    const tempLen = tempFiles.length
    if(maxCount < itemLen + tempLen) {
      Taro.showToast({
        title: '超出添加数量',
        icon: 'none',
        duration: 1000
      })
      return
    }

    const newStateValue = [
      ...tempFiles.map((val: any) => {
        const { path } = val
        return {
          url: path,
          type: EMediaType.IMAGE
        }
      }),
      ...stateValue
    ]

    this.onChange(newStateValue)
    this.value = newStateValue   
  }

  //删除
  public handleClose = (target: string) => {
    const index = this.value.findIndex((val: any) => val.url === target)
    if(index < 0) return 
    let data = [...this.value]
    data.splice(index, 1)
    this.onChange(data)
    this.value = data
  }

  //change
  public onChange = (value) => {
    const { handleChange, initialValue, value:propsValue } = this.props
    if(this.initialValue === undefined && typeof initialValue !== 'undefined') this.initialValue = initialValue
    if(typeof propsValue === 'undefined') {
      this.value = value
    }
    handleChange && handleChange(value)
  }

  //重置
  public reset = () => {
    this.setState({
      value: this.initialValue ? this.initialValue : [],
      isVideo: false,
    })
    this.videoRef.changeConfigSrc('')
  }

  //查看视频
  public handlePreviewVideo = (url: string) => {
    this.setState({
      isVideo: true
    }, () => {
      if(this.videoRef) {
        this.videoRef.changeConfigSrc(url)
        this.videoRef.seek(0)
      }
    })
  }

  //查看图片
  public handlePreviewImage = (url: string) => {
    const urls = this.value.filter((item:IItem) => {
      return item.type == EType.IMAGE
    }).map((item: IItem) => item.url)
    Taro.previewImage({
      current: url,
      urls: urls
    })
  }

  //获取数据
  public getData = async (emptyCharge=true) => {
    const { value: items } = this.state
    if(!items.length  && emptyCharge) {
      this.setState({
        error: true
      })
      return false
    }
    this.setState({
      error: false
    })
    return items
  }

  //关闭视频
  public videoClose = () => {
    this.setState({ isVideo: false })
    this.videoRef.stop()
  }

  //设置error
  public setError = (state: boolean) => {
    this.setState({
      error: state
    })
  }

  public render() {

    const { 
      length=3, 
      style: customStyle={}, 
      close=true, 
      error:propsError=false 
    } = this.props

    const { maxCount, isVideo, error: stateError } = this.state

    return (
      <View 
        className='media' 
        style={isObject(customStyle) ? customStyle : {}}
      >
        <View 
          className="media-control-com"
          style={{display: maxCount === this.value.length ? 'none' : 'flex'}}
        >
          <View 
            className='at-icon at-icon-image media-control-com-image' 
            style={MEDIA_COMPONENT_STYLE}
            onClick={this.handleImageChange.bind(this)}
          ></View>
          <View 
            className='at-icon at-icon-video media-control-com-video' 
            style={MEDIA_COMPONENT_STYLE}
            onClick={this.handleVideoChange.bind(this)}
          ></View>
        </View>
        <ScrollView
          scrollX
          style={{ whiteSpace: 'nowrap', marginTop: '10px' }}
        >
          {
            this.value.map((val: any) => {
              const { url, type, poster='' } = val
              return (
                <View 
                  key={url} 
                  className="media-content"
                >
                  <View 
                    className='at-icon at-icon-close icon' 
                    style={{...style.color('primary'), fontSize: SYSTEM_PAGE_SIZE() + 'px'}}
                    onClick={(_) => {this.handleClose.call(this, url)}}
                  ></View>
                  {
                    type === EType.IMAGE &&
                    <Image
                      onClick={() => {this.handlePreviewImage.call(this, url)}}
                      className='image'
                      src={url}
                    ></Image>
                  }
                  {
                    type === EType.VIDEO &&
                    <Image 
                      onClick={() => {this.handlePreviewVideo.call(this, url)}}
                      src={poster}
                      className='video'
                    ></Image>
                  }
                </View>
              )
            })
          }
        </ScrollView>
        <View 
          className='preview-video' 
          style={{visibility: isVideo ? 'visible' : 'hidden'}}
        >
          {
            <GVideo
              ref={(ref: any) => this.videoRef = ref}
              style={{ width: '100%', height: '100%', display: isVideo ? 'block' : 'none' }}
              muted={true}
              autoplay
            ></GVideo>
          }
          {
            close && 
            <View 
              className='at-icon at-icon-close video-icon' 
              style={{...style.color('primary'), fontSize: SYSTEM_PAGE_SIZE(40) + 'px'}}
              onClick={() => {this.videoClose.call(this)}}
            ></View>
          }
          </View>
      </View>
    )
  }

}