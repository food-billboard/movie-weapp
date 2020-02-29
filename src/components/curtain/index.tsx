import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { IProps, IState } from './index.d'
import { isObject } from '~utils'
import { style as customeStyle } from '~theme/global-style'

import './index.scss'

export default class extends Component<IProps, IState> {

  public state: IState = {
    
  }

  public emptyFn = () => {}

  //取消
  public handleCancel = () => {
    this.props.handleClose()
  }

  //阻止手指滑动
  public stopMove = (e) => {
    e.stopPropagation()
  }

  public render() {

    const { 
      contentStyle={}, 
      curtainStyle={},
      title=false,
      main=false,
      action=false,
      other=false,
      cancel=true ,
      isOpen=false
    } = this.props

    return (
      <View 
        className='curtain'
        style={{ display: isOpen ? 'block' : 'none' }}
      > 
        <View 
          className='shadow'
          onTouchMove={this.stopMove}
          style={{...customeStyle.backgroundColor('primary'), ...(isObject(curtainStyle) ? curtainStyle : {})}}
          onClick={() => {cancel ? (this.props.handleCancel ? this.props.handleCancel.call(this) : this.handleCancel.call(this)) : this.emptyFn}}
        ></View>
        <View 
          className='main'
          style={{...customeStyle.backgroundColor('bgColor'), ...(isObject(contentStyle) ? contentStyle : {})}}
        >
          {
            title && 
            <View 
              className='title'
              style={{...customeStyle.border(1, 'disabled', 'solid', 'bottom')}}
            >
              {
                this.props.renderTitle
              }
            </View>
          }
          {
            main && 
            <View className='content'>
              {this.props.renderMain}
            </View>
          }
          {
            action &&
            <View 
              className='action'
              style={{...customeStyle.border(1, 'disabled', 'solid', 'top')}}
            >
              {this.props.renderAction}
            </View>
          }
          {
            other &&
            <View className='other'>
              {this.props.renderOther}
            </View>
          }
          <View 
            className='close at-icon at-icon-close'
            style={{...customeStyle.backgroundColor('bgColor'), ...customeStyle.color('primary')}}
            onClick={this.props.handleClose}
          ></View>
        </View>
      </View>
    )
  }

}