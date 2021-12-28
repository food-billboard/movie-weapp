import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { Button, View } from '@tarojs/components'
import noop from 'lodash/noop'
import { IMAGE_CONFIG, SYSTEM_PAGE_SIZE } from '~config'
import { AtTextarea } from "taro-ui"
import style from '~theme/style'
import { Upload, TaroShowModal } from '~utils'
import MediaPicker, { IItem, EType } from '../mediaPicker'
import Curtain from '../curtain'

import './index.scss'

// --------------此组件当前不用
export interface IProps {
  buttonText: string,
  publishCom: (value: any) => any
}

export interface IState {
  value: string
  isOpen: boolean
}

export default class Comment extends Component<IProps>{

  public static defaultProps: IProps = {
    buttonText: '发送评论',
    publishCom: noop
  }

  public state: IState = {
    value: '说点什么吧...',
    isOpen: false
  }

  readonly mediaPickerRef = React.createRef<MediaPicker>()

  //图片提交的配置
  readonly imageConfig = {
    ...IMAGE_CONFIG,
  }

  //modal打开
  public open = () => {
    this.setState({
      isOpen: true
    })
  }

  //modal关闭
  public close = async (complete: boolean = false) => {
    if (!complete) {
      const data = this.mediaPickerRef.current!.state!.isVideo
      if (data) return this.mediaPickerRef.current!.videoClose()
      await TaroShowModal({
        title: '温馨提示',
        content: '你填写的内容还没有提交，是否关闭',
      }).then(res => {
        const { confirm } = res
        if (!confirm) return
        this.reset()
      })
    } else {
      this.reset()
    }
  }

  /**
   * 监听数据改变
   */
  public handleChange = (event) => {
    const { target: { value } } = event
    this.setState({
      value
    })
  }

  //阻止手指滑动
  public handleStopMove = e => e.stopPropagation()

  //重置
  public reset = () => {
    this.setState({
      isOpen: false,
      value: '说点什么吧...'
    })
    this.mediaPickerRef.current!.reset()
  }

  /**
   * 发布评论
   */
  public publish = async () => {
    const { value } = this.state
    const ref = this.mediaPickerRef.current
    if (!ref) {
      Taro.showToast({
        title: '请重试',
        duration: 500,
        mask: false
      })
    }
    const data = await this.mediaPickerRef.current!.getData(false)
    let image: Array<any> = [],
      video: Array<any> = []

    //文件预先上传
    if (data) {
      data.map((val: IItem) => {
        const { url, type } = val
        if (type === EType.IMAGE) {
          image.push(url)
        } else if (type === EType.VIDEO) {
          video.push(url)
        }
      })
    }

    let count = 0

    const imageList = await Promise.all(image.map(item => {
      return Upload(item)
        .then((response) => {
          let realData
          if (Array.isArray(response)) {
            realData = response[0]
          } else {
            realData = response
          }
          if (!realData._id) {
            count++
            return null
          }
          return realData._id
        })
    }))
    const videoList = await Promise.all(video.map(item => {
      return Upload(item)
        .then(response => {
          let realData
          if (Array.isArray(response)) {
            realData = response[0]
          } else {
            realData = response
          }
          if (!realData._id) {
            count++
            return null
          }
          return realData._id
        })
    }))

    if (count > 0) {
      Taro.showToast({ mask: true, title: '有文件上传未成功, 请重试', duration: 500 })
      return
    }

    this.close(true)


    //评论发布
    this.props.publishCom({ text: value, image: imageList, video: videoList })
  }

  public render() {
    const { isOpen } = this.state
    const { buttonText } = this.props

    return (
      <Curtain
        isOpen={isOpen}
        // title={false}
        // main
        // action
        // other
        handleClose={() => { this.close.call(this) }}
        // cancel={false}
        contentStyle={{ width: SYSTEM_PAGE_SIZE(300) + 'px' }}
        renderMain={
          <View
            className='main'
            style={{ width: SYSTEM_PAGE_SIZE(300) + 'px' }}
          >
            {
              isOpen ?
                <AtTextarea
                  className='textarea'
                  value={this.state.value}
                  onChange={this.handleChange.bind(this)}
                  maxLength={250}
                  height={280}
                  placeholder='说点什么吧...'
                  fixed
                  textOverflowForbidden
                  customStyle={{ ...style.backgroundColor('disabled') }}
                />
                : null
            }
            <MediaPicker
              style={{ marginTop: '20px' }}
              ref={this.mediaPickerRef}
              // height={70}
              close={false}
            ></MediaPicker>
          </View>
        }
        renderAction={
          <Button
            className='action'
            onClick={this.publish}
            style={{ ...style.backgroundColor('disabled'), ...style.color('primary') }}
          >
            {buttonText}
          </Button>
        }
      ></Curtain>
    )
  }
}