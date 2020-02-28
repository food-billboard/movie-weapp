import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { IProps, IState } from './interface'
import { isObject } from '~utils'
import { style as customeStyle } from '~theme/global-style'

import './index.scss'

export default class extends Component<IProps, IState> {

  public state: IState = {
    
  }

  public emptyFn = () => {}

  //取消
  public handleCancel = () => {
    this.handleclose()
  }

  //关闭
  public handleclose = () => {
    this.setState({
      isOpen: false
    })
  }

  public render() {

    const { 
      style={}, 
      renderTitle,
      title=false,
      renderMain, 
      main=false,
      renderAction, 
      action=false,
      renderOther, 
      other=false,
      cancel=true ,
      isOpen=false
    } = this.props

    return (
      <View 
        className='curtain'
        style={{ ...(isObject(style) ? style : {}), display: isOpen ? 'block' : 'none' }}
      > 
        <View 
          className='shadow'
          style={{...customeStyle.backgroundColor('primary')}}
          onClick={() => {cancel ? (this.props.handleCancel ? this.props.handleCancel.call(this) : this.handleCancel.call(this)) : this.emptyFn}}
        ></View>
        <View 
          className='main'
        >
          {
            title && 
            <View 
              className='title'
              style={{...customeStyle.border(1, 'disabled', 'solid', 'bottom')}}
            >
              {
                renderTitle
              }
            </View>
          }
          {
            main && 
            <View className='content'>
              {renderMain}
            </View>
          }
          {
            action &&
            <View 
              className='action'
              style={{...customeStyle.border(1, 'disabled', 'solid', 'top')}}
            >
              {renderAction}
            </View>
          }
          {
            other &&
            <View className='other'>
              {renderOther}
            </View>
          }
          <View 
            className='close at-icon at-icon-close'
            style={{...customeStyle.backgroundColor('bgColor'), ...customeStyle.color('primary')}}
            onClick={this.handleclose}
          ></View>
        </View>
      </View>
    )
  }

}