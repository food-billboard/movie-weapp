import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import ImageLoading from '~components/imageLoading'
import GScrollView from '~components/scrollList'
import style from '~theme/style'
import { colorStyleChange } from '~theme/color'
import { throttle } from 'lodash'
import { router, routeAlias } from '~utils'
import { SYSTEM_PAGE_SIZE } from '~config'
import { getCustomerFans, getUserFans } from '~services'

import './index.scss'

export default class extends Component<any>{

  public state: any = {
    data: []
  }

  //用户id
  readonly id = this.$router.params.id

  private scrollRef = Taro.createRef<GScrollView>()

  public componentDidShow = () => {
    colorStyleChange()
  }

  public static config: Config = {
    navigationBarTitleText: '粉丝',
    enablePullDownRefresh: true
  }

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
    //根据是否传递id显示内容
    const method = this.id ? getUserFans : getCustomerFans
    const args = this.id ? { id: this.id } : {}
    Taro.showLoading({ mask: true, title: '加载中...' })
    const resData = await method({ ...args, ...query })
    Taro.hideLoading()

    this.setState({
      data: [...(isInit ? [] : data), ...resData]
    })
    return resData
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  public getUser = (id: string) => router.push(routeAlias.user, { id })

  public render() {

    const { data } = this.state

    return (
      <GScrollView
        ref={this.scrollRef}
        sourceType={'Scope'}
        scrollWithAnimation={true}
        query={{ pageSize: 20 }}
        style={{ ...style.backgroundColor('bgColor') }}
        fetch={this.throttleFetchData}
        renderContent={<View>
          {
            data.map((value) => {
              const { avatar, username, _id: id } = value
              return (
                <View className={'list'}
                  style={{ ...style.border(1, 'disabled', 'solid', 'bottom') }}
                  key={id}
                  onClick={this.getUser.bind(this, id)}
                >
                  <ImageLoading
                    src={avatar}
                    customStyle={{
                      width: `${SYSTEM_PAGE_SIZE(45)}px`,
                      height: `${SYSTEM_PAGE_SIZE(45)}px`,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      marginTop: `${SYSTEM_PAGE_SIZE(2.5)}px`,
                      marginRight: `${SYSTEM_PAGE_SIZE(10)}px`,
                      float: 'left'
                    }}
                    loadingProps={{
                      content: ''
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
        </View>}
      ></GScrollView>
    )
  }
}