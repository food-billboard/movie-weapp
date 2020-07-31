import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import GVideo from '../video'
import { IMAGE_CONFIG, SYSTEM_PAGE_SIZE, FORM_ERROR } from '~config'
import style from '~theme/style'
import { findIndex } from 'lodash'
import { Toast } from '~components/toast'
import { isObject, EMediaType, ICommonFormProps, ICommonFormState } from '~utils'

import './index.scss'

export enum EType {
  VIDEO,
  IMAGE
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
 style?: any
 width?: number | false
 height?:number | false
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

export default class extends Component<IProps, IState> {

  private initialValue: Array<IItem> = []

  public state: IState = {
    value: [],
    maxCount: count,
    error: false,
    activeVideo: '',
    isVideo: false
  }

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
    const { value:propsValue } = this.props
    const itemLen = this.value.length
    if(maxCount < itemLen + 1) {
      Toast({
        title: '超出添加数量',
        icon: 'fail'
      })
      return
    }

    this.onChange([ ...stateValue, {url: tempFilePath, type: EMediaType.VIDEO, poster: thumbTempFilePath} ])
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
    const { value:propsValue } = this.props
    const itemLen = this.value.length
    const tempLen = tempFiles.length
    if(maxCount < itemLen + tempLen) {
      Toast({
        title: '超出添加数量',
        icon: 'fail'
      })
      return
    }

    this.onChange([ ...stateValue, ...tempFiles.map((val: any) => {
      const { path } = val
      return {
        url: path,
        type: 'IMAGE'
      }
    })])    
  }

  //删除
  public handleClose = (target: string) => {
    const index = findIndex(this.value, (val: any) => {
      const { url } = val
      return url === target
    })
    if(index < 0) return 
    let data = [...this.value]
    data.splice(index, 1)
    this.onChange(data)
  }

  //change
  public onChange = (value) => {
    const { handleChange, initialValue, value:propsValue } = this.props
    if(this.initialValue === undefined && typeof initialValue !== 'undefined') this.initialValue = initialValue
    if(typeof propsValue === 'undefined') {
      this.setState({value}) 
    }
    handleChange && handleChange(value)
  }

  //重置
  public reset = () => {
    this.setState({
      value: this.initialValue ? this.initialValue : [],
      isVideo: false,
      activeVideo: ''
    })
  }

  //查看视频
  public handlePreviewVideo = (url) => {
    this.setState({
      activeVideo: url,
      isVideo: true
    })
  }

  //查看图片
  public handlePreviewImage = (url: string) => {
    Taro.previewImage({
      current: url,
      urls:[url]
    })
  }

  //获取数据
  public getData = async (emptyCharge=true) => {
    const { value: items } = this.state
    if(!items.length  && emptyCharge) {
      await this.setState({
        error: true
      })
      return false
    }
    await this.setState({
      error: false
    })
    return items
  }

  //关闭视频
  public videoClose = () => {
    this.setState({isVideo: false, activeVideo: ''})
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
      width, 
      height, 
      close=true, 
      error:propsError=false 
    } = this.props

    const { maxCount, activeVideo, isVideo, error: stateError } = this.state

    const buttonStyle = {
      ...style.backgroundColor('disabled'), 
      ...style.color('primary'), 
      ...style.border(1, 'disabled', 'solid', 'all'),
      ...((propsError || stateError) ? FORM_ERROR : {})
    }

    return (
      <View 
        className='media' 
        style={isObject(customStyle) ? customStyle : {}}
      >
        <View 
          className='title at-row at-row__justify--between' 
          style={{display: maxCount === this.value.length ? 'none' : 'flex'}}
        >
          <View className='image-title at-col at-col-5'>
            <View 
              className='at-row at-row__align--center at-row__justify--center btn' 
              style={{...buttonStyle}}
              onClick={this.handleImageChange.bind(this)}
            >
              <View 
                className='at-icon at-icon-image' 
                style={{fontSize: SYSTEM_PAGE_SIZE() + 'px'}}
              ></View>
              <Text>图片选择</Text>
            </View>
          </View>
          <View className='video-title at-col at-col-5 at-col-offset-2'>
            <View 
              className='at-row at-row__align--center at-row__justify--center btn' 
              style={buttonStyle}
              onClick={this.handleVideoChange.bind(this)}
            >
              <View 
                className='at-icon at-icon-video' 
                style={{fontSize: SYSTEM_PAGE_SIZE() + 'px'}}
              ></View>
              <Text>视频选择</Text>
            </View>
          </View>
        </View>
        <View 
          className='main at-row at-row--wrap' 
          style={{marginTop: '10px'}}
        >
          {
            this.value.map((val: any) => {
              const { url, type, poster='' } = val
              return (
                <View 
                  className={'at-col media-content ' + `at-col-${FLEX_MAX_SIZE / length}`} 
                  key={url} 
                  style={{...(width ? {width: width + 'px'} : {}), ...(height ? {height: height + 'px'} : {}), marginBottom: '5px' }}
                >
                  <View className='media-main'>
                    <View 
                      className='at-icon at-icon-close icon' 
                      style={{...style.color('primary'), fontSize: SYSTEM_PAGE_SIZE() + 'px'}}
                      onClick={(e) => {this.handleClose.call(this, url)}}
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
                </View>
              )
            })
          }
        </View> 
        <View 
          className='preview-video' 
          style={{visibility: isVideo ? 'visible' : 'hidden'}}
        >
          {
            <GVideo
              style={{width: '100%', height: '100%', ...(isVideo ? {} : {display: 'none'})}}
              src={activeVideo}
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