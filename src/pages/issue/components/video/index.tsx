import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import GVideo, { IProps as IVideo } from '../../../detail/components/video'
import { AtButton } from 'taro-ui'

import './index.scss'

import { isObject } from '~utils'

interface IProps {
  info: IVideo
}

interface IState {
  info: IVideo
}

export default class extends Component<IProps, IState> {

  private FIRST = true

  public state: IState = {
    info: {src: '', poster: ''}
  }

  //添加海报
  public handleAddPoster = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'], 
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        const { info } = this.state
        this.setState({
          info: { ...info, poster: tempFilePaths[0] }
        })
      }
    })
  }

  //添加视频
  public handleAddMedia = () => {
    Taro.chooseVideo({
      sourceType: ['album'],
      compressed: true,
      success: (res) => {
        const file = res.tempFilePath
        const { info } = this.state
        this.setState({
          info: { ...info, src: file }
        })
      }
    })
  }

  public render() {

    const { info=false } = this.props

    if(this.FIRST) {
      if(isObject(info)) {
        this.FIRST = false
        const { info: defaultInfo } = this.state
        this.setState({
          info: { ...defaultInfo, ...info  }
        })
      }
    }

    const { info: stateInfo } = this.state
    const { 
      poster,
      src
    } = stateInfo

    return (
      <View>
        <GVideo
          poster={poster}
          src={src}
        ></GVideo>
        <View className='at-row at-row__justify--between'>
          <AtButton onClick={this.handleAddPoster} className='at-col'>添加海报</AtButton>
          <AtButton onClick={this.handleAddMedia} className='at-col'>添加视频</AtButton>
        </View>
      </View>
    )
  }

}