import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTextarea, AtInput } from 'taro-ui'
import { isObject } from '~utils'
import { FORM_ERROR } from '~config'

interface IProps {
  value?: string | false
  style: any
  type?: 'input' | 'textarea'
  handleChange?: (() => any) | false
  placeholder?: string | false
  inputType?:string
  disabled?: boolean
}

interface IState {
  value: string
  error: boolean
}

type TInitvalue = any

export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    value: false,
    style: false,
    type: 'input',
    inputType: 'text',
    placeholder: false,
    handleChange: false,
    disabled: false
  }

  public state: IState = {
    value: '',
    error: false
  }

  private FIRST = true

  private initValue:TInitvalue = false

  //重置
  public reset = () => {
    this.setState({
      value: this.initValue ? this.initValue : ''
    })
  }

  //获取数据
  public getData = async () => {
    const { value } = this.state
    if(!value.length) {
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
    let data
    if(e.target) {  //textarea
      data = e.target.value
    }else { //input
      data = e
    }
    this.setState({
      value: data
    })
  }

  public render() {

    const { value, style, type, placeholder, inputType, disabled } = this.props

    //处理props第一次传值的问题
    if(this.FIRST) {
      if(value !== false && value !== undefined) {
        this.FIRST = false
        this.initValue = value
        this.setState({
          value
        })
      }
    }

    const { value: textValue, error } = this.state

    const errorStyle = error ? FORM_ERROR : {}

    return (
      <View>
        {
          type === 'input' ?
          <AtInput
            disabled={disabled}
            customStyle={isObject(style) ? { ...style, ...errorStyle } : { ...errorStyle } }
            border={false}
            name='name'
            value={textValue}
            onChange={this.props.handleChange ? this.props.handleChange : this.handleChange}
            type={inputType}
            placeholder={placeholder ? placeholder : ''}
          ></AtInput> :
          <AtTextarea
            disabled={disabled}
            customStyle={isObject(style) ? { ...style, ...errorStyle } : { ...errorStyle } }
            value={textValue}
            onChange={this.props.handleChange ? this.props.handleChange : this.handleChange}
            maxLength={300}
            placeholder={placeholder ? placeholder : ''}
          ></AtTextarea>
        }
      </View>
    )
  }

}