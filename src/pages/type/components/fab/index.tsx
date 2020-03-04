import Taro, { Component } from '@tarojs/taro'
import { Text } from '@tarojs/components'
import { AtFab } from 'taro-ui'
import { IProps, IState } from './index.d'
import style from '~theme/style'

import './index.scss'

export default class Fab extends Component<IProps, IState> {

  public static defualtProps: IProps = {
    value: true,
    change: () => {}
  }

  public state: IState = {
    
  }

  public render() {
    const { value } = this.props
    return (
      <AtFab 
          onClick={this.props.change}
      >
          <Text style={{...style.color('secondary')}} className={'at-fab__icon at-icon ' + (value ? 'at-icon-bullet-list' : 'at-icon-money')}></Text>
      </AtFab>
    )
  }

}