import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { isObject } from '~utils'
import Rest from '~components/restFactor'
import moment from 'moment'
import { FORM_ERROR } from '~config'
import { IProps, IState, TMode } from './interface'
import { style as customStyle } from '~theme/global-style'
 
const STYLE = {
  width:'100%',
  height: '30px',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  lineHeight: '30px',
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

  private FIRST = true

  private initValue: any = false

  //额外内容
  public restRef = Taro.createRef<Rest>()

  //处理change
  public handleChange = (e: any, mode: TMode) => {
    const { value: newData } = e.detail
    if(mode === 'selector') {
      const { selector } = this.props
      if(selector) {
        const { range } = selector
        this.setState({
          value: range[newData]
        })
      } 
    }else if(mode === 'multiSelector') {
      const { multi } = this.props
      if(multi) {
        const { range } = multi
        let data: any[] = []
        newData.map((val, index) => {
          const _arr = range[index]
          data.push(_arr[val])
        })
        this.setState({
          value: data
        })
      } 
    }else if(mode === 'date' || mode === 'time') {
      this.setState({
        value: newData
      })
    }
  }

  //默认方法
  public defaultFn = () => {

  }

  //重置
  public reset = () => {
    const { multi, selector } = this.props
    if(multi || selector) this.restRef.current!.reset()
    this.setState({
      value: this.initValue ? this.initValue : (this.props.multi ? [] : '')
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

  public render() {

    const { style, selector, multi, time, date, value: propsValue, title='选择', extraFactor } = this.props

    if(this.FIRST) {
      if(propsValue) {
        this.FIRST = false
        this.initValue = propsValue
        this.setState({
          value: propsValue
        })
      }
    }

    let dateShow
    if(date) {
      switch(date.fields) {
        case 'year': 
          dateShow = 'YYYY'
          break
        case 'month':
          dateShow = 'YYYY-MM'
          break
        case 'day': 
        default:
          dateShow = 'YYYY-MM-DD'
          break
      }
    }

    const { value, error, disabled } = this.state

    const _style = isObject(style) ? { ...STYLE, ...style, ...customStyle.backgroundColor('disabled'), ...(error ? FORM_ERROR : {})} : { ...STYLE, ...customStyle.backgroundColor('disabled'), ...(error ? FORM_ERROR : {}) }

    return (
      <View>
        {
          selector ? 
          <Picker
            disabled={disabled ? disabled : (selector.disabled || false)}
            onCancel={selector.onCancel || this.defaultFn}
            range={selector.range || []}
            rangeKey={selector.rangeKey || ''}
            mode={'selector'}
            onChange={(e) => {this.handleChange.call(this, e, 'selector')}}
            value={value}
          >
            <View className='picker'
              style={{..._style }}
            >
              {title}: {value}
            </View>
          </Picker>
          : null
        }
        {
          multi ? 
          <Picker
            mode={'multiSelector'}
            range={multi.range || []}
            rangeKey={multi.rangeKey || ''}
            value={value}
            onChange={(e) => {this.handleChange.call(this, e, 'multiSelector')}}
            onColumnChange={multi.onColumnChange || this.defaultFn}
            disabled={disabled ? disabled : (multi.disabled || false)}
            onCancel={multi.onCancel || this.defaultFn}
          >
            <View className='picker'
              style={{..._style}}
            >
              {title}: {Array.isArray(value) ? value.join(' & ') : value}
            </View>
          </Picker>
          : null
        }
        {
          date ? 
          <Picker
            {...date}
            mode={'date'}
            onChange={(e) => {this.handleChange.call(this, e, 'date')}}
            value={value}
            start={date.start || '1970-01-01'}
            end={date.end || moment(new Date().getTime()).format(dateShow)}
            fields={date.fields || 'day'}
            disabled={disabled ? disabled : (date.disabled || false)}
            onCancel={date.onCancel || this.defaultFn}
          >
            <View className='picker'
              style={{..._style}}
            >
              {title}: {(value+'').length ? moment(value).format(dateShow) : ''}
            </View>
          </Picker>
          : null
        }
        {
          time ? 
          <Picker
            mode={'time'}
            value={value}
            onChange={(e) => {this.handleChange.call(this, e, 'time')}}
            onCancel={time.onCancel || this.defaultFn}
            start={time.start || '00:00'}
            end={time.end || '23:59'}
            disabled={disabled ? disabled : (time.disabled || false)}
          >
            <View className='picker'
              style={{..._style}}
            >
              {title}: {(value + '').length ? moment(value).format('mm:ss') : ''}
            </View>
          </Picker>
          : null
        }
        {
          (extraFactor && (selector || multi)) ?
          <Rest
            ref={this.restRef}
            title={'找不到可手动添加, 但只上传最后一项'}
          ></Rest>
          : null
        }
      </View>
    )
  }

}