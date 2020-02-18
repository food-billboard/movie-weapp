import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTimeline, AtButton, AtTag } from 'taro-ui'
import GInput from '../input'
import { IProps, IState } from './interface'
import { Toast } from '~components/toast'
import { Item } from 'taro-ui/@types/timeline'
import { isObject } from '~utils'
import { TypeColor, style as customStyle } from '~theme/global-style'

import './index.scss'

const TAT_STYLE = {
  boxSizing: 'border-box', 
  border: '1px dashed black', 
  width:'100%', 
  marginBottom: '5px', 
  backgroundColor: 'white'
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
    error: false
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
  public handleClick = async () => {
    const data = await this.inputRef.current!.getData()
    if(data) {
      const { item } = this.state
      const { defaultItemStyle } = this.props
      const _defaultItemStyle = defaultItemStyle ? defaultItemStyle : getDefaultItemStyle()
      this.setState({
        item: [ ...item, { 
          title: data,
          ..._defaultItemStyle
         } ]
      })
      Toast({
        title: '成功~!',
        icon: 'success',
        duration: 500
      })
      this.inputRef.current!.reset()
    }
  }

  public render() {

    const { title, style, item: propsItem } = this.props

    //处理props第一次传值的问题
    if(this.FIRST) {
      if(Array.isArray(propsItem) && propsItem.length) {
        this.FIRST = false
        this.initValue = propsItem
        this.setState({
          item: propsItem
        })
      }
    }

    const { item, error } = this.state

    const errorStyle = error ? { border: '1px solid red' } : {}

    return (
      <View className='rest'
        style={isObject(style) ? {...style, ...errorStyle} : {...errorStyle}}
      >
        {
          title ? 
          <AtTag 
            customStyle={TAT_STYLE} 
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
          <View className='at-col at-col-8'>
            <GInput
              style={{...customStyle.backgroundColor('disabled'), marginLeft: 0}}
              ref={this.inputRef}
            ></GInput>
          </View>
          <View className='at-col at-col-3 at-col__offset-1'>
            <AtButton
              onClick={this.handleClick}
              type={'primary'}
            >添加</AtButton>
          </View>
        </View>
      </View>
    )
  }

}