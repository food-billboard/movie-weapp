import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import GVideo from '../video'
import { IProps, IState, IItem } from './index.d'
import { IMAGE_CONFIG, SYSTEM_PAGE_SIZE } from '~config'
import style from '~theme/style'
import { findIndex } from 'lodash'
import { Toast } from '~components/toast'
import { isObject, mediaType } from '~utils'

import './index.scss'

const { count } = IMAGE_CONFIG

const FLEX_MAX_SIZE = 12

export default class extends Component<IProps, IState> {

  private FIRST = true

  private initValue: Array<IItem> = []

  public state: IState = {
    items: [],
    maxCount: count,
    error: false,
    activeVideo: '',
    isVideo: false
  }

  //媒体选择
  public handleSelect = (type:keyof typeof mediaType) => {
    if(mediaType[type] === mediaType.image) {
      return Taro.chooseImage({
        count: IMAGE_CONFIG.count, 
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
      })
    }else if(mediaType[type] === mediaType.video) {
      return Taro.chooseVideo({
        sourceType: ['album']
      })
    }
  }

  //视频选择
  public handleVideoChange = async () => {
    const response: any = await this.handleSelect('video')
    const { errMsg } = response
    if(errMsg.split(':')[1] !== 'ok') {
      return
    }
    const { tempFilePath, thumbTempFilePath } = response
    const { items, maxCount } = this.state
    const itemLen = items.length
    if(maxCount < itemLen + 1) {
      Toast({
        title: '超出添加数量',
        icon: 'fail'
      })
      return
    }
    this.setState({
      items: [ ...items, {url: tempFilePath, type: 'video', poster: thumbTempFilePath} ]
    }) 
  }

  //图片选择
  public handleImageChange = async () => {
    const response: any = await this.handleSelect('image')
    const { errMsg } = response
    if(errMsg.split(':')[1] !== 'ok') {
      return
    }
    const { tempFiles=[] } = response
    const { items, maxCount } = this.state
    const itemLen = items.length
    const tempLen = tempFiles.length
    if(maxCount < itemLen + tempLen) {
      Toast({
        title: '超出添加数量',
        icon: 'fail'
      })
      return
    }
    this.setState({
      items: [ ...items, ...tempFiles.map((val: any) => {
        const { path } = val
        return {
          url: path,
          type: 'image'
        }
      })]
    })     
  }

  //删除
  public handleClose = (target: string) => {
    const { items } = this.state
    const index = findIndex(items, (val: any) => {
      const { url } = val
      return url === target
    })
    if(index < 0) return 
    let data = [...items]
    data.splice(index, 1)
    this.setState({
      items: data
    })
  }

  //重置
  public reset = () => {
    this.setState({
      items: this.initValue ? this.initValue : [],
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
    const { items } = this.state
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

  public render() {

    const { files=false, length=3, style: customStyle={}, width, height, close=true } = this.props

    //处理props数据
    if(this.FIRST) {
      if(Array.isArray(files) && files.length) {
        this.FIRST = false
        this.initValue = files
        this.setState({
          items: files
        })
      }
    }

    const { maxCount, items, activeVideo, isVideo } = this.state

    return (
      <View className='media' style={isObject(customStyle) ? customStyle : {}}>
        <View className='title at-row at-row__justify--between' style={{display: maxCount === items.length ? 'none' : 'flex'}}>
          <View className='image-title at-col at-col-5'>
            <View 
              className='at-row at-row__align--center at-row__justify--center btn' 
              style={{...style.backgroundColor('disabled'), ...style.color('primary'), ...style.border(1, 'disabled', 'solid', 'all')}}
              onClick={this.handleImageChange.bind(this)}
            >
              <View className='at-icon at-icon-image' style={{fontSize: SYSTEM_PAGE_SIZE() + 'px'}}></View>
              <Text>图片选择</Text>
            </View>
          </View>
          <View className='video-title at-col at-col-5 at-col-offset-2'>
            <View 
              className='at-row at-row__align--center at-row__justify--center btn' 
              style={{...style.backgroundColor('disabled'), ...style.color('primary'), ...style.border(1, 'disabled', 'solid', 'all')}}
              onClick={this.handleVideoChange.bind(this)}
            >
              <View className='at-icon at-icon-video' style={{fontSize: SYSTEM_PAGE_SIZE() + 'px'}}></View>
              <Text>视频选择</Text>
            </View>
          </View>
        </View>
        <View className='main at-row at-row--wrap' style={{marginTop: '10px'}}>
          {
            items.map((val: any) => {
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
                      type === 'image' ?
                      <Image
                        onClick={() => {this.handlePreviewImage.call(this, url)}}
                        className='image'
                        src={url}
                      ></Image>
                      : null
                    }
                    {
                      type === 'video' ?
                      <Image 
                        onClick={() => {this.handlePreviewVideo.call(this, url)}}
                        src={poster}
                        className='video'
                      ></Image>
                      : null
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