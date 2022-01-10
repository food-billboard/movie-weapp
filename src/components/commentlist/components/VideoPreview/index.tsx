import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { isH5 } from '~utils'
import Curtain from '../../../curtain'
import CurtainVideo from '../curtainVideo'

let PREVIEW_INSTANCE: any 

export const PreviewVideo = (params: {
  src: string
  poster: string 
}) => {
  if(!PREVIEW_INSTANCE) return 
  PREVIEW_INSTANCE.close()
  PREVIEW_INSTANCE.open(params)
}

const needRender = (h5Render: boolean) => {
  return (!h5Render && !isH5) || (h5Render && isH5)
}

export default class VideoPreview extends Component<{
  h5Render?: boolean 
}> {

  state: any = {
    activeVideo: null,
    activeVideoPoster: null
  }

  componentDidMount = () => {
    const { h5Render } = this.props 
    if(needRender(!!h5Render)) {
      PREVIEW_INSTANCE = this
    }
  }

  private curtainRef = React.createRef<Curtain>()

  open = ({
    src,
    poster 
  }: {
    src: string 
    poster: string 
  }) => {
    this.setState({
      activeVideo: src,
      activeVideoPoster: poster 
    }, this.curtainRef.current?.handleShow)
  }

  close = () => {
    this.handleCloseVideo()
    this.handleVideoClose()
  }

  //视频关闭
  private handleCloseVideo = () => this.curtainRef.current?.handleClose()

  //监听视频关闭
  public handleVideoClose = () => {
    this.setState({
      activeVideo: null,
      activeVideoPoster: null
    })
  }

  render() {

    const { activeVideo, activeVideoPoster } = this.state  
    const { h5Render } = this.props

    if(!needRender(!!h5Render)) return null 

    return (
      <Curtain
        ref={this.curtainRef}
        handleClose={this.handleVideoClose}
        curtainStyle={{ backgroundColor: '#000', opacity: 1 }}
        renderMain={
          <CurtainVideo
            src={activeVideo || ''}
            poster={activeVideoPoster || ''}
            handleClose={this.handleCloseVideo}
          ></CurtainVideo>
        }
      ></Curtain>
    )

  }

}