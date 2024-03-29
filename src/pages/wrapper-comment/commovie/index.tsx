import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Block } from '@tarojs/components'
import throttle from 'lodash/throttle'
import { connect } from 'react-redux'
import GButton from '~components/button'
import Header from '~components/newsheader'
import { List, VideoPreview } from '~components/commentlist'
import GScrollView from '~components/scrollList'
import style from '~theme/style'
import { colorStyleChange } from '~theme/color'
import { ESourceTypeList, router, routeAlias, EAction } from '~utils'
import { getCustomerMovieCommentList, getMovieCommentList, getMovieDetailSimple, putLike, cancelLike } from '~services'
import { mapDispatchToProps, mapStateToProps } from './connect'

class CommentMovie extends Component<any> {

  public state: any = {
    data: [],
    headerData: {},
  }

  public componentDidMount = async () => await this.fetchMovieData()

  public componentDidShow = () => colorStyleChange()

  private scrollRef = React.createRef<GScrollView>()

  //电影id
  readonly id = getCurrentInstance().router?.params.id

  //下拉刷新
  public onPullDownRefresh = async () => {
    await this.scrollRef.current!.handleToUpper()
    Taro.stopPullDownRefresh()
  }

  //上拉加载
  public onReachBottom = async () => {
    await this.scrollRef.current!.handleToLower()
  }

  //获取电影数据
  public fetchMovieData = async () => {

    if (!this.id) {
      Taro.showToast({
        title: '网络错误，请重试',
        icon: 'none',
        duration: 1000
      })
      return
    }
    const {
      _id,
      poster,
      description,
      ...nextData
    } = await getMovieDetailSimple(this.id) || {}
    this.setState({
      headerData: {
        ...nextData,
        id: _id,
        detail: description,
        image: poster
      }
    })
  }

  //获取评论数据
  public fetchData = async (query: any, isInit = false) => {

    const { data } = this.state
    const { userInfo } = this.props
    const method = userInfo ? getCustomerMovieCommentList : getMovieCommentList
    const { comment = [] } = await method({ id: this.id, ...query }) || {}

    this.setState({
      data: [...(isInit ? [] : [...data]), ...(comment || [])]
    })
    return comment
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  //点赞/取消点赞
  public like = async () => {
    await this.onPullDownRefresh()
  }

  /**
   * 展示评论组件
   * isUserCall: 是否为回复
   * commentId: 评论id
   */
  public publish = async (isUserCall: boolean, commentId: string) => {
    const param: NComment.Comment_Params = {
      action: isUserCall ? EAction.COMMENT_USER : EAction.COMMENT_MOVIE,
      postInfo: commentId || this.id
    }
    router.push(routeAlias.toComment, param)
  }

  public render() {
    const { headerData, data } = this.state

    return (
      <Block>
        <GScrollView
          ref={this.scrollRef}
          sourceType={ESourceTypeList.Scope}
          query={{ pageSize: 6 }}
          style={{ ...style.backgroundColor('bgColor') }}
          renderContent={
            <List
              comment={this.publish}
              list={data}
              onLike={this.like}
            ></List>
          }
          fetch={this.throttleFetchData}
          renderHeader={
            (watch: () => any) => {
              return (
                <View id='commovie-header'>
                  <Header
                    content={headerData}
                  // handleSizeChange={watch}
                  ></Header>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentMovie)