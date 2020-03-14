import Taro, { Component } from '@tarojs/taro'
import { View, Textarea } from '@tarojs/components'
import Emoj from '../emojSwiper'
import { IProps, IState, IVideoType } from './index.d'
import style from '~theme/style'
import { newsType } from '~utils'
import { IList } from '../chat/index.d'
import { IMAGE_CONFIG } from '~config'
import { noop } from 'lodash'

import './index.scss'

//单次选择图片的最多数量
const { count } = IMAGE_CONFIG

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

  private EmojRef = Taro.createRef<Emoj>()

  //生成聊天信息结构
  public createChatObject = (type: keyof typeof newsType , content: string | IVideoType) => {

    const { userInfo } = this.props
    const { id='', username='', image='' } = userInfo

    const _content: any = {
      text: null,
      image: null,
      audio: null,
      video: null
    }

    if(type === newsType.video) {
      _content[newsType.video] = typeof content === 'string' ? content : content.video
      _content[newsType.image] = typeof content === 'string' ? content : content.image
    }else {
      _content[type] = content
    }

    const object: IList = {
      content: { ..._content },
      type,
      time: Date.now(),
      username: username,
      id: id,
      image: image,
    }

    return object
  } 

  //重置状态
  public resetStatus = (status?) => {
    this.handleShowDetailFunc(false)
  }

  //添加图片
  public handleAddImage = () => {
    const { inputDisabled } = this.state
    if(inputDisabled) return

    this.resetStatus()

    Taro.chooseImage({
      count: count, 
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
    }).then((res) => {
      const { errMsg } = res
      const [, msg] = errMsg.split(':')
      if(msg === 'ok') {
        const { tempFilePaths } = res //地址的字符串数组

        this.props.sendInfo(newsType.image, tempFilePaths)

        // Promise.all(tempFilePaths.map(async (val: string) => {
        //   let type: any = newsType.image
        //   await this.sendMediaInfo(type, val)
        // }));

      }
    })
  }

  //添加视频
  public handleAddVideo = () => {
    const { inputDisabled } = this.state
    if(inputDisabled) return

    this.resetStatus()

    Taro.chooseVideo({
      sourceType: ['album','camera'],
      camera: 'back',
    }).then((res: any) => {
      const { errMsg } = res
      const [, msg] = errMsg.split(':')
      if(msg === 'ok') {
        const { 
          tempFilePath, 
          thumbTempFilePath,
          duration,
          size,
          width,
          height
        } = res
        this.props.sendInfo(newsType.video, {
          image: thumbTempFilePath,
          video: tempFilePath
        })
      }
    })
  }

  //添加音频
  public handleAddAudio = () => {
    const { inputDisabled } = this.state
    if(inputDisabled) return
    
    this.resetStatus()

  }

  //选择表情
  public handleEmoj = () => {
    const { inputDisabled } = this.state
    const { onHeightChange=noop } = this.props
    if(inputDisabled) return

    this.EmojRef.current!.controlShowHide(onHeightChange)
  }

  //显示详细功能
  public handleShowDetailFunc = (status?:boolean) => {
    const { detailFunc } = this.state
    const { onHeightChange=noop, onFocus=noop } = this.props
    if(!!detailFunc) this.EmojRef.current!.handleClose()
    this.setState({
      detailFunc: status == undefined ? !detailFunc : status
    }, () => {
      onHeightChange()
      onFocus()
    })
  }

  //发送消息
  public handleSendText = async () => {
    const { inputDisabled, inputValue } = this.state
    if(inputDisabled) return 
    if(inputValue.length) {
      await this.props.sendInfo(newsType.text, inputValue)
      
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
    const { lineCount } = detail
    if(lineCount >= MAX_COL_COUNT) {
      this.setState({
        autoHeight: false
      })
    }else {
      this.setState({
        autoHeight: true
      }, () => {
        this.resetStatus()
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
    if(!inputValue.length) return
    if(inputValue.length == 1) {
      this.setState({
        inputValue: ''
      })
    }else {
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
        value: () => {return this.state.detailFunc ? 'close' : 'add'}
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

    const { inputVisible=false } = this.props

    return (
      <View 
          className='bottom at-col at-col-1 at-col--auto'
          id='bottom'
          style={{...style.border(2, 'disabled', 'solid', 'top'), ...style.backgroundColor('thirdly')}}
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
                    style={{...(style.color(inputDisabled ? 'primary' : 'disabled'))}}
                    onClick={() => {handle.call(this)}}
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
              adjust-position	={true}
              cursor-spacing={25}
              style={{
                ...style.border(2, 'disabled', 'solid', 'all'),
                width:'100%',
                borderRadius: '5px',
                padding: '10px 0',
                boxShadow:'0 0 2px #333',
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
            style={{display: detailFunc ? 'flex' : 'none'}}
          > 
            {
              this.detailBtnFunc.map((val: any) => {
                const { iconInfo, handle } = val
                const { value } = iconInfo
                return (
                  <View 
                    key={value}
                    className={`at-col at-col-3 at-icon at-icon-${typeof value === 'string' ? value : value()} icon-content`}
                    style={{...(style.color(inputDisabled ? 'primary' : 'disabled'))}}
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