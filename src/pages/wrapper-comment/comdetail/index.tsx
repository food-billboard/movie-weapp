import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Block } from '@tarojs/components'
import GScrollView from '~components/scrollList'
import { List, VideoPreview } from '~components/commentlist'
import GButton from '~components/button'
import { EAction } from '~utils/global/comment_value'
import throttle from 'lodash/throttle'
import style from '~theme/style'
import { colorStyleChange } from '~theme/color'
import { ESourceTypeList, router, routeAlias } from '~utils'
import { getCustomerMovieCommentDetail, getUserMovieCommentDetail } from '~services'
import Header from './components/header'
import { mapDispatchToProps, mapStateToProps } from './connect'

let FIRST = true

class CommentDetail extends Component<any> {

  public componentDidShow = () => colorStyleChange()

  private scrollRef = React.createRef<GScrollView>()
  private listRef = React.createRef()

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
    if (headerData.user && FIRST) {
      FIRST = false
      Taro.setNavigationBarTitle({ title: `${headerData.user}的评论` })
    }
  }

  //获取评论数据
  public fetchData = async (query: any, isInit = false) => {
    const { data } = this.state
    return this.props.getUserInfo({ prompt: false })
      .then((isLogin: boolean) => {
        const method = isLogin ? getCustomerMovieCommentDetail : getUserMovieCommentDetail
        return method({ id: this.id, ...query })
      })
      .then(res => {
        const { comment: main = {}, sub = {} } = res
        this.setState({
          data: [...(isInit ? [] : [...data]), ...sub],
          headerData: main
        })
        return sub
      })
      .catch(_ => {
        return []
      })
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  public onLike = async () => {
    await this.onPullDownRefresh()
  }

  //点赞
  public like = async (id: string, like: boolean) => {
    (this.listRef.current as any)?.like(id, like)
  }

  /**
   * 展示评论组件
   * commentId: 评论id
   */
  public publish = async (_, commentId) => {
    let param: NComment.Comment_Params = {
      action: EAction.COMMENT_USER,
      postInfo: commentId,
    }
    router.push(routeAlias.toComment, param)
  }

  public render() {

    const { headerData, data } = this.state

    this.setTitle()

    return (
      <Block>
        <GScrollView
          ref={this.scrollRef}
          style={{ ...style.backgroundColor('bgColor') }}
          sourceType={ESourceTypeList.Scope}
          scrollWithAnimation
          query={{ pageSize: 7 }}
          emptyShow={false}
          renderContent={
            <List
              comment={this.publish}
              list={data}
              onLike={this.like}
              ref={this.listRef as any}
            ></List>
          }
          fetch={this.throttleFetchData}
          renderHeader={
            () => {
              return (
                <Header content={headerData}
                  like={this.like}
                ></Header>
              )
            }
          }
          renderBottom={
            (_: () => any) => {
              return (
                <GButton
                  style={{ width: '100%', height: '92' }}
                  type='secondary'
                  value={new Array(2).fill('发布评论')}
                  operate={this.publish}
                />
              )
            }
          }
        >
        </GScrollView>
        <VideoPreview />
      </Block>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(CommentDetail)