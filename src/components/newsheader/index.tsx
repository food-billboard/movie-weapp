import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Ellipsis from '../ellipsis'
import ImageLoading from '../imageLoading'
import style from '~theme/style'
import { router, routeAlias } from '~utils'
import noop from 'lodash/noop'

import './index.scss'

interface IContent {
  name: string,
  detail: string,
  image: string,
  id: string
}

export interface IProps {
  content: IContent
  style?: React.CSSProperties
  handleSizeChange?: (...args: any[]) => any
}

export interface IState {}

export default class NewsHead extends Component<IProps, IState>{

  public static defaultProps: IProps = {
    content: {
      name: '',
      detail: '',
      image: '',
      id: ''
    },
    style: {},
    handleSizeChange: noop
  }

  componentDidMount = () => {
    const { handleSizeChange } = this.props 
    handleSizeChange && handleSizeChange()
  }

  handleSizeChange = (show) => this.props.handleSizeChange && this.props.handleSizeChange(show)

  public handleClick = (id: string) => router.push(routeAlias.detail, { id })

  public render() {

    const { content, style: propsStyle } = this.props
    const { detail, name, id, image } = content || {}

    return (
      <View className='newsheader'
        style={propsStyle}
        onClick={this.handleClick.bind(this, id)}>
        <View className='newsheader-poster'>
          <ImageLoading src={image} loadingProps={{ content: '' }} mode={'widthFix'} />
        </View>
        <View className='newsheader-detail'>
          <View className="newsheader-detail-content">
            <View className='newsheader-detail-content-name' style={{ ...style.color('primary') }}>
              {name}
            </View>
            <Ellipsis
              text={detail}
              style={{padding: '10rpx 0 10rpx 15rpx', marginTop: '20rpx', ...style.border(1, 'bgColor', 'dashed', 'all'), borderRadius: '10rpx'}}
              needPoint={false}
              onChange={this.handleSizeChange}
            ></Ellipsis>
          </View>
        </View>
        <View className={'enter'}
          style={{ color: 'rgb(193, 193, 193)' }}
        >
          {'>'}
        </View>
      </View>
    )
  }
}