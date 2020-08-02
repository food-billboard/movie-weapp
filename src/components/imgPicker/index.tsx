import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { AtImagePicker } from 'taro-ui'
import { IMAGE_CONFIG, FORM_ERROR } from '~config'
import { Toast } from '../toast'

import { ICommonFormProps, ICommonFormState } from '~utils'

export interface IFiles {
  url: string
}

export interface IProps extends ICommonFormProps {
  mode?: 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'top' | 'bottom' | 'center' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right'
  multiple?: boolean
  length?: number
  count?: number
  value?: Array<IFiles> | false
  initialValue?: Array<IFiles>
  handleChange?: (files: Array<any>, operationType: string, index: number) => any
}

export interface IState extends ICommonFormState {
  value: Array<IFiles>
  showAddBtn: boolean
  // count: number
}

const { count: defaultCount } = IMAGE_CONFIG

export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    value: false
  }

  public state: IState = {
    value: [],
    showAddBtn: true,
    error: false,
  }

  private initialValue: any = undefined

  //表单value
  private _value

  private get value() {
    const { value: propsValue, initialValue, count = defaultCount } = this.props
    const { value: stateValue } = this.state
    if (propsValue !== false) {
      const data = propsValue || []
      return data
    } else {
      if (this.initialValue === undefined && typeof initialValue !== 'undefined') {
        return initialValue
      }
      return stateValue
    }
  }

  //图片选择/删除
  public handleChange = (files: Array<any>, operationType: string, index: number) => {
    const {
      count = defaultCount,
      handleChange,
      initialValue,
    } = this.props
    const fileLen = files.length
    if (operationType === 'add') {
      if (fileLen > count) {
        Toast({
          title: '超出图片增加数',
          icon: 'fail',
          duration: 1000
        })
        return
      }
    }
    if (this.initialValue === undefined && typeof initialValue !== 'undefined') this.initialValue = initialValue
    this.setImageItem(files)
    handleChange && handleChange(files, operationType, index)

    Toast({
      title: operationType === 'add' ? '添加成功' : '删除成功',
      icon: 'success',
      duration: 500
    })
  }

  //设置图片
  public setImageItem = (files: Array<any>) => {
    this.setState({
      value: files
    })
  }

  //控制按钮的显示隐藏
  public controlShowBtn = () => {
    const { count = defaultCount } = this.props
    return count > this.value.length
  }

  //图片点击
  public handleClick = (index: number, file: IFiles) => {
    const { value: files } = this.state
    Taro.previewImage({
      current: file.url,
      urls: files.map((val: IFiles) => {
        const { url } = val
        return url
      })
    })
  }

  //重置
  public reset = () => {
    const { count = defaultCount } = this.props
    this.setState({
      value: this.initialValue ? this.initialValue : [],
      showAddBtn: this.initialValue ? (this.initialValue.length >= count ? false : true) : true
    })
  }

  //获取数据
  public getData = async (emptyCharge = true) => {
    const { value: files } = this.state
    if (!files.length && emptyCharge) {
      await this.setState({
        error: true
      })
      return false
    }
    await this.setState({
      error: false
    })
    return files
  }

  //设置error
  public setError = (state: boolean) => {
    this.setState({
      error: state
    })
  }

  public render() {

    const {
      mode,
      multiple = true,
      length = 6,
      count = defaultCount,
      error: propsError = false
    } = this.props
    const { error: stateError } = this.state
    const style = (propsError || stateError) ? FORM_ERROR : {}

    const _showAddBtn = this.controlShowBtn()

    return (
      <AtImagePicker
        files={this.value}
        mode={mode}
        showAddBtn={_showAddBtn}
        multiple={multiple}
        count={count}
        sizeType={['100', '100']}
        length={length}
        onChange={this.handleChange}
        onImageClick={this.handleClick}
        customStyle={style}
      ></AtImagePicker>
    )
  }

}