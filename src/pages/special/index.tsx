import Taro, { Component, Config } from '@tarojs/taro'
import Scroll from '~components/scrollList'
import { throttle } from 'lodash'
import IconList from '~components/iconlist'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { router, routeAlias } from '~utils'
import { getSpecial } from '~services'

let FIRST = true

export default class extends Component<any>{

  //专题id
  readonly id = this.$router.params.id

  public state: any = {
    list: [],
    title: false
  }

  private scrollRef = Taro.createRef<Scroll>()

  public componentDidShow = () => {
    colorStyleChange()
  }
    
  //上拉加载
  public onReachBottom = async () => {
      await this.scrollRef.current!.handleToLower()
  }

  //设置标题
  public setTitle = async () => {
    const { title } = this.state
    if(title && FIRST) {
        FIRST = false
        Taro.setNavigationBarTitle({title})
    }
  }

  /**
   * 获取数据
   */
  public fetchData = async (query: any, isInit=false) => {
    const { list } = this.state
    const { name, movie } = await getSpecial({id: this.id, ...query})

    let newData
    if(isInit) {
        newData = [ ...movie ]
    }else {
        newData = [ ...list, ...movie ]
    }
    await this.setState({
        list: newData,
        title: name
    })
    return movie
  }

  /**
   * 节流数据获取
   */
  public throttleFetchData = throttle(this.fetchData, 2000)

  /**
   * 获取电影详情
   */
  public getDetail = (id: string) => {
    router.push(routeAlias.detail, { id })
  }

  public render() {

    const { list } = this.state
    this.setTitle()
    return (
      <Scroll
        ref={this.scrollRef}
        style={{...style.backgroundColor('bgColor')}}
        query={{pageSize: 16}}
        sourceType={'Scope'}
        scrollWithAnimation={true}
        fetch={this.throttleFetchData}
        renderContent={<IconList list={list.map(item => {
          const { _id, poster, ...nextItem } = item
          return {
            ...nextItem,
            id: _id,
            image: poster,
          }
        })}></IconList>}
      ></Scroll>
    )
  }

}