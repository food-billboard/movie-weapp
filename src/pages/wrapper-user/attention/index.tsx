import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import GScrollView from '~components/scrollList'
import style from '~theme/style'
import { colorStyleChange } from '~theme/color'
import throttle from 'lodash/throttle'
import { router, routeAlias, ESourceTypeList } from '~utils'
import { getCustomerAttention, getUserAttention } from '~services'

import './index.scss'

export default class extends Component<any>{

  public state: any = {
    data: []
  }

  //用户id
  readonly id = getCurrentInstance().router?.params.id

  private scrollRef = React.createRef<GScrollView>()

  public componentDidShow = () => colorStyleChange()

  //下拉刷新
  public onPullDownRefresh = async () => {
    await this.scrollRef.current!.handleToUpper()
    Taro.stopPullDownRefresh()
  }

  //上拉加载
  public onReachBottom = async () => {
    await this.scrollRef.current!.handleToLower()
  }

  //获取数据
  public fetchData = async (query: any, isInit = false) => {
    const { data } = this.state
    const method = this.id ? getUserAttention : getCustomerAttention
    const args = this.id ? { id: this.id } : {}
    const { attentions } = await method({ ...args, ...query })

    this.setState({
      data: [...(isInit ? [] : data), ...attentions]
    })
    return attentions
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  private getUser = (id: string) => router.push(routeAlias.user, { id })

  public render() {

    const { data } = this.state

    return (
      <GScrollView
        ref={this.scrollRef}
        sourceType={ESourceTypeList.Scope}
        scrollWithAnimation
        query={{ pageSize: 20 }}
        style={{ ...style.backgroundColor('bgColor') }}
        fetch={this.throttleFetchData}
        renderContent={
          <View>
            {
              data.map(({ avatar, username, _id: id }) => {
                return (
                  <View className='page-attention'
                    style={{ ...style.border(1, 'disabled', 'solid', 'bottom') }}
                    key={id}
                    onClick={this.getUser.bind(this, id)}
                  >
                    <AtAvatar
                      size='small'
                      circle
                      image={avatar}
                      text='头'
                    ></AtAvatar>
                    <View className='page-attention-username'
                      style={{ ...style.color('primary') }}
                    >
                      {username}
                    </View>
                    <Text 
                      className='page-attention-enter big-icon-font-size-class'
                      style={{ ...style.color('thirdly') }}
                    >{'>'}</Text>
                  </View>
                )
              })
            }
          </View>
        }
      ></GScrollView>
    )
  }
}