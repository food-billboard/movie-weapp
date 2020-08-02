import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import { FORM_ERROR } from '~config'
import style from '~theme/style'
import { AtTagProps } from 'taro-ui/types/tag'

import './index.scss'

export interface Item {
  name:string
  key: string
}

export interface IProps extends AtTagProps {
  list: Array<Item>
  error?: boolean
  style?: React.CSSProperties
  handleChange: (items: Array<Item>) => any
}

export interface IState {}

export default class extends Component<IProps, IState> {

  public handleAppend = (item: Item) => {
    const { list } = this.props
    const { name, key } = item
    const exists = list.some(l => l.name === name && l.key === key)
    let realList = [...list]
    if(exists) {
      Taro.showToast({mask: false, icon: 'none', title: 'exists~'})
    }else {
      realList = [ ...realList, item ]
      Taro.showToast({mask: false, icon: 'none', title: 'success~'})
    }
    this.props.handleChange && this.props.handleChange(realList)
  }

  public handleDelete = (item: Item) => {
    const that = this
    Taro.showModal({
      title: '提示',
      content: '是否删除?',
      success: function(res) {
        const { confirm } = res
        if(confirm) {
          const { name, key } = item
          const { list } = that.props
          const newList = list.filter(item => item.name !== name && item.key !== key)
          Taro.showToast({mask: false, icon: 'none', title: 'success~'})
          that.props.handleChange && that.props.handleChange(newList)
        }
      }
    })
  }

  public render() {

    const { 
      error=false, 
      style:customerStyle={}, 
      list=[], 
      size='normal', 
      type='secondary', 
      name, 
      circle=true, 
      active=false, 
      disabled=false 
    } = this.props
    
    return (
      <View className="tag-list at-row at-row--wrap at-row__justify--around"
        style={{ ...style.border(1, 'secondary', 'solid', 'all'), borderRadius: '20px', ...customerStyle, ...(error ? FORM_ERROR : {}) }}
      >
        {
          list.map((item: Item) => {
            const { name:itemName, key } = item
            return (
              <View className="at-col at-col-3">
                <AtTag
                  customStyle={{...style.backgroundColor('disabled')}}
                  key={key}
                  size={size}
                  type={type}
                  name={name}
                  circle={circle}
                  active={active}
                  disabled={disabled}
                  onClick={this.handleDelete.bind(this, item)}
                >
                  {itemName}
                </AtTag>
              </View>
            )
          })
        }
      </View>
    )
  }
}