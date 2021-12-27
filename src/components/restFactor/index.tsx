import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtTimeline, AtButton, AtTag } from 'taro-ui'
import { Item } from 'taro-ui/types/timeline'
import { isObject, ICommonFormProps } from '~utils'
import customStyle from '~theme/style'
import { TypeColor } from '~theme/color'
import { FORM_ERROR } from '~config'
import GInput from '../input'

import './index.scss'

interface IDefaultItemStyle {
  icon: string
  color: string
}

interface IOperate<T> {
  add: T
  cancel: T
}

export const operateType: IOperate<TStatus> = {
  add: 'add',
  cancel: 'cancel'
}

export type TStatus = 'add' | 'cancel'

export interface IStatusData {
  value: Item
  index: number
}

export interface IProps extends ICommonFormProps {
  title?: string
  value: Array<Item>
  defaultItemStyle?: IDefaultItemStyle | false
  handleError?: (status) => any
  error?: boolean
}

export interface IState {
  disabled: boolean
  status: Array<TStatus>
  statusData: Array<IStatusData>
}

const TAT_STYLE: any = {
  boxSizing: 'border-box',
  border: `1px dashed ${TypeColor()['primary']}`,
  width: '100%',
  marginBottom: '5px',
  color: TypeColor()['primary']
}

const itemStyleIconList = [
  'mail', 'star', 'share', 'list', 'tag', 'file-generic', 'align-center', 'align-left',
  'align-right', 'text-underline', 'text-strikethrough', 'text-italic', 'sketch'
]

const itemStyleColorList = [
  TypeColor()['primary'], TypeColor()['secondary'], TypeColor()['disabled'], TypeColor()['thirdly']
]

//获取默认项目样式
const getDefaultItemStyle = () => {
  const iconLen = itemStyleIconList.length
  const colorLen = itemStyleColorList.length
  return {
    icon: itemStyleIconList[Math.floor(Math.random() * iconLen)],
    color: itemStyleColorList[Math.floor(Math.random() * colorLen)]
  }
}

class Rest extends Component<IProps, IState> {

  public static normalizeData = (data: ((string | Item)[] | string | Item), defaultItemStyle = getDefaultItemStyle()) => {
    const isSingle = !Array.isArray(data)
    const realData = Array.isArray(data) ? data : [data]
    const dealData = realData.map(item => {
      const initItem = typeof item === 'string' ? { title: item } : { ...item }
      return {
        ...defaultItemStyle,
        ...initItem
      }
    })
    return isSingle ? dealData[0] : dealData
  }

  public state: IState = {
    disabled: true,
    status: [],
    statusData: []
  }

  //输入框
  public inputRef = React.createRef<GInput>()

  //添加
  public handleAdd = async () => {
    const data = await this.inputRef.current!.getData()
    if (data) {
      const { status, statusData } = this.state
      const { value } = this.props
      const itemLen = value.length
      const newItem = Rest.normalizeData(data) as Item

      const newStatusData: IStatusData = {
        value: newItem,
        index: itemLen
      }
      //新数据
      const newValue = [...value, newItem]
      this.setState({
        disabled: false,
        //记录最近操作
        status: [...status, operateType.add],
        statusData: [...statusData, newStatusData],
      }, () => {
        this.props.handleChange && this.props.handleChange(newValue)
        this.inputRef.current!.reset()
      })

      this.props.handleError && this.props.handleError(false)
      Taro.showToast({
        title: '成功~',
        icon: 'none',
        duration: 500,
        mask: false
      })
    }
  }

  //删除
  public handleDelete = async () => {
    const { disabled } = this.state
    if (disabled) return

    const data = await this.inputRef.current!.getData()

    if (data) {  //输入框中有内容
      const { status, statusData } = this.state
      const { value } = this.props
      const index = value.findIndex((val: any) => val.title === data)

      let config: any = { title: '' }

      //查看输入框内容是否在timeline中存在
      if (index < 0) {
        config = { ...config, title: '好像没有找到', icon: 'none', duration: 500 }
      } else {
        config = { ...config, title: '操作成功', icon: 'none', duration: 500 }
        let newValue = [...value]
        const [deleteItem]: Array<Item> = newValue.splice(index, 1)
        this.setState({
          disabled: newValue.length ? false : true,
          //记录最近操作
          status: [...status, operateType.cancel],
          statusData: [...statusData, {
            value: deleteItem,
            index: index
          }
          ]
        }, () => {
          this.props.handleChange && this.props.handleChange(newValue)
          this.inputRef.current!.reset()
        })
      }
      Taro.showToast(config)
    }
  }

  //撤销
  public handleCancel = async () => {
    const { disabled, status, statusData } = this.state
    const { value } = this.props
    if (disabled) return
    if (!status.length) return
    let newValue = [...value]
    const _status = [...status]
    const _statusData = [...statusData]
    const [__status]: Array<TStatus> = _status.splice(_status.length - 1, 1)
    const [__statusData]: Array<IStatusData> = _statusData.splice(_statusData.length - 1)

    //判断需要撤销的操作
    const { value: prevOp, index } = __statusData
    if (__status === operateType.add) {
      newValue.splice(index, 1)
    } else if (__status === operateType.cancel) {
      newValue.splice(index, 0, prevOp)
    }

    this.setState({
      disabled: newValue.length ? false : true,
      status: status.length === _status.length ? status : _status,
      statusData: statusData.length === _statusData.length ? statusData : _statusData
    }, () => {
      this.props.handleChange && this.props.handleChange(newValue)
      this.inputRef.current!.reset()
    })
  }

  public render() {

    const {
      title,
      style,
      error = false,
      value
    } = this.props

    const { disabled } = this.state

    const _style = {
      ...(isObject(style) ? style : {}),
      ...(error ? FORM_ERROR : {})
    }

    return (
      <View
        className='rest'
        style={_style}
      >
        {
          title ?
            <AtTag
              customStyle={{ ...TAT_STYLE, ...customStyle.border(1, 'primary', 'dashed', 'all'), ...customStyle.color('thirdly') }}
              type='primary'
            >
              {title}
            </AtTag>
            : null
        }
        <AtTimeline
          items={value}
        ></AtTimeline>
        <View className='input at-row'>
          <View className='at-col at-col-2'>
            <AtButton
              onClick={this.handleAdd}
              type='primary'
              customStyle={{ ...customStyle.backgroundColor('primary') }}
            >添加</AtButton>
          </View>
          <View className='at-col at-col-6'>
            <GInput
              style={{ ...customStyle.backgroundColor('disabled'), marginLeft: 0 }}
              ref={this.inputRef}
            ></GInput>
          </View>
          <View className='at-col at-col-2'>
            <AtButton
              onClick={this.handleDelete}
              type='primary'
              customStyle={{ ...(disabled ? customStyle.backgroundColor('thirdly') : customStyle.backgroundColor('secondary')) }}
            >删除</AtButton>
          </View>
          <View className='at-col at-col-2'>
            <AtButton
              onClick={this.handleCancel}
              type='primary'
              customStyle={{ ...(disabled ? customStyle.backgroundColor('thirdly') : customStyle.backgroundColor('secondary')) }}
            >撤销</AtButton>
          </View>
        </View>
      </View>
    )
  }

}

export default Rest