import React from 'react'
import { colorStyleChange } from '~theme/color'

export type TColor = {
  primary: string
  secondary: string
  thirdly: string
  disabled: string
  bgColor: string
}

export default (isTab = false) => (childComponent: any) => {
  return class extends childComponent {
    //色调修改时重绘用
    public componentDidShow = () => {
      colorStyleChange(isTab)
    }

    color = {
      primary: 'red',
      secondary: 'yellow',
      thirdly: 'black',
      disabled: 'gray',
      bgColor: 'white'
    }

    styleColor = {
      primary: 'red',
      secondary: 'yellow',
      thirdly: 'black',
      disabled: 'gray',
      bgColor: 'white'
    }

  }
}