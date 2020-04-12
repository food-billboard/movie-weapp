import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtRadio, AtButton } from 'taro-ui'
import Rest from '~components/restFactor'
import { IProps, IState } from './index.d'
import { isObject } from '~utils'
import { FORM_ERROR, SYSTEM_PAGE_SIZE } from '~config'
import { noop } from 'lodash'

import './index.scss'

const BUTTON_STYLE = {
  height:SYSTEM_PAGE_SIZE(40) + 'px'
}

export default class extends Component<IProps, IState> {

  private initialValue:any = undefined

  //额外内容
  public restRef = Taro.createRef<Rest>()

  public state: IState = {
    value: 'on',
    show: false,
    error: false
  }

  //表单value
  private _value

  private get value() {
    const { initialValue, value:propsValue } = this.props
    const { value: stateValue } = this.state
    if(typeof propsValue !== 'undefined') {
      return propsValue
    }else {
      if(this.initialValue === undefined && typeof initialValue !== 'undefined') {
        return initialValue
      }
      return stateValue
    }
  }

  //选择值切换
  public handleChange = (value) => {
    const { 
      handleChange=noop,
      initialValue,
      value:propsValue,
      extraFactor=true
    } = this.props

    this.setState({
      value,
      error: false
    }, async () => {
      if(this.initialValue === undefined && typeof initialValue !== 'undefined') this.initialValue = initialValue

      if(typeof propsValue !== 'undefined') {
        //只有当rest中不存在值得情况才才会触发change
        const data = (extraFactor) ? await this.restRef.current!.getData(false) : false
        if(!data || (Array.isArray(data) && data.length == 0)) {
          handleChange(value)
        }
      }
    })
  }

  //
  public handleRestChange = (items: string[]) => {
    const { handleChange } = this.props
    const item = items.pop()
    handleChange && handleChange(item ? item : this.value)
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
    const { extraFactor=true } = this.props
    this.setState({
      value: this.initialValue ? this.initialValue : ''
    })
    this.close()
    if(extraFactor) this.restRef.current!.reset()
  }

  //获取数据
  public getData = async (emptyCharge=true) => {
    const { value } = this.state
    const { extraFactor=true } = this.props
    const data = (extraFactor) ? await this.restRef.current!.getData(false) : false
    if(!(value+'').length && emptyCharge && !(Array.isArray(data) ? data.length : data)) {
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
      radioboxOption=[], 
      style={}, 
      needHiddenList=true, 
      extraFactor=true, 
      error:propsError=false 
    } = this.props

    const { show, error } = this.state

    const commonStyle = {
      ...BUTTON_STYLE, 
      ...((error || propsError) ? FORM_ERROR : {}),
    }

    return (
      <View style={isObject(style) ? style : {}}>
        {
          (needHiddenList ? !show : false) ?
          <AtButton type={'secondary'} onClick={this.open} customStyle={commonStyle}>打开</AtButton>
          : null
        }
        <AtRadio
          value={this.value}
          options={radioboxOption}
          onClick={this.handleChange}
        ></AtRadio>
        {
          extraFactor ? 
          <Rest
            ref={this.restRef}
            title={'上面找不到可以手动添加, 但只添加一项'}
            style={{marginBottom: '5px', display: (needHiddenList ? show : true) ? 'block' : 'none'}}
            handleChange={this.handleRestChange}
          ></Rest>
          : null
        }
        {
          <AtButton 
            type={'secondary'} 
            onClick={this.close} 
            customStyle={{ ...commonStyle, display: (needHiddenList ? show : false) ? 'block' : 'none' }}
          >
            收起
          </AtButton>
        }
      </View>
    )
  }

}