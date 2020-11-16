import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import React, { useState } from 'react'
import { View } from '@tarojs/components'
import style from '~theme/style'
import noop from 'lodash/noop'

type primary = 'primary'
type secondary = 'secondary'

export interface IProps {
  value: Array<string>
  active: number
  type: primary | secondary | undefined
  operate?: (...args: any) => any
  style?: React.CSSProperties
}

export interface IState {
  active: number
}

const Button: React.FC<IProps> = ({
  value = ['是', '不是'],
  active:propActive = 0,
  type = 'primary',
  operate = noop,
  style: customStyle = {}
}) => {

  const [active, setActive] = useState(propActive)

  //按钮模式切换
  const modeChange = () => {
    operate()
    setActive((active + 1) % 2)
  }

  return (
    <View>
      <AtButton
        customStyle={{ ...style.border(1, 'primary', 'solid', 'all'), ...style.color('primary'), ...customStyle }}
        type={type}
        circle={true}
        onClick={modeChange}
        size='normal'
      >{value[active]}</AtButton>
    </View>
  )

}

export default Button
