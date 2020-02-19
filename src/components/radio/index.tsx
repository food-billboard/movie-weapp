import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtRadio, AtButton } from 'taro-ui'
import Rest from '~components/restFactor'
import { IProps, IState } from './interface'
import { isObject } from '~utils'
import { FORM_ERROR } from '~config'

import './index.scss'

const BUTTON_STYLE = {
  height:'40px'
}

export default class extends Component<IProps, IState> {

  private FIRST = true

  private initValue = ''

  //额外内容
  public restRef = Taro.createRef<Rest>()

  public state: IState = {
    active: '',
    show: false,
    error: false
  }

  //选择值切换
  public handleClick = (value) => {
    this.setState({active: value})
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
      active: this.initValue ? this.initValue : ''
    })
    this.close()
    if(extraFactor) this.restRef.current!.reset()
  }

  //获取数据
  public getData = async (emptyCharge=true) => {
    const { active } = this.state
    const { extraFactor=true } = this.props
    const data = (extraFactor) ? await this.restRef.current!.getData(false) : false
    if(!(active+'').length && emptyCharge && !(Array.isArray(data) ? data.length : data)) {
      await this.setState({
        error: true
      })
      return false
    }
    await this.setState({
      error: false
    })
    return data ? (data.length ? data.pop() : active) : active
  }

  public render() {

    const { radioboxOption=[], active=false, style={}, needHiddenList=true, extraFactor=true } = this.props

    //处理props第一次传值的问题
    if(this.FIRST) {
      if(active && active.length) {
        this.FIRST = false
        this.initValue = active
        this.setState({
          active
        })
      }
    }

    const { show, active: activeMode='on', error } = this.state

    return (
      <View style={isObject(style) ? style : {}}>
        {
          (needHiddenList ? !show : false) ?
          <AtButton type={'secondary'} onClick={this.open} customStyle={{ ...BUTTON_STYLE, ...(error ? FORM_ERROR : {}) }}>打开</AtButton>
          : null
        }
        <AtRadio
          value={activeMode}
          options={radioboxOption}
          onClick={this.props.handleClick ? this.props.handleClick : this.handleClick}
        ></AtRadio>
        {
          extraFactor ? 
          <Rest
            ref={this.restRef}
            title={'上面找不到可以手动添加, 但只添加一项'}
            style={{marginBottom: '5px', display: (needHiddenList ? show : true) ? 'block' : 'none'}}
          ></Rest>
          : null
        }
        {
          <AtButton 
            type={'secondary'} 
            onClick={this.close} 
            customStyle={{ ...BUTTON_STYLE, ...(error ? FORM_ERROR : {}), display: (needHiddenList ? show : false) ? 'block' : 'none' }}
          >
            收起
          </AtButton>
        }
      </View>
    )
  }

}