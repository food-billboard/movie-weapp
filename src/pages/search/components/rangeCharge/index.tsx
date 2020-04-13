import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import GInput from '~components/input'
import { IProps, IState } from './index.d'
import style from '~theme/style'
import { Toast } from '~components/toast'
import './index.scss'

export default class extends Component<IProps, IState>{ 

  public state: IState = {
    disabled: false
  }

  public minChange = (value) => {
    const { onChange, value: { max='' } = {} } = this.props
    let data 
    if(max.toString().length && ~~max <= value) {
      data = max
      Toast({
        title: '价格错误默认会忽略',
        icon: 'fail'
      })
    }
    onChange({min: data})
  }

  public maxChange = (value) => {
    const { onChange, value: { min='' } = {} } = this.props
    let data
    if(min.toString().length && ~~min >= value) {
      data = min
      Toast({
        title: '价格错误默认会忽略',
        icon: 'fail'
      })
    }

    onChange({max: data})
  }

  public setDisabled = (status: boolean) => {
    this.setState({
      disabled: status
    })
  }

  public render() {

    const { 
      value: { max='', min='' } = {}
    } = this.props

    const {  
      disabled
    } = this.state

    return (
      <View className="at-row">
        <View className='at-col'>
          <GInput
              style={{...style.backgroundColor('disabled'), marginBottom: '10px'}}
              inputType={'number'}
              placeholder={'最低价格'}
              handleChange={this.minChange}
              disabled={disabled}
              value={min}
          ></GInput>
        </View>
        <View className='at-col'>
          <GInput
              style={{...style.backgroundColor('disabled')}}
              inputType={'number'}
              placeholder={'最高价格'}
              handleChange={this.maxChange}
              disabled={disabled}
              value={max}
          ></GInput>
        </View>
      </View>
    )
  }

}