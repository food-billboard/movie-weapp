import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import GVideo from '~components/video'
import { AtButton } from 'taro-ui'
import { isObject } from '~utils'
import { FORM_ERROR } from '~config'
import style from '~theme/style'
import { noop } from 'lodash'
import { IProps as IVideo } from '~components/video/index.d'

import './index.scss'

export interface IProps {
  info?: IVideo | false
  initialValue?: IVideo
  error?:boolean
  handleOnChange?: (...args: any[]) => any
}

export interface IState {
  info: IVideo
  srcError: boolean
  posterError: boolean
}

const defaultInfo = {src: '', poster: ''}

export default class extends Component<IProps, IState> {

  public static defaultProps:IProps = {
    info: false
  }

  private initialValue:any = false

  public state: IState = {
    info: {...defaultInfo},
    srcError: false,
    posterError: false
  }

  private _value

  private get value() {
    const { info:propsValue, initialValue } = this.props
    const { info: stateValue } = this.state
    if(propsValue !== false) {
      return propsValue || {...defaultInfo}
    }else {
      if(this.initialValue === undefined && typeof initialValue !== 'undefined') {
        return initialValue
      }
      return stateValue
    }
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
          handleOnChange({
            ...this.value,
            poster: tempFilePaths[0]
          })
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
          handleOnChange({
            ...this.value,
            src: file
          })
        })
      }
    })
  }

  //重置
  public reset = () => {
    this.setState({
      info: this.initialValue ? this.initialValue : { src: '', poster: '' },
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

    const { error=false } = this.props

    const { srcError, posterError } = this.state

    const commonStyle = {
      ...style.border(1, 'primary', 'solid', 'all'), 
      ...style.color('thirdly')
    }

    return (
      <View>
        <GVideo
          poster={this.value.poster || ''}
          src={this.value.src || ''}
        ></GVideo>
        <View className='at-row at-row__justify--between'>
          <AtButton onClick={this.handleAddPoster} className='at-col' customStyle={{...commonStyle, ...((posterError || error) ? FORM_ERROR : {}) }} >添加海报</AtButton>
          <AtButton onClick={this.handleAddMedia} className='at-col' customStyle={{...commonStyle,  ...((srcError || error) ? FORM_ERROR : {}) }} >添加视频</AtButton>
        </View>
      </View>
    )
  }

}