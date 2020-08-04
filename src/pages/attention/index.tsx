import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import GScrollView from '~components/scrollList'
import ImageLoading from '~components/imageLoading'
import style from '~theme/style'
import { colorStyleChange } from '~theme/color'
import throttle from 'lodash/throttle'
import { router, routeAlias, ESourceTypeList } from '~utils'
import { SYSTEM_PAGE_SIZE } from '~config'
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
    const resData = await method({ ...args, ...query })

    this.setState({
      data: [...(isInit ? [] : data), ...resData]
    })
    return resData
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  private getUser = (id: string) => router.push(routeAlias.user, { id })

  public render() {

    const { data } = this.state

    return (
      <GScrollView
        ref={this.scrollRef}
        sourceType={ESourceTypeList.Scope}
        scrollWithAnimation={true}
        query={{ pageSize: 20 }}
        style={{ ...style.backgroundColor('bgColor') }}
        fetch={this.throttleFetchData}
        renderContent={
          <View>
            {
              data.map(({ avatar, username, _id: id }) => {
                return (
                  <View className={'list'}
                    style={{ ...style.border(1, 'disabled', 'solid', 'bottom') }}
                    key={id}
                    onClick={this.getUser.bind(this, id)}
                  >
                    <ImageLoading
                      src={avatar}
                      loadingProps={{ content: '' }}
                      customStyle={{
                        width: `${SYSTEM_PAGE_SIZE(45)}px`,
                        height: `${SYSTEM_PAGE_SIZE(45)}px`,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        marginTop: `${SYSTEM_PAGE_SIZE(2.5)}px`,
                        marginRight: `${SYSTEM_PAGE_SIZE(10)}px`,
                        float: 'left'
                      }}
                    />
                    <View className={'username'}
                      style={{ ...style.color('primary') }}
                    >
                      {username}
                    </View>
                    <Text className={'enter'}
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