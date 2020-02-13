import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import { isObject } from '~utils'
import './index.scss'

interface IList {
  id: string
  value: string
}

interface IProps {
  list: Array<IList>
  style?: any
}

interface IState {

}

const COLOR_LIST = [ 'rgba(245, 245, 245, 1)', 'rgba(245, 235, 245, 1)', 'rgba(235, 245, 245, 1)', 'rgba(245, 245, 235, 1)'  ]

const randomArea = () => {
  return Math.ceil(Math.random() * 20) + 'px'
}

const randomColor = () => {
  const len = COLOR_LIST.length
  return COLOR_LIST[Math.floor(Math.random() * len)]
}

const TAG_STYLE = {
  marginBottom: '5px',
  marginRight: '10px'
}

export default class extends Component<IProps, IState> {

  public render() {

    const { list=[], style } = this.props

    return (
      <View className='tag'>
        {
          list.map((val: IList) => {
            const { id, value } = val
            return (
              <AtTag 
                key={id}
                name={id}
                type='primary' 
                customStyle={{ ...TAG_STYLE, marginLeft: randomArea(), backgroundColor: randomColor(), ...(isObject(style) ? style : {})}}
              >
                {value}
              </AtTag>
            )
          })
        }
      </View>
    )
  }

}