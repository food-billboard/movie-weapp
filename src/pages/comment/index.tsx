import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import BaseForm from '~components/wrapForm'
import GDescription from '~components/input'
import { createFieldsStore } from '~components/wrapForm/fieldsStore'
import Rate from '../detail/components/rate'
import style from '~theme/style'
import { size, withTry, upload } from '~utils'
import { SYSTEM_PAGE_SIZE } from '~config'
import { postCommentToUser, postCommentToMovie, feedback, preCheckFeedback } from '~services'

import './index.scss'

const fieldsStore = createFieldsStore('comment', {
  getOnChangeValue(value) {
    return value
  }
})

const BUTTON_STYLE:any = {
  position: 'fixed',
  bottom:0,
  left:0,
  width: '100%',
  height: SYSTEM_PAGE_SIZE(40) + 'px',
  zIndex: 9
}

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
    comUser: {},
    comMovie: {},
    feedback: {}
  }

  public componentDidMount = () => {
    //强制刷新设置
    fieldsStore.setUpdate(this.forceUpdate.bind(this))
    if(!this.router) {
      Taro.showToast({
        title: '网络错误，请重试',
        icon: 'none',
        duration: 1000
      })
      this.disabled = true
      return
    }
    this.disabled = false

    const { params: { action, postInfo } } = this.router
    const { comUser, comMovie, feedback } = this.state
    let title: string = ''
    switch(action) {
      case EAction.COMMENT_MOVIE:
        title = '电影评论'
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
        title = '用户评论'
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
        title = '我的反馈'
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
    Taro.setNavigationBarTitle({ title })
  }

  router = getCurrentInstance().router

  disabled = false

  public commentToMovie = () => {
    
  }

  public commentToUser = () => {

  }

  public feedback = () => {

  }

  private handleReset = () => {

  }

  private validateFields = () => {

  }

  private getPostConfig = () => {

  }

  private handleSubmit = async (_) => {
    fieldsStore.validateFields(['description', 'rate', 'media'], async (errors, values) => {
      //处理所有有错的表单项
      if(errors) {
        Taro.showToast({
          mask: false,
          title: '信息好像没填对',
          icon: 'none',
          duration: 1500
        })
        return
      }

      console.log(values)
    })
  }

  public render() {
     return (
       <View className="user-comment">
         <BaseForm
            name="comment"
          >
            <View className='description'>
              <GDescription
                type={'textarea'}
                style={{...style.backgroundColor('disabled'), marginBottom: '20px'}}
                handleChange={
                  fieldsStore.getFieldProps('description', 'onChange', {
                    rules: [
                      {
                        required: true
                      }
                    ],
                    initialValue: '说点什么吧...'
                  })
                }
                value={fieldsStore.getFieldValue('description')}
                error={!!size(fieldsStore.getFieldsError('description'))}
              ></GDescription>
            </View>
            <View className="rate">
              <Rate
                style={{marginBottom: '20px'}}
                rate={
                  fieldsStore.getFieldProps('author_rate', 'onChange', {
                    rules: [
                      {
                        required: false
                      }
                    ],
                    initialValue: 0
                  })
                }
                value={fieldsStore.getFieldValue('author_rate')}
              ></Rate>
            </View>
            <View className="media">
                媒体数据
            </View>
            <AtButton type={'primary'} onClick={this.handleSubmit} customStyle={{ ...BUTTON_STYLE, ...style.backgroundColor('thirdly'), ...style.border(1, 'thirdly', 'solid', 'all') }}>提交</AtButton>
            <AtButton type={'primary'} onClick={this.handleReset} customStyle={{ ...BUTTON_STYLE, bottom: SYSTEM_PAGE_SIZE(40) + 'px', ...style.backgroundColor('primary'), ...style.border(1, 'primary', 'solid', 'all') }}>重置</AtButton>
          </BaseForm>
       </View>
     ) 
  }

}