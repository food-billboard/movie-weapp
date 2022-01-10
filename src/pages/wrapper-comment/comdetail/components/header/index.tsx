import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { merge } from 'lodash'
import { View, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import Ellipsis from '~components/ellipsis'
import { router, formatTime, formatNumber, routeAlias } from '~utils'
import style from '~theme/style'
import noop from 'lodash/noop'

import './index.scss'

interface IContent {
  _id: string
  user_info: {
    avatar: string | null
    username: string
    _id: string
  }
  content: {
    image?: Array<string>
    text?: string
    video?: Array<string>
  }
  comment_users: number
  createdAt: string | number
  like: boolean
  total_like: number
}

export interface IProps {
  content: IContent
  like: (id: string, like: boolean) => any
}

export interface IState { }

const DEFAULT_CONTENT = {
  _id: '',
  user_info: {
    avatar: null,
    username: '',
    _id: ''
  },
  content: {},
  comment_users: 0,
  createdAt: Date.now(),
  like: false,
  total_like: 0
}

export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    content: DEFAULT_CONTENT,
    like: noop,
  }

  public getUser = (id: string) => router.push(routeAlias.user, { id })

  public render() {

    const {
      content
    } = this.props
    const {
      _id: commentId,
      user_info: {
        avatar,
        username,
        _id: userId
      } = {},
      content: {
        text = '',
        image = [],
        video = []
      },
      comment_users,
      createdAt,
      like,
      total_like
    } = merge({}, DEFAULT_CONTENT, content) as IContent

    return (
      <View
        className='comment-detail-header'
        style={{ ...style.backgroundColor('disabled') }}
      >
        <View
          className='comment-detail-header-content'
        >
          <View className='comment-detail-header-content-header at-row at-row__align--center'>
            <View
              className='at-col at-col-2'
              onClick={this.getUser.bind(this, userId)}
            >
              <AtAvatar
                image={avatar || ''}
                circle
                text='头像'
              />
            </View>
            <View
              className='at-col at-col-7 comment-detail-header-content-header-user title-font-size-class'
              style={{ ...style.color('primary') }}
            >
              {username}
            </View>
            <View
              className='content-header-extra at-col at-col-3 at-col at-col-7 comment-detail-header-content-header-time normal-font-size-class'
              style={{ ...style.color('secondary') }}
            >
              {formatTime(createdAt)}
            </View>
          </View>

          <View className='comment-detail-header-content-main'>
            <View className='comment-detail-header-content-main-text'>
              <Ellipsis
                text={text}
                style={{ ...style.color('primary') }}
              />
            </View>
            <View className='comment-detail-header-content-main-extra'>
              {/* ToDo */}
            </View>
          </View>
          <View className='comment-detail-header-content-footer normal-font-size-class'
            style={{ ...style.border(1, 'disabled', 'dashed', 'top') }}
          >
            <View className='at-row at-row__align--center comment-detail-header-content-footer-main'>
              <View className='at-col at-col-6 comment-detail-header-content-footer-main-icon-content'>
                <View
                  className='comment-detail-header-content-footer-main-icon-content-footer-icon at-icon at-icon-message'
                  style={{ ...style.color('secondary') }}
                ></View>
                <Text style={{ ...style.color('secondary') }}>{formatNumber(comment_users)}</Text>
              </View>
              <View
                className='at-col at-col-6 comment-detail-header-content-footer-main-icon-content'
                onClick={this.props.like.bind(this, userId, commentId)}
              >
                <View
                  className={`comment-detail-header-content-footer-main-icon-content-footer-icon at-icon at-icon-heart${like ? '-2' : ''}`}
                  style={{ ...style.color('secondary') }}
                ></View>
                <Text style={{ ...style.color('secondary') }}>{formatNumber(total_like)}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

}