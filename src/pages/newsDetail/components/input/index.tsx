import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import Mime from 'mime'
import { View, Textarea } from '@tarojs/components'
import Emoj from '../emojSwiper'
import style from '~theme/style'
import { EMediaType, Upload } from '~utils'
import { IMAGE_CONFIG } from '~config'
import noop from 'lodash/noop'

import './index.scss'

export interface IProps {
  disabled?: boolean
  placeholder?: string
  inputVisible?: boolean
  sendInfo: (...args: any[]) => any
  onHeightChange?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
}

export interface IState {
  inputDisabled: boolean
  detailFunc: boolean
  inputValue: string
  autoHeight: boolean
  // lifeStatus: boolean
}

//输入框最大显示行数
const MAX_COL_COUNT = 5

export default class extends Component<IProps, IState> {

  public state: IState = {
    inputDisabled: this.props.disabled || false,
    detailFunc: false,
    inputValue: this.props.placeholder || '',
    autoHeight: true,
    // lifeStatus: false
  }

  private EmojRef = React.createRef<Emoj>()

  //重置状态
  public resetStatus = (status?) => this.handleShowDetailFunc(false)

  //添加图片
  public handleAddImage = () => {
    const { inputDisabled } = this.state
    if (inputDisabled) return

    this.resetStatus()

    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    }).then((res) => {
      const { errMsg } = res
      const [, msg] = errMsg.split(':')
      if (msg === 'ok') {
        const { tempFilePaths } = res //地址的字符串数组
        //文件上传
        return Promise.all((Array.isArray(tempFilePaths) ? tempFilePaths : [tempFilePaths]).map((tempPath: string) => {
          const mime = Mime.getType(tempPath)
          return Upload(tempPath)
        }))
      } else {
        return Promise.reject()
      }
    })
      .then(data => {
        let realData
        if (Array.isArray(data)) {
          realData = data[0]
        } else {
          realData = data
        }
        if (!realData._id) {
          Taro.showToast({ mask: false, title: '出错了，请重试', duration: 500 })
          return
        }
        this.props.sendInfo(EMediaType.IMAGE, realData._id)
      })
      .catch(_ => {
        Taro.showToast({ mask: false, title: '未知错误，请重试', duration: 500 })
      })
  }

  //添加视频
  public handleAddVideo = () => {
    const { inputDisabled } = this.state
    if (inputDisabled) return

    this.resetStatus()

    Taro.chooseVideo({
      sourceType: ['album', 'camera'],
      camera: 'back',
    }).then(async (res: any) => {
      const { errMsg } = res
      const [, msg] = errMsg.split(':')
      if (msg === 'ok') {
        const {
          tempFilePath,
          thumbTempFilePath,
          duration,
          size,
          width,
          height
        } = res
        //文件上传
        return Promise.all([
          Upload(thumbTempFilePath),
          Upload(tempFilePath)
        ])
      }
    })
      .then((data: any) => {
        const realVideoInfo = data.map(d => {
          let realData
          if (Array.isArray(d)) {
            realData = d[0]
          } else {
            realData = d
          }
          if (!realData._id) {
            Taro.showToast({ mask: false, title: '出错了，请重试', duration: 500 })
            return
          }
          return realData._id
        })
        let realImage = realVideoInfo[0]
        let realVideo = realVideoInfo[1]
        this.props.sendInfo(EMediaType.VIDEO, {
          image: realImage,
          video: realVideo
        })
      })
      .catch(_ => {
        console.log(_)
        Taro.showToast({ mask: false, title: 'unknown error', duration: 500 })
      })
  }

  //添加音频
  public handleAddAudio = () => {
    const { inputDisabled } = this.state
    if (inputDisabled) return

    this.resetStatus()

  }

  //选择表情
  public handleEmoj = () => {
    const { inputDisabled } = this.state
    const { onHeightChange = noop } = this.props
    if (inputDisabled) return

    this.EmojRef.current!.controlShowHide(onHeightChange)
  }

  //显示详细功能
  public handleShowDetailFunc = (status?: boolean) => {
    const { detailFunc } = this.state
    const { onHeightChange = noop, onFocus = noop } = this.props
    if (!!detailFunc) this.EmojRef.current!.handleClose()
    this.setState({
      detailFunc: status == undefined ? !detailFunc : status
    }, () => {
      onHeightChange()
      onFocus()
    })
  }

  //发送文本消息
  public handleSendText = async () => {
    const { inputDisabled, inputValue } = this.state
    if (inputDisabled) return
    if (inputValue.length) {
      await this.props.sendInfo(EMediaType.TEXT, inputValue)

      this.setState({
        inputValue: ''
      }, () => {
        this.resetStatus()
      })
    }
  }

  //聊天框获取焦点
  public handleFocus = () => {
    // const { onFocus=noop } = this.props
    // onFocus()
    // this.resetStatus()
  }

  //处理文本域内容
  public handleInputLineChange = (e) => {
    const { detail } = e
    const { onFocus = noop } = this.props
    const { lineCount } = detail
    if (lineCount >= MAX_COL_COUNT) {
      this.setState({
        autoHeight: false
      })
    } else {
      this.setState({
        autoHeight: true
      }, () => {
        // this.resetStatus()
        onFocus()
      })
    }
  }

  //文本内容修改
  public handleInput = (e) => {
    const { detail } = e
    this.setState({
      inputValue: detail.value
    })
  }

  //文本内容删除
  public handleRemove = () => {
    const { inputValue } = this.state
    if (!inputValue.length) return
    if (inputValue.length == 1) {
      this.setState({
        inputValue: ''
      })
    } else {
      const str = inputValue.slice(inputValue.length - 2, inputValue.length)
      const isEmoji = this.EmojRef.current!.isEmojiCharacter(str)
      this.setState({
        inputValue: inputValue.slice(0, inputValue.length - (isEmoji ? 2 : 1))
      })
    }
  }

  //添加emoj表情
  public handleAddEmoj = (value) => {
    const { inputValue } = this.state
    this.setState({
      inputValue: inputValue + value
    })
  }

  //基础功能按钮
  readonly basicBtnFunc = [
    {
      iconInfo: {
        value: 'image'
      },
      handle: this.handleAddImage
    },
    {
      iconInfo: {
        value: 'video'
      },
      handle: this.handleAddVideo
    },
    {
      iconInfo: {
        value: () => { return this.state.detailFunc ? 'close' : 'add' }
      },
      handle: this.handleShowDetailFunc
    },
    {
      iconInfo: {
        value: 'check'
      },
      handle: this.handleSendText
    }
  ]

  //其他功能按钮
  readonly detailBtnFunc = [
    {
      iconInfo: {
        value: 'volume-plus',
      },
      handle: this.handleAddAudio
    },
    {
      iconInfo: {
        value: 'text-strikethrough'
      },
      handle: this.handleEmoj
    }

  ]

  public render() {

    const { inputDisabled, inputValue, autoHeight, detailFunc } = this.state

    const { inputVisible = false } = this.props

    return (
      <View
        className='bottom at-col at-col-1 at-col--auto'
        id='bottom'
        style={{ ...style.border(2, 'disabled', 'solid', 'top'), ...style.backgroundColor('thirdly') }}
      >
        <View className='icon at-row'>
          {
            this.basicBtnFunc.map((val: any) => {
              const { iconInfo, handle } = val
              const { value } = iconInfo
              return (
                <View
                  key={value}
                  className={`at-col at-col-3 at-icon at-icon-${typeof value === 'string' ? value : value()} icon-content`}
                  style={{ ...(style.color(inputDisabled ? 'primary' : 'disabled')) }}
                  onClick={() => { handle.call(this) }}
                ></View>
              )
            })
          }
        </View>
        <View
          className='input'
          onClick={this.handleFocus}
        >
          <Textarea
            // onFocus={this.handleFocus}
            adjust-position={true}
            cursor-spacing={25}
            style={{
              ...style.border(2, 'disabled', 'solid', 'all'),
              width: '100%',
              borderRadius: '5px',
              padding: '10px 0',
              boxShadow: '0 0 2px #333',
              display: inputVisible ? 'none' : 'block'
            }}
            className='content'
            disabled={inputDisabled}
            value={inputValue}
            placeholder={'在这里发消息'}
            autoHeight={autoHeight}
            fixed={true}
            onInput={this.handleInput}
            onLineChange={this.handleInputLineChange}
            maxlength={-1}
          ></Textarea>
        </View>
        <View className='other-detail'>
          <View className='emoj'>
            <Emoj
              ref={this.EmojRef}
              handleAddEmoj={this.handleAddEmoj}
              handleRemoveEmoj={this.handleRemove}
            />
          </View>
        </View>
        <View
          className='at-row at-row--wrap'
          style={{ display: detailFunc ? 'flex' : 'none' }}
        >
          {
            this.detailBtnFunc.map((val: any) => {
              const { iconInfo, handle } = val
              const { value } = iconInfo
              return (
                <View
                  key={value}
                  className={`at-col at-col-3 at-icon at-icon-${typeof value === 'string' ? value : value()} icon-content`}
                  style={{ ...(style.color(inputDisabled ? 'primary' : 'disabled')) }}
                  onClick={handle}
                ></View>
              )
            })
          }
        </View>
      </View>
    )
  }

}