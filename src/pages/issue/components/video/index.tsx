import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import GVideo from '~components/video'
import { AtButton } from 'taro-ui'
import { isObject } from '~utils'
import { FORM_ERROR } from '~config'
import { IProps, IState } from './index.d'
import style from '~theme/style'
import { noop } from 'lodash'

import './index.scss'

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
    const { handleOnChange=noop } = this.props
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
        }, () => {
          handleOnChange(this.state.info)
        })
      }
    })
  }

  //添加视频
  public handleAddMedia = () => {
    const { handleOnChange=noop } = this.props
    Taro.chooseVideo({
      sourceType: ['album'],
      compressed: true,
      success: (res) => {
        const file = res.tempFilePath
        const { info } = this.state
        this.setState({
          info: { ...info, src: file },
          srcError: false
        }, () => {
          handleOnChange(this.state.info)
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

    const { info=false, error=false } = this.props

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

    const commonStyle = {
      ...style.border(1, 'primary', 'solid', 'all'), 
      ...style.color('thirdly')
    }

    return (
      <View>
        <GVideo
          poster={poster}
          src={src}
        ></GVideo>
        <View className='at-row at-row__justify--between'>
          <AtButton onClick={this.handleAddPoster} className='at-col' customStyle={{...commonStyle, ...((posterError || error) ? FORM_ERROR : {}) }} >添加海报</AtButton>
          <AtButton onClick={this.handleAddMedia} className='at-col' customStyle={{...commonStyle,  ...((srcError || error) ? FORM_ERROR : {}) }} >添加视频</AtButton>
        </View>
      </View>
    )
  }

}