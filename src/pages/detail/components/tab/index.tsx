import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { AtSegmentedControl } from 'taro-ui'
import { SYSTEM_PAGE_SIZE } from '~config'
import { TypeColor } from '~theme/color'
import { noop } from 'lodash'
import { IProps, IState } from './index.d'
import { AtSegmentedControlProps } from 'taro-ui/@types/segmented-control'

export interface IProps extends Pick<AtSegmentedControlProps, 'color' | 'selectedColor' | 'fontSize' | 'disabled' | 'values'>{
  handleClick?: (value: any) => void
  current?: number
  tabToggle?: false | number
}

export interface IState {
  current: number
} 

export default class extends Component<IProps, IState> {

  public state: IState = {
    current: this.props.current || 0
  }

  tabToggle = false
  isLoading = false
  toggle = 2000

  //tab切换
  public handleChangeTab = (value) => {
    const { tabToggle } = this.props
    const { current } = this.state

    if(current == value) return
    if(tabToggle) {
      if(this.isLoading) return
      this.isLoading = true
      Taro.showLoading({mask: true, title: '加载中...'})
    }

    let timer = setTimeout(() => {
      Taro.hideLoading()
      this.isLoading = false
      clearTimeout(timer)
    }, typeof this.tabToggle === 'number' ? this.tabToggle : this.toggle)

    const { handleClick } = this.props
    handleClick && handleClick(value)
    
    this.setState({
      current: value
    })
  }

  public getCurrent = () => this.state.current

  public render() {

    const {
      color=TypeColor['disabled'],
      selectedColor=TypeColor['primary'],
      fontSize=SYSTEM_PAGE_SIZE(32),
      disabled=false,
      values=[],
    } = this.props
    const {
      current
    } = this.state

    return (
      <AtSegmentedControl
          values={values}
          onClick={this.handleChangeTab}
          current={current}
          color={color}
          selectedColor={selectedColor}
          fontSize={fontSize}
          disabled={disabled}
      >
        {this.props.children}
      </AtSegmentedControl>
    )
  }

}
