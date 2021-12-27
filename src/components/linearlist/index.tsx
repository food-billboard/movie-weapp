import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import { isObject } from '~utils'
import { SYSTEM_PAGE_SIZE } from '~config/media'
import { AtIconBaseProps } from 'taro-ui/types/base'

import './index.scss'

type up = 'up'
type right = 'right'
type down = 'down'

interface IconInfo extends AtIconBaseProps {
  // value: string, 
  size?: string | number,
  // color?: string, 
  // prefixClass?: string,
  // className?: string,
  // customStyle?: string
}

export interface IList {
  title: string,
  disabled?: boolean,
  note?: string,
  arrow?: up | down | right | undefined,
  iconInfo: IconInfo,
  handle?: any,
  id: symbol
}

export interface IProps {
  list: Array<IList>
  style?: React.CSSProperties
}

export default class List extends Component<IProps>{
  public static defaultProps: IProps = {
    list: []
  }

  public render() {

    const { list, style = {} } = this.props

    return (
      <View
        className='list'
        style={isObject(style) ? style : {}}
      >
        <AtList hasBorder>
          {
            list.map((value) => {
              const {
                title = '标签',
                disabled = false,
                note = '',
                arrow = 'right',
                iconInfo,
                handle = () => { },
                id
              } = value
              const _iconInfo = { size: SYSTEM_PAGE_SIZE(24), ...iconInfo }
              return (
                <AtListItem
                  key={id.toString()}
                  title={title}
                  disabled={disabled}
                  onClick={handle}
                  note={note}
                  arrow={arrow}
                  iconInfo={{ ..._iconInfo }}
                />
              )
            })
          }
        </AtList>
      </View>
    )
  }
}