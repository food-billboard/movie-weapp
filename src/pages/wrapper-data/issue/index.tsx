import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtButton, AtTag } from 'taro-ui'
import { connect } from 'react-redux'
import GCommentPicker from '~components/picker'
import GDescription, { EInputType } from '~components/input'
import GImagePicker from '~components/imgPicker'
import BaseForm from '~components/wrapForm'
import Alias from '~components/restFactor'
import { createFieldsStore } from '~components/wrapForm/fieldsStore'
import Rate from '~components/rate'
import TagList from '~components/tagList'
import { Item } from '~components/indexes'
import { colorStyleChange } from '~theme/color'
import { size, withTry, Upload, routeAlias, router, EMediaType, sleep } from '~utils'
import { SYSTEM_PAGE_SIZE } from '~config'
import style from '~theme/style'
import { getEditMovieInfo, editIssue, sendIssue } from '~services'
import { IFormData, EIndexesType } from './interface'
import GCheckBox, { EDataType } from './components/checkbox'
import GVideo from './components/video'
import Indexes from './components/indexes'
import { mapDispatchToProps, mapStateToProps } from './connect'
import './index.scss'

const fieldsStore = createFieldsStore('issue', {
  getOnChangeValue(value) {
    return value
  }
})

const BUTTON_STYLE: any = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  height: SYSTEM_PAGE_SIZE(40) + 'px',
  zIndex: 9
}

const TAT_STYLE: any = {
  boxSizing: 'border-box',
  width: '100%',
  marginBottom: '5px',
  ...style.border(1, 'primary', 'dashed', 'all')
}

const PICKER_STYLE: any = {
  height: SYSTEM_PAGE_SIZE(46) + 'px',
  lineHeight: SYSTEM_PAGE_SIZE(46) + 'px',
  marginBottom: '5px'
}

class Issue extends Component<any> {

  public componentDidMount = async () => {
    //强制刷新设置
    fieldsStore.setUpdate(this.forceUpdate.bind(this))
    await this.fetchData()
  }

  public componentWillUnmount = async () => {
    await this.props.initData()
    fieldsStore.resetFields()
  }

  router = getCurrentInstance().router

  private id = this.router?.params.id

  private actorRef = React.createRef<TagList>()

  private directorRef = React.createRef<TagList>()

  private districtRef = React.createRef<TagList>()

  //色调修改时重绘用
  public componentDidShow = () => {
    colorStyleChange()
    this.forceUpdate()
  }

  //获取数据
  public fetchData = async () => {
    if (this.id) {
      Taro.showLoading({ mask: true, title: '数据获取中' })
      const [err, data] = await withTry(getEditMovieInfo)(this.id)
      Taro.hideLoading()
      if (err) {
        Taro.showToast({
          title: '数据获取失败，请退出重试',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      } else {
        await this.props.fetchData()
        const { images, poster, video, info: { another_name, actor, director, district, ...nextInfo }, ...nextData } = data
        const { actor: newActor, director: newDirector, district: newDistrict } = await this.props.initData({ actor, director, district })
        fieldsStore.setFieldsValue({
          ...nextInfo,
          ...nextData,
          another_name: Alias.normalizeData(another_name),
          actor: newActor,
          director: newDirector,
          district: newDistrict,
          video: {
            poster: poster.src,
            src: video.src
          },
          image: images.map(item => ({ url: item.src }))
        })
      }
    } else {
      await this.props.initData()
    }
  }

  //提交
  public handleSubmit = async () => {
    //验证
    fieldsStore.validateFields(['video', 'district', 'name', 'classify', 'director', 'actor', 'screen_time', 'description', 'author_description', 'author_rate', 'image', 'language', 'another_name'], async (errors, values) => {
      //处理所有有错的表单项
      if (errors) {
        Taro.showToast({
          mask: false,
          title: '信息好像没填对',
          icon: 'none',
          duration: 1500
        })
        return
      }

      const {
        image,
        video: {
          poster,
          src
        },
        actor,
        author_description,
        author_rate,
        another_name,
        director,
        district,
        ...nextValues
      } = values

      Taro.showLoading({ mask: true, title: '提交中...' })

      const res = await Upload([
        {
          type: EMediaType.IMAGE,
          url: poster,
          poster: true
        },
        {
          type: EMediaType.VIDEO,
          url: src
        },
        ...image.map((item: any) => ({ type: EMediaType.IMAGE, url: item.url }))
      ])
        .then(data => {
          if (data.some(item => !item.success)) return Promise.reject(false)
          return data.reduce((acc, cur) => {
            const { url, type, poster: moviePoster } = cur
            if (moviePoster) {
              acc.poster = url
            } else if (type === EMediaType.IMAGE) {
              acc.image.push(url)
            } else if (type === EMediaType.VIDEO) acc.video = url
            return acc
          }, {
            video: '',
            image: [] as string[],
            poster: ''
          })
        })
      if (!res) {
        Taro.hideLoading()
        return
      }

      //生成模板数据
      let data: IFormData = {
        ...(this.id ? { _id: this.id } : {}),
        video: {
          poster: res.poster,
          src: res.video
        },
        info: {
          ...nextValues,
          ...(author_description ? { author_description } : {}),
          ...(author_rate ? { author_rate } : {}),
          ...(another_name.length ? { another_name: another_name.map((item: any) => item.title) } : {}),
          director: director.map((item: any) => item._id),
          actor: actor.map((item: any) => item._id),
          district: district.map((item: any) => item._id)
        },
        images: res.image
      }

      let response: any
      //数据提交
      if (this.id) {
        response = await withTry(editIssue)(data)
      } else {
        response = await withTry(sendIssue)(data)
      }
      Taro.hideLoading()
      if (!!response[0]) {
        Taro.showToast({
          title: '上传出错',
          icon: 'none',
          mask: true
        })
        return
      }

      Taro.showToast({
        title: '上传成功，即将退出',
        icon: 'none',
        mask: true,
        duration: 3000,
      })
      await sleep(3000)
      Taro.reLaunch({
        url: '../../main/index'
      })

    })

  }

  //重置
  public handleReset = async () => {
    Taro.showModal({
      title: '提示',
      content: '是否确定重置数据'
    }).then((res) => {
      const { confirm } = res
      if (confirm) {
        fieldsStore.initializeFields()
      }
    })
  }

  //取消
  public handleCancel = async () => {
    Taro.showModal({
      title: '提示',
      content: '是否取消'
    }).then((res) => {
      const { confirm } = res
      if (confirm) {
        Taro.reLaunch({
          url: '../../main/index'
        })
      }
    })
  }

  //indexes展示
  public handleIndexesShow = (config: {
    type: EIndexesType
  }) => {
    const { type } = config
    const prevValue = fieldsStore?.getFieldValue(type) || []
    router.push(routeAlias.indexes, { type, value: JSON.stringify(prevValue || []) })
  }

  //indexes选择
  public handleSelectIndexes = (item: Item, type: EIndexesType) => {
    let ref
    //触发onChange
    switch (type) {
      case EIndexesType.director: ref = this.directorRef; break;
      case EIndexesType.actor: ref = this.actorRef; break;
      case EIndexesType.district: ref = this.districtRef; break;
    }
    ref.current!.handleAppend(item)
  }

  public render() {

    return (
      <View className='data-issue' style={{ ...style.backgroundColor('bgColor') }}>
        <BaseForm
          name='issue'
        >
          <View className='video'>
            <AtTag
              customStyle={{ ...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly') }}
              type='primary'
            >
              介绍短片及海报
            </AtTag>
            <GVideo
              handleOnChange={fieldsStore.getFieldProps('video', 'onChange', {
                rules: [
                  {
                    required: true
                  },
                ],
                initialValue: { poster: '', src: '' }
              })}
              info={fieldsStore.getFieldValue('video')}
              error={!!size(fieldsStore.getFieldsError('video'))}
            ></GVideo>
          </View>
          <View className='name'>
            <AtTag
              customStyle={{ ...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly') }}
              type='primary'
            >
              电影名
            </AtTag>
            <GDescription
              style={{ marginBottom: '10px', marginLeft: 0, ...style.backgroundColor('disabled') }}
              handleChange={fieldsStore.getFieldProps('name', 'onChange', {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: ''
              })}
              value={fieldsStore.getFieldValue('name')}
              error={!!size(fieldsStore.getFieldsError('name'))}
            ></GDescription>
          </View>
          {/* @ts-ignore */}
          <Indexes
            title='地区'
            wraperRef={this.districtRef}
            onClick={this.handleIndexesShow.bind(this, { type: 'district' })}
            value={fieldsStore.getFieldValue('district')}
            onChange={fieldsStore.getFieldProps('district', 'onChange', {
              rules: [
                {
                  required: true
                }
              ],
              initialValue: [],
              getOnChangeValue(value) {
                return value
              }
            })}
            type={EIndexesType.district}
            isError={!!size(fieldsStore.getFieldsError('district'))}
          />
          {/* @ts-ignore */}
          <Indexes
            title='导演'
            wraperRef={this.directorRef}
            value={fieldsStore.getFieldValue('director')}
            onClick={this.handleIndexesShow.bind(this, { type: 'director' })}
            type={EIndexesType.director}
            onChange={fieldsStore.getFieldProps('director', 'onChange', {
              rules: [
                {
                  required: true
                }
              ],
              initialValue: [],
              getOnChangeValue(value) {
                return value
              }
            })}
            isError={!!size(fieldsStore.getFieldsError('director'))}
          />
          {/* @ts-ignore */}
          <Indexes
            title='演员'
            wraperRef={this.actorRef}
            value={fieldsStore.getFieldValue('actor')}
            onClick={this.handleIndexesShow.bind(this, { type: 'actor' })}
            type={EIndexesType.actor}
            onChange={fieldsStore.getFieldProps('actor', 'onChange', {
              rules: [
                {
                  required: true
                }
              ],
              initialValue: [],
              getOnChangeValue(value) {
                return value
              }
            })}
            isError={!!size(fieldsStore.getFieldsError('actor'))}
          />
          <View className='classify'>
            <AtTag
              customStyle={{ ...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly') }}
              type='primary'
            >
              类型
            </AtTag>
            <GCheckBox
              type={EDataType.CLASSIFY}
              handleChange={
                fieldsStore.getFieldProps('classify', 'onChange', {
                  rules: [
                    {
                      required: true
                    }
                  ],
                  initialValue: []
                })
              }
              value={
                fieldsStore.getFieldValue('classify')
              }
              error={!!size(fieldsStore.getFieldsError('classify'))}
            ></GCheckBox>
          </View>
          <View className='screen_time'>
            <AtTag
              customStyle={{ ...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly') }}
              type='primary'
            >
              上映时间
            </AtTag>
            <GCommentPicker
              style={PICKER_STYLE}
              date={{
                fields: "day"
              }}
              handleChange={
                fieldsStore.getFieldProps('screen_time', 'onChange', {
                  rules: [
                    {
                      required: true
                    }
                  ],
                  initialValue: ''
                })
              }
              value={fieldsStore.getFieldValue('screen_time')}
              error={!!size(fieldsStore.getFieldsError('screen_time'))}
            ></GCommentPicker>
          </View>
          <View className='language'>
            <AtTag
              customStyle={{ ...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly') }}
              type='primary'
            >
              语言
            </AtTag>
            <GCheckBox
              type={EDataType.LANGUAGE}
              handleChange={
                fieldsStore.getFieldProps('language', 'onChange', {
                  rules: [
                    {
                      required: true
                    }
                  ],
                  initialValue: []
                })
              }
              value={
                fieldsStore.getFieldValue('language')
              }
              error={!!size(fieldsStore.getFieldsError('language'))}
            ></GCheckBox>
          </View>
          <View className='description'>
            <AtTag
              customStyle={{ ...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly') }}
              type='primary'
            >电影描述</AtTag>
            <GDescription
              type={EInputType.TEXTAREA}
              style={{ ...style.backgroundColor('disabled'), marginBottom: '10px' }}
              handleChange={
                fieldsStore.getFieldProps('description', 'onChange', {
                  rules: [
                    {
                      required: true
                    }
                  ],
                  initialValue: ''
                })
              }
              value={fieldsStore.getFieldValue('description')}
              error={!!size(fieldsStore.getFieldsError('description'))}
            ></GDescription>
          </View>
          <View className='author_description'>
            <AtTag
              customStyle={{ ...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly') }}
              type='primary'
            >
              你的看法（可不填）
            </AtTag>
            <GDescription
              type={EInputType.TEXTAREA}
              style={{ ...style.backgroundColor('disabled'), marginBottom: '10px' }}
              handleChange={
                fieldsStore.getFieldProps('author_description', 'onChange', {
                  rules: [
                    {
                      required: false
                    }
                  ],
                  initialValue: ''
                })
              }
              value={fieldsStore.getFieldValue('author_description')}
              error={!!size(fieldsStore.getFieldsError('author_description'))}
            ></GDescription>
          </View>
          <View className='author_rate'>
            <AtTag
              customStyle={{ ...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly') }}
              type='primary'
            >
              你的评分（可不填)
            </AtTag>
            <Rate
              style={{ marginBottom: '10px' }}
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
          <View className='another_name'>
            <AtTag
              customStyle={{ ...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly') }}
              type='primary'
            >
              电影别名 (可不填)
            </AtTag>
            <Alias
              style={{ marginBottom: '10px' }}
              handleChange={
                fieldsStore.getFieldProps('another_name', 'onChange', {
                  rules: [
                    {
                      required: false
                    }
                  ],
                  initialValue: []
                })
              }
              value={fieldsStore.getFieldValue('another_name')}
            ></Alias>
          </View>
          <View className='image'>
            <AtTag
              customStyle={{ ...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly') }}
              type='primary'
            >
              电影截图选择
            </AtTag>
            <GImagePicker
              handleChange={fieldsStore.getFieldProps('image', 'onChange', {
                rules: [
                  {
                    required: true
                  },
                ],
                initialValue: []
              })}
              value={fieldsStore.getFieldValue('image')}
              error={!!size(fieldsStore.getFieldsError('image'))}
            ></GImagePicker>
          </View>
          <AtButton type='primary' onClick={this.handleSubmit} customStyle={{ ...BUTTON_STYLE, ...style.backgroundColor('primary'), ...style.border(1, 'thirdly', 'solid', 'all') }}>提交</AtButton>
          <AtButton type='primary' onClick={this.handleReset} customStyle={{ ...BUTTON_STYLE, bottom: SYSTEM_PAGE_SIZE(40) + 'px', ...style.backgroundColor('secondary'), ...style.border(1, 'primary', 'solid', 'all') }}>重置</AtButton>
          <AtButton type='primary' onClick={this.handleCancel} customStyle={{ ...BUTTON_STYLE, bottom: SYSTEM_PAGE_SIZE(80) + 'px', ...style.backgroundColor('thirdly'), ...style.border(1, 'primary', 'solid', 'all') }}>取消</AtButton>
        </BaseForm>
      </View>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Issue)