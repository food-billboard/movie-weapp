import Taro, { Component, Config } from '@tarojs/taro'
import GScrollView from '~components/scrollList'
import IconList from '~components/iconlist'
import { style } from '~theme/global-style'
import { throttle } from 'lodash'

import {router} from '~utils'
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any>{ 

  public static config: Config = {
    navigationBarTitleText: '某人的发布'
  }

  public state: any = {
    list: []
  }

  //用户id
  readonly id = this.$router.params.id

  /**
   * 获取数据
   */
  public fetchData = async (query: any, isInit=false) => {
    const { list } = this.state
    const data = await this.props.getIssue({id: this.id, ...query})
    const _data = data.detail
    let newData
    if(isInit) {
        newData = [ ..._data ]
    }else {
        newData = [ ...list, ..._data ]
    }
    await this.setState({
        list: newData
    })
    return _data
  }

  /**
   * 节流数据获取
   */
  public throttleFetchData = throttle(this.fetchData, 2000)

  /**
   * 获取电影详情
   */
  public getUser = (id: string) => {
    router.push('/detail', {id})
  }

  /**
   * 修改电影内容
   */
  public editMovie = async (id: string) => {
    await this.props.setIssue({issueSet: true, id})
    Taro.switchTab({
      url: '../issue/index'
    })
  }

  public render() {

    const { list } = this.state

    return (
      <GScrollView
        style={{...style.backgroundColor('bgColor')}}
        sourceType={'Scope'}
        scrollWithAnimation={true}
        fetch={this.throttleFetchData}
        renderContent={<IconList list={list} handleClick={this.editMovie}></IconList>}
      >
      </GScrollView>
    )
  }

}

