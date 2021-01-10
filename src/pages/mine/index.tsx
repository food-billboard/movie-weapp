import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
// import { AtTag } from 'taro-ui'
import Title from './components/title'
import IconList from './components/icon'
import List from '~components/linearlist'
import IconHead from '~components/headicon'
import { TypeColor, colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { IList } from '~components/linearlist'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { router, routeAlias } from '~utils'
import { getCustomerUserInfo } from '~services'

import './index.scss'

type right = 'right'
const arrow: right = 'right'

const ICON_COLOR = 'primary'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any>{

  //设置
  readonly setting: Array<IList> = [
    {
      title: 'Wo的发布',
      disabled: false,
      arrow: arrow,
      iconInfo: {
        value: 'share-2',
        color: TypeColor[ICON_COLOR]
      },
      handle: () => {
        router.push(routeAlias.userissue)
      },
      id: Symbol('issue')
    },
    {
      title: '设置',
      disabled: false,
      note: '',
      arrow: arrow,
      iconInfo: {
        value: 'settings',
        color: TypeColor[ICON_COLOR]
      },
      handle: () => {
        router.push(routeAlias.setting)
      },
      id: Symbol('setting')
    }
  ]

  // private code: string

  public state: any = {
    typeColor: TypeColor,
  }

  //获取数据
  public fetchData = async () => {
    Taro.showLoading({ mask: true, title: '加载中' })
    await this.props.getUserInfo()
    .catch(_ => Taro.switchTab({ url: '../main/index' }))
    Taro.hideLoading()
  }

  public componentDidShow = async () => {
    ////色调修改时重绘
    colorStyleChange(true)
    // const { typeColor } = this.state
    // if(typeColor == TypeColor) return
    this.setState({ typeColor: TypeColor })

    //刷新数据
    await this.fetchData()

  }

  // //监听获取用户信息
  // public handleGetUserInfo = async (res) => {
  //     const { detail: { cloudID, encryptedData, signature, rawData, iv, userInfo } } = res

  //     //登录
  //     Taro.showLoading({mask:true, title: '稍等一下'})
  //     const [,data] = await withTry(this.props.sendUserLogon)({
  //         userInfo,
  //         code : this.code
  //     })
  //     Taro.hideLoading()
  //     if(data) {
  //         const { info } = data
  //         //改变登录状态
  //         this.login = true

  //         this.setState({
  //             detail: info
  //         }, () => {
  //             //将个人信息放入缓存
  //             setCookie('user', {
  //                 value: JSON.stringify(info),
  //                 expires: Date.now() + (24 * 7 * 60 * 60 * 60 * 1000)
  //             })
  //         })
  //     }
  // }

  // //登录获取session
  // public handleLogin = async () => {
  //     const data: string = await new Promise((resolve, reject) => {
  //         Taro.login({
  //             success: (res) => {
  //                 const { code } = res
  //                 resolve(code)
  //             },
  //             fail: () => {
  //                 reject(false)
  //             }
  //         })
  //     })
  //     if(data) this.code = data
  // }

  public render() {

    const { userInfo } = this.props

    if (!userInfo) return null
    const {
      username,
      avatar,
      hot,
      fans,
      attentions,
    } = userInfo

    return (
      <View className='mine'>
        <View className='head'>
          <IconHead
            list={{
              username,
              avatar,
              hot,
              fans,
              attentions,
            }}
          />
        </View>
        <View className='main'
          style={{ ...style.backgroundColor('disabled') }}
        >
          <View>
            <View className='title'>
              <Title />
            </View>
            <View className='iconlist'>
              <IconList />
            </View>
            <View className='list'>
              <List
                list={this.setting.map((val: IList) => {
                  const { iconInfo } = val
                  return {
                    ...val,
                    iconInfo: {
                      ...iconInfo,
                      color: TypeColor[ICON_COLOR]
                    }
                  }
                })}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}