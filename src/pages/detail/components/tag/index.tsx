import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import { isObject, ItypeList } from '~utils'
import { TypeColor } from '~theme/color'
import './index.scss'

export interface IProps {
  list: Array<ItypeList>
  style?: any
}

export interface IState {}

const randomArea = () => {
  return Math.ceil(Math.random() * 20) + 'px'
}

const randomColor = () => {
  const COLOR_LIST = [ TypeColor['thirdly'], TypeColor['secondary'], TypeColor['primary'] ]
  const len = COLOR_LIST.length
  return COLOR_LIST[Math.floor(Math.random() * len)]
}

const TAG_STYLE = {
  marginBottom: '5px',
  marginRight: '10px',
  color: '#fff'
}

export default class extends Component<IProps, IState> {

  public render() {

    const { list=[], style } = this.props

    return (
      <View className='tag'>
        {
          list.map((val: ItypeList) => {
            const { id, value } = val
            return (
              <AtTag 
                key={id}
                name={id}
                type='primary' 
                customStyle={{ ...TAG_STYLE, marginLeft: randomArea(), backgroundColor: randomColor(), ...(isObject(style) ? style : {})}}
              >
                {value}
              </AtTag>
            )
          })
        }
      </View>
    )
  }

}