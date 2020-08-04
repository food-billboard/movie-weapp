import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtIcon, AtAvatar } from 'taro-ui'
import GVideo from '../video'
import Curtain from '../curtain'
import ImageLoading from '../imageLoading'
import { Info } from '../model'
import { router, formatTime, formatNumber, EMediaType, routeAlias } from '~utils'
import style from '~theme/style'
import { TypeColor } from '~theme/color'
import { SYSTEM_PAGE_SIZE } from '~config'
import noop from 'lodash/noop'

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
    image?: Array<string>
    video?: Array<string>
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
  list: IList
  extra?: boolean
  renderExtra?: any
  like: (id: string, like: boolean) => any
  comment: (isUserCall: boolean, user: string, commentId: string) => any
}

export interface IState {
  activeVideo: string | null
  videoShow: boolean
  activeVideoPoster: string | null
}

//媒体的图标类型
const ICON_TYPE = {
  video: 'at-icon-video',
  image: 'at-icon-image',
  action: 'at-icon-soung'
}

class List extends Component<IProps, IState>{
  public static defaultProps: IProps = {
    list: {
      comment_users: [],
      content: {},
      createdAt: 0,
      updatedAt: 0,
      total_like: 0,
      like: false,
      user_info: {
        avatar: null,
        username: '',
        _id: ''
      },
      _id: ''
    },
    like: noop,
    comment: noop,
  }

  //视频modal配置
  readonly videoConfig: Info = {
    isOpen: false,
    title: '',
    cancelText: '',
    confirmText: '',
    onCancel: () => {
      this.setState({
        videoShow: false,
        activeVideo: ''
      })
    },
    onConfirm: noop,
    onClose: noop,
    content: ''
  }

  public state: IState = {
    videoShow: false,
    activeVideo: '',
    activeVideoPoster: ''
  }

  //查看详细评论
  public getDetail = () => {
    const { list: { _id } } = this.props
    router.push(routeAlias.commentdetail, { id: _id })
  }

  //获取用户信息
  public getUser = (id: string) => router.push(routeAlias.user, { id })

  //预览媒体
  public handlePreviewMedia = (src: string, type: EMediaType, image: string = '') => {
    const { list: { content: { image: originImage = [] } } } = this.props
    if (type === EMediaType.IMAGE) {
      this.handlePreviewImage(src, originImage)
    } else if (type === EMediaType.VIDEO) {
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
      videoShow: true,
      activeVideoPoster: poster
    })
  }

  //监听视频关闭
  public handleVideoClose = () => {
    this.setState({
      videoShow: false,
      activeVideo: null,
      activeVideoPoster: null
    })
  }

  //获取视频地址
  public getVideoSrc = () => this.state.activeVideo

  //获取视频显示隐藏
  public getVideoShowStatus = () => this.state.videoShow

  public render() {
    const { activeVideoPoster } = this.state
    const { extra = false, list } = this.props
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
    } = list

    return (
      <View
        className={'comment-item'}
        style={{ ...style.backgroundColor('disabled') }}
      >
        <View className="comment-item-header">
          <View 
            className="comment-item-header-image"
            onClick={this.getUser.bind(this, userId)}
          >
            <AtAvatar image={avatar || ''} text='头像' circle></AtAvatar>
          </View>
          <View 
            className="at-row"
            style={{flexDirection: 'column'}}
          >

            <View className="comment-item-header-info at-col">
              <View
                className={'comment-item-username'}
                style={{ ...style.color('thirdly') }}
              >
                <Text
                  className={'comment-item-username-content'}
                  onClick={this.props.comment.bind(this, true, userId, _id)}
                  style={{ ...style.color('primary') }}
                >{username}</Text>
                <Text style={{flex: 1}}>说: </Text>
              </View>
              <View
                className={'comment-item-up'}
                onClick={this.props.like.bind(this, userId, like)}
                style={{ ...style.color('thirdly') }}
              >
                <View className={'up-text'}>
                  {formatNumber(total_like)}
                  <AtIcon value={like ? 'heart-2' : 'heart'} size={SYSTEM_PAGE_SIZE(14)} />
                </View>
              </View>
            </View>

            <View className="at-col">
              <View
                className={'comment-item-header-sub-time'}
                style={{ ...style.color('thirdly') }}
              >
                {formatTime(createdAt)}
              </View>
            </View> 

          </View>
        </View>
        {/* <View className='head'>
          <View className='head-img'
            onClick={this.getUser.bind(this, userId)}
          >
            <ImageLoading src={avatar || ''} loadingProps={{ content: '' }} />
          </View>
          <View
            className={'name'}
            style={{ ...style.color('thirdly') }}
          >
            <Text
              className={'name-user'}
              onClick={this.props.comment.bind(this, true, userId, _id)}
              style={{ ...style.color('primary') }}
            >{username.length <= 6 ? username : (username.slice(0, 6) + '...')}</Text>
            <Text style={{ display: 'inline-block' }}>说: </Text>
          </View>
          <View
            className={'up'}
            onClick={this.props.like.bind(this, userId, like)}
            style={{ ...style.color('thirdly') }}
          >
            <View className={'up-text'}>
              {formatNumber(total_like)}
              <AtIcon value={like ? 'heart-2' : 'heart'} size={SYSTEM_PAGE_SIZE(14)} />
            </View>
          </View>
          <View
            className={'time'}
            style={{ ...style.color('thirdly') }}
          >
            {formatTime(createdAt)}
          </View>
        </View> */}
        <View
          className='content'
          style={{ ...style.color('primary') }}
          onClick={this.getDetail}
        >
          {text}
        </View>
        <View className='image-list at-row at-row--wrap'>
          {
            [
              ...video.map(src => ({ src, type: EMediaType.VIDEO })),
              ...image.map(src => ({ src, type: EMediaType.IMAGE }))
            ].map((val: { src: string, type: EMediaType }, _: number) => {
              const { src, type } = val
              //处理不同类型的文件
              let imageSrc,
                args
              switch (type) {
                case EMediaType.VIDEO:
                  imageSrc = src
                  args = [src, EMediaType.VIDEO, image]
                  break
                case EMediaType.IMAGE:
                  imageSrc = src
                  args = [src, EMediaType.IMAGE]
                  break
                case EMediaType.AUDIO:
                  break
              }
              return (
                <View
                  className={'at-col at-col-4 image'}
                  key={src}
                  onClick={() => { this.handlePreviewMedia.apply(this, args) }}
                >
                  <View
                    className={`image-icon at-icon ${ICON_TYPE[type]}`}
                    style={{
                      ...style.color('primary'),
                      textShadow: `0 0 2px ${TypeColor['disabled']}`,
                      fontSize: SYSTEM_PAGE_SIZE(16) + 'px'
                    }}
                  ></View>
                  <ImageLoading
                    src={imageSrc}
                    customStyle={{
                      ...style.border(1, 'thirdly', 'dashed', 'all'),
                      boxSizing: 'border-box',
                      padding: `${SYSTEM_PAGE_SIZE(1)}px`
                    }}
                  />
                </View>
              )
            })
          }
        </View>
        {
          extra ? this.props.renderExtra : null
        }
        <ScrollView
          scrollX
          className='footer'
        >
          {
            comment_users.map((value) => {
              const { avatar, _id: id } = value
              return (
                <View className='footer-img'
                  key={id}
                  onClick={this.getUser.bind(this, id)}
                >
                  <ImageLoading
                    src={avatar || ''}
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
        <View
          className='video-preview'
          style={{ display: this.getVideoShowStatus() ? 'block' : 'none' }}
        >
          <View className='shadow'></View>
          <View className='main'>

          </View>
        </View>
        <Curtain
          isOpen={this.getVideoShowStatus()}
          handleClose={this.handleVideoClose}
          title={false}
          main={true}
          curtainStyle={{ backgroundColor: '#000', opacity: 1 }}
          renderMain={
            <View
              className='video'
            >
              <GVideo
                style={{ width: '100%', height: '100%' }}
                src={this.getVideoSrc() || ''}
                controls={true}
                loop={true}
                autoplay={true}
                poster={activeVideoPoster || ''}
              ></GVideo>
            </View>
          }
          action={false}
          other={false}
          cancel={false}
        ></Curtain>
      </View>
    )
  }
}

export {
  List
}
