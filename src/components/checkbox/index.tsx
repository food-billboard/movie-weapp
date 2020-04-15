import Taro, { Component } from '@tarojs/taro'
import { AtCheckbox, AtButton, AtTag } from 'taro-ui'
import { View } from '@tarojs/components'
import Rest from '~components/restFactor'
import { isObject } from '~utils'
import { connect } from '@tarojs/redux'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { FORM_ERROR, SYSTEM_PAGE_SIZE } from '~config'
import { IState, IProps, IOption, typeList } from './index.d'
import styleColor  from '~theme/style'

import './index.scss'

const BUTTON_STYLE = {
  height:SYSTEM_PAGE_SIZE(40) + 'px'
}

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    type: 'area',
    needHiddenList: true,
    value: false,
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

  public componentWillReceiveProps = (props) => {
    if(props.value !== false) {
      this.setState({
        value: props.value || []
      })
    }
  }

  public state: IState = {
    value: [],
    show: false,
    checkOption: [],
    error: false
  }

  private initialValue: any = undefined

  //表单value
  private _value

  private get value() {
    const { initialValue, value:propsValue } = this.props
    const { value: stateValue } = this.state
    if(propsValue !== false) {
      return propsValue || []
    }else {
      if(this.initialValue === undefined && typeof initialValue !== 'undefined') {
        return initialValue
      }
      return stateValue
    }
  }

  //额外内容
  public restRef = Taro.createRef<Rest>()

  //获取数据
  public fetchData = async () => {
    const { checkboxOption=[], type } = this.props
    if(checkboxOption.length)  return
    let data 
    switch(typeList[type]) {
      case typeList.type: 
        var _data = await this.props.getSwitch()
        data = _data.switch
        break
      case typeList.actor:
        var _data = await this.props.getActorList()
        data = _data.data
        break
      case typeList.area:
        var _data = await this.props.getAreaList()
        data = _data.data
        break
      case typeList.country:
        var _data = await this.props.getCountryList()
        data = _data.data
        break
      case typeList.director:
        var _data = await this.props.getDirectorList()
        data = _data.data
        break
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
    const { 
      handleChange,
      initialValue,
      value:propsValue
    } = this.props
    if(this.initialValue === undefined && typeof initialValue !== 'undefined') this.initialValue = initialValue
    this.setState({
      value,
      error: false
    })
    handleChange && handleChange(value)
  }

  //额外内容change
  public handleRestChange = (items: string[]) => {
    const { handleChange } = this.props
    let mainData = this.getPropsValue(this.value, 'main')
    handleChange && handleChange([...mainData, ...items])
  }

  //打开
  public open = () => {
    this.setState({
      show: true
    })
  }

  //收起
  public close = () => {
    const { show } = this.state
    if(!show) return
    this.setState({
      show: false
    })
  }

  //重置
  public reset = () => {
    const { extraFactor=true } = this.props
    this.setState({
      value: this.initialValue ? this.initialValue : [],
      error: false
    })
    this.close()
    if(extraFactor) this.restRef.current!.reset()
  }

  //获取数据
  public getData = async (emptyCharge=true, type:'all' | 'rest' | 'main'='all') => {
    const { value } = this.state
    const { extraFactor=true } = this.props
    const data = extraFactor ? await this.restRef.current!.getData(false) : false
    if(!value.length && emptyCharge && !(Array.isArray(data) ? data.length : data)) {
      await this.setState({
        error: true
      })
      return false
    }
    await this.setState({
      error: false
    })
    if(type === 'main') {
      return value

    }else if(type === 'rest') {
      return data ? data : []
    }
    return [ ...value, ...(data ? data : []) ]
  }

  //获取内容内部
  private getPropsValue = (targetValues, type:'all' | 'rest' | 'main'='all') => {
    if(type === 'all') return targetValues
    const { checkboxOption=[], value:propsValue } = this.props
    const { checkOption=[] } = this.state
    const activeCheckOption = checkOption.length ? checkOption : checkboxOption
    const restValue:string[] = []
    const mainValue:string[] = []
    const checkValues = activeCheckOption.map(item => {
      const { value } = item
      return value
    })
    targetValues.forEach(item => {
      if(!checkValues.includes(item)) {
        restValue.push(item)
      }else {
        mainValue.push(item)
      }
    })
    switch(type) {
      case 'main': return mainValue
      case 'rest': return (propsValue === false ? propsValue : restValue)
    }
  } 

  //设置error
  public setError = (state: boolean) => {
    this.setState({
      error: state
    })
  }

  public render() {
    const { 
      checkboxOption=[], 
      style={}, 
      needHiddenList, 
      extraFactor=true, 
      error:propsError=false 
    } = this.props

    const { 
      show, 
      checkOption=[], 
      error:stateError 
    } = this.state

    const btnStyle = {
      ...BUTTON_STYLE, 
      ...styleColor.border(1, 'primary', 'solid', 'all'), 
      ...styleColor.color('primary'), 
    }

    const globalStyle = {
      ...(isObject(style) ? style : {}),
      ...((stateError || propsError) ? FORM_ERROR : {})
    }

    const activeCheckOption = checkOption.length ? checkOption : checkboxOption

    return (
      <View style={globalStyle}>
        {
          needHiddenList ? <View className='at-row at-row__align--center at-row--wrap'>
            {
              activeCheckOption.filter((val:IOption) => {
                const { value } = val
                return this.value.indexOf(value) !== -1
              })
              .map((val: IOption) => {
                const { label, value } = val
                return (
                <View className={'at-col'} style={{marginBottom: '5px'}} key={value}>
                  <AtTag 
                    key={value} 
                    customStyle={{fontSize: label.length >= 3 ? '18rpx' : '28rpx'}} 
                  >
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
          <AtButton 
            type={'secondary'} 
            onClick={this.open} 
            customStyle={{
              ...btnStyle,
              ...((stateError || propsError) ? FORM_ERROR : {})
            }}>打开</AtButton>
          : null
        }
        {
          (needHiddenList ? show : true) ? 
          <AtCheckbox
            options={activeCheckOption}
            selectedList={this.value}
            onChange={this.handleChange}
          >
          </AtCheckbox>
          : null
        }
        {
          extraFactor ? 
          <Rest
            handleError={(status) => {this.setState({error: status})}}
            ref={this.restRef}
            title={'上面找不到可以在下面手动添加'}
            style={{marginBottom: '5px', display: (needHiddenList ? show : true) ? 'block' : 'none'}}
            handleChange={this.handleRestChange}
            value={this.getPropsValue(this.value, 'rest')}
          ></Rest>
          : null
        }
        {
          <AtButton 
            type={'secondary'} 
            onClick={this.close} 
            customStyle={{ 
              ...btnStyle, 
              display: (needHiddenList ? show : false) ? 'block' : 'none' 
            }}
          >
            收起
          </AtButton>
        }
      </View>
    )
  }

}