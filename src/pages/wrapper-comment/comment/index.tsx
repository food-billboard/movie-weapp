import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { pick, merge, noop } from 'lodash'
import BaseForm from '~components/wrapForm'
import GDescription, { EInputType } from '~components/input'
import MediaPicker from '~components/mediaPicker'
import { EAction } from '~utils/types'
import { createFieldsStore } from '~components/wrapForm/fieldsStore'
import style from '~theme/style'
import { size, router, Upload, EMediaType } from '~utils'
import { SYSTEM_PAGE_SIZE } from '~config'
import { postCommentToUser, postCommentToMovie, feedback, preCheckFeedback, putVideoPoster } from '~services'

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

export default class extends Component<any> {

  public state: any = {
    config: {
      action:postCommentToMovie,
      param: {
        id: ''
      },
      validate: ['description', 'media']
    }
  }

  router = getCurrentInstance().router

  disabled = false

  public componentDidMount = () => {
    //强制刷新设置
    fieldsStore.setUpdate(this.forceUpdate.bind(this))
    fieldsStore.resetFields()

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
    const baseValidate = ['description', 'media']
    switch(action) {
      case EAction.COMMENT_MOVIE:
        title = '电影评论'
        config = {
          ...config,
          action: this.postCommentToMovie,
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
          action: this.postCommentToUser,
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
          validate: baseValidate
        }
        break
    }
    this.setState({
      config
    })
    Taro.setNavigationBarTitle({ title })
  }

  public postCommentToMovie = async (values) => {
    return this.postComment(postCommentToMovie, values)
  }

  public postCommentToUser = async (values) => {
    return this.postComment(postCommentToUser, values)
  }

  public postComment = async (action, values) => {
    const { description, video, image, id } = values
    return action({
      id,
      content: {
        text: description,
        video,
        image
      }
    })
  }

  public feedback = async (values) => {
    Taro.hideLoading()
    Taro.showLoading({ mask: true, title: '预检查中...' })
    const { description, video, image } = values
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
      return feedback({
        content: {
          text: description,
          image,
          video
        }
      })
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

  private handleSubmit = async () => {

    const { config: { action, param } } = this.state
    const values = fieldsStore.getFieldsValue()
    return new Promise((resolve, reject) => {
      //全空则无法提交
      if(Object.values(values).every((item: string | any[]) => !item.length)) {
        Taro.showToast({
          title: '至少填写一项内容',
          icon: 'none',
          duration: 1000
        })
        return resolve(null)
      }

      const {
        media,
        ...nextValues
      } = values
      const newMedia = media.reduce((acc, cur) => {
        const { type, url, poster } = cur
        acc.push(merge({}, pick(cur, ['type', 'url']), {
          originUrl: url
        }))
        if(type === EMediaType.VIDEO) {
          acc.push({
            url: poster,
            originUrl: url,
            child: true,
            type: EMediaType.IMAGE
          })
        } 
        return acc 
      }, [])

      console.log(media)

      Taro.showLoading({ mask: true, title: '数据提交中...' })

      Upload(newMedia)
      .then(data => {
        if(data.some(item => !item.success)) return Promise.reject(false)
        let videoPosters: string[] = []
        const uploadData = data.reduce((acc, cur) => {
          const { url, type, child, orignUrl } = cur 
          if(type === EMediaType.IMAGE) {
            if(!child) {
              acc.image.push(url)
            }else {
              const videoId = data.find(item => {
                return item.type === EMediaType.VIDEO && item.orignUrl == orignUrl
              })
              if(videoId) {
                videoPosters.push(`${videoId.url}-${url}`)
              }
            }
          }
          if(type === EMediaType.VIDEO) {
            acc.video.push(url)
          }
          return acc 
        }, {
          video: [] as string[],
          image: [] as string[]
        })
        const method = videoPosters.length ? putVideoPoster : noop
        return Promise.all([
          uploadData,
          method({ data: videoPosters.join(',') })
        ])
      })
      .then(([uploadData]) => {
        const { image, video } = uploadData
        return action({
          ...nextValues,
          ...param,
          image,
          video
        })
      })
      .then(_ => {
        Taro.hideLoading()
        Taro.showToast({
          title: '发送成功',
          icon: 'none',
          duration: 1000
        })
        fieldsStore.resetFields()
        //返回上一路由
        if (this.router && this.router.params.target) {
          return router.replace(this.router.params.target)
        }else {
          return router.back()
        }
      })
      .catch(err => {
        Taro.hideLoading()
        if(err) Taro.showToast({
          title: '发送错误，请重试',
          icon: 'none',
          duration: 1000
        })
      })
      
      return resolve(null)
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
                type={EInputType.TEXTAREA}
                placeholder={'说点什么吧...'}
                height={300}
                style={{...style.backgroundColor('disabled'), marginBottom: '20px'}}
                handleChange={
                  fieldsStore.getFieldProps('description', 'onChange', {
                    initialValue: ''
                  })
                }
                value={fieldsStore.getFieldValue('description')}
                error={!!size(fieldsStore.getFieldsError('description'))}
              ></GDescription>
            </View>
            <View className="media">
              <MediaPicker
                style={{marginBottom: `${SYSTEM_PAGE_SIZE(80)}px`}}
                handleChange={
                  fieldsStore.getFieldProps('media', 'onChange', {
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