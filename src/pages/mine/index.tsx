import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import IconHead from '~components/headicon'
import List, { IList } from '~components/linearlist'
import { TypeColor, colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { router, routeAlias } from '~utils'
import Title from './components/title'
import IconList from './components/icon'
import { mapStateToProps, mapDispatchToProps } from './connect'

import './index.scss'

type right = 'right'
const arrow: right = 'right'

const ICON_COLOR = 'primary'

class Mine extends Component<any>{

  //设置
  readonly setting: Array<IList> = [
    {
      title: 'Wo的发布',
      disabled: false,
      arrow: arrow,
      iconInfo: {
        value: 'share-2',
        color: TypeColor()[ICON_COLOR]
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
        color: TypeColor()[ICON_COLOR]
      },
      handle: () => {
        router.push(routeAlias.setting)
      },
      id: Symbol('setting')
    }
  ]

  //获取数据
  public fetchData = async () => {
    Taro.showLoading({ mask: true, title: '加载中' })
    await this.props.getUserInfo({ unloginAction: () => {
      Taro.switchTab({ url: '/pages/main/index' })
    } })
    .catch(_ => Taro.switchTab({ url: '/pages/main/index' }))
    Taro.hideLoading()
  }

  public componentDidShow = async () => {
    // 色调修改时重绘
    colorStyleChange(true)

    // 刷新数据
    await this.fetchData()

  }

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
      <View className='mine-page'>
        <View className='mine-page-head'>
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
        <View className='mine-page-main'
          style={{ ...style.backgroundColor('disabled') }}
        >
          <View>
            <View>
              <Title />
            </View>
            <View>
              <IconList />
            </View>
            <View>
              <List
                list={this.setting.map((val: IList) => {
                  const { iconInfo } = val
                  return {
                    ...val,
                    iconInfo: {
                      ...iconInfo,
                      color: TypeColor()[ICON_COLOR]
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

export default connect(mapStateToProps, mapDispatchToProps)(Mine)