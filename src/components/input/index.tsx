import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import { AtTextarea } from 'taro-ui'
import { isObject, ICommonFormState, ICommonFormProps } from '~utils'
import { FORM_ERROR } from '~config'

import './index.scss'

export interface IProps extends ICommonFormProps {
  value?: string | false
  initialValue?: string
  type?: 'input' | 'textarea'
  placeholder?: string | false
  inputType?:string
  disabled?: boolean
  height?: number
  count?: boolean
  textareaFixed?: boolean
  handleLineChange?: (e: any) => any
}

export interface IState extends ICommonFormState {
  value: string
  disabled: boolean
}

export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    style: false,
    type: 'input',
    inputType: 'text',
    placeholder: false,
    disabled: false,
    value: false
  }

  public state: IState = {
    value: '',
    error: false,
    disabled: false
  }

  private initialValue:any = undefined

  //表单value
  private _value

  private get value() {
    const { value:propsValue, initialValue } = this.props
    const { value: stateValue } = this.state
    if(propsValue !== false) {
      return propsValue || ''
    }else {
      if(this.initialValue === undefined && typeof initialValue !== 'undefined') {
        return initialValue
      }
      return stateValue
    }
  }

  public componentWillReceiveProps = (props) => {
    if(props.value !== false) {
      this.setState({
        value: props.value || ''
      })
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
    return value
  }

  public handleChange = (e) => {
    const { error } = this.state
    const { handleChange, initialValue, value:propsValue } = this.props
    let data
    if(e.target) {  //textarea
      data = e.target.value
    }else { //input
      data = e
    }

    if(this.initialValue === undefined && typeof initialValue !== 'undefined') {
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
      inputType='text', 
      disabled, 
      height=100, 
      count=true, 
      textareaFixed=false, 
      error:propsError=false 
    } = this.props

    const { 
      error, 
      disabled: stateDisabled 
    } = this.state

    const errorStyle = (error || propsError) ? FORM_ERROR : {}

    return (
      <View>
        {
          type === 'input' ?
          <Input
            disabled={stateDisabled ? stateDisabled : disabled}
            style={isObject(style) ? { ...style, ...errorStyle } : { ...errorStyle } }
            name='name'
            className='input'
            value={this.value}
            onInput={(e) => {this.handleChange.call(this, e.detail.value)}}
            type={'text'}
            placeholder={placeholder ? placeholder : ''}
            onTouchMove={(e) => {e.stopPropagation()}}
          />
          :
          <AtTextarea
            disabled={stateDisabled ? stateDisabled : disabled}
            customStyle={isObject(style) ? { ...style, ...errorStyle } : { ...errorStyle } }
            value={this.value}
            onChange={(e) => {this.handleChange.call(this, e)}}
            maxLength={300}
            placeholder={placeholder ? placeholder : ''}
            height={height}
            count={count}
            fixed={textareaFixed}
            onLinechange={(e) => { this.props.handleLineChange ? this.props.handleLineChange.call(this, e) : null }}
          ></AtTextarea>
        }
      </View>
    )
  }

}