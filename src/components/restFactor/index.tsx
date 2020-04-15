import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTimeline, AtButton, AtTag } from 'taro-ui'
import GInput from '../input'
import { IProps, IState, IStatusData, TStatus, operateType } from './index.d'
import { Toast, IQuery } from '~components/toast'
import { Item } from 'taro-ui/@types/timeline'
import { isObject } from '~utils'
import customStyle from '~theme/style'
import { TypeColor } from '~theme/color'
import { findIndex, noop } from 'lodash'
import { FORM_ERROR } from '~config'

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
  TypeColor['primary'], TypeColor['secondary'], TypeColor['disabled'], TypeColor['thirdly']
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

export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    value: false,
    title: false,
    style: false,
    defaultItemStyle: false,
    handleError: () => {}
  }

  public state: IState = {
    value: [],
    error: false,
    disabled: true,
    status: [],
    statusData: []
  }

  private initialValue: Array<Item> | undefined = undefined

  private _value

  private get value() {
    const { initialValue, value:propsValue } = this.props
    const { value: stateValue } = this.state
    if(propsValue !== false) {
      return this.normalizeData(propsValue)
    }else {
      if(this.initialValue === undefined && typeof initialValue !== 'undefined') {
        return this.normalizeData(initialValue)
      }
      return this.normalizeData(stateValue)
    }
  }

  //输入框
  public inputRef = Taro.createRef<GInput>()

  //规范化数据
  public normalizeData = (data) => {
    if(Array.isArray(data) && data.length) {
      if(typeof data[0] === 'string') {
        const da = data.map(item => {
          if(typeof item === 'object') return item
          return {
            ...getDefaultItemStyle(),
            title: item
          }
        })
        return da
      } 
      return data
    }
    return []
  }

  //重置
  public reset = () => {
    const value = this.initialValue ? this.initialValue : []
    this.setState({
      value,
      error: false,
      statusData: [],
      status: []
    }, () => {
      this.handleChange(value.map( val => val.title))
    })
    this.inputRef.current!.reset()
  }

  //获取数据
  public getData = async (emptyCharge=true) => {
    const { value } = this.state
    if(!value.length && emptyCharge) {
      await this.setState({
        error: true
      })
      return false
    }
    await this.setState({
      error: false
    })
    return value.map((val: Item) => {
      const { title } = val
      return title
    })
  }

  //添加
  public handleAdd = async () => {
    const data = await this.inputRef.current!.getData()
    if(data) {
      const { value:stateValue, status, statusData } = this.state
      const { defaultItemStyle } = this.props
      const itemLen = stateValue.length
      const _defaultItemStyle = defaultItemStyle ? defaultItemStyle : getDefaultItemStyle()
      const newItem = {
        title: data,
        ..._defaultItemStyle
      }
      //新数据
      const value = [ ...stateValue, newItem]
      this.setState({
        value,
        error: false,
        disabled: false,
        //记录最近操作
        status: [ ...status, operateType.add ],
        statusData: [ ...statusData, {
            value: newItem,
            index: itemLen
          }
        ]
      }, () => {
        this.handleChange(value.map( val => val.title))
        this.inputRef.current!.reset()
      }) 

      this.props.handleError(false)
      Toast({
        title: '成功~!',
        icon: 'success',
        duration: 500
      })
    }
  }

  //删除
  public handleDelete = async () => {
    const { disabled } = this.state
    if(disabled) return

    const data = await this.inputRef.current!.getData()

    if(data) {  //输入框中有内容
      const { value, status, statusData } = this.state
      const index = findIndex(value, (val: any) => {
        const { title } = val
        return title === data
      })
      let config: IQuery = {title: ''}

      //查看输入框内容是否在timeline中存在
      if(index < 0) {
        config = {...config, title: '好像没有找到', icon: 'fail', duration: 1000}
      }else {
        config = { ...config, title: '操作成功', icon: 'fail', duration: 500 }
        let arr = [...value]
        const [deleteItem]: Array<Item> = arr.splice(index, 1)
        this.setState({
          value: arr,
          error: false,
          disabled: arr.length ? false : true,

          //记录最近操作
          status: [ ...status, operateType.cancel ],
          statusData: [ ...statusData, {
              value: deleteItem,
              index: index
            } 
          ]
        }, () => {
          this.handleChange(arr.map( val => val.title))
          this.inputRef.current!.reset()
        })
      }

      Toast(config)
    }else { //输入框中无内容
      this.setState({
        error: true
      })
    }
  }

  //撤销
  public handleCancel = async () => {
    const { value:item, disabled, status, statusData } = this.state
    // if(disabled) return
    if(!status.length) return
    const arr = [...item]
    const _status = [...status]
    const _statusData = [...statusData]
    const [__status]:Array<TStatus> = _status.splice(_status.length - 1, 1)
    const [__statusData]: Array<IStatusData> = _statusData.splice(_statusData.length - 1)

    //判断需要撤销的操作
    const { value, index } = __statusData
    if(__status === operateType.add) {
      arr.splice(index, 1)
    }else if(__status === operateType.cancel) {
      arr.splice(index, 0, value)
    }

    this.setState({
      value: arr,
      disabled: arr.length ? false : true,
      error: false,
      status: status.length === _status.length ? status : _status,
      statusData: statusData.length === _statusData.length ? statusData : _statusData
    }, () => {
      this.handleChange(arr.map( val => val.title))
      this.inputRef.current!.reset()
    })
  }

  //change
  public handleChange = (value) => {
    const { handleChange, initialValue } = this.props
    if(this.initialValue === undefined && typeof initialValue !== 'undefined') this.initialValue = this.normalizeData(initialValue)
    handleChange && handleChange(value)
  }

  public render() {

    const { 
      title, 
      style, 
      error:propsError=false 
    } = this.props

    const { error, disabled } = this.state

    const _style = {
      ...(isObject(style) ? style : {}),
      ...((error || propsError) ? FORM_ERROR : {})
    }

    return (
      <View 
        className='rest'
        style={_style}
      >
        {
          title ? 
          <AtTag 
            customStyle={{...TAT_STYLE, ...customStyle.border(1, 'primary', 'dashed', 'all'), ...customStyle.color('thirdly')}} 
            type={'primary'}
          >
            {title}
          </AtTag>
          : null
        }
        <AtTimeline
          items={this.value}
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