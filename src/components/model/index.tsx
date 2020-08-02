import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtButton } from "taro-ui"
import style from '~theme/style'
import { noop } from '~lodash'

import './index.scss'

export interface Info {
  isOpen: boolean,
  title: string,
  cancelText?: string,
  confirmText: string,
  onClose?: () => any,
  onCancel?: () => any,
  onConfirm: () => any,
  content: string
}

export interface IProps {
  info: Info
  renderContent?: any
  content?: boolean
}

export default class Setting extends Component<IProps>{
  public static defaultProps = {
    info: {
      isOpen: false,
      title: '提示',
      cancelText: '算了',
      confirmText: '没错',
      onClose: noop,
      onCancel: noop,
      onConfirm: noop,
      content: '确认信息'
    }
  }

  public render() {
    const { info, content: renderContent = false } = this.props
    const {
      isOpen,
      title,
      cancelText = '',
      confirmText,
      onClose,
      onCancel,
      onConfirm,
      content
    } = info
    return (
      <AtModal
        isOpened={isOpen}
        onCancel={onCancel}
      >
        {
          title && title.length ?
            <AtModalHeader><Text style={{ ...style.color('primary') }}>{title}</Text></AtModalHeader>
            : null
        }
        <AtModalContent>
          {
            renderContent ?
              this.props.renderContent :
              <Text style={{ ...style.color('thirdly') }}>{content}</Text>
          }
        </AtModalContent>
        {
          (cancelText && cancelText.length) || (confirmText && confirmText.length) ?
            <AtModalAction>
              <View className='at-row'>

                {
                  cancelText && cancelText.length ?
                    <View className='at-col'><AtButton customStyle={{ border: 'none', ...style.color('primary') }} onClick={onClose}>{cancelText}</AtButton></View>
                    : null
                }
                {
                  confirmText && confirmText.length ?
                    <View className='at-col'><AtButton customStyle={{ border: 'none', ...style.color('primary') }} onClick={onConfirm}>{confirmText}</AtButton></View>
                    : null
                }
              </View>
            </AtModalAction>
            : null
        }
      </AtModal>
    )
  }

}