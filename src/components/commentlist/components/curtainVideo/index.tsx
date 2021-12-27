import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import GVideo from '../../../video'

interface IProps {
  src: string
  poster: string
  handleClose: () => any
}

interface IState {}

export default class extends Component<IProps, IState> {

  private click: {
    count: number,
    time: number
  } = {
    count: 0,
    time: 0
  }

  public handleCloseVideo = () => {
    const { count, time } = this.click
    let config: {
      count: number,
      time: number
    } = {
      count: 0,
      time: Date.now()
    }
    if(count === 1) {
      if(Date.now() - time <= 300) {
        this.props.handleClose && this.props.handleClose()
      }
      config = {
        ...config,
        count:0,
      }
    }else {
      config= {
        ...config,
        count: 1,
      }
    }
    this.click = { ...config }
  }

  public render() {

    const { src, poster } = this.props

    return (
      <View
        className='comment-item-video'
        onClick={this.handleCloseVideo}
      >
        <GVideo
          style={{ width: '100%', height: '100%' }}
          src={src || ''}
          autoplay
          poster={poster || ''}
        ></GVideo>
      </View>
    )
  }

}