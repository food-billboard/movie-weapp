import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Input, Textarea } from '@tarojs/components'
import { InputProps } from '@tarojs/components/types/Input'
import { isObject, ICommonFormState, ICommonFormProps } from '~utils'
import { FORM_ERROR } from '~config'

import './index.scss'

export enum EInputType {
  INPUT,
  TEXTAREA
}

export interface IProps extends ICommonFormProps {
  value?: string | false
  initialValue?: string
  type?: EInputType
  placeholder?: string | false
  disabled?: boolean
  textareaFixed?: boolean
  handleLineChange?: (e: any) => any
  inputType: InputProps["type"]
  className?: string 
}

export interface IState extends ICommonFormState {
  value: string
  disabled: boolean
}

export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    style: {},
    type: EInputType.INPUT,
    placeholder: false,
    disabled: false,
    value: false,
    inputType: 'text'
  }

  public state: IState = {
    value: '',
    error: false,
    disabled: false
  }

  public componentWillReceiveProps = (props) => {
    if (props.value !== false) {
      this.setState({
        value: props.value || ''
      })
    }
  }

  private initialValue: any = undefined

  //表单value
  private _value

  private get value() {
    const { value: propsValue, initialValue } = this.props
    const { value: stateValue } = this.state
    if (propsValue !== false) {
      return propsValue || ''
    } else {
      if (this.initialValue === undefined && typeof initialValue !== 'undefined') {
        return initialValue
      }
      return stateValue
    }
  }

  //设置禁止状态
  public setDisabled = (state: boolean) => {
    this.setState({
      disabled: state
    })
  }

  //重置
  public reset = () => {
    this.setState({
      value: this.initialValue ? this.initialValue : '',
      error: false
    })
  }

  //获取数据
  public getData = async (emptyCharge = true) => {
    const { value } = this.state
    if (!value.length && emptyCharge) {
      await this.setState({
        error: true
      })
      return false
    }
    await this.setState({
      error: false
    })
    return value
  }

  public handleChange = (value: string) => {
    const { error } = this.state
    const { handleChange, initialValue } = this.props
    const data = value

    if (this.initialValue === undefined && typeof initialValue !== 'undefined') {
      this.initialValue = initialValue
    }

    this.setState({
      value: data,
      error: data.length ? false : error
    })

    handleChange && handleChange(data)
  }

  //设置error
  public setError = (state: boolean) => {
    this.setState({
      error: state
    })
  }

  public render() {

    const {
      style,
      type,
      placeholder,
      disabled,
      textareaFixed = false,
      error: propsError = false,
      className,
      ...nextProps
    } = this.props

    const {
      error,
      disabled: stateDisabled
    } = this.state

    const errorStyle = (error || propsError) ? FORM_ERROR : {}

    return (
      <View>
        {
          type === EInputType.INPUT &&
          <Input
            {...nextProps}
            disabled={stateDisabled ? stateDisabled : disabled}
            style={isObject(style) ? { ...style, ...errorStyle } : { ...errorStyle }}
            name='name'
            className={`component-input normal-font-size-class ${className}`}
            value={this.value}
            onInput={(e) => { this.handleChange.call(this, e.detail.value) }}
            type='text'
            placeholder={placeholder ? placeholder : ''}
            onTouchMove={(e) => { e.stopPropagation() }}
          />
        }
        {
          type === EInputType.TEXTAREA &&
          <Textarea
            {...nextProps}
            disabled={stateDisabled ? stateDisabled : disabled}
            style={isObject(style) ? { width: "100%", ...style, ...errorStyle } : { width: "100%", ...errorStyle }}
            value={this.value}
            onInput={(value) => { this.handleChange(value.detail.value) }}
            maxlength={300}
            className={`component-textarea normal-font-size-class ${className}`}
            placeholder={placeholder ? placeholder : ''}
            fixed={textareaFixed}
            onLineChange={this.props.handleLineChange}
          />
        }
      </View>
    )
  }

}