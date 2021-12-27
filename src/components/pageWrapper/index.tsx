import React, { Component } from 'react'
import { TypeColor, colorStyleChange } from '~theme/color'

export type TColor = {
  primary: string
  secondary: string
  thirdly: string
  disabled: string
  bgColor: string
}

export default (isTab=false) => (childComponent: any) => {
  return class extends childComponent {
    //色调修改时重绘用
    public componentDidShow = () => {
      colorStyleChange(isTab)
      // const { typeColor } = this.state
      // if(typeColor == TypeColor) return
      // this.setState({ typeColor: TypeColor })
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