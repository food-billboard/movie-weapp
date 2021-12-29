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
import TagList, { Item as TagItem } from '../tagList'

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
  value: TagItem
  index: number
}

export interface IProps extends ICommonFormProps {
  title?: string
  value: Array<TagItem>
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

class Rest extends Component<IProps> {

  public static normalizeData = (data: string | string[]) => {
    return (Array.isArray(data) ? data : [data]).map(item => {
      return {
        name: item,
        key: item 
      }
    })
  }

  public isExists = (value: string) => {
    return !!(this.props.value.some(item => item.name === value))
  }

  //输入框
  public inputRef = React.createRef<GInput>()

  //添加
  public handleAdd = async () => {
    const data = await this.inputRef.current!.getData()
    const { value } = this.props
    if(typeof data === "string" && this.isExists(data)) {
      return Taro.showToast({
        title: '名称重复',
        icon: 'none',
        duration: 500,
        mask: false
      })
    }
    if (data) {
      const newItem = Rest.normalizeData(data)

      //新数据
      const newValue = [...value, ...newItem]
      this.props.handleChange?.(newValue)
      this.inputRef.current!.reset()

      this.props.handleError?.(false)

      Taro.showToast({
        title: '成功~',
        icon: 'none',
        duration: 500,
        mask: false
      })
    }
  }

  onSelectChange = async (selectValue) => {
    this.props.handleChange?.(selectValue)
  }

  public render() {

    const {
      title,
      style,
      error = false,
      value
    } = this.props

    const _style = {
      ...(isObject(style) ? style : {}),
      ...(error ? FORM_ERROR : {})
    }

    return (
      <View
        className='component-rest'
        style={_style}
      >
        {
          !!title &&
            <AtTag
              customStyle={{ ...TAT_STYLE, ...customStyle.border(1, 'primary', 'dashed', 'all'), ...customStyle.color('thirdly') }}
              type='primary'
            >
              {title}
            </AtTag>
        }
        <TagList
          style={{marginBottom: '10px'}}
          list={value}
          handleChange={this.onSelectChange}
        ></TagList>
        <View className='component-rest-input at-row'>
          <View className='at-col at-col-2 '>
            <AtButton
              onClick={this.handleAdd}
              type='primary'
              customStyle={{ ...customStyle.backgroundColor('primary') }}
              className='component-rest-input-btn'
            >添加</AtButton>
          </View>
          <View className='at-col at-col-10'>
            <GInput
              style={{ ...customStyle.backgroundColor('disabled'), marginLeft: 0 }}
              ref={this.inputRef}
            ></GInput>
          </View>
        </View>
      </View>
    )
  }

}

export default Rest