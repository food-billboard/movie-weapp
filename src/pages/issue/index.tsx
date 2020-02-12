import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker, Textarea } from '@tarojs/components'
import { AtInput, AtButton, AtTextarea, AtImagePicker } from 'taro-ui'
import GCheckBox from '~components/checkbox'
import GVideo from '../detail/components/video'
import { IFormData } from './interface'
import { country } from './config'

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

export default class extends Component<any> {
  
  public static config: Config = {
    navigationBarTitleText: '电影发布'
  }

  public state: any = {
    detai: {},
    formData: { ...FORM_DATA }
  }

  //获取数据
  public fetchData = async () => {
    const { issueSet } = this.props
    const { isIssue, id: movieId } = issueSet
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
    console.log('提交')
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
          {
              video ? <GVideo
                src={video.src}
                poster={video.poster}
                id={video.id}
            /> : null
          }
          <View>
            选择图片 选择视频
          </View>
        </View>
        <AtInput 
          name='name' 
          onChange={this.handleInputChange} 
          value={name}
        ></AtInput>
        <View className='area'>
          <GCheckBox
            checkedList={area.map((val: any) => {
              const { id } = val
              return id
            })}
            checkboxOption={country}
          ></GCheckBox>
        </View>
        <View className='director'>
          导演
        </View>
        <View className='type'>
          类型
        </View>
        <View className='time'>
          时间
        </View>
        <View>
          描述
        </View>
        <View className='image'>
          图片
        </View>
        <AtButton type={'primary'} onClick={this.handleSubmit} customStyle={ BUTTON_STYLE }>提交</AtButton>
        <AtButton type={'primary'} onClick={this.handleReset} customStyle={{ ...BUTTON_STYLE, bottom: '40px', backgroundColor: 'red' }}>重置</AtButton>
      </View>
    )
  }

}