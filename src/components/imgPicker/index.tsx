import Taro, { Component } from '@tarojs/taro'
import { AtImagePicker } from 'taro-ui'
import { IMAGE_CONFIG } from '~config'
import {Toast} from '../toast'

interface IFiles {
  url: string
}

interface IProps {
  files?: Array<IFiles> | false
  mode?: 'scaleToFill'|'aspectFit'|'aspectFill'|'widthFix'|'top'|'bottom'|'center'|'left'|'right'|'top left'|'top right'|'bottom left'|'bottom right'
  multiple?: boolean
  length?: number
}

interface IState {
  files: Array<IFiles>
  showAddBtn: boolean
  error: boolean
}

const { count } = IMAGE_CONFIG

export default class extends Component<IProps, IState> {

  public state: IState = {
    files: [],
    showAddBtn: true,
    error: false
  }

  private FIRST = true

  private initValue: any = false

  //图片选择/删除
  public handleChange = (files: Array<any>, operationType: string, index: number) => {
    const { files: list } = this.state
    const listLen = list.length
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
    this.setState({
      files,
      showAddBtn: !(fileLen === count)
    })
    Toast({
      title: operationType === 'add' ? '添加成功' : '删除成功',
      icon: 'success',
      duration: 500
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

    const { mode, multiple=true, length=6, files=false } = this.props

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
        count={count}
        sizeType={['100', '100']}
        length={length}
        onChange={this.handleChange}
        onImageClick={this.handleClick}
      ></AtImagePicker>
    )
  }

}