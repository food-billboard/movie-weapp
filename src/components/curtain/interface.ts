import { Component } from 'react'
/**
 * 自定义幕帘组件
 * props: {
 *  style: 样式
 *  title: 标题
 *  main: 主要内容
 *  action: 操作内容
 *  other: 其他内容
 *  handleClose: 处理关闭
 *  handleCancel: 处理取消
 *  cancel: 是否需要取消功能
 *  renderTitle
 *  renderMain
 *  renderAction
 *  renderOther
 *  isOpen: 控制幕帘的显示隐藏
 * }
 * 
 * state: {
 *  
 * }
 */

 export interface IProps {
  style?: any
  title: boolean
  main:boolean
  action: boolean
  other: boolean
  renderTitle?: any
  renderMain?: any
  renderAction?: any
  renderOther?: any
  handleClose?: (...args: any[]) => any
  handleCancel?: (...args: any[]) => any
  cancel?: boolean
  isOpen: boolean
 }

 export interface IState {
  
 }