import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Ellipsis from '../ellipsis'
import ImageLoading from '../imageLoading'
import style from '~theme/style'
import { router, routeAlias } from '~utils'

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

export interface IState {

}

export default class NewsHead extends Component<IProps, IState>{

  public static defaultProps: IProps = {
    content: {
      name: '',
      detail: '',
      image: '',
      id: ''
    },
    style: {}
  }

  handleSizeChange = (show) => this.props.handleSizeChange && this.props.handleSizeChange(show)

  public handleClick = (id: string) => router.push(routeAlias.detail, { id })

  public render() {

    const { content, style: propsStyle } = this.props
    const { detail, name, id, image } = content

    return (
      <View className='newsheader'
        style={propsStyle}
        onClick={this.handleClick.bind(this, id)}>
        <View className='newsheader-poster'>
          <ImageLoading src={image} loadingProps={{ content: '' }} mode={'scaleToFill'} />
        </View>
        <View className='newsheader-detail'>
          <View className='newsheader-detail-name' style={{ ...style.color('primary') }}>
            {name}
          </View>
          <Ellipsis
            text={detail}
            style={{padding:0}}
            needPoint={false}
            onChange={this.handleSizeChange}
          ></Ellipsis>
          {/* <Text className='newsheader-detail-desc' style={{ ...style.color('thirdly') }}>
            {detail}
          </Text> */}
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