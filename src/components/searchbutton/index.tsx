import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import { AtSearchBar } from 'taro-ui'
import { router, routeAlias, isH5 } from '~utils'
import style from '~theme/style'

import './index.scss'

export interface IPoint {
  value: string
}

export interface IProps {
  value: string,
  disabled: boolean,
  confirm: any
  focus?: boolean
  control?: (op: boolean) => any
  handleChange?: (...args: any[]) => any
}

export interface IState {
  value: string
  pointList: Array<IPoint>
}

class SearchButton extends Component<IProps, IState>{
  //默认数据
  public static defaultProps: IProps = {
    value: '',
    disabled: false,
    confirm: () => { },
    focus: false,
    control: () => { },
  }

  public state: IState = {
    pointList: [],
    value: ''
  }

  /**
   * 监听输入框改变
   */
  public onChange = (value: string = '', event: any) => {
    const realValue = isH5 ? event.detail.value : value 
    this.setState({
      value: realValue,
    })
    this.props.handleChange && this.props.handleChange(realValue)
  }

  /**
   *监听失去焦点 
   */
  public onBlur = () => {
    this.setState({
      pointList: []
    })
    this.props.control?.(true)
  }

  /**
   * 监听获取焦点
   */
  public onFocus = () => {
    this.props.control?.(false)
  }

  /**
   * 搜索
   */
  public confirm = () => {
    const { value } = this.props
    const { value: stateValue } = this.state
    const realValue = value || stateValue
    if (!realValue) {
      return Taro.showToast({
        title: '搜索词太少',
        icon: 'none',
        mask: true,
      })
    }
    this.props.confirm && this.props.confirm(realValue)
    this.setState({
      pointList: []
    })
  }

  //处理点击搜索栏
  public handleClick = () => {
    const { disabled } = this.props
    if (!disabled) return
    router.push(routeAlias.search)
  }

  public render() {
    //获取热搜信息列表
    const { focus, disabled = false } = this.props
    const { pointList, value } = this.state

    return (
      <View className='component-search-button'>
        <View onClick={this.handleClick}>
          <AtSearchBar
            customStyle={{ ...style.backgroundColor('bgColor') }}
            onActionClick={this.confirm}
            value={this.props.value || value}
            onChange={this.onChange}
            actionName='找一找'
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            focus={focus}
            disabled={disabled}
            className={classnames('component-search-button-input', {
              'component-search-button-input-h5': isH5
            })}
          />
        </View>
        {
          !!pointList.length && (
            <View
              className='component-search-button-point-list'
              style={{ ...style.backgroundColor('disabled') }}
            >
              {
                pointList.map((val: IPoint) => {
                  const { value: point } = val
                  return (
                    <View
                      className='component-search-button-point-list-item'
                      key={point}
                      style={{ ...style.border(1, 'bgColor', 'dashed', 'bottom') }}
                    >
                      {point}
                    </View>
                  )
                })
              }
            </View>
          )
        }
      </View>
    )
  }
}

export default SearchButton