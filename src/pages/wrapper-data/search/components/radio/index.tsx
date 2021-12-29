import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { withTry } from '~utils'
import { getOrderList } from '~services'
import './index.scss'

export interface IProps {
  screen: (value: string) => void
}

export interface IRadio {
  id: string
  label: string
}

export interface List {
  label: string,
  value: string,
  id: string
}

export interface IState {
  text: string,
  show: boolean,
  radioList: Array<List>
}

export default class RadioList extends Component<IProps>{

  public state: IState = {
    text: '综合',
    show: false,
    radioList: []
  }

  public componentDidMount = async () => {
    await this.fetchData()
  }

  //数据获取
  public fetchData = async () => {
    Taro.showLoading({ mask: true, title: '稍等一下' })
    const [, data] = await withTry(getOrderList)()
    Taro.hideLoading()
    data && this.setState({
      radioList: [
        ...data.map((val: any) => {
          const { name, _id } = val
          return {
            value: _id,
            label: name,
          }
        }),
        {
          value: '',
          label: '综合'
        }
      ]
    })
  }

  //条件选择
  public handleChange = (label: string, value: string) => {
    this.setState({
      text: label,
    })
    this.handleClose()
    this.props.screen(value)
  }

  //列表显示控制
  public showList = () => {
    const { show } = this.state
    this.setState({
      show: !show
    })
  }

  //关闭表单
  public handleClose = () => {
    this.setState({
      show: false
    })
  }

  public render() {
    const { text, show, radioList } = this.state

    return (
      <View className='page-search-radio'>
        <Text className='page-search-radio-select normal-font-size-class'
          onClick={this.showList}
        >
          {text}
        </Text>

        <AtActionSheet
          isOpened={show}
          cancelText='取消'
          title='排序方式'
          onCancel={this.handleClose}
          onClose={this.handleClose}
        >
          {
            radioList.map((val: List) => {
              const { label, value } = val
              return (
                <AtActionSheetItem
                  key={value}
                  onClick={() => { this.handleChange.call(this, label, value) }}
                >
                  {label}
                </AtActionSheetItem>
              )
            })
          }
        </AtActionSheet>
      </View>
    )
  }
}