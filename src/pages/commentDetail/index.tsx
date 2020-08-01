import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import CommentCom from '~components/comment'
import GScrollView from '~components/scrollList'
import {List} from '~components/commentlist'
import GButton from '~components/button'
import { throttle } from 'lodash'
import Header from './components/header'
import style from '~theme/style'
import { colorStyleChange } from '~theme/color'
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { withTry } from '~utils'
import { cancelLike, putLike, getCustomerMovieCommentDetail, getUserMovieCommentDetail, postCommentToUser } from '~services'

let FIRST = true

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {

  public componentDidShow = () => colorStyleChange()

  private scrollRef = React.createRef<GScrollView>()

  //评论组件
  private commentRef = React.createRef<CommentCom>()

  //评论id
  readonly id = getCurrentInstance().router.params.id

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
        comment: [ ...(isInit ? [] : [...data]), ...sub ],
        headerData: main
    })
    return sub
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  //发布评论
  public publishComment = async (value: { 
    text?: string,
    image?: Array<any>,
    video?: Array<any>
  }) => {
    const { text='', image=[], video=[] } = value

    Taro.showLoading({ mask: true, title: '发布中' })
    await withTry(postCommentToUser)({ id: this.id, content: { text, image, video } })
    Taro.hideLoading()
    await this.onPullDownRefresh()
  }

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

    //TODO
    Taro.showToast({
      title: '功能完善中...',
      icon: 'none',
      duration: 1000
    })
    return
    //

    await this.props.getUserInfo()
    .then(_ => {
      this.commentRef.current!.open()
      this.setState({
          commentId: !!commentId ? commentId : this.id
      })
    })
    .catch(err => err)
  }

  public render() {

    const { headerData, data } = this.state

    this.setTitle()

    return (
      <GScrollView
        ref={this.scrollRef}
        style={{...style.backgroundColor('bgColor')}}
        sourceType={'Scope'}
        scrollWithAnimation={true}
        query={{pageSize: 7}}
        renderContent={
          <View>
            <Header content={headerData}
            like={this.like}
            ></Header>
            {
              data.map((value) => {
                const { _id } = value
                return (
                  <View>
                    <List 
                      comment={this.publish} 
                      key={_id}
                      list={value}
                      like={this.like}
                    />
                  </View>
                )
              })
            }
          </View>
        }
        fetch={this.throttleFetchData}
        bottom={92}
        renderBottom={
          <View>
            <GButton 
                style={{width: '100%', height: '92', position: 'fixed', bottom: 0, left: 0, zIndex: '999'}}
                type={'secondary'}
                value={['发布评论', '发布评论']} 
                operate={this.publish}
            />
            <CommentCom
                buttonText={'写完了'}
                publishCom={this.publishComment}
                ref={this.commentRef}
            />
          </View>
        }
      >
      </GScrollView>
    )
  }

}