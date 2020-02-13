import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtButton, AtTag } from 'taro-ui'
import GCheckBox from '~components/checkbox'
import GVideo from './components/video'
// import GPicker from '~components/picker'
import GDescription from './components/description'
import GImagePicker from '~components/imgPicker'
import { IFormData } from './interface'
import { country } from './config'
import { connect } from '@tarojs/redux'
import { mapStateToProps, mapDispatchToProps } from './connect'
import './index.scss'

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

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {
  
  public static config: Config = {
    navigationBarTitleText: '电影发布'
  }

  public state: any = {
    detai: {},
    formData: { ...FORM_DATA }
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

  //获取数据
  public fetchData = async () => {
    const { issueSet } = this.props
    const { isIssue, id: movieId } = issueSet
    if(isIssue) return
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
    
  }

  //重置
  public handleReset = async (e) => {
    console.log('重置')
  }

  //处理输入框内容改变
  public handleInputChange = (value) => {

  }

  public render() {
    const { formData } = this.state
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
            style={{marginBottom: '20px'}}
            checkedList={area.map((val: any) => {
              const { id } = val
              return id
            })}
            checkboxOption={country}
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
            style={{marginBottom: '20px'}}
            checkedList={director.map((val: any) => {
              const { id } = val
              return id
            })}
            checkboxOption={country}
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
            style={{marginBottom: '20px'}}
            checkedList={actor.map((val: any) => {
              const { id } = val
              return id
            })}
            checkboxOption={country}
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
            style={{marginBottom: '20px'}}
            checkedList={type.map((val: any) => {
              const { id } = val
              return id
            })}
            checkboxOption={country}
          ></GCheckBox>
        </View>
        <View className='time'>
          {/* <GPicker title='' config={{mode: 'selector', range: [], value: '', onChange: () => {}}}></GPicker> */}
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