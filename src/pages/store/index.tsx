import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import List from '~components/newsheader'
import GScrollView from '~components/scrollList'
import { throttle } from 'lodash'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { getUserStore, getCustomerStore } from '~services'

export default class Index extends Component<any> {
  public static config: Config = {
    navigationBarTitleText: "收藏",
    enablePullDownRefresh: true
  }

  public state: any = {
    data: []
  }

  private scrollRef = Taro.createRef<GScrollView>()

  public componentDidShow = () => colorStyleChange()

  //下拉刷新
  public onPullDownRefresh = async () => {
    await this.scrollRef.current!.handleToUpper()
    Taro.stopPullDownRefresh()
  }

  //上拉加载
  public onReachBottom = async () => await this.scrollRef.current!.handleToLower()

  //用户id
  readonly id = this.$router.params.id

  //获取数据
  public fetchData = async (query: any, isInit = false) => {
    const { data } = this.state
    const method = this.id ? getUserStore : getCustomerStore
    const args = this.id ? { id: this.id } : {}
    const resData = await method({ ...args, ...query })

    await this.setState({
      data: [...(isInit ? [] : data), ...resData]
    })
    return resData
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  public render() {

    const { data } = this.state

    return (
      <GScrollView
        ref={this.scrollRef}
        style={{ ...style.backgroundColor('bgColor') }}
        sourceType={'Scope'}
        scrollWithAnimation={true}
        renderContent={<View>
          {
            data.map(val => {
              const { _id: id, poster, description, ...nextVal } = val
              return <List content={{
                ...nextVal,
                id,
                image: poster,
                detail: description,
              }} key={id} />
            })
          }
        </View>}
        fetch={this.throttleFetchData}
      ></GScrollView>
    )
  }
}