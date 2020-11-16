import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { router, routeAlias, withTry } from '~utils'

import './index.scss'

interface IState {
  mobile: string
  password: string
}

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {

  // public componentDidMount = async () => {
  //     const { password='', username='' } = this.$router.params
  //     if(password.length && username.length) {
  //         this.setState({
  //             password,
  //             username
  //         })
  //         return
  //     }
  //     await this.props.getUserInfo()
  // }

  public componentDidShow = () => colorStyleChange()

  public state: IState = {
    mobile: '',
    password: '',
    // check: ''
  }

  //监听用户名输入
  public handleUser = (value: string) => this.setState({ mobile: value })

  //监听密码输入
  public handlePass = (value: string) => this.setState({ password: value })

  //信息提交
  public submit = async () => {
    const { mobile, password } = this.state

    let message!: string

    if(!/^1[345678][0-9]{9}$/.test(mobile)) {
      message = '手机号格式不正确'
    }else if(password.length < 8) {
      message = '密码格式不正确'
    }

    if(!!message) return Taro.showToast({
      title: message,
      icon: 'none',
      duration: 1000
    })

    await Taro.showLoading({ mask: true, title: '加载中' })
    const userInfo = await withTry(this.props.signin)({ 
      mobile,
      password
    })
    Taro.hideLoading()

    if (!userInfo) return
    //回到上一路由
    const { router:currRouter } = getCurrentInstance()
    if (currRouter && currRouter.params.target) {
      return router.replace(currRouter.params.target)
    }
    Taro.switchTab({ url: '../main/index' })
  }

  public register = () => router.push(routeAlias.register)

  public render() {

    const { mobile, password } = this.state

    return (
      <View className='login' style={{ ...style.backgroundColor('bgColor') }}>
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
            type={'primary'}
            className='submit'
            customStyle={{ ...style.border(1, 'primary', 'solid', 'all'), ...style.backgroundColor('primary') }}
          >
            登录
          </AtButton>
          <AtButton
            onClick={this.register}
            type={'secondary'}
            customStyle={{ ...style.color('primary'), ...style.border(1, 'primary', 'solid', 'all') }}
          >
            注册
          </AtButton>
        </AtForm>
      </View>
    )
  }
}