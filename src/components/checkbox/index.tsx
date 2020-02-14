import Taro, { Component } from '@tarojs/taro'
import { AtCheckbox, AtButton, AtTag } from 'taro-ui'
import { View } from '@tarojs/components'
import { isObject } from '~utils'
import { connect } from '@tarojs/redux'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { FORM_ERROR } from '~config'

import './index.scss'

interface IOption {
  value: string
  label: string
  desc?: string
  disabled?: boolean
}

interface IProps {
  checkboxOption?: Array<IOption>
  checkedList?: Array<string> | false
  style?: any
  type: 'area' | 'actor' | 'director' | 'type' | 'country'
  getSwitch: (count?:number) => any
  getAreaList: (count?:number) => any
  getLanguageList: (count?:number) => any
  getActorList: (count?:number) => any
  getDirectorList: (count?:number) => any
  getCountryList: (count?:number) => any
}

interface IState {
  checkedList: Array<string>
  show: boolean
  checkOption: Array<IOption>
  error: boolean
}

const BUTTON_STYLE = {
  height:'40px'
}

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    type: 'area',
    getSwitch: (count?:number) => {},
    getAreaList: (count?:number) => {},
    getLanguageList: (count?:number) => {},
    getActorList: (count?:number) => {},
    getDirectorList: (count?:number) => {},
    getCountryList: (count?:number) => {}
  }

  public componentDidMount = async () => {
    this.fetchData()
  }

  public state: IState = {
    checkedList: [],
    show: false,
    checkOption: [],
    error: false
  }

  private FIRST = true

  private initValue: any = false

  //获取数据
  public fetchData = async () => {
    const { checkboxOption=[], type } = this.props
    if(checkboxOption.length)  return
    let data 
    switch(type) {
      case 'type': 
        var _data = await this.props.getSwitch()
        data = _data.switch
        break
      case 'actor':
        var _data = await this.props.getActorList()
        data = _data.data
        break
      case 'area':
        var _data = await this.props.getAreaList()
        data = _data.data
        break
      case 'country':
        var _data = await this.props.getCountryList()
        data = _data.data
        break
      case 'director':
        var _data = await this.props.getDirectorList()
        data = _data.data
        break
      default:
        data = []
    }
    await this.setState({
      checkOption: data.map((val: any) => {
        const { value='', id='', image='' } = val
        return {
          value: id,
          label: value
        }
      })
    })
  }

  //处理选择
  public handleChange = (value: any) => {
    this.setState({
      checkedList: value
    })
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
      checkedList: this.initValue ? this.initValue : []
    })
  }

  //获取数据
  public getData = async () => {
    const { checkedList } = this.state
    if(!checkedList.length) {
      await this.setState({
        error: true
      })
      return false
    }
    await this.setState({
      error: false
    })
    return checkedList
  }

  public render() {
    const { checkboxOption=[], checkedList=false, style={}, type } = this.props

    //处理props第一次传值的问题
    if(this.FIRST) {
      if(Array.isArray(checkedList) && checkedList.length) {
        this.FIRST = false
        this.initValue = checkedList
        this.setState({
          checkedList
        })
      }
    }

    const { show, checkedList: list, checkOption=[], error } = this.state

    return (
      <View style={isObject(style) ? style : {}}>
        <View className='at-row at-row__align--center at-row--wrap'>
          {
            (checkOption.length ? checkOption : checkboxOption).filter((val:IOption) => {
              const { value } = val
              return list.indexOf(value) !== -1
            })
            .map((val: IOption) => {
              const { label, value } = val
              return (
              <View className={'at-col'} style={{marginBottom: '5px'}} key={value}>
                <AtTag key={value} customStyle={{fontSize: label.length >= 3 ? '18rpx' : '28rpx'}} >
                  {label}
                </AtTag>
              </View>
              )
            })
          }
        </View>
        {
          !show ?
          <AtButton type={'secondary'} onClick={this.open} customStyle={{ ...BUTTON_STYLE, ...(error ? FORM_ERROR : {}) }}>打开</AtButton>
          : null
        }
        {
          show ? 
          <AtCheckbox
            options={checkOption.length ? checkOption : checkboxOption}
            selectedList={list}
            onChange={this.handleChange}
          >
          </AtCheckbox>
          : null
        }
        {
          show ?
          <AtButton type={'secondary'} onClick={this.close} customStyle={{ ...BUTTON_STYLE, ...(error ? FORM_ERROR : {})}}>收起</AtButton>
          : null 
        }
      </View>
    )
  }

}