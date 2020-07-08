import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { isObject } from '~utils'
import moment from 'moment'
import { FORM_ERROR, SYSTEM_PAGE_SIZE } from '~config'
import { IProps, IState, fieldTypeList } from './index.d'
import customStyle from '~theme/style'
import { noop } from 'lodash'
 
const STYLE = {
  width:'100%',
  height: SYSTEM_PAGE_SIZE(30) + 'px',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  lineHeight: SYSTEM_PAGE_SIZE(30) + 'px',
  boxSizing: 'border-box'
}

const modeList = {
  selector: 'selector',
  time: 'time',
  date: 'date',
  multiSelector: 'multiSelector'
}

export default class extends Component<IProps, IState> {

  public state: IState = {
    disabled: false
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

  //处理change
  public handleChange = async (e: any, mode) => {
    const { 
      handleChange, 
      multi, 
      selector, 
    } = this.props
    let _data
    const { value: newData } = e.detail
    if(mode === modeList.selector) {
      if(selector) {
        const { range } = selector
        _data = range[newData]
      } 
    }else if(mode === modeList.multiSelector) {
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

    handleChange && handleChange(_data)

  }

  //设置禁止状态
  public setDisabled = (state: boolean) => {
    this.setState({
      disabled: state
    })
  }

  public render() {

    const { 
      style={}, 
      selector=false, 
      multi=false, 
      time=false, 
      date=false, 
      title='选择', 
      error=false,
      value
    } = this.props

    let dateShow
    if(date) {
      dateShow = fieldTypeList[date.fields='year']
    }

    const { disabled } = this.state

    const _style = {
      ...STYLE, 
      ...customStyle.backgroundColor('disabled'), 
      ...(isObject(style) ? style : {}),
      ...(error ? FORM_ERROR : {})
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
            range={multi.range || this.defaultConfig.range.multi}
            rangeKey={multi.rangeKey || this.defaultConfig.rangeKey.multi}
            value={value}
            onChange={(e) => {this.handleChange.call(this, e, modeList.multiSelector)}}
            onColumnChange={multi.onColumnChange || noop}
            disabled={disabled ? disabled : (multi.disabled || false)}
            onCancel={multi.onCancel || noop}
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
            onChange={(e) => {this.handleChange.call(this, e, modeList.date)}}
            value={value}
            start={date.start || this.defaultConfig.start.date}
            end={date.end || moment(new Date().getTime()).format(dateShow)}
            fields={date.fields || this.defaultConfig.fields.date}
            disabled={disabled ? disabled : (date.disabled || false)}
            onCancel={date.onCancel || noop}
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
            onChange={(e) => {this.handleChange.call(this, e, modeList.time)}}
            onCancel={time.onCancel || noop}
            start={time.start || this.defaultConfig.start.time}
            end={time.end || this.defaultConfig.end.time}
            disabled={disabled ? disabled : (time.disabled || false)}
          >
            <View className='picker'
              style={{..._style}}
            >
              {title}: {(value + '').length ? moment(value).format(this.defaultConfig.time) : ''}
            </View>
          </Picker>
          : null
        }
      </View>
    )
  }

}