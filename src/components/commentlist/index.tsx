import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, ScrollView, Block } from '@tarojs/components'
import { AtIcon, AtAvatar } from 'taro-ui'
import noop from 'lodash/noop'
import { connect } from 'react-redux'
import { router, formatTime, formatNumber, EMediaType, routeAlias, LoginTool, withTry } from '~utils'
import style from '~theme/style'
import { TypeColor } from '~theme/color'
import { SYSTEM_PAGE_SIZE } from '~config'
import { putLike, cancelLike } from '~services'
import VideoStaticImage from '~assets/video.png'
import CurtainVideo from './components/curtainVideo'
import Curtain from '../curtain'
import ImageLoading from '../imageLoading'
import EmptyTry from '../empty-try'
import { mapStateToProps, mapDispatchToProps } from './connect'

import './index.scss'

export interface IMediaList {
  image: string
  id: string
  type: EMediaType
  src: string
}

export interface IInfo {
  origin: boolean
  image: string | null
  id: string
  content: string
  hasImage: boolean
  hasVideo: boolean
}

interface ICommentUsers {
  _id: string
  avatar: string | null
}

interface IList {
  comment_users: Array<ICommentUsers>
  content: {
    text?: string
    image?: string[]
    video?: {
      src: string
      poster?: string
    }[]
  }
  createdAt: number | string
  updatedAt: number | string
  total_like: number
  like: boolean
  user_info: {
    avatar: string | null
    username: string
    _id: string
  },
  _id: string
}

export interface IProps {
  list: Array<IList>
  renderExtra?: (item: IList) => React.ReactNode
  onLike?: (id: string, like: boolean, success?: boolean) => any
  comment?: (isUserCall: boolean, user: string, commentId: string) => any
  userInfo?: any
  getUserInfo?: TGetUserInfo
}

export interface IState {
  activeVideo: string | null
  activeVideoPoster: string | null
}

//媒体的图标类型
const ICON_TYPE = {
  [EMediaType.VIDEO]: 'at-icon-video',
  [EMediaType.IMAGE]: 'at-icon-image',
  [EMediaType.AUDIO]: 'at-icon-soung'
}

class ListContent extends Component<IProps, IState>{

  public static defaultProps = {
    list: [],
    comment: noop,
  }

  public state: IState = {
    activeVideo: '',
    activeVideoPoster: ''
  }

  private curtainRef = React.createRef<Curtain>()

  //查看详细评论
  public getDetail = (id: string) => {
    router.push(routeAlias.commentdetail, { id })
  }

  //点赞/取消点赞
  public like = async (id: string, like: boolean) => {
    const action = async (res) => {
      if (!res) return
      const method = like ? cancelLike : putLike

      Taro.showLoading({ mask: true, title: '操作中' })
      await withTry(method)(id)
      Taro.hideLoading()
      //刷新
    }
    return this.props.getUserInfo?.({ action })
      .then(() => {
        this.props.onLike?.(id, like, true)
      })
      .catch(() => {
        this.props.onLike?.(id, like, false)
        Taro.showToast({
          title: '操作失败，请重试',
          icon: 'none'
        })
      })
  }

  //获取用户信息
  public getUser = (id: string) => {
    const { _id } = this.props.userInfo || {}
    if (LoginTool.isLogin() && _id === id) {
      router.push(routeAlias.mine)
      Taro.switchTab({
        url: "/pages/mine/index"
      })
      return
    }
    router.push(routeAlias.user, { id })
  }

  //预览媒体
  public handlePreviewMedia = (src: string, type: EMediaType, image: string = '') => {
    if (type === EMediaType.IMAGE) {
      this.handlePreviewImage(src, [src])
    } else if (type === EMediaType.VIDEO) {
      //TODO
      //需要后台返回视频封面图片
      this.handlePreviewVideo(src, image)
    } else {
      //TODO
    }
  }

  //查看图片
  public handlePreviewImage = (target: string, list: Array<string>) => {
    Taro.previewImage({
      urls: list,
      current: target
    })
  }

  //查看视频
  public handlePreviewVideo = (target: string, poster: string) => {
    this.setState({
      activeVideo: target,
      activeVideoPoster: poster
    }, this.curtainRef.current?.handleShow)
  }

  //监听视频关闭
  public handleVideoClose = () => {
    this.setState({
      activeVideo: null,
      activeVideoPoster: null
    })
  }

  //视频关闭
  private handleCloseVideo = () => this.curtainRef.current?.handleClose()

  public render() {
    const { activeVideoPoster, activeVideo } = this.state
    const { list } = this.props

    return (
      <Block>
        {
          list.map((item: IList) => {
            const {
              comment_users,
              content: {
                text = '',
                image = [],
                video = []
              },
              createdAt,
              total_like,
              like,
              user_info: {
                avatar,
                username,
                _id: userId
              },
              _id
            } = item
            return (
              <View
                className='comment-item'
                key={_id}
              >
                <View className='comment-item-header'>
                  <View
                    className='comment-item-header-image'
                    onClick={this.getUser.bind(this, userId)}
                  >
                    <AtAvatar image={avatar || ''} text={username || "头像"} circle></AtAvatar>
                  </View>
                  <View
                    style={{ flexDirection: 'column', flex: 1 }}
                  >

                    <View className='comment-item-header-info at-row'>
                      <View
                        className='comment-item-header-info-username sub-title-font-size-class at-col at-col-8'
                        style={style.color('thirdly')}
                      >
                        <Text
                          className='comment-item-header-info-username-content'
                          onClick={this.props.comment?.bind(this, true, _id)}
                          style={style.color('primary')}
                        >{username}</Text>
                        <Text style={{ flex: 1 }}>说: </Text>
                      </View>
                      <View
                        className='comment-item-up at-col at-col-4'
                        onClick={this.like.bind(this, _id, like)}
                        style={style.color('thirdly')}
                      >
                        <View className='comment-item-up-text sub-title-font-size-class'>
                          {formatNumber(total_like)}
                          <AtIcon value={like ? 'heart-2' : 'heart'} size={SYSTEM_PAGE_SIZE(24)} customStyle={{ textIndent: '.2em' }} />
                        </View>
                      </View>
                    </View>

                    <View
                      className='comment-item-header-sub-time normal-font-size-class'
                      style={style.color('thirdly')}
                    >
                      {formatTime(createdAt)}
                    </View>

                  </View>
                </View>
                <View
                  className='comment-item-content normal-font-size-class'
                  style={{ ...style.color('primary') }}
                  onClick={this.getDetail.bind(this, _id)}
                >
                  {text}
                </View>
                <View className='comment-item-image-list at-row at-row--wrap'>
                  {
                    [
                      ...video.map(src => {
                        return {
                          src: src?.src || src,
                          type: EMediaType.VIDEO,
                          poster: src?.poster
                        }
                      }),
                      ...image.map(src => ({ src, type: EMediaType.IMAGE }))
                    ].map((val: { src: string, type: EMediaType, poster?: string }, _: number) => {
                      const { src, type, poster } = val
                      //处理不同类型的文件
                      let imageSrc,
                        args
                      switch (type) {
                        case EMediaType.VIDEO:
                          imageSrc = poster || VideoStaticImage
                          args = [src, EMediaType.VIDEO]
                          break
                        case EMediaType.IMAGE:
                          imageSrc = src
                          args = [src, EMediaType.IMAGE]
                          break
                        case EMediaType.AUDIO:
                          return null
                      }
                      return (
                        <View
                          className='at-col at-col-4 comment-item-image-list-image'
                          key={src}
                          onClick={() => { this.handlePreviewMedia.apply(this, args) }}
                        >
                          <View
                            className={`comment-item-image-list-image-icon big-icon-font-size-class at-icon ${ICON_TYPE[type]}`}
                            style={{
                              textShadow: `0 0 2px ${TypeColor()['disabled']}`,
                            }}
                          ></View>
                          <ImageLoading
                            src={imageSrc}
                            mode='widthFix'
                            customStyle={{
                              ...style.border(1, 'thirdly', 'dashed', 'all'),
                              boxSizing: 'border-box',
                              padding: `${SYSTEM_PAGE_SIZE(1)}px`
                            }}
                            imageStyle={{
                              display: "flex",
                              alignItems: "center"
                            }}
                          />
                        </View>
                      )
                    })
                  }
                </View>
                {
                  !!this.props.renderExtra && this.props.renderExtra(item)
                }
                <EmptyTry
                  value={comment_users}
                >
                  <ScrollView
                    scrollX
                    className='comment-item-footer'
                  >
                    {
                      (Array.isArray(comment_users) ? comment_users : []).map((value) => {
                        const { avatar: commentUserAvatar, _id: id } = value
                        return (
                          <View className='comment-item-footer-img'
                            key={id}
                            onClick={this.getUser.bind(this, id)}
                          >
                            <ImageLoading
                              src={commentUserAvatar || ''}
                              loadingProps={{ content: '' }}
                              customStyle={{
                                display: 'inline-block',
                                width: `${SYSTEM_PAGE_SIZE(25)}px`,
                                height: `${SYSTEM_PAGE_SIZE(25)}px`,
                              }}
                            />
                          </View>
                        )
                      })
                    }
                  </ScrollView>
                </EmptyTry>
              </View>
            )
          })
        }
        <Curtain
          ref={this.curtainRef}
          handleClose={this.handleVideoClose}
          curtainStyle={{ backgroundColor: '#000', opacity: 1 }}
          renderMain={
            <CurtainVideo
              src={activeVideo || ''}
              poster={activeVideoPoster || ''}
              handleClose={this.handleCloseVideo}
            ></CurtainVideo>
          }
        ></Curtain>
      </Block>
    )
  }
}

export const List = connect(mapStateToProps, mapDispatchToProps)(ListContent)
