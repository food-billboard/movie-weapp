import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtTag } from 'taro-ui'
import GCheckBox from '~components/checkbox'
import GVideo from './components/video'
import GPicker from '~components/picker'
import GDescription from '~components/input'
import GImagePicker from '~components/imgPicker'
import { IFormData } from './interface'
import { connect } from '@tarojs/redux'
import { mapStateToProps, mapDispatchToProps } from './connect'
import { TypeColor, colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { SYSTEM_PAGE_SIZE, getCookie } from '~config'
import { Toast } from '~components/toast'
import { size } from '~utils'
import BaseForm from '~utils/wrapForm'
import { createFieldsStore } from '~utils/wrapForm/createFieldsStore'

import './index.scss'

const fieldsStore = createFieldsStore('issue', {
  getOnChangeValue(value) {
    return value
  }
})

const FORM_DATA: IFormData = {
  user: '',
  id: false,
  video: false,
  info: false,
  image: []
}

const BUTTON_STYLE = {
  position: 'fixed',
  bottom:0,
  left:0,
  width: '100%',
  height: SYSTEM_PAGE_SIZE(40) + 'px',
  zIndex: 9
}

const TAT_STYLE = {
  boxSizing: 'border-box', 
  width:'100%', 
  marginBottom: '5px', 
  ...style.border(1, 'primary', 'dashed', 'all')
}

const PICKER_STYLE = {
  height: SYSTEM_PAGE_SIZE(46) + 'px',
  lineHeight: SYSTEM_PAGE_SIZE(46) + 'px',
  marginBottom: '5px'
}

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {
  
  public static config: Config = {
    navigationBarTitleText: '电影发布'
  }

  public state: any = {
    detai: {},
    formData: { ...FORM_DATA },
    lang: [],
    typeColor: TypeColor
  }

  //色调修改时重绘用
  public componentDidShow = () => {
    colorStyleChange(true)
    const { typeColor } = this.state
    if(typeColor == TypeColor) return
    this.setState({typeColor: TypeColor})
  }

  readonly update = () => this.setState({})

  public componentDidMount = async () => {
    this.fetchData()
  }

  //获取数据
  public fetchData = async () => {
    const { issueSet } = this.props
    const { isIssue, id: movieId } = issueSet
    const language = await this.props.getLanguageList()
    const lang = language.data
    await this.setState({
      lang
    })
    if(!isIssue) return
    const detail = await this.props.getDetail(movieId) 
    await this.setState({
      detail
    })
    this.handleData(detail)
  }

  //处理表单数据
  public handleData = (info: any) => {
    const { formData } = this.state
    const {
      video,
      info: inmformation,
      image
    } = info
    const {
      name,
      area, 
      director,
      actor,
      type,
      time,
      language,
      description,
    } = inmformation
    this.setState({
      formData: { 
        ...formData,
        video,
        info: {
          name,
          area, 
          director,
          actor,
          type,
          time,
          description,
          language
        },
        image
      }
    })
  }

  //修改数据
  public editData = async (form: IFormData) => {
    await this.props.editIssue(form)
  }

  //提交
  public handleSubmit = async (e) => {

    //登录状态验证
    const userInfo = getCookie('user') || {}
    if(!size(userInfo)) {
      this.props.getUserInfo()
      return
    }
    const { id } = userInfo

    //验证
    fieldsStore.validateFields(['name', 'description', 'area', 'director', 'actor', 'type', 'publishTime', 'language', 'image', 'video'], async (errors, values) => {
      //处理所有有错的表单项
      if(errors) {
        Toast({
          title: '信息好像没填对',
          icon: 'fail'
        })
        // this.setState({})
        return
      }

      const { 
        image,
        video,
        time,
        lang,
        ...nextProps
      } = values
      const { issueSet } = this.props
      const { isIssue, id: movieId } = issueSet
      const { lang: language } = this.state
      const _lang = language.filter((val: any) => {
        const { id } = val
        return id === lang
      })

      //生成模板数据
      let data: IFormData = {  
        user: id,
        id: isIssue ? movieId : false,
        video,
        info: {
          ...nextProps,
          time: Array.isArray(time) ? time.join('') : time,
          language: _lang.length ? _lang[0]['id'] : lang
        },
        image: image.map((val: any) => {
          return {
            image: val
          }
        })
      }

       //数据提交
      if(isIssue) {
        await this.props.setIssue({
          isIssue: false,
          movieId: ''
        })
        await this.editData(data)
      }else {
        await this.props.sendIssue(data)
      }

      Taro.showModal({
        title: '提示',
        content: '已经发送，不过需要审核'
      }).then((res) => {
        Taro.reLaunch({
          url: '../main/index'
        })
      })

    })

  }

  //重置
  public handleReset = async (e) => {
    Taro.showModal({
      title: '提示',
      content: '是否确定重置数据'
    }).then((res) => {
      const { confirm } = res
      if(confirm) {
        fieldsStore.initializeFields()
        this.setState({})
      }
    })
  }

  public render() {
    const { formData, lang } = this.state
    const {
      video,
      info,
      image
    } = formData
    const {  
      name,
      area=[],
      director=[],
      actor=[],
      type=[],
      time,
      description,
      language
    } = info
    return (
      <View className='issue' style={{...style.backgroundColor('bgColor')}}>
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
              initialValue: video
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
              initialValue: name
            })}
            value={fieldsStore.getFieldValue('name')}
            error={!!size(fieldsStore.getFieldsError('name'))}
          ></GDescription>
        </View>
        <View className='area'>
          <AtTag 
            customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
            type={'primary'}
          >
            地区
          </AtTag>
          <GCheckBox
            style={{marginBottom: '20px'}}
            type={'area'}
            handleChange={
              fieldsStore.getFieldProps('area', 'onChange', {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue:area.map((val: any) => {
                  const { id } = val
                  return id
                }),
                getOnChangeValue(value) {
                  return value
                }
              })
            }
            checkedList={
              fieldsStore.getFieldValue('area')
            }
            error={!!size(fieldsStore.getFieldsError('area'))}
          ></GCheckBox>
        </View>
        <View className='director'>
          <AtTag 
            customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
            type={'primary'}
          >
            导演
          </AtTag>
          <GCheckBox
            style={{marginBottom: '20px'}}
            type={'director'}
            handleChange={
              fieldsStore.getFieldProps('director', 'onChange', {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue:director.map((val: any) => {
                  const { id } = val
                  return id
                }),
                getOnChangeValue(value) {
                  return value
                }
              })
            }
            checkedList={
              fieldsStore.getFieldValue('director')
            }
            error={!!size(fieldsStore.getFieldsError('director'))}
          ></GCheckBox>
        </View>
        <View className='actor'>
          <AtTag 
            customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
            type={'primary'}
          >
            演员
          </AtTag>
          <GCheckBox
            style={{marginBottom: '20px'}}
            type={'actor'}
            handleChange={
              fieldsStore.getFieldProps('actor', 'onChange', {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue:actor.map((val: any) => {
                  const { id } = val
                  return id
                }),
                getOnChangeValue(value) {
                  return value
                }
              })
            }
            checkedList={
              fieldsStore.getFieldValue('actor')
            }
            error={!!size(fieldsStore.getFieldsError('actor'))}
          ></GCheckBox>
        </View>
        <View className='type'>
          <AtTag 
            customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
            type={'primary'}
          >
            类型
          </AtTag>
          <GCheckBox
            style={{marginBottom: '20px'}}
            type={'type'}
            handleChange={
              fieldsStore.getFieldProps('type', 'onChange', {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue:type.map((val: any) => {
                  const { id } = val
                  return id
                })
              })
            }
            checkedList={
              fieldsStore.getFieldValue('type')
            }
            error={!!size(fieldsStore.getFieldsError('type'))}
          ></GCheckBox>
        </View>
        <View className='publishTime'>
          <AtTag 
            customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
            type={'primary'}
          >
            上映时间
          </AtTag>
          <GPicker
            style={PICKER_STYLE}
            date={{}}
            handleChange={
              fieldsStore.getFieldProps('publishTime', 'onChange', {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: time
              })
            }
            value={fieldsStore.getFieldValue('publishTime')}
            error={!!size(fieldsStore.getFieldsError('publishTime'))}
          ></GPicker>
        </View>
        <View className='language'>
          <AtTag 
            customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
            type={'primary'}
          >
            语言
          </AtTag>
          <GPicker
            style={PICKER_STYLE}
            extraFactor={true}
            selector={{range: lang.map((val: any) => {
              const { value } = val
              return value
            })}}
            handleChange={
              fieldsStore.getFieldProps('language', 'onChange', {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: language
              })
            }
            value={fieldsStore.getFieldValue('language')}
            error={!!size(fieldsStore.getFieldsError('language'))}
          ></GPicker>
        </View>
        <View className='description'>
          <AtTag
            customStyle={{...TAT_STYLE, ...style.border(1, 'primary', 'dashed', 'all'), ...style.color('thirdly')}} 
            type={'primary'}
          >电影描述</AtTag>
          <GDescription
            type={'textarea'}
            style={style.backgroundColor('disabled')}
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
              initialValue: image.map((val: any) => {
                const { img } = val
                return {
                  url: img
                }
              })
            })}
            files={fieldsStore.getFieldValue('image')}
            error={!!size(fieldsStore.getFieldsError('image'))}
          ></GImagePicker>
        </View>
        <AtButton type={'primary'} onClick={this.handleSubmit} customStyle={{ ...BUTTON_STYLE, ...style.backgroundColor('thirdly'), ...style.border(1, 'thirdly', 'solid', 'all') }}>提交</AtButton>
        <AtButton type={'primary'} onClick={this.handleReset} customStyle={{ ...BUTTON_STYLE, bottom: SYSTEM_PAGE_SIZE(40) + 'px', ...style.backgroundColor('primary'), ...style.border(1, 'primary', 'solid', 'all') }}>重置</AtButton>
        </BaseForm>
      </View>
    )
  }

}