import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtButton, AtTag } from 'taro-ui'
import GCommentPicker from '~components/picker'
import GCheckBox, { EDataType } from './components/checkbox'
import GVideo from './components/video'
import GDescription, { EInputType } from '~components/input'
import GImagePicker from '~components/imgPicker'
import BaseForm from '~components/wrapForm'
import Alias from '~components/restFactor'
import { createFieldsStore } from '~components/wrapForm/fieldsStore'
import Indexes from './components/indexes'
import Rate from '~components/rate'
import TagList from '~components/tagList'
import { IFormData, EIndexesType } from './interface'
import { Item } from '~components/indexes'
import { TypeColor, colorStyleChange } from '~theme/color'
import { size, withTry, upload } from '~utils'
import { SYSTEM_PAGE_SIZE } from '~config'
import style from '~theme/style'
import { getEditMovieInfo, editIssue, sendIssue } from '~services'

import './index.scss'

const fieldsStore = createFieldsStore('issue', {
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

const TAT_STYLE: any = {
  boxSizing: 'border-box', 
  width:'100%', 
  marginBottom: '5px', 
  ...style.border(1, 'primary', 'dashed', 'all')
}

const PICKER_STYLE: any = {
  height: SYSTEM_PAGE_SIZE(46) + 'px',
  lineHeight: SYSTEM_PAGE_SIZE(46) + 'px',
  marginBottom: '5px'
}

export default class extends Component<any> {

  public state: any = {
    detail: {},
    formData: {},
    lang: [],
    indexesVisible: false,
  }

  router = getCurrentInstance().router

  private id = this.router?.params.id

  private actorRef = React.createRef<TagList>()

  private directorRef = React.createRef<TagList>()

  private districtRef = React.createRef<TagList>()

  private indexesRef = React.createRef<Indexes>()

  //色调修改时重绘用
  public componentDidShow = () => colorStyleChange()

  public componentDidMount = async () => {
    //强制刷新设置
    fieldsStore.setUpdate(this.forceUpdate.bind(this))
    this.fetchData()
  }

  //获取数据
  public fetchData = async () => {
    if(this.id) {
       const data = await getEditMovieInfo(this.id)
       this.setState({
         detail: data
       })
    }
  }

  //提交
  public handleSubmit = async (_) => {
    //验证
    fieldsStore.validateFields(['video', 'district', 'name', 'classify', 'director', 'actor', 'screen_time', 'description', 'author_description', 'author_rate', 'image', 'language', 'alias'], async (errors, values) => {
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
        image,
        video: {
          poster,
          src
        },
        actor,
        author_description,
        author_rate,
        alias,
        director,
        district,
        ...nextValues
      } = values

      const [, newPoster] = await Taro.getFileInfo({
        filePath: poster
      })
      .then((data: any) => {
        const { type } = data
        return upload({
            file: poster,
            mime: type
        })
      })
      const [, newSrc] = await Taro.getFileInfo({
        filePath: src
      })
      .then((data: any) => {
        const { type } = data
        return upload({
            file: src,
            mime: type
        })
      })
      withTry(upload)(src)
      const newImage:Array<any> = await Promise.all(image.map(item => {
        return Taro.getFileInfo({
            filePath: item
        })
        .then((data:any) => {
            const { type } = data
            return upload({
                file: item,
                mime: type
            })
        })
    }))

      //生成模板数据
      let data: IFormData = {  
        ...(this.id ? { _id: this.id } : {}),
        video: {
          poster: newPoster,
          src: newSrc
        },
        info: {
          ...nextValues,
          ...(author_description ? { author_description } : {}),
          ...(author_rate ? { author_rate } : {}),
          ...(alias.length ? { alias: alias.map(item => item.title) } : {}),
          director: director.map(item => item.key),
          actor: actor.map(item => item.key),
          district: district.map(item => item.key)
        },
        images: newImage
      }

      Taro.showLoading({mask: true, title: '提交中...'})
       //数据提交
      if(this.id) {
        await withTry(editIssue)(data)
      }else {
        await withTry(sendIssue)(data)
      }
      Taro.hideLoading()

      Taro.showModal({
        title: '提示',
        content: '已经发送，是否继续发布'
      }).then((res) => {
        const { confirm } = res
        if(!confirm) {
          Taro.reLaunch({
            url: '../main/index'
          })
        }
      })

    })

  }

  //重置
  public handleReset = async (_) => {
    Taro.showModal({
      title: '提示',
      content: '是否确定重置数据'
    }).then((res) => {
      const { confirm } = res
      if(confirm) {
        fieldsStore.initializeFields()
      }
    })
  }

  //indexes展示
  public handleIndexesShow = (config: {
    visible: boolean,
    type: EIndexesType
  }) => {
    const { visible, type } = config
    this.setState({
      indexesVisible: visible
    }, () => {
      setTimeout(() => {
        this.indexesRef.current!.indexesVisible(type)
      }, 0)
    })
  }

  //indexes选择
  public handleSelectIndexes = (item: Item, type: EIndexesType) => {
    const { key, name } = item
    //隐藏索引
    this.setState({
      indexesVisible: false
    }, () => {
      setTimeout(() => {
        let ref
        //触发onChange
        switch(type) {
          case 'DIRECTOR': ref = this.directorRef; break;
          case 'ACTOR': ref = this.actorRef;break;
          case 'DISTRICT': ref = this.districtRef; break;
        }
        ref.current!.handleAppend({ name, key })
      }, 0)
    })
  }

  public render() {
    const { detail, indexesVisible } = this.state
    const { 
      author_description='',
      author_rate,
      images=[],
      info: {
        actor=[],
        another_name='',
        classify=[],
        description='',
        director=[],
        district=[],
        language=[],
        name='',
        screen_time=Date.now(),
      }={},
      video,
      poster,
    } = detail
    return (
      <View className='issue' style={{...style.backgroundColor('bgColor')}}>
        {
          indexesVisible ?
          <View style={{height: '100vh'}}>
            <Indexes
              handleClick={this.handleSelectIndexes}
              ref={this.indexesRef}
            ></Indexes>
          </View>
          :
          <BaseForm
            name="issue"
          >
            <View className='video'>
              <AtTag 
                customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
                type={'primary'}
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
                  initialValue: video ? { src: video, poster } : { poster: '', src: '' }
                })}
                info={fieldsStore.getFieldValue('video')}
                error={!!size(fieldsStore.getFieldsError('video'))}
              ></GVideo>
            </View>
            <View className='name'>
              <AtTag 
                customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
                type={'primary'}
              >
                电影名
              </AtTag>
              <GDescription
                style={{marginBottom: '20px', marginLeft: 0, ...style.backgroundColor('disabled')}}
                handleChange={fieldsStore.getFieldProps('name', 'onChange', {
                  rules: [
                    {
                      required: true
                    }
                  ],
                  initialValue: name || ''
                })}
                value={fieldsStore.getFieldValue('name')}
                error={!!size(fieldsStore.getFieldsError('name'))}
              ></GDescription>
            </View>
            <View className='district'>
              <AtTag 
                onClick={this.handleIndexesShow.bind(this, { visible: true, type: 'DISTRICT' })}
                customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
                type={'primary'}
              >
                地区
              </AtTag>
              <TagList
                ref={this.districtRef}
                style={{marginBottom: '20px'}}
                list={fieldsStore.getFieldValue('district')}
                handleChange={
                  fieldsStore.getFieldProps('district', 'onChange', {
                    rules: [
                      {
                        required: true
                      }
                    ],
                    initialValue:district.map((val: any) => {
                      const { _id, name } = val
                      return {
                        name,
                        key: _id
                      }
                    }),
                    getOnChangeValue(value) {
                      return value
                    }
                  })
                }
                error={!!size(fieldsStore.getFieldsError('district'))}
              ></TagList>
            </View>
            <View className='director'>
              <AtTag 
                onClick={this.handleIndexesShow.bind(this, { visible: true, type: 'DIRECTOR' })}
                customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
                type={'primary'}
              >
                导演
              </AtTag>
              <TagList
                ref={this.directorRef}
                style={{marginBottom: '20px'}}
                list={fieldsStore.getFieldValue('director')}
                handleChange={
                  fieldsStore.getFieldProps('director', 'onChange', {
                    rules: [
                      {
                        required: true
                      }
                    ],
                    initialValue:director.map((val: any) => {
                      const { _id, name } = val
                      return {
                        name,
                        key: _id
                      }
                    }),
                    getOnChangeValue(value) {
                      return value
                    }
                  })
                }
                error={!!size(fieldsStore.getFieldsError('director'))}
              ></TagList>
            </View>
            <View className='actor'>
              <AtTag 
                onClick={this.handleIndexesShow.bind(this, { visible: true, type: 'ACTOR' })}
                customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
                type={'primary'}
              >
                演员
              </AtTag>
              <TagList
                ref={this.actorRef}
                style={{marginBottom: '20px'}}
                list={fieldsStore.getFieldValue('actor')}
                handleChange={
                  fieldsStore.getFieldProps('actor', 'onChange', {
                    rules: [
                      {
                        required: true
                      }
                    ],
                    initialValue:actor.map((val: any) => {
                      const { _id, name } = val
                      return {
                        name,
                        key: _id
                      }
                    }),
                    getOnChangeValue(value) {
                      return value
                    }
                  })
                }
                error={!!size(fieldsStore.getFieldsError('actor'))}
              ></TagList>
            </View>
            <View className='classify'>
              <AtTag 
                customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
                type={'primary'}
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
                    initialValue:classify.map((val: any) => val._id)
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
                customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
                type={'primary'}
              >
                上映时间
              </AtTag>
              <GCommentPicker
                style={PICKER_STYLE}
                date={{}}
                handleChange={
                  fieldsStore.getFieldProps('screen_time', 'onChange', {
                    rules: [
                      {
                        required: true
                      }
                    ],
                    initialValue: screen_time || ''
                  })
                }
                value={fieldsStore.getFieldValue('screen_time')}
                error={!!size(fieldsStore.getFieldsError('screen_time'))}
              ></GCommentPicker>
            </View>
            <View className='language'>
              <AtTag 
                customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
                type={'primary'}
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
                    initialValue:language.map((val: any) => val._id)
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
                customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
                type={'primary'}
              >电影描述</AtTag>
              <GDescription
                type={EInputType.TEXTAREA}
                style={{...style.backgroundColor('disabled'), marginBottom: '20px'}}
                handleChange={
                  fieldsStore.getFieldProps('description', 'onChange', {
                    rules: [
                      {
                        required: true
                      }
                    ],
                    initialValue: description
                  })
                }
                value={fieldsStore.getFieldValue('description')}
                error={!!size(fieldsStore.getFieldsError('description'))}
              ></GDescription>
            </View>
            <View className="author_description">
              <AtTag
                customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
                type={'primary'}
              >
                你的看法（可不填）
              </AtTag>
              <GDescription
                type={EInputType.TEXTAREA}
                style={{...style.backgroundColor('disabled'), marginBottom: '20px'}}
                handleChange={
                  fieldsStore.getFieldProps('author_description', 'onChange', {
                    rules: [
                      {
                        required: false
                      }
                    ],
                    initialValue: author_description
                  })
                }
                value={fieldsStore.getFieldValue('author_description')}
                error={!!size(fieldsStore.getFieldsError('author_description'))}
              ></GDescription>
            </View>
            <View className="author_rate">
              <AtTag
                customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
                type={'primary'}
              >
                你的评分（可不填)
              </AtTag>
              <Rate
                style={{marginBottom: '20px'}}
                rate={
                  fieldsStore.getFieldProps('author_rate', 'onChange', {
                    rules: [
                      {
                        required: false
                      }
                    ],
                    initialValue: author_rate || 0
                  })
                }
                value={fieldsStore.getFieldValue('author_rate')}
              ></Rate>
            </View>
            <View className="alias">
              <AtTag
                customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
                type={'primary'}
              >
                电影别名 (可不填)
              </AtTag>
              <Alias
                style={{marginBottom: '20px'}}
                handleChange={
                  fieldsStore.getFieldProps('alias', 'onChange', {
                    rules: [
                      {
                        required: false
                      }
                    ],
                    initialValue: another_name || []
                  })
                }
                value={fieldsStore.getFieldValue('alias')}
              ></Alias>
            </View>
            <View className='image'>
              <AtTag
                customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
                type={'primary'}
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
                  initialValue: images.map((val: any) => {
                    const { img } = val
                    return {
                      url: img
                    }
                  })
                })}
                value={fieldsStore.getFieldValue('image')}
                error={!!size(fieldsStore.getFieldsError('image'))}
              ></GImagePicker>
            </View>
            <AtButton type={'primary'} onClick={this.handleSubmit} customStyle={{ ...BUTTON_STYLE, ...style.backgroundColor('thirdly'), ...style.border(1, 'thirdly', 'solid', 'all') }}>提交</AtButton>
            <AtButton type={'primary'} onClick={this.handleReset} customStyle={{ ...BUTTON_STYLE, bottom: SYSTEM_PAGE_SIZE(40) + 'px', ...style.backgroundColor('primary'), ...style.border(1, 'primary', 'solid', 'all') }}>重置</AtButton>
          </BaseForm>
        }
      </View>
    )
  }

}