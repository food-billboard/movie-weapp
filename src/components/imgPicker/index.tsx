import Taro, { Component } from '@tarojs/taro'
import { AtImagePicker } from 'taro-ui'
import { IMAGE_CONFIG, FORM_ERROR } from '~config'
import {Toast} from '../toast'
import { IProps, IState, IFiles } from './index.d'
import { noop } from 'lodash'

const { count: defaultCount } = IMAGE_CONFIG

export default class extends Component<IProps, IState> {

  public state: IState = {
    value: [],
    showAddBtn: true,
    error: false,
  }

  private initialValue: any = undefined

  //表单value
  private _value

  private get value() {
    const { value: propsValue, initialValue } = this.props
    const { value:stateValue } = this.state
    if(typeof propsValue !== 'undefined' ) {
      return propsValue
    }else {
      if(this.initialValue === undefined && typeof initialValue !== 'undefined') {
        return initialValue
      }
      return stateValue
    }
  }

  //图片选择/删除
  public handleChange = (files: Array<any>, operationType: string, index: number) => {
    const { 
      count=defaultCount, 
      handleChange=noop,
      initialValue,
      value: propsValue 
    } = this.props
    const fileLen = files.length
    if(operationType === 'add') {
      if(fileLen > count) {
        Toast({
          title: '超出图片增加数',
          icon: 'fail',
          duration: 1000
        })
        return
      }
    } 
    if(typeof propsValue !== 'undefined') {
      handleChange(files)
    }else {
      if(this.initialValue === undefined && typeof initialValue !== 'undefined') this.initialValue = initialValue
      this.setImageItem(files)
    }

    this.controlShowBtn(!(fileLen >= count))
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
  public controlShowBtn = (status: boolean) => {
    this.setState({
      showAddBtn: status
    })
  }

  //图片点击
  public handleClick = (index: number, file:IFiles ) => {
    const { value:files } = this.state
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
    const { count=defaultCount } = this.props
    this.setState({
      value: this.initialValue ? this.initialValue : [],
      showAddBtn: this.initialValue ? (this.initialValue.length >= count ? false : true) : true
    })
  }

  //获取数据
  public getData = async (emptyCharge=true) => {
    const { value: files } = this.state
    if(!files.length && emptyCharge) {
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
      multiple=true, 
      length=6,
      count=defaultCount, 
      error=false 
    } = this.props
    const style = error ? FORM_ERROR : {}

    const { showAddBtn } = this.state

    return (
      <AtImagePicker
        files={this.value}
        mode={mode}
        showAddBtn={showAddBtn}
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