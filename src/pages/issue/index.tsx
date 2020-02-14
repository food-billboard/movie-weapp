import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtButton, AtTag } from 'taro-ui'
import GCheckBox from '~components/checkbox'
import GVideo from './components/video'
import GPicker from '~components/picker'
import GDescription from './components/description'
import GImagePicker from '~components/imgPicker'
import { IFormData } from './interface'
import { connect } from '@tarojs/redux'
import { mapStateToProps, mapDispatchToProps } from './connect'

import './index.scss'
import { Toast } from '~components/toast'

const FORM_DATA: IFormData = {
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
  height: '40px',
  zIndex: 9
}

const TAT_STYLE = {
  boxSizing: 'border-box', 
  border: '1px dashed black', 
  width:'100%', 
  marginBottom: '5px', 
  backgroundColor: 'white'
}

const PICKER_STYLE = {
  height: '46px',
  lineHeight: '46px',
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
    lang: []
  }

  public componentDidMount = async () => {
    this.fetchData()
  }

  //视频及海报
  public videoRef = Taro.createRef<GVideo>()

  //电影名称
  public nameRef = Taro.createRef<GDescription>()

  //电影描述
  public descriptionRef = Taro.createRef<GDescription>()

  //图片选择
  public imagePickerRef = Taro.createRef<GImagePicker>()

  //地区选择
  public areaRef = Taro.createRef<GCheckBox>()

  //语言选择
  public langRef = Taro.createRef<GPicker>()

  //上映时间选择
  public timeRef = Taro.createRef<GPicker>()

  //演员选择
  public actorRef = Taro.createRef<GCheckBox>()

  //导演选择
  public directorRef = Taro.createRef<GCheckBox>()

  //类型选择
  public typeRef = Taro.createRef<GCheckBox>()

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
  public editData = (form: IFormData) => {
    this.props.editIssue(form)
  }

  //提交
  public handleSubmit = async (e) => {
    const video = await this.videoRef.current!.getData()
    const name = await this.nameRef.current!.getData()
    const area = await this.areaRef.current!.getData()
    const director = await this.directorRef.current!.getData()
    const actor = await this.actorRef.current!.getData()
    const type = await this.typeRef.current!.getData()
    const time = await this.timeRef.current!.getData()
    const lang = await this.langRef.current!.getData()
    const description = await this.descriptionRef.current!.getData()
    const images = await this.imagePickerRef.current!.getData()
    if(!video || 
      !name || 
      !area ||
      !director || 
      !actor || 
      !type ||
      !time || 
      !lang ||
      !description) {
        Toast({
          title: '信息好像没填对',
          icon: 'fail'
        })
        return
    }
    if(!images) {
      Toast({
        title: '截图数不对',
        icon: 'fail'
      })
      return
    }
    const { issueSet } = this.props
    const { isIssue, id: movieId } = issueSet
    const { lang: language } = this.state

    const _lang = language.filter((val: any) => {
      const { id, vlaue } = val
      return id === lang
    })

    let _time = Array.isArray(time) ? time.join('') : time

    let data: IFormData = {  
      id: isIssue ? movieId : false,
      video,
      info: {
        name,
        area,
        director,
        actor,
        type,
        time: _time,
        description,
        language: _lang.length ? _lang[0]['id'] : lang
      },
      image: images.map((val: any) => {
        return {
          image: val
        }
      })
    }
    if(isIssue) {
      await this.props.setIssue({
        isIssue: false,
        movieId: ''
      })
      this.editData(data)
    }else {
      await this.props.sendIssue(data)
    }
  }

  //重置
  public handleReset = async (e) => {
    Taro.showModal({
      title: '提示',
      content: '是否确定重置数据'
    }).then((res) => {
      const { confirm } = res
      if(confirm) {
        this.videoRef.current!.reset()
        this.nameRef.current!.reset()
        this.descriptionRef.current!.reset()
        this.imagePickerRef.current!.reset()
        this.areaRef.current!.reset()
        this.langRef.current!.reset()
        this.timeRef.current!.reset()
        this.actorRef.current!.reset() 
        this.directorRef.current!.reset()
        this.typeRef.current!.reset()
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
      <View className='issue'>
        <View className='video'>
        <AtTag 
            customStyle={TAT_STYLE} 
            type={'primary'}
          >
            介绍短片及海报
          </AtTag>
          <GVideo
            ref={this.videoRef}
            info={video}
          ></GVideo>
        </View>
        <View className='name'>
          <AtTag 
            customStyle={TAT_STYLE} 
            type={'primary'}
          >
            电影名
          </AtTag>
          <GDescription
            ref={this.nameRef}
            value={name}
            style={{marginBottom: '20px', backgroundColor: 'rgba(0, 0, 0, 0.1)', marginLeft: 0}}
          ></GDescription>
        </View>
        <View className='area'>
          <AtTag 
            customStyle={TAT_STYLE} 
            type={'primary'}
          >
            地区
          </AtTag>
          <GCheckBox
            ref={this.areaRef}
            style={{marginBottom: '20px'}}
            checkedList={area.map((val: any) => {
              const { id } = val
              return id
            })}
            type={'area'}
          ></GCheckBox>
        </View>
        <View className='director'>
          <AtTag 
            customStyle={TAT_STYLE} 
            type={'primary'}
          >
            导演
          </AtTag>
          <GCheckBox
            ref={this.directorRef}
            style={{marginBottom: '20px'}}
            checkedList={director.map((val: any) => {
              const { id } = val
              return id
            })}
            type={'director'}
          ></GCheckBox>
        </View>
        <View className='actor'>
          <AtTag 
            customStyle={TAT_STYLE} 
            type={'primary'}
          >
            演员
          </AtTag>
          <GCheckBox
            ref={this.actorRef}
            style={{marginBottom: '20px'}}
            checkedList={actor.map((val: any) => {
              const { id } = val
              return id
            })}
            type={'actor'}
          ></GCheckBox>
        </View>
        <View className='type'>
          <AtTag 
            customStyle={TAT_STYLE} 
            type={'primary'}
          >
            类型
          </AtTag>
          <GCheckBox
            ref={this.typeRef}
            style={{marginBottom: '20px'}}
            checkedList={type.map((val: any) => {
              const { id } = val
              return id
            })}
            type={'type'}
          ></GCheckBox>
        </View>
        <View className='publishTime'>
          <AtTag 
            customStyle={TAT_STYLE} 
            type={'primary'}
          >
            上映时间
          </AtTag>
          <GPicker
            style={PICKER_STYLE}
            date={{}}
            value={time}
            ref={this.timeRef}
          ></GPicker>
        </View>
        <View className='language'>
          <AtTag 
            customStyle={TAT_STYLE} 
            type={'primary'}
          >
            语言
          </AtTag>
          <GPicker
            ref={this.langRef}
            style={PICKER_STYLE}
            selector={{range: lang.map((val: any) => {
              const { value } = val
              return value
            })}}
            value={language}
          ></GPicker>
        </View>
        <View className='description'>
          <AtTag
            customStyle={TAT_STYLE} 
            type={'primary'}
          >电影描述</AtTag>
          <GDescription
            ref={this.descriptionRef}
            type={'textarea'}
            value={description}
            style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}
          ></GDescription>
        </View>
        <View className='image'>
          <AtTag
            customStyle={TAT_STYLE} 
            type={'primary'}
          >
            电影截图选择
          </AtTag>
          <GImagePicker 
            ref={this.imagePickerRef}
            files={
              image.map((val: any) => {
                const { img } = val
                return {
                  url: img
                }
              })
            }
          ></GImagePicker>
        </View>
        <AtButton type={'primary'} onClick={this.handleSubmit} customStyle={ BUTTON_STYLE }>提交</AtButton>
        <AtButton type={'primary'} onClick={this.handleReset} customStyle={{ ...BUTTON_STYLE, bottom: '40px', backgroundColor: 'red' }}>重置</AtButton>
      </View>
    )
  }

}