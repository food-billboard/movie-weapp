import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Button } from '@tarojs/components'
import { AtRadio } from 'taro-ui'
import AtRadioRef from 'taro-ui/types/radio'
import { merge } from 'lodash'
import Model from '~components/model'
import List from '~components/linearlist'
import GColor from './components/color'
import { TypeColor, colorChange, colorStyleChange } from '~theme/color'
import { router, routeAlias, withTry, clearToken } from '~utils'
import { EAction } from '~utils/global'
import { createSystemInfo } from '~config'
import { RadioOption } from 'taro-ui/types/radio'
import style from '~theme/style'
import { signout, getAppInfo } from '~services'

import './index.scss'

type TOptionType = 'on' | 'off'

interface IOption extends RadioOption<string> {
  value: string
}

type right = 'right'
type warn = 'warn'
type primary = 'primary'
const arrow: right = 'right'
const warn: warn = 'warn'
const primary: primary = 'primary'

const ICON_COLOR = 'primary'

const colorControl = {
  on: 'on',
  off: 'off'
}

const systemInfo = createSystemInfo()

const sleep = (times=1000) => new Promise((resolve) => setTimeout(resolve, times))

export default class Setting extends Component<any>{

  public commentRef = React.createRef<Comment>()

  public colorRef = React.createRef<GColor>()

  public componentDidShow = () => {
    colorStyleChange()
  }

  //显示小程序信息
  public showAbout = async () => {
    const { about: { isOpen, model, ...nextAbout } } = this.state
    Taro.showLoading({ mask: true, title: '稍等...' })

    const [, data] = await withTry(getAppInfo)()
    const { info="信息似乎未获取到，但是可以知道这是一个电影推荐的小程序" } = data || {}
    Taro.hideLoading()

    const newModel = merge({}, model, { content: info })
    
    this.setState({
      about: merge({}, nextAbout, { isOpen: true, model: newModel }),
      activeModel: merge({}, newModel, { isOpen: true })
    })
  }

  //监听退出登录确认
  public logConfirm = async () => {
    this.logClose()
    const { button } = this.state
    const { index, ...nextButton } = button

    this.setState({
      button: {
        ...nextButton,
        index: (index + 1) % 2
      }
    })

    Taro.showLoading({ mask: true, title: '稍等一下' })
    const [, data] = await withTry(signout)()
    Taro.hideLoading()
    if (data) {
      clearToken()
      Taro.showToast({
        title: '操作成功',
        icon: 'success',
        duration: 1000,
        mask: true,
        complete: Taro.switchTab.bind(this, { url: '../main/index' })
      })
    }
  }

  //显示反馈组件
  public showFeedback = async () => {

    let param: NComment.Comment_Params = {
      action: EAction.FEEDBACK
    }
    router.push(routeAlias.toComment, param)
  }

  public close = (prop: string) => {
    const target = this.state[prop]
    if (!target) return
    let newState = {
      [prop]: {
        ...target,
        isOpen: false
      }
    }

    if(target.model) {
      const model = {
        ...target.model,
        isOpen: false
      }
      newState = {
        [prop]: {
          ...newState[prop],
          model
        },
        activeModel: model
      }
    }

    this.setState(newState)
  }

  public aboutClose = () => this.close('about')

  //监听关于信息确认
  public aboutConfirm = () => this.aboutClose()

  //监听退出登录状态退出
  public logClose = () => this.close('button')

  //监听退出登录取消
  public logCancel = () => this.logClose()

  //反馈
  readonly feedback = {
    id: Symbol('feedback'),
    title: '反馈',
    disabled: false,
    note: '',
    arrow: arrow,
    iconInfo: {
      value: 'bell',
      color: TypeColor[ICON_COLOR]
    },
    handle: this.showFeedback,
  }

  //色调
  readonly colorStyle: Array<IOption> = [
    {
      value: colorControl.on,
      label: '开启色调'
    },
    {
      value: colorControl.off,
      label: '关闭色调',
    }
  ]

  //控制色调开启关闭
  public colorStyleChange = async (value: TOptionType) => {
    Taro.showLoading({
      title: '切换中...'
    })
    const data = this.colorRef.current!.state.active
    let status: boolean = value === colorControl.on
    colorChange(status, data, true)
    this.setState({
      colorStyle: status
    })
    await sleep()
    Taro.hideLoading()
  }

  //颜色选择 
  public colorSelect = async (value) => {
    this.colorRef.current!.handleClick(value)
    const { colorStyle } = this.state
    colorChange(colorStyle, value, true)
    this.setState({})
  }

  public state: any = {
    //关于
    about: {
      id: Symbol('about'),
      title: '关于我们',
      disabled: false,
      note: '',
      arrow: arrow,
      iconInfo: {
        value: 'tag',
        color: TypeColor[ICON_COLOR]
      },
      handle: this.showAbout,
      model: {
        isOpen: false,
        title: '关于小程序',
        cancelText: '',
        confirmText: '知道了',
        onClose: this.aboutClose,
        onConfirm: this.aboutConfirm,
        content: '这里是关于小程序的相关信息'
      }
    },
    //登录
    button: {
      type: [warn, primary],
      value: ['退出登录', '账号登录'],
      index: 0,
      model: {
        isOpen: false,
        title: '提示',
        cancelText: '取消',
        confirmText: '是的',
        onClose: this.logClose,
        onCancel: this.logCancel,
        onConfirm: this.logConfirm,
        content: '亲! 确认要退出吗?'
      }
    },
    activeModel: {},
    colorStyle: systemInfo.getColorStyle().style
  }

  /**
   * 退出登录
   */
  public handleButton = async (index: number) => {
    //退出登录
    if (index == 0) {
      const { button: { model, index, ...nextButton } } = this.state
      this.setState({
        button: merge({}, nextButton, { model, index: (index + 1) % 2, isOpen: true }),
        activeModel: merge({}, model, { isOpen: true }),
      })
    } else {
      router.push(routeAlias.login)
    }
  }

  public render() {

    const { button, activeModel, about, colorStyle: color } = this.state
    const {
      type,
      value,
      index
    } = button
    const { iconInfo: feedbackInconInfo } = this.feedback
    const { iconInfo: aboutInconInfo } = about

    const activeMode = this.colorStyle[color ? 0 : 1]['value']

    const settingList = [
      { ...about, iconInfo: { ...aboutInconInfo, color: TypeColor[ICON_COLOR] } },
      { ...this.feedback, iconInfo: { ...feedbackInconInfo, color: TypeColor[ICON_COLOR] } },
    ]

    return (
      <View className='setting'>
        <View className='setting-list'>
          <List list={settingList} />
          <AtRadio
            customStyle={{marginTop: '48px'}}
            options={this.colorStyle}
            value={activeMode}
            onClick={this.colorStyleChange}
          />
          <GColor
            ref={this.colorRef}
            style={{
              height: '48px'
            }}
            handleClick={this.colorSelect}
          ></GColor>
        </View>
        <View className='button'>
          <Button
            type={type[index]}
            plain={true}
            onClick={this.handleButton.bind(this, index)}
            style={{ ...style.backgroundColor('bgColor') }}
          >
            {value[index]}
          </Button>
        </View>
        <Model info={activeModel} />
      </View>
    )
  }
}