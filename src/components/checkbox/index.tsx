import Taro from '@tarojs/taro'
import React, { useState } from 'react'
import { AtCheckbox, AtButton } from 'taro-ui'
import { View } from '@tarojs/components'
import { isObject } from '~utils'
import { FORM_ERROR } from '~config'
import styleColor  from '~theme/style'
import TagList from '../tagList'

import './index.scss'

export interface IOption {
  value: string
  label: string
  desc?: string
  disabled?: boolean
}

export interface IProps {
  style?: React.CSSProperties
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
  
}

const CheckBox: React.FC<IProps> = ({
  style={},
  value,
  checkboxOption=[],
  needHiddenList,
  handleChange: onChange,
  error
}) => {

  const [ show, setShow ] = useState(false)

  //处理选择
  const handleChange = (select: any) => {
    onChange && onChange(select)
  }
  
  //打开
  const open = () => setShow(true)
  
  //收起
  const close = () => {
    if(!show) return
    setShow(false)
  }

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
              const { label, value: tagValue } = data
              return {
                name: label,
                key: tagValue
              }
            })}
            handleChange={handleChange}
          ></TagList>
        : null
      }
      {
        (needHiddenList ? !show : false) ?
        <AtButton 
          type='secondary'
          size='small'
          onClick={open} 
          customStyle={{
            ...btnStyle,
            ...(error ? FORM_ERROR : {})
          }}
        >展开</AtButton>
        : null
      }
      {
        (needHiddenList ? show : true) ? 
        <AtCheckbox
          options={checkboxOption}
          selectedList={value}
          onChange={handleChange}
        >
        </AtCheckbox>
        : null
      }
      <AtButton 
        type='secondary'
        onClick={close} 
        size='small'
        customStyle={{ 
          ...btnStyle, 
          display: (needHiddenList ? show : false) ? 'block' : 'none' 
        }}
      >
        收起
      </AtButton>
    </View>
  )

}

export default CheckBox