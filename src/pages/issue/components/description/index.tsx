import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTextarea, AtInput } from 'taro-ui'
import { isObject } from '~utils'

interface IProps {
  value?: string | false
  style: any
  type?: 'input' | 'textarea'
}

interface IState {
  value: string
}

export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    value: false,
    style: false,
    type: 'input'
  }

  public state: IState = {
    value: ''
  }

  private FIRST = true

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

    const { value, style, type } = this.props

    //处理props第一次传值的问题
    if(this.FIRST) {
      if(value !== false && value !== undefined) {
        this.FIRST = false
        this.setState({
          value
        })
      }
    }

    const { value: textValue } = this.state

    return (
      <View>
        {
          type === 'input' ?
          <AtInput
            customStyle={isObject(style) ? style : {} }
            border={false}
            name='name'
            value={textValue}
            onChange={this.handleChange}
          ></AtInput> :
          <AtTextarea
            customStyle={isObject(style) ? style : {} }
            value={textValue}
            onChange={this.handleChange}
            maxLength={300}
          ></AtTextarea>
        }
      </View>
    )
  }

}