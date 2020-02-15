import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTimeline, AtButton, AtTag } from 'taro-ui'
import { Item } from 'taro-ui/@types/timeline'
import GInput from '../../pages/issue/components/description'

import { Toast } from '~components/toast'

import { isObject } from '~utils'

import './index.scss'

interface IDefaultItemStyle {
  icon: string
  color: string
}

interface IProps {
  title: string | false
  style?: any
  item?: Array<Item> | false
  defaultItemStyle?: IDefaultItemStyle | false
}

interface IState {
  item: Array<Item>
  error: boolean
}

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
  '#E6E6FA', '#B0C4DE', '#778899', '#708090', '#2F4F4F', '#DCDCDC', '#D3D3D3', '#C0C0C0',
  '#A9A9A9', '#808080', '#696969', '#000000'
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
              style={{backgroundColor: 'rgba(0, 0, 0, 0.1)', marginLeft: 0}}
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