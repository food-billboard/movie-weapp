import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTimeline, AtButton, AtTag } from 'taro-ui'
import GInput from '../input'
import { IProps, IState } from './interface'
import { Toast, IQuery } from '~components/toast'
import { Item } from 'taro-ui/@types/timeline'
import { isObject } from '~utils'
import { TypeColor, style as customStyle } from '~theme/global-style'
import { findIndex } from 'lodash'

import './index.scss'

const TAT_STYLE = {
  boxSizing: 'border-box', 
  border: `1px dashed ${TypeColor['primary']}`,
  width:'100%', 
  marginBottom: '5px', 
  color: TypeColor['primary']
}

const itemStyleIconList = [
  'mail', 'star', 'share', 'list', 'tag', 'file-generic', 'align-center', 'align-left',
  'align-right', 'text-underline', 'text-strikethrough', 'text-italic', 'sketch'
]

const itemStyleColorList = [
  TypeColor['primary'], TypeColor['secondary'], TypeColor['disabled']
]

const getDefaultItemStyle = () => {
  const iconLen = itemStyleIconList.length
  const colorLen = itemStyleColorList.length
  const data = {
    icon: itemStyleIconList[Math.floor(Math.random() * iconLen)],
    color: itemStyleColorList[Math.floor(Math.random() * colorLen)]
  }
  return data
}

export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    title: false,
    style: false,
    defaultItemStyle: false,
    item: false
  }

  public state: IState = {
    item: [],
    error: false,
    disabled: true
  }

  private FIRST = true

  private initValue: Array<Item> = []

  //输入框
  public inputRef = Taro.createRef<GInput>()

  //重置
  public reset = () => {
    this.setState({
      item: this.initValue ? this.initValue : []
    })
    this.inputRef.current!.reset()
  }

  //获取数据
  public getData = async (emptyCharge=true) => {
    const { item } = this.state
    if(!item.length && emptyCharge) {
      await this.setState({
        error: true
      })
      return false
    }
    await this.setState({
      error: false
    })
    return item.map((val: Item) => {
      const { title } = val
      return title
    })
  }

  //添加
  public handleAdd = async () => {
    const data = await this.inputRef.current!.getData()
    if(data) {
      const { item } = this.state
      const { defaultItemStyle } = this.props
      const _defaultItemStyle = defaultItemStyle ? defaultItemStyle : getDefaultItemStyle()
      this.setState({
        item: [ ...item, { 
          title: data,
          ..._defaultItemStyle
         } ],
         disabled: false
      })
      Toast({
        title: '成功~!',
        icon: 'success',
        duration: 500
      })
      this.inputRef.current!.reset()
    }
  }

  //删除
  public handleDelete = async () => {
    const { disabled } = this.state
    if(disabled) return
    const data = await this.inputRef.current!.getData()
    if(data) {
      const { item } = this.state
      const index = findIndex(item, (val: any) => {
        const { title } = val
        return title === data
      })
      let config: IQuery = {title: ''}
      if(index < 0) {
        config = {...config, title: '好像没有找到', icon: 'fail', duration: 1000}
      }else {
        config = { ...config, title: '操作成功', icon: 'fail', duration: 500 }
        let arr = [...item]
        arr.splice(index, 1)
        this.setState({
          item: arr,
          error: false,
          disabled: arr.length ? true : false
        })
        this.inputRef.current!.reset()
      }
      Toast(config)
    }else {
      this.setState({
        error: true
      })
    }
  }

  //撤销
  public handleCancel = async () => {
    const { item, disabled } = this.state
    if(disabled) return
    const arr = [...item]
    arr.pop()
    this.setState({
      item: arr,
      disabled: arr.length ? false : true
    })
  }

  public render() {

    const { title, style, item: propsItem } = this.props

    //处理props第一次传值的问题
    if(this.FIRST) {
      if(Array.isArray(propsItem) && propsItem.length) {
        this.FIRST = false
        this.initValue = propsItem
        this.setState({
          item: propsItem,
          disabled: false
        })
      }
    }

    const { item, error, disabled } = this.state

    const errorStyle = error ? { border: '1px solid red' } : {}

    return (
      <View className='rest'
        style={isObject(style) ? {...style, ...errorStyle} : {...errorStyle}}
      >
        {
          title ? 
          <AtTag 
            customStyle={{...TAT_STYLE, ...customStyle.border(1, 'primary', 'dashed', 'all'), ...customStyle.color('primary')}} 
            type={'primary'}
          >
            {title}
          </AtTag>
          : null
        }
        <AtTimeline
          items={item}
        ></AtTimeline>
        <View className='input at-row'>
          <View className='at-col at-col-2'>
            <AtButton
              onClick={this.handleAdd}
              type={'primary'}
              customStyle={{...customStyle.backgroundColor('primary')}}
            >添加</AtButton>
          </View>
          <View className='at-col at-col-6'>
            <GInput
              style={{...customStyle.backgroundColor('disabled'), marginLeft: 0}}
              ref={this.inputRef}
            ></GInput>
          </View>
          <View className='at-col at-col-2'>
            <AtButton
              onClick={this.handleDelete}
              type={'primary'}
              customStyle={{...( disabled ? customStyle.backgroundColor('thirdly') : customStyle.backgroundColor('secondary'))}}
            >删除</AtButton>
          </View>
          <View className='at-col at-col-2'>
           <AtButton
              onClick={this.handleCancel}
              type={'primary'}
              customStyle={{...( disabled ? customStyle.backgroundColor('thirdly') : customStyle.backgroundColor('secondary'))}}
            >撤销</AtButton>
          </View>
        </View>
      </View>
    )
  }

}