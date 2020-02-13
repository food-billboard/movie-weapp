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
}

const { count } = IMAGE_CONFIG

export default class extends Component<IProps, IState> {

  public state: IState = {
    files: [],
    showAddBtn: true
  }

  private FIRST = true

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

  public render() {

    const { mode, multiple=true, length=6, files=false } = this.props

    if(this.FIRST) {
      if(Array.isArray(files) && files.length) {
        this.FIRST = false
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