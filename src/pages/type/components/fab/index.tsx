import Taro, { Component } from '@tarojs/taro'
import { Text } from '@tarojs/components'
import { AtFab } from 'taro-ui'

import './index.scss'

interface IProps {

}

interface IState {
  
}

export default class Fab extends Component<IProps, IState> {

  private _listShow = true

  public get listShow() {
    return this._listShow || false
  }

  public set listShow(state: boolean) {
    this._listShow = state
  }

  public changeState = () => {
    const listShow = this.listShow
    this.listShow = !listShow
  }

  public render() {
    return (
      <AtFab 
          onClick={this.changeState}
      >
          <Text className={'at-fab__icon at-icon ' + (this.listShow ? 'at-icon-bullet-list' : 'at-icon-money')}></Text>
      </AtFab>
    )
  }

}