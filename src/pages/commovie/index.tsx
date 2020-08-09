import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import GButton from '~components/button'
import Header from '~components/newsheader'
import { List } from '~components/commentlist'
import { EAction, IParams } from '../comment'
import GScrollView from '~components/scrollList'
import style from '~theme/style'
import { colorStyleChange } from '~theme/color'
import throttle from 'lodash/throttle'
import { withTry, ESourceTypeList, router, routeAlias } from '~utils'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from './connect'
import { getCustomerMovieCommentList, getMovieCommentList, getMovieDetailSimple, putLike, cancelLike } from '~services'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {

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

  public state: any = {
    data: [],
    id: false,
    userCall: false,
    headerData: {},
  }

  //获取电影数据
  public fetchMovieData = async () => {

    if(!this.id) {
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
    const resData = await method({ id: this.id, ...query })

    this.setState({
      data: [ ...(isInit ? [] : [...data]), ...resData]
    })
    return resData
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  //点赞/取消点赞
  public like = async (id: string, like: boolean) => {
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
   * isUserCall: 是否为回复
   * commentId: 评论id
   */
  public publish = async (isUserCall, commentId) => {
    const param:IParams = {
      action: isUserCall ? EAction.COMMENT_USER : EAction.COMMENT_MOVIE,
      postInfo: commentId
    } 
    router.push(routeAlias.toComment, param)
  }

  public render() {
    const { headerData, data } = this.state

    return (
      <GScrollView
        ref={this.scrollRef}
        sourceType={ESourceTypeList.Scope}
        query={{ pageSize: 6 }}
        style={{ ...style.backgroundColor('bgColor') }}
        renderContent={
          <List
            comment={this.publish}
            list={data}
            like={this.like}
          ></List>
        }
        fetch={this.throttleFetchData}
        renderHeader={
          (watch: () => any) => {
            return (
              <View id="commovie-header">
                <Header 
                  content={headerData}
                  handleSizeChange={watch}
                ></Header>
              </View>
            )
          }
        }
        renderBottom={
          (_: () => any) => {
            return (
              <View>
                <GButton
                  style={{ width: '100%', height: '92' }}
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