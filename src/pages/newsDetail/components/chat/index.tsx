import Taro, { Component } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import { AtAvatar, AtActivityIndicator } from 'taro-ui'
import GVideo from '~components/video'
import Curtain from '~components/curtain'
import { IProps, IState, IList, IContent, INewData } from './index.d'
import { router, routeAlias } from '~utils'
import style from '~theme/style'
import { formatTime, newsType, isObject } from '~utils'
import { last, noop } from 'lodash'
import { SYSTEM_PAGE_SIZE } from '~config'
import { TypeColor } from '~theme/color'

import './index.scss'

//scroll_id
const SCROLL_ID_MAP = [ 
  'a', 'b', 'c', 'd', 'e', 
  'f', 'g', 'h', 'i', 'j', 
  'k', 'l', 'm', 'n', 'o', 
  'p', 'q', 'r', 's', 't', 
  'u', 'v', 'w', 'x', 'y', 
  'z' , "A", "B", "C", "D", 
  "E", "F", "G", "H", "I", 
  "J", "K", "L", "M", "N", 
  "O", "P", "Q", "R", "S", 
  "T", "U", "V", "W", "X", 
  "Y", "Z"
]

//id_length
const SCROLL_ID_MAP_LENGTH = SCROLL_ID_MAP.length

//时间间隔
const TIME_SPACE = 60000

//默认scroll-item的id
const SCROLL_ID = 'SCROLL'

//生成scrol_id
export const createScrollId = () => {
  return SCROLL_ID + SCROLL_ID_MAP.map((_: string) => {
    return SCROLL_ID_MAP[Math.floor(Math.random() * SCROLL_ID_MAP_LENGTH)]
  }).join('')
}

export default class extends Component<IProps, IState> {

  //滚动至指定位置 ps: 预览视频全屏后退出会默认滚动至顶部
  private _activeScrollItem: string

  public set activeScrollItem(scrollId: string) {
    this._activeScrollItem = scrollId
  }

  public get activeScrollItem() {
    return this._activeScrollItem
  }

  public componentWillReceiveProps = (props) => {
    const { list } = props
    const data = list.filter((val: IList) => {
      const { type } = val
      return type === newsType.image
    }).
    map((val: IList) => {
      const { content } = val
      const { image } = content
      return image
    })
    this.setState({
      imgList: data
    })
  }

  public componentDidMount = () => {
    this.handleReactToLocation()
  }

  public state: IState = {
    imgList: [],
    videoShow: false,
    activeVideo: '',
    activeScrollItem: SCROLL_ID,
    loadLoading: false
  }

  public setLoadLoading = (status: boolean) => {
    this.setState({
      loadLoading: status
    })
  }

  //查看图片
  public handlePreviewImage = (src: string) => {
    const { imgList } = this.state
    Taro.previewImage({
      current: src, 
      urls: [...imgList] 
    })
  }

  //查看视频
  public handlePreviewVideo = (src: string, scrollId: string) => {
    const { onPreview } = this.props
    this.setState({
      activeVideo: src,
      videoShow: true
    })
    this.activeScrollItem = scrollId
    console.log(this.activeScrollItem)
    onPreview(true)
  }

  //关闭视频
  public handleCloseVideo = () => {
    const { onPreview } = this.props
    this.setState({
      activeVideo: '',
      videoShow: false
    })
    // this.handleReactToLocation({isLast: false, scrollId: this.activeScrollItem})
    onPreview(false)
  }

  //查看文本
  public handlePreviewText = (src: string) => {
    Taro.showModal({
      content: src,
    })
  }

  //查看当前用户详情
  public handleGetUser = (id: string) => {
    console.log('查看用户详情')
  }

  //滚动至指定位置
  public handleReactToLocation = (
    item: {
      isLast: boolean
      scrollId?: string
    }={isLast: true},
    list: Array<any>=this.props.list
  ) => {
    this.setState({
      activeScrollItem: SCROLL_ID,
    }, () => {
      //延迟处理
      const timer = setTimeout(() => {
        const { isLast, scrollId=SCROLL_ID } = item
        let scrollItem = scrollId
        // 滚动至最后一项
        if(isLast) {
          const lastData = last(list)
          if(lastData && lastData.scrollId) scrollItem = lastData.scrollId
        }
        const lastData = last(list)
        if(lastData && lastData.scrollId) scrollItem = lastData.scrollId
        this.setState({
          activeScrollItem: scrollItem
        })
      }, 400)
    })
  }

  public render() {

    const { list=[], mine='', height, style: customStyle, onScroll=noop } = this.props

    const { videoShow, activeVideo, activeScrollItem, loadLoading } = this.state

    let _time: any = true

    return (
      <ScrollView 
        onScroll={onScroll}
        className='chat'
        scrollY={true}
        scrollIntoView={activeScrollItem}
        scrollWithAnimation={true}
        style={{...(isObject(customStyle) ? customStyle : {}), ...(height ? {height: height + 'px'} : {})}}
      >

        <View 
          className='loading'
          style={{visibility: loadLoading ? 'visible' : 'hidden'}}
        >
          <AtActivityIndicator 
            mode={'normal'} 
            size={SYSTEM_PAGE_SIZE(32)} 
            color={TypeColor['thirdly']} 
            content={'加载中'}
          ></AtActivityIndicator>
        </View>

        {
          list.map((val: INewData) => {
            const {
              content,
              type,
              time='',
              username='',
              id='',
              image='',
              news='',
              scrollId,
              loading=true
            } = val
            const direction = mine=== id
            const needTime = _time && (~~_time - ~~time > TIME_SPACE)
            _time = time
            return (
              <View className='chat-content'
                key={news}
                id={scrollId}
              >
                {
                  needTime ?
                  <View 
                    className='time'
                    style={{...style.color('secondary')}}
                  >{formatTime(time)}</View>
                  : null
                }
                <View className={`main at-row ${ direction ? 'at-row__justify--end' : '' }`}>
                  {
                    //左边显示头像
                    !direction ?
                    <View 
                      className='avator at-col at-col-2'
                      onClick={() => {this.handleGetUser.call(this, id)}}
                    >
                      <AtAvatar
                        size={'small'}
                        circle
                        image={image}
                        text={'头像'}
                      ></AtAvatar>
                    </View>
                    : null
                  }
                  <View className={`detail ${newsType.text !== type ? 'at-col at-col-8' : 'text'}`}>
                    <View 
                      className='username'
                      style={{...style.color('thirdly'), textAlign: direction ? 'right' : 'left'}}
                    >
                      {username}
                    </View>
                    <View className={`content ${newsType.text === type ? '' : 'half'} ${direction && newsType.text !== type ? 'at-row at-row__justify--end' : ''}`}
                      style={type === newsType.text ? {...style.border(1, 'disabled', 'solid', 'all'), ...style.backgroundColor(direction ? 'secondary' : 'disabled')} : {}}
                    >
                      {
                        direction && loading ?
                        <View className='acitve-indicator'>
                          <AtActivityIndicator 
                            mode={'normal'} 
                            size={SYSTEM_PAGE_SIZE(32)} 
                            color={TypeColor['thirdly']} 
                          />
                        </View>
                        : null
                      }
                      {
                        newsType.text === type ?
                        <View 
                          style={{whiteSpace: 'normal'}} 
                          onClick={() => this.handlePreviewText.call(this, content.text)}
                        >{content.text}</View>
                        : null
                      }
                      {
                        (newsType.image === type) ?
                        <Image 
                          mode={'widthFix'}
                          src={content.image || ''} 
                          style={{maxWidth: '50%', ...style.backgroundColor('disabled')}}
                          className='image-radius'
                          onClick={() => { this.handlePreviewImage.call(this, content.image) }} 
                        />
                        : null
                      }
                      {
                        newsType.video === type ?
                            (
                              content.image ?
                              <Image 
                                  className='temp-image image-radius'
                                  mode={'widthFix'}
                                  src={content.image || ''} 
                                  style={{maxWidth: '50%', ...style.backgroundColor('disabled')}}
                                  onClick={() => { this.handlePreviewVideo.call(this, content.video, scrollId) }} 
                                >
                                  <View 
                                    className='video-icon at-icon at-icon-video'
                                    style={{...style.color('disabled')}}
                                  ></View>
                                </Image>
                              :
                              <View 
                                onClick={() => { this.handlePreviewVideo.call(this, content.video, scrollId) }} 
                                className='temp-video-poster image-radius'
                                style={{...style.backgroundColor('primary')}}
                              >
                                <View 
                                  className='video-icon at-icon at-icon-video'
                                  style={{...style.color('disabled')}}
                                ></View>
                              </View>
                            )
                        : null
                      }
                      {
                        newsType.audio === type ?
                        content.audio
                        : null
                      }
                    </View>
                  </View>

                  {
                    //右边显示头像
                    direction ?
                    <View 
                      className='avator at-col at-col-2'
                      style={{position: 'relative', left: 0, top:0}}
                      onClick={() => {this.handleGetUser.call(this, id)}}
                    >
                      <AtAvatar
                        customStyle={{position: 'absolute', right: 0, top: 0}}
                        size={'small'}
                        circle
                        image={image}
                        text={'头像'}
                      ></AtAvatar>
                    </View> 
                    : null
                  }

                </View>
              </View>
            )
          })
        }

        <Curtain
            isOpen={videoShow}
            handleClose={this.handleCloseVideo}
            title={false}
            main={true}
            curtainStyle={{backgroundColor:'#000', opacity: 1}}
            renderMain={
                <View 
                    className='video'
                >
                    <GVideo
                        style={{position: 'static'}}
                        src={activeVideo}
                        controls={true}
                        loop={true}
                        autoplay={true}
                    ></GVideo>
                </View>
            }
            action={false}
            other={false}
            cancel={false}
        ></Curtain>

      </ScrollView>
    )
  }
}