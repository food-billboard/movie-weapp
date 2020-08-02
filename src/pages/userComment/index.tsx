import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import BaseForm from '~components/wrapForm'
import { postCommentToUser, postCommentToMovie, feedback, preCheckFeedback } from '~services'

import './index.scss'

/**
 * 评分
 * 文字
 * 图片
 * 视频
 */

export enum EAction {
  COMMENT_USER = 'COMMENT_USER',
  COMMENT_MOVIE = 'COMMENT_MOVIE',
  FEEDBACK = 'FEEDBACK',
}

// export enum EType {
//   COMMENT = 'COMMENT',
//   MOVIE = 'MOVIE'
// }

// export interface IPostInfo {
//   type: EType
//   id: string
// }

export interface IParams {
  action: EAction
  postInfo?: string
}

export default class extends Component<any> {

  public state: any = {
    comUser: {

    },
    comMovie: {

    },
    feedback: {

    }
  }

  public componentDidMount = () => {
    if(!this.router) {
      Taro.showToast({
        title: '网络错误，请重试',
        icon: 'none',
        duration: 1000
      })
      this.disabled = true
      return
    }
    this.disabled = true

    const { params: { action, postInfo } } = this.router
    const { comUser, comMovie, feedback } = this.state
    switch(action) {
      case EAction.COMMENT_MOVIE:
        this.setState({
          comMovie: {
            ...comMovie,
            action: this.commentToMovie,
            param: {
              id: postInfo
            }
          }
        })
        break
      case EAction.COMMENT_USER:
        this.setState({
          comUser: {
            ...comUser,
            action: this.commentToUser,
            param: {
              id: postInfo
            }
          }
        })
        break
      case EAction.FEEDBACK: 
      this.setState({
        feedback: {
          ...feedback,
          action: this.feedback,
          param: {
            
          }
        }
      })
      break
    }
  }

  router = getCurrentInstance().router

  disabled = false

  public commentToMovie = () => {

  }

  public commentToUser = () => {

  }

  public feedback = () => {

  }

  private resetFields = () => {

  }

  private validateFields = () => {

  }

  private getPostConfig = () => {

  }

  public render() {
     return (
       <View className="user-comment">
         
       </View>
     ) 
  }

}