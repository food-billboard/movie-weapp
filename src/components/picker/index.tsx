import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { isObject } from '~utils'
import Rest from '~components/restFactor'
import moment from 'moment'
import { FORM_ERROR, SYSTEM_PAGE_SIZE } from '~config'
import { IProps, IState, modeList, fieldTypeList } from './index.d'
import customStyle from '~theme/style'
import { noop } from 'lodash'
 
const STYLE = {
  width:'100%',
  height: SYSTEM_PAGE_SIZE(30) + 'px',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  lineHeight: SYSTEM_PAGE_SIZE(30) + 'px',
  boxSizing: 'border-box'
}

export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    style: {},
    selector: false,
    multi: false,
    time: false,
    date: false,
    extraFactor: false
  }

  public state: IState = {
    value: this.props.multi ? [] : '',
    error: false,
    disabled: false
  }

  private initialValue: any = false

  //表单value
  private _value

  private get value() {
    const { value:propsValue, initialValue } = this.props
    const { value:stateValue } = this.state
    if(typeof propsValue !== 'undefined') {
      return propsValue
    }else {
      if(this.initialValue === undefined && typeof initialValue !== 'undefined') {
        return initialValue
      }
      return stateValue
    }
  }

  //picker默认参数配置
  readonly defaultConfig = {
    rangeKey: {
      selector: '',
      multi: '',
      time: '',
      date: ''
    },
    range: {
      selector: [],
      multi: [],
      time: [],
      date: []
    },
    start: {
      selector: '',
      multi: '',
      time: '00:00',
      date: '1970-01-01'
    },
    end: {
      selector: '',
      multi: '',
      time: '23:59',
      date: ''
    },
    fields: {
      selector: '',
      multi: '',
      time: '',
      date: 'year'
    },
    time: 'mm:ss'
  }

  //额外内容
  public restRef = Taro.createRef<Rest>()

  //处理change
  public handleChange = async (e: any, mode) => {
    const { 
      handleChange=noop, 
      multi, 
      selector, 
      extraFactor,
      initialValue,
      value:propsValue
    } = this.props
    let _data
    const { value: newData } = e.detail
    const { error } = this.state
    if(mode === modeList.selector) {
      const { selector } = this.props
      if(selector) {
        const { range } = selector
        _data = range[newData]
      } 
    }else if(mode === modeList.multiSelector) {
      const { multi } = this.props
      if(multi) {
        const { range } = multi
        let data: any[] = []
        newData.map((val, index) => {
          const _arr = range[index]
          data.push(_arr[val])
        })
        _data = data
      } 
    }else if(mode === modeList.date || mode === modeList.time) {
      _data = newData
    }
    if(error) this.setState({error: false})

    if(typeof propsValue !== 'undefined') {
      //只有当rest中不存在值得情况才才会触发change
      const data = (extraFactor && (multi || selector)) ? await this.restRef.current!.getData(false) : false
      if(!data || (Array.isArray(data) && data.length == 0)) {
        handleChange(_data)
      }
    }else {
      if(this.initialValue === undefined && typeof initialValue !== 'undefined') this.initialValue = initialValue
      this.setState({
        value: _data
      })
    }

  }

  //额外内容change
  public handleRestChange = (items: string[]) => {
    const { handleChange } = this.props
    const item = items.pop()
    handleChange && handleChange(item ? item : this.value)
  }

  //重置
  public reset = () => {
    const { multi, selector, extraFactor } = this.props
    if(extraFactor && (multi || selector)) this.restRef.current!.reset()
    this.setState({
      value: this.initialValue ? this.initialValue : (this.props.multi ? [] : ''),
      error: false
    })
  }

  //获取数据
  public getData = async (emptyCharge=true) => {
    const { value } = this.state
    const { multi, selector, extraFactor } = this.props
    const data = (extraFactor && (multi || selector)) ? await this.restRef.current!.getData(false) : false
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

  //设置禁止状态
  public setDisabled = (state: boolean) => {
    this.setState({
      disabled: state
    })
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
      selector, 
      multi, 
      time, 
      date, 
      title='选择', 
      extraFactor, 
      error:propsError=false 
    } = this.props

    let dateShow
    if(date) {
      dateShow = fieldTypeList[date.fields='year']
    }

    const { error, disabled } = this.state

    const _style = {
      ...STYLE, 
      ...customStyle.backgroundColor('disabled'), 
      ...(isObject(style) ? style : {}),
      ...((error || propsError) ? FORM_ERROR : {})
    }

    return (
      <View>
        {
          selector ? 
          <Picker
            disabled={disabled ? disabled : (selector.disabled || false)}
            onCancel={selector.onCancel || noop}
            range={selector.range || this.defaultConfig.range.selector}
            rangeKey={selector.rangeKey || this.defaultConfig.rangeKey.selector}
            mode={'selector'}
            onChange={(e) => {this.handleChange.call(this, e, modeList.selector)}}
            value={this.value}
          >
            <View className='picker'
              style={{..._style }}
            >
              {title}: {this.value}
            </View>
          </Picker>
          : null
        }
        {
          multi ? 
          <Picker
            mode={'multiSelector'}
            range={multi.range || this.defaultConfig.range.multi}
            rangeKey={multi.rangeKey || this.defaultConfig.rangeKey.multi}
            value={this.value}
            onChange={(e) => {this.handleChange.call(this, e, modeList.multiSelector)}}
            onColumnChange={multi.onColumnChange || noop}
            disabled={disabled ? disabled : (multi.disabled || false)}
            onCancel={multi.onCancel || noop}
          >
            <View className='picker'
              style={{..._style}}
            >
              {title}: {Array.isArray(this.value) ? this.value.join(' & ') : this.value}
            </View>
          </Picker>
          : null
        }
        {
          date ? 
          <Picker
            {...date}
            mode={'date'}
            onChange={(e) => {this.handleChange.call(this, e, modeList.date)}}
            value={this.value}
            start={date.start || this.defaultConfig.start.date}
            end={date.end || moment(new Date().getTime()).format(dateShow)}
            fields={date.fields || this.defaultConfig.fields.date}
            disabled={disabled ? disabled : (date.disabled || false)}
            onCancel={date.onCancel || noop}
          >
            <View className='picker'
              style={{..._style}}
            >
              {title}: {(this.value+'').length ? moment(this.value).format(dateShow) : ''}
            </View>
          </Picker>
          : null
        }
        {
          time ? 
          <Picker
            mode={'time'}
            value={this.value}
            onChange={(e) => {this.handleChange.call(this, e, modeList.time)}}
            onCancel={time.onCancel || noop}
            start={time.start || this.defaultConfig.start.time}
            end={time.end || this.defaultConfig.end.time}
            disabled={disabled ? disabled : (time.disabled || false)}
          >
            <View className='picker'
              style={{..._style}}
            >
              {title}: {(this.value + '').length ? moment(this.value).format(this.defaultConfig.time) : ''}
            </View>
          </Picker>
          : null
        }
        {
          (extraFactor && (selector || multi)) ?
          <Rest
            handleError={(status) => {this.setState({error: status})}}
            ref={this.restRef}
            title={'找不到可手动添加, 但只上传最后一项'}
            handleChange={this.handleRestChange}
          ></Rest>
          : null
        }
      </View>
    )
  }

}