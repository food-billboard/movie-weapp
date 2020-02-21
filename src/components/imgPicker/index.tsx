import Taro, { Component } from '@tarojs/taro'
import { AtImagePicker } from 'taro-ui'
import { IMAGE_CONFIG } from '~config'
import {Toast} from '../toast'
import { IProps, IState, IFiles } from './interface'

const { count } = IMAGE_CONFIG

export default class extends Component<IProps, IState> {

  //处理count变化
  public componentWillReceiveProps = (props) => {
    if(props.count === false) return
    this.setState({
      count: props.count
    })
  }

  public state: IState = {
    files: [],
    showAddBtn: true,
    error: false,
    count: this.props.count ? this.props.count : count
  }

  private FIRST = true

  private initValue: any = false

  //图片选择/删除
  public handleChange = (files: Array<any>, operationType: string, index: number) => {
    const { files: list, count } = this.state
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
    this.setImageItem(files)
    this.controlShowBtn(!(fileLen === count))
    Toast({
      title: operationType === 'add' ? '添加成功' : '删除成功',
      icon: 'success',
      duration: 500
    })
  }

  //设置图片
  public setImageItem = (files: Array<any>) => {
    this.setState({
      files
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
    const { files } = this.state
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
    this.setState({
      files: this.initValue ? this.initValue : []
    })
  }

  //获取数据
  public getData = async (emptyCharge=true) => {
    const { files } = this.state
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

  public render() {

    const { mode, multiple=true, length=6, files=false, count:propsCount=false } = this.props

    if(this.FIRST) {
      if(Array.isArray(files) && files.length) {
        this.FIRST = false
        this.initValue = files
        this.setState({
          files
        })
      }
    }

    const { files: imageList, showAddBtn } = this.state

    return (
      <AtImagePicker
        files={imageList}
        mode={mode}
        showAddBtn={showAddBtn}
        multiple={multiple}
        count={propsCount ? propsCount : count}
        sizeType={['100', '100']}
        length={length}
        onChange={this.props.handleChange ? this.props.handleChange : this.handleChange}
        onImageClick={this.handleClick}
      ></AtImagePicker>
    )
  }

}