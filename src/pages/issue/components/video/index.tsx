import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import GVideo from '~components/video'
import { AtButton } from 'taro-ui'

import './index.scss'

import { isObject } from '~utils'
import { FORM_ERROR } from '~config'
import { IProps, IState } from './interface'
import { style } from '~theme/global-style'

export default class extends Component<IProps, IState> {

  private FIRST = true

  private initValue:any = false

  public state: IState = {
    info: {src: '', poster: ''},
    srcError: false,
    posterError: false
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
          info: { ...info, poster: tempFilePaths[0] },
          posterError: false
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
          info: { ...info, src: file },
          srcError: false
        })
      }
    })
  }

  //重置
  public reset = () => {
    this.setState({
      info: this.initValue ? this.initValue : { src: '', poster: '' },
      srcError: false,
      posterError: false
    })
  }

  //获取数据
  public getData = async () => {
    const { info } = this.state
    const { src, poster } = info
    if(!src.length || !poster.length) {
      if(!src.length) {
        await this.setState({
          srcError: true
        })
      }
      if(!poster.length) {
        await this.setState({
          posterError: true
        })
      }
      return false
    }
    await this.setState({
      srcError: false,
      posterError: false
    })
    return info
  }

  public render() {

    const { info=false } = this.props

    if(this.FIRST) {
      if(isObject(info)) {
        this.FIRST = false
        const { info: defaultInfo } = this.state
        this.initValue = { ...defaultInfo, ...info }
        this.setState({
          info: { ...defaultInfo, ...info }
        })
      }
    }

    const { info: stateInfo, srcError, posterError } = this.state
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
          <AtButton onClick={this.handleAddPoster} className='at-col' customStyle={{...style.border(1, 'primary', 'solid', 'all'), ...style.color('thirdly'), ...(posterError ? FORM_ERROR : {}) }} >添加海报</AtButton>
          <AtButton onClick={this.handleAddMedia} className='at-col' customStyle={{...style.border(1, 'primary', 'solid', 'all'), ...style.color('thirdly'),  ...(srcError ? FORM_ERROR : {}) }} >添加视频</AtButton>
        </View>
      </View>
    )
  }

}