import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { Block } from '@tarojs/components'
import { connect } from 'react-redux'
import throttle from 'lodash/throttle'
import { List, VideoPreview } from '~components/commentlist'
import GScrollView from '~components/scrollList'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { ESourceTypeList, router, routeAlias, EAction } from '~utils'
import { getCustomerComment, getCustomerUserComment, getUserComment } from '~services'
import Origin from './components/originComment'
import { mapDispatchToProps, mapStateToProps } from './connect'

class MyComment extends Component<any>{

  public state: any = {
    data: [],
  }

  private scrollRef = React.createRef<GScrollView>()

  router = getCurrentInstance().router

  //用户id
  readonly id = this.router?.params.id

  public componentDidShow = () => colorStyleChange()

  //下拉刷新
  public onPullDownRefresh = async () => {
    await this.scrollRef.current!.handleToUpper()
    Taro.stopPullDownRefresh()
  }

  //上拉加载
  public onReachBottom = async () => this.scrollRef.current!.handleToLower()

  //获取数据
  public fetchData = async (query: any, isInit = false) => {
    let method
    let params = {}
    const { data } = this.state
    if (!this.id) {
      method = getCustomerComment
    } else {
      const isLogin = await this.props.getUserInfo({ prompt: false })
      method = isLogin ? getCustomerUserComment : getUserComment
      params = { ...params, id: this.id }
    }
    const { comment } = await method({ ...params, ...query })

    this.setState({
      data: [...(isInit ? [] : data), ...comment || []]
    })
    return comment || []
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  /**
   * 展示评论组件
   * isUserCall: 是否为回复
   * commentId: 评论id
   */
  public publish = async (_, commentId) => {
    let param: NComment.Comment_Params = {
      action: EAction.COMMENT_USER,
      postInfo: commentId
    }
    router.push(routeAlias.toComment, param)
  }

  //点赞
  public like = async (id: string, like: boolean) => {
    await this.onPullDownRefresh()
  }

  public render() {
    const { data } = this.state
    return (
      <Block>
        <GScrollView
          ref={this.scrollRef}
          query={{ pageSize: 6 }}
          style={{ ...style.backgroundColor('bgColor') }}
          sourceType={ESourceTypeList.Scope}
          scrollWithAnimation
          renderContent={
            <List
              comment={this.publish}
              onLike={this.like}
              list={data}
              renderExtra={
                (item: any) => {
                  const { source_type, source } = item
                  return (
                    <Origin
                      info={{
                        source,
                        source_type
                      }}
                    />
                  )
                }
              }
            ></List>
          }
          fetch={this.throttleFetchData}
        ></GScrollView>
        <VideoPreview />
      </Block>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComment)