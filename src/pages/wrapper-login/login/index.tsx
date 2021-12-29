import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtInput, AtForm, AtButton } from 'taro-ui'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { router, routeAlias, withTry } from '~utils'
import { mapStateToProps, mapDispatchToProps } from './connect'

import './index.scss'

interface IState {
  mobile: string
  password: string
}

class Login extends Component<any> {

  public state: IState = {
    mobile: '',
    password: '',
  }

  public componentDidShow = () => colorStyleChange()

  //监听用户名输入
  public handleUser = (value: string) => this.setState({ mobile: value })

  //监听密码输入
  public handlePass = (value: string) => this.setState({ password: value })

  //信息提交
  public submit = async () => {
    const { mobile, password } = this.state

    let message!: string

    if (!/^1[345678][0-9]{9}$/.test(mobile)) {
      message = '手机号格式不正确'
    } else if (password.length < 8) {
      message = '密码格式不正确'
    }

    if (!!message) return Taro.showToast({
      title: message,
      icon: 'none',
      duration: 1000
    })

    await Taro.showLoading({ mask: true, title: '加载中' })
    const [, userInfo] = await withTry(this.props.signin)({
      mobile,
      password
    })

    Taro.hideLoading()

    if (!userInfo) return
    //回到上一路由
    const { router: currRouter } = getCurrentInstance()
    if (currRouter && currRouter.params.target) {
      return router.replace(currRouter.params.target)
    }
    Taro.switchTab({ url: '../../main/index' })
  }

  public register = () => router.push(routeAlias.register)

  public forget = () => router.push(routeAlias.forget)

  public render() {

    const { mobile, password } = this.state

    return (
      <View className='page-login' style={{ ...style.backgroundColor('bgColor') }}>
        <AtForm>
          <AtInput
            name='mobile'
            title='手机号'
            type='text'
            placeholder='手机号'
            value={mobile}
            onChange={this.handleUser.bind(this)}
          />
          <AtInput
            name='password'
            title='密码'
            type='password'
            placeholder='请输入密码'
            value={password}
            onChange={this.handlePass.bind(this)}
          />
          <AtButton
            // formType='submit'
            onClick={this.submit}
            type='primary'
            className='page-login-submit'
            customStyle={{ ...style.border(1, 'primary', 'solid', 'all'), ...style.backgroundColor('primary') }}
          >
            登录
          </AtButton>
          <AtButton
            onClick={this.register}
            type='secondary'
            className='page-login-register'
            customStyle={{ ...style.color('primary'), ...style.border(1, 'primary', 'solid', 'all') }}
          >
            注册
          </AtButton>
          <AtButton
            onClick={this.forget}
            type='secondary'
            customStyle={{ ...style.color('primary'), ...style.border(1, 'primary', 'solid', 'all') }}
          >
            忘记密码
          </AtButton>
        </AtForm>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)