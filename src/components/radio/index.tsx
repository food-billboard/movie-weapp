import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtRadio, AtButton } from 'taro-ui'
import { isObject, ICommonFormProps, ICommonFormState } from '~utils'
import { FORM_ERROR, SYSTEM_PAGE_SIZE } from '~config'
import customeStyle from '~theme/style'
import { RadioOption } from 'taro-ui/types/radio'

import './index.scss'

export interface IProps extends ICommonFormProps {
  radioboxOption: Array<RadioOption<string>>,
  value?: string | false
  initialValue?: string
  needHiddenList?: boolean,
  extraFactor?: boolean
}

export interface IState extends ICommonFormState {
  value: string,
  show: boolean,
}

const BUTTON_STYLE = {
  height: SYSTEM_PAGE_SIZE(40) + 'px'
}

export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    radioboxOption: [],
    value: false,
    needHiddenList: true,
  }

  public state: IState = {
    value: '',
    show: false,
    error: false
  }

  private initialValue: any = undefined

  private _restValue: any = []

  private get restValue() {
    const { extraFactor } = this.props
    if (extraFactor) return this._restValue
    return false
  }

  private set restValue(items) {
    this._restValue = items
  }

  //额外内容
  public restRef = React.createRef<any>()

  //表单value
  private _value

  private get value() {
    const { initialValue, value: propsValue } = this.props
    const { value: stateValue } = this.state
    if (propsValue !== false) {
      return propsValue
        ||
        (() => {
          this.restValue = []
          return ''
        })()
    } else {
      if (this.initialValue === undefined && typeof initialValue !== 'undefined') {
        return initialValue
      }
      return stateValue
    }
  }

  public componentWillReceiveProps = (props) => {
    const { value } = props
    if (value !== false) {
      this.setState({
        value: value || ''
      })
    }
  }

  //选择值切换
  public handleChange = (value) => {
    const {
      handleChange,
      initialValue,
      extraFactor
    } = this.props
    this.setState({
      value,
      error: false
    })
    if (this.initialValue === undefined && typeof initialValue !== 'undefined') this.initialValue = initialValue
    // if (extraFactor) {
    //   this.restRef!.current!.reset()
    //   this.restValue = []
    // }
    handleChange && handleChange(value)
  }

  //打开
  public open = () => {
    this.setState({
      show: true
    })
  }

  //收起
  public close = () => {
    this.setState({
      show: false
    })
  }

  //重置
  public reset = () => {
    this.setState({
      value: this.initialValue ? this.initialValue : ''
    })
    this.close()
  }

  //获取数据
  public getData = async (emptyCharge = true) => {
    const { value } = this.state
    const { extraFactor = true } = this.props
    const data = (extraFactor) ? await this.restRef.current!.getData(false) : false
    if (!(value + '').length && emptyCharge && !(Array.isArray(data) ? data.length : data)) {
      await this.setState({
        error: true
      })
      return false
    }
    await this.setState({
      error: false
    })
    return data ? (data.length ? data.pop() : value) : value
  }

  //设置error
  public setError = (state: boolean) => {
    this.setState({
      error: state
    })
  }

  public render() {

    const {
      radioboxOption = [],
      style = {},
      needHiddenList = true,
      extraFactor = true,
      error: propsError = false
    } = this.props

    const { show, error } = this.state

    const commonStyle = {
      ...BUTTON_STYLE,
      ...((error || propsError) ? FORM_ERROR : {}),
    }
    return (
      <View style={isObject(style) ? style : {}}>
        <View
          className='title'
          style={{
            ...customeStyle.backgroundColor('thirdly'),
            ...customeStyle.border(1, 'primary', 'solid', 'all'),
            display: extraFactor ? 'block' : 'none'
          }}
        >
          当前选择: {this.value}
        </View>
        {
          (needHiddenList ? !show : false) ?
            <AtButton type='secondary' onClick={this.open} customStyle={commonStyle}>打开</AtButton>
            : null
        }
        {
          (needHiddenList ? show : true) ?
            <AtRadio
              value={this.value}
              options={radioboxOption}
              onClick={this.handleChange}
            ></AtRadio>
            : null
        }
        {/* {
          extraFactor ?
            <Rest
              ref={this.restRef}
              title={'上面找不到可以手动添加, 但只添加一项'}
              style={{ marginBottom: '5px', display: (needHiddenList ? show : true) ? 'block' : 'none' }}
              handleChange={this.handleRestChange}
              value={this.restValue}
            ></Rest>
            : null
        } */}
        <AtButton
          type='secondary'
          onClick={this.close}
          customStyle={{ ...commonStyle, display: (needHiddenList ? show : false) ? 'block' : 'none' }}
        >
          收起
        </AtButton>
      </View>
    )
  }

}