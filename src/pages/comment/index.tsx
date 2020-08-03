import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import BaseForm from '~components/wrapForm'
import GDescription from '~components/input'
import MediaPicker from '~components/mediaPicker'
import { createFieldsStore } from '~components/wrapForm/fieldsStore'
import Rate from '../detail/components/rate'
import style from '~theme/style'
import { size, withTry, upload, router } from '~utils'
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

export enum EAction {
  COMMENT_USER = 'COMMENT_USER',
  COMMENT_MOVIE = 'COMMENT_MOVIE',
  FEEDBACK = 'FEEDBACK',
}

export interface IParams {
  action: EAction
  postInfo?: string
}

export default class extends Component<any> {

  public state: any = {
    config: {}
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

    let title: string = ''
    let config = {}
    const baseValidate = ['description', 'rate']
    switch(action) {
      case EAction.COMMENT_MOVIE:
        title = '电影评论'
        config = {
          ...config,
          action: postCommentToMovie,
          param: {
            id: postInfo
          },
          validate: baseValidate
        }
        break
      case EAction.COMMENT_USER:
        title = '用户评论'
        config = {
          ...config,
          action: postCommentToUser,
          param: {
            id: postInfo
          },
          validate: baseValidate
        }
        break
      case EAction.FEEDBACK: 
        title = '我的反馈'
        config = {
          ...config,
          action: this.feedback,
          param: {},
          validate: [ ...baseValidate, 'media' ]
        }
        break
    }
    Taro.setNavigationBarTitle({ title })
  }

  router = getCurrentInstance().router

  disabled = false

  public feedback = async (values) => {
    Taro.hideLoading()
    Taro.showLoading({ mask: true, title: '预检查中...' })
    const data = await preCheckFeedback()
    if (!data) {
      Taro.showToast({
        title: '已达到每日反馈上限',
        icon: 'none',
        duration: 1000
      })
      Taro.hideLoading()
      throw new Error()
    } else {
      return await feedback(values)
    }
  }

  private handleReset = () => {
    Taro.showModal({
      title: '提示',
      content: '是否确定清空输入的内容'
    }).then((res) => {
      const { confirm } = res
      if(confirm) {
        fieldsStore.initializeFields()
      }
    })
  }

  private handleSubmit = async (_) => {

    const { config: { validate, action, param } } = this.state

    fieldsStore.validateFields(validate, async (errors, values) => {
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

      const {
        media,
        ...nextValues
      } = values
      //对媒体内容进行处理
      // TODO
      //
      let image = []
      let video = []
      media.forEach(async(item) => {
        await Taro.getFileInfo({
          filePath: item
        })
        .then((data: any) => {
          const { type } = data
          
        })
      })

      Taro.showLoading({ mask: true, title: '发送中...' })
      const [err, ] = await withTry(action)({
        ...nextValues,
        ...param,
        image,
        video
      })
      Taro.hideLoading()

      if(err) {
        Taro.showToast({
          title: '发送错误，请重试',
          icon: 'none',
          duration: 1000
        })
      }else {
        Taro.showToast({
          title: '发送成功',
          icon: 'none',
          duration: 1000
        })
        //返回上一路由
        if (this.router && this.router.params.target) {
          return router.replace(this.router.params.target)
        }
      }
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
            {
              true &&
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
            }
            <View className="media">
              <MediaPicker
                style={{marginBottom: '20px'}}
                handleChange={
                  fieldsStore.getFieldProps('media', 'onChange', {
                    rules: [
                      {
                        required: true
                      }
                    ],
                    initialValue: []
                  })
                }
                value={fieldsStore.getFieldValue('media')}
                error={!!size(fieldsStore.getFieldsError('media'))}
              ></MediaPicker>
            </View>
            <AtButton type={'primary'} onClick={this.handleSubmit} customStyle={{ ...BUTTON_STYLE, ...style.backgroundColor('thirdly'), ...style.border(1, 'thirdly', 'solid', 'all') }}>发布</AtButton>
            <AtButton type={'primary'} onClick={this.handleReset} customStyle={{ ...BUTTON_STYLE, bottom: SYSTEM_PAGE_SIZE(40) + 'px', ...style.backgroundColor('primary'), ...style.border(1, 'primary', 'solid', 'all') }}>清空</AtButton>
          </BaseForm>
       </View>
     ) 
  }
}