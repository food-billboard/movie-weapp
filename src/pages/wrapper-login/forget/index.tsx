import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'
import { connect } from 'react-redux'
import { router, withTry, routeAlias, TaroShowModal } from '~utils'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { mapDispatchToProps, mapStateToProps } from './connect'
import Time from '../register/components/time'

import './index.scss'

interface IState {
  password: string
  captcha: string,
  email: string
}

class Register extends Component<any>{

  public state: IState = {
    password: '',
    captcha: '',
    email: ''
  }

  public componentDidShow = () => colorStyleChange()

  //邮箱
  public onEmailChange = (value: string) => this.setState({ email: value })

  //监听密码输入
  public onPasswordChange = (value: string, event: any) => {
    const { type } = event
    if (type == 'blur' && value.length < 6) {
      TaroShowModal({
        title: '修改失败',
        content: '密码长度不能低于6',
        showCancel: false
      }).then(_ => {
        this.setState({
          password: ''
        })
      })
    } else {
      this.setState({
        password: value
      })
    }
  }

  //监听验证码输入
  public onCaptchaChange = (value: string) => this.setState({ captcha: value })

  //信息提交
  public submit = async () => {
    const { email, password, captcha } = this.state
    let message!: string
    if (password.length <= 8) {
      message = '密码格式长度不足'
    } else if (!this.emailValidate(email)) {
      message = '邮箱格式不正确'
    }else if (captcha.length != 6) {
      message = '验证码格式不正确'
    }

    if (!!message) return Taro.showToast({
      title: message,
      duration: 1000,
      icon: 'none'
    })

    Taro.showLoading({ mask: true, title: '正在验证...' })
    const [, data] = await withTry(this.props.forget)({ email, password, captcha })
    Taro.hideLoading()
    if (data) {
      router.push(routeAlias.login)
    } else {
      Taro.showToast({
        title: '好像有错误',
        icon: 'none',
        duration: 1000
      })
    }
  }

  //重置
  public reset = () => {
    TaroShowModal({
      title: '温馨提示',
      content: '您选择了重置，是否确认清空当前页面所有输入的信息',
      showCancel: true,
      cancelText: '后悔了',
      cancelColor: '#f00',
      confirmText: '没错',
      confirmColor: '#000'
    }).then(res => {
      if (res.cancel) return
      this.setState({
        email: '',
        password: '',
        captcha: ''
      })
    })
  }

  //邮箱验证
  public emailValidate = (email: string) => /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email)

  //获取验证码
  public getData = () => {
    const { email } = this.state
    if (!this.emailValidate) {
      Taro.showToast({
        title: '邮箱格式错误',
        duration: 1000,
        icon: 'none'
      })
      return false
    }

    return this.props.sendSMS(email, 'forget')
  }

  public render() {
    const { email, password, captcha } = this.state
    return (
      <View className='page-forget' style={{ ...style.backgroundColor('bgColor') }}>
        <AtForm
          onSubmit={this.submit}
          onReset={this.reset}
        >
          <AtInput
            name='email'
            title='邮箱'
            type='text'
            required
            placeholder='请输入邮箱'
            value={email}
            onChange={this.onEmailChange}
          />
          <AtInput
            clear
            name='captcha'
            title=''
            type='number'
            placeholder='验证码'
            value={captcha}
            required
            onChange={this.onCaptchaChange}
          >
            <Time
              getData={this.getData}
            />
          </AtInput>
          <AtInput
            name='password'
            title='密码'
            type='password'
            placeholder='密码不能少于10位数'
            value={password}
            required
            onChange={this.onPasswordChange}
          />
          <AtButton
            onClick={this.submit}
            type='primary'
            className='page-forget-submit'
            customStyle={{ ...style.backgroundColor('primary'), ...style.border(1, 'primary', 'solid', 'all') }}
          >
            提交
          </AtButton>
          <AtButton
            onClick={this.reset}
            type='secondary'
            customStyle={{ ...style.border(1, 'primary', 'solid', 'all'), ...style.color('primary') }}
          >
            重置
          </AtButton>
        </AtForm>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)