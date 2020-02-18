import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTextarea, AtInput } from 'taro-ui'
import { isObject } from '~utils'
import { FORM_ERROR } from '~config'
import { IProps, IState } from './interface'

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
    error: false,
    disabled: false
  }

  private FIRST = true

  private initValue:any = false

  //设置禁止状态
  public setDisabled = (state: boolean) => {
    this.setState({
      disabled: state
    })
  }

  //重置
  public reset = () => {
    this.setState({
      value: this.initValue ? this.initValue : ''
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

    const { value: textValue, error, disabled: stateDisabled } = this.state

    const errorStyle = error ? FORM_ERROR : {}

    return (
      <View>
        {
          type === 'input' ?
          <AtInput
            disabled={stateDisabled ? stateDisabled : disabled}
            customStyle={isObject(style) ? { ...style, ...errorStyle } : { ...errorStyle } }
            border={false}
            name='name'
            value={textValue}
            onChange={this.props.handleChange ? this.props.handleChange : this.handleChange}
            type={inputType}
            placeholder={placeholder ? placeholder : ''}
          ></AtInput> :
          <AtTextarea
            disabled={stateDisabled ? stateDisabled : disabled}
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