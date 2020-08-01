import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import { SYSTEM_PAGE_SIZE } from '~config'
import { TypeColor } from '~theme/color'
import style from '~theme/style'
import { noop } from 'lodash'
import { isObject } from '~utils'
import { ImageProps } from '@tarojs/components/types/Image'
import { AtActivityIndicatorProps } from 'taro-ui/@types/activity-indicator'

import './index.scss'

export interface IProps extends ImageProps {
  loadingProps?: AtActivityIndicatorProps
  border?: false | string
  customStyle?: React.CSSProperties
  imageStyle?: React.CSSProperties
  handleClick?: (...args: any[]) => any
}

export interface IState {
  loading: boolean
}

export default class extends Component<IProps, IState> {

  public state: IState = {
    loading: true
  }

  public handleLoad = (event) => {
    const { onLoad } = this.props
    if (onLoad) onLoad(event)
    this.setState({
      loading: false
    })
  }

  public handleError = (e) => {
    const { onError } = this.props
    if (onError) onError(e)
  }

  public handleClick = (e) => {
    const { handleClick } = this.props
    if (handleClick) handleClick(e)
  }

  public render() {

    const {
      //img
      src,
      webp = false,
      mode = 'scaleToFill',
      lazyLoad = true,
      showMenuByLongpress = false,
      //loading
      loadingProps = {},
      customStyle = false,
      border = false,
      imageStyle = false,
    } = this.props
    
    const {
      size = 32,
      mode: loadingMode = 'center',
      color = TypeColor.primary,
      content = '加载中...'
    } = loadingProps
    const { loading } = this.state
    const contentStyle = {
      width: '100%',
      height: '100%',
      ...(loading ? style.backgroundColor('disabled') : {}),
      ...(
        typeof border === 'string' ?
          { border }
          :
          {}
      ),
      ...(
        isObject(customStyle) ?
          customStyle
          :
          {}
      )
    }

    return (
      <View
        className='loading'
        onClick={this.handleClick}
        style={contentStyle}
      >
        {/* {
          loading ?
          <View className='avatar'>图</View>
          :
          null
        } */}
        {
          loading ?
            <AtActivityIndicator
              content={content}
              color={color}
              mode={loadingMode}
              size={SYSTEM_PAGE_SIZE(size)}
            ></AtActivityIndicator>
            : null
        }
        <Image
          style={{ visibility: loading ? 'hidden' : 'visible', width: '100%', height: '100%', ...(isObject(imageStyle) ? imageStyle : {}) }}
          src={src}
          webp={webp}
          mode={mode}
          lazyLoad={lazyLoad}
          showMenuByLongpress={showMenuByLongpress}
          onError={(e) => this.handleError.call(this, e)}
          onLoad={(e) => this.handleLoad.call(this, e)}
        />
      </View>
    )
  }

}