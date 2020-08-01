import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { AtCheckbox, AtButton } from 'taro-ui'
import { View } from '@tarojs/components'
import TagList from '../tagList'
import { isObject, ICommonFormProps, ICommonFormState } from '~utils'
import { FORM_ERROR, SYSTEM_PAGE_SIZE } from '~config'
import styleColor  from '~theme/style'

import './index.scss'

export interface IOption {
  value: string
  label: string
  desc?: string
  disabled?: boolean
}

export interface IProps {
  style?: any
  value: Array<string>
  checkboxOption?: Array<IOption>
  needHiddenList?: boolean
  handleChange?:(...args: Array<any>) => any
  error?: boolean
}

export interface IState {
  show: boolean
}

const BUTTON_STYLE = {
  height:SYSTEM_PAGE_SIZE(40) + 'px'
}

export default class extends Component<IProps, IState> {

  public state: IState = {
    show: false,
  }

  //处理选择
  public handleChange = (value: any) => {
    const { 
      handleChange,
    } = this.props
    handleChange && handleChange(value)
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

  public render() {
    const { 
      checkboxOption=[], 
      style={}, 
      value=[],
      needHiddenList, 
      error=false 
    } = this.props

    const { show } = this.state

    const btnStyle = {
      ...BUTTON_STYLE, 
      ...styleColor.border(1, 'primary', 'solid', 'all'), 
      ...styleColor.color('primary'), 
    }

    const globalStyle = {
      ...(isObject(style) ? style : {}),
    }

    return (
      <View style={globalStyle}>
        {
           needHiddenList ? 
           <TagList
            style={{marginBottom: '5px'}}
            list={value.map(item => {
              const [ data ] = checkboxOption.filter(option => option.value === item)
              const { label, value } = data
              return {
                name: label,
                key: value
              }
            })}
            handleChange={this.handleChange}
           ></TagList>
          : null
        }
        {
          (needHiddenList ? !show : false) ?
          <AtButton 
            type={'secondary'} 
            onClick={this.open} 
            customStyle={{
              ...btnStyle,
              ...(error ? FORM_ERROR : {})
            }}>打开</AtButton>
          : null
        }
        {
          (needHiddenList ? show : true) ? 
          <AtCheckbox
            options={checkboxOption}
            selectedList={value}
            onChange={this.handleChange}
          >
          </AtCheckbox>
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