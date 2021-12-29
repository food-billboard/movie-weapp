import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import { isObject } from '~utils'
import { TypeColor } from '~theme/color'
import './index.scss'

export interface IProps {
  list: API_USER.ItypeList[]
  style?: React.CSSProperties
}

export interface IState { }

const typeColor = TypeColor()

const randomColor = () => {
  const COLOR_LIST = [typeColor['thirdly'], typeColor['secondary'], typeColor['primary']]
  const len = COLOR_LIST.length
  return COLOR_LIST[Math.floor(Math.random() * len)]
}

const TAG_STYLE: any = {
  color: '#fff',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  maxWidth: '20vw'
}

export default class extends Component<IProps, IState> {

  public render() {

    const { list = [], style } = this.props

    return (
      <View className='movie-detail-tag'>
        {
          list.map((val: API_USER.ItypeList) => {
            const { id, value } = val
            return (
              <AtTag
                key={id || value}
                name={id || value}
                type='primary'
                customStyle={{ ...TAG_STYLE, backgroundColor: randomColor(), ...(isObject(style) ? style : {}) }}
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