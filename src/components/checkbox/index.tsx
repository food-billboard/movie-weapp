import Taro, { Component } from '@tarojs/taro'
import { AtCheckbox, AtButton, AtTag } from 'taro-ui'
import { View } from '@tarojs/components'
import Rest from '~components/restFactor'
import { isObject } from '~utils'
import { connect } from '@tarojs/redux'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { FORM_ERROR } from '~config'
import { IState, IProps, IOption } from './interface'

import './index.scss'

const BUTTON_STYLE = {
  height:'40px'
}

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    type: 'area',
    needHiddenList: true,
    getSwitch: (count?:number) => {},
    getAreaList: (count?:number) => {},
    getLanguageList: (count?:number) => {},
    getActorList: (count?:number) => {},
    getDirectorList: (count?:number) => {},
    getCountryList: (count?:number) => {},
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

  //额外内容
  public restRef = Taro.createRef<Rest>()

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
    const { extraFactor=true } = this.props
    this.setState({
      checkedList: this.initValue ? this.initValue : []
    })
    this.close()
    if(extraFactor) this.restRef.current!.reset()
  }

  //获取数据
  public getData = async (emptyCharge=true) => {
    const { checkedList } = this.state
    const { extraFactor=true } = this.props
    const data = extraFactor ? await this.restRef.current!.getData(false) : false
    if(!checkedList.length && emptyCharge && !(Array.isArray(data) ? data.length : data)) {
      await this.setState({
        error: true
      })
      return false
    }
    await this.setState({
      error: false
    })
    return [ ...checkedList, ...(data ? data : []) ]
  }

  public render() {
    const { checkboxOption=[], checkedList=false, style={}, needHiddenList, extraFactor=true } = this.props

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
        {
          needHiddenList ? <View className='at-row at-row__align--center at-row--wrap'>
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
          </View> : null
        }
        {
          (needHiddenList ? !show : false) ?
          <AtButton type={'secondary'} onClick={this.open} customStyle={{ ...BUTTON_STYLE, ...(error ? FORM_ERROR : {}) }}>打开</AtButton>
          : null
        }
        {
          (needHiddenList ? show : true) ? 
          <AtCheckbox
            options={checkOption.length ? checkOption : checkboxOption}
            selectedList={list}
            onChange={this.props.handleChange ? this.props.handleChange : this.handleChange}
          >
          </AtCheckbox>
          : null
        }
        {
          extraFactor ? 
          <Rest
            ref={this.restRef}
            title={'上面找不到可以在下面手动添加'}
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