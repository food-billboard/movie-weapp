import Taro, { Component } from '@tarojs/taro'
import { AtTag } from 'taro-ui'
import { View, Text } from '@tarojs/components'
import style from '~theme/style'
import { isObject } from '~utils'

import './index.scss'

export interface IProps {
  title: string
  fontStyle?: any
  dividerStyle?: any
  arrowText?: string
}

export default class extends Component<IProps> {

  public render() {

    const { title, fontStyle={}, dividerStyle={}, arrowText='>' } = this.props

    return (
      <View className='title'>
        <AtTag
          customStyle={{
            ...style.color('primary'),
            ...style.backgroundColor('disabled'),
            position:'relative',
            top: 0,
            left:0,
            zIndex: 2,
            ...(isObject(fontStyle) ? fontStyle : {})
          }}
          className='item-title'
        >{title}</AtTag>
        <View 
          className='divider'
          style={{
            ...style.border(1, 'disabled', 'dashed', 'all'),
            ...(isObject(dividerStyle) ? dividerStyle : {})
          }}
        ></View>
        {/* <AtTag
          customStyle={{
            border: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            padding:0,
            float: 'right',
            margin: '-4px -5px 0 0',
            ...style.color('disabled'),
            fontSize: '40px',
            position:'relative',
            top: 0,
            left:0,
            zIndex: 2,
          }}
        >></AtTag> */}
      </View>
    )
  }

}