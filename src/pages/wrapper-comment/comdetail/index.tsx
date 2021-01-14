import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import GScrollView from '~components/scrollList'
import { List } from '~components/commentlist'
import GButton from '~components/button'
import { EAction } from '~utils/global/comment_value'
import throttle from 'lodash/throttle'
import Header from './components/header'
import style from '~theme/style'
import { colorStyleChange } from '~theme/color'
import { connect } from 'react-redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { withTry, ESourceTypeList, router, routeAlias } from '~utils'
import { cancelLike, putLike, getCustomerMovieCommentDetail, getUserMovieCommentDetail } from '~services'

let FIRST = true

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {

  public componentDidShow = () => colorStyleChange()

  private scrollRef = React.createRef<GScrollView>()

  //评论id
  readonly id = getCurrentInstance().router?.params.id

  public state: any = {
    headerData: {},
    data: [],
  }

  public componentDidMount = async () => this.setTitle()

  //下拉刷新
  public onPullDownRefresh = async () => {
    await this.scrollRef.current!.handleToUpper()
    Taro.stopPullDownRefresh()
  }
  
  //上拉加载
  public onReachBottom = async () => {
    await this.scrollRef.current!.handleToLower()
  }

  //设置标题
  public setTitle = async () => {
    const { headerData } = this.state
    if(headerData.user && FIRST) {
      FIRST = false
      Taro.setNavigationBarTitle({title: `${headerData.user}的评论`})
    }
  }

   //获取评论数据
  public fetchData = async (query: any, isInit=false) => {
    const { data } = this.state
    const isLogin = await this.props.getUserInfo()
    .then(_ => true)
    .catch(_ => false)
    const method = isLogin ? getCustomerMovieCommentDetail : getUserMovieCommentDetail
    const { comment:main={}, sub={} } = await method({id: this.id,  ...query})

    this.setState({
        data: [ ...(isInit ? [] : [...data]), ...sub ],
        headerData: main
    })
    return sub
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  //点赞
  public like = async(id: string, like: boolean) => {
    await this.props.getUserInfo()
    .then(async (_) => {
        const method = like ? cancelLike : putLike

        Taro.showLoading({ mask: true, title: '操作中' })
        await withTry(method)(id)
        Taro.hideLoading()
        //刷新
        await this.onPullDownRefresh()
    })
    .catch(err => err)
  }

  /**
   * 展示评论组件
   * commentId: 评论id
   */
  public publish = async (_, commentId) => {
    let param: NComment.Comment_Params = {
      action: EAction.COMMENT_USER,
      postInfo: commentId
    }
    router.push(routeAlias.toComment, param)
  }

  public render() {

    const { headerData, data } = this.state

    this.setTitle()

    return (
      <GScrollView
        ref={this.scrollRef}
        style={{...style.backgroundColor('bgColor')}}
        sourceType={ESourceTypeList.Scope}
        scrollWithAnimation={true}
        query={{pageSize: 7}}
        renderContent={
          <View>
            <Header content={headerData}
              like={this.like}
            ></Header>
            <List
              comment={this.publish}
              list={data}
              like={this.like}
            ></List>
          </View>
        }
        fetch={this.throttleFetchData}
        renderBottom={
          (_: () => any) => {
            return (
              <View>
                <GButton 
                    style={{width: '100%', height: '92'}}
                    type={'secondary'}
                    value={new Array(2).fill('发布评论')} 
                    operate={this.publish}
                />
              </View>
            )
          }
        }
      >
      </GScrollView>
    )
  }

}