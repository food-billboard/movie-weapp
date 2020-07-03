import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import GVideo from '../video'
import Curtain from '../curtain'
import ImageLoading from '../imageLoading'
import { Info } from '../model/index.d'
import { router, formatTime, formatNumber, mediaType, routeAlias } from '~utils'
import style from '~theme/style'
import { TypeColor } from '~theme/color'
import { IState, IProps } from './index.d'
import { SYSTEM_PAGE_SIZE } from '~config'

import './index.scss'

//媒体的图标类型
const ICON_TYPE = {
    video: 'at-icon-video',
    image: 'at-icon-image',
    action: 'at-icon-soung'
}

class List extends Component<IProps, IState>{
    public static defaultProps: IProps = {
        list: {
            comment_users: [],
            content: {},
            createdAt: 0,
            updatedAt: 0,
            total_like: 0,
            like: false,
            user_info: {
                avatar: null,
                username: '',
                _id: ''
            },
            _id: ''
        },
        like: () => {},
        comment: () => {},
        getUserInfo: () => {}
    }

    //视频modal配置
    readonly videoConfig:Info = {
        isOpen: false,
        title: '',
        cancelText:'',
        confirmText: '',
        onCancel: () => {
            this.setState({
                videoShow: false,
                activeVideo: ''
            })
        },
        onConfirm: () => {},
        onClose: () => {},
        content: ''
    }

    public state: IState = {
        list: this.props.list,
        videoShow: false,
        activeVideo: '',
        activeVideoPoster: ''
    }

    /**
     * 查看详细评论
     */
    public getDetail = () => {
        const { list: { _id } } = this.props
        router.push(routeAlias.commentdetail, { id: _id })
    }

    /**
     * 获取用户信息
     */
    public getUser = (id: string) => {
        router.push(routeAlias.user, { id })
    }

    /**
     * 预览媒体
     */
    public handlePreviewMedia = (src: string, type: keyof typeof mediaType, image: string='') => {
        const { list: { content: { image:originImage=[] } } } = this.props
        if(type === mediaType.IMAGE) {
            this.handlePreviewImage(src, originImage)
        }else if(mediaType[type] === mediaType.VIDEO) {
            this.handlePreviewVideo(src, image)
        }else {
            //ToDo
        }
    }

    /**
     * 查看图片
     */
    public handlePreviewImage = (target: string, list: Array<string>) => {
        Taro.previewImage({
            urls: list,
            current: target
        })
    }

    /**
     * 查看视频
     */
    public handlePreviewVideo = (target: string, poster: string) => {
        this.setState({
            activeVideo: target,
            videoShow: true,
            activeVideoPoster: poster
        })
    }

    //监听视频关闭
    public handleVideoClose = () => {
        this.setState({
            videoShow: false,
            activeVideo: null,
            activeVideoPoster: null
        })
    }

    //获取视频地址
    public getVideoSrc = () => this.state.activeVideo

    //获取视频显示隐藏
    public getVideoShowStatus = () => this.state.videoShow

    public render() {
        const { list, activeVideoPoster } = this.state
        const {
            comment_users,
            content: {
                text='',
                image=[],
                video=[]
            },
            createdAt,
            total_like,
            like,
            user_info: {
                avatar,
                username,
                _id:userId
            },
            _id
        } = list
        const { extra=false } = this.props
        return (
            <View 
                className={'list'}
                style={{...style.backgroundColor('disabled')}}
            >
                <View className='head'>
                    <View className='head-img'
                        onClick={this.getUser.bind(this, userId)}
                    >
                        <ImageLoading src={avatar || ''} loadingProps={{content: ''}} />
                    </View>
                    <View 
                        className={'name'}
                        style={{...style.color('thirdly')}}
                    >
                        <Text 
                            className={'name-user'}
                            onClick={this.props.comment.bind(this, true, userId, _id)}
                            style={{...style.color('primary')}}
                        >{username.length <= 6 ? username : (username.slice(0, 6) + '...')}</Text>
                        <Text style={{display: 'inline-block'}}>说: </Text>
                    </View>
                    <View 
                        className={'up'}
                        onClick={this.props.like.bind(this, userId, like)}
                        style={{...style.color('thirdly')}}
                    >
                        <View className={'up-text'}>
                            {formatNumber(total_like)}
                            <AtIcon value={like ? 'heart-2' : 'heart'} size={SYSTEM_PAGE_SIZE(14)} />
                        </View>
                    </View>
                    <View 
                        className={'time'}
                        style={{...style.color('thirdly')}}
                    >
                        {formatTime(createdAt)}
                    </View>
                </View>
                <View 
                    className='content'
                    style={{...style.color('primary')}}
                    onClick={this.getDetail}
                >
                    {text}
                </View>
                <View className='image-list at-row at-row--wrap'>
                    {
                        [
                            ...video.map(src => ({ src, type: mediaType.VIDEO })),
                            ...image.map(src => ({ src, type: mediaType.IMAGE }))   
                        ].map((val: { src: string, type: keyof typeof mediaType }, _: number) => {
                            const { src, type } = val
                            //处理不同类型的文件
                            let imageSrc,
                                args
                            switch(type) {
                                case mediaType.VIDEO: 
                                    imageSrc = src
                                    args = [ src, mediaType.VIDEO, image ]
                                    break
                                case mediaType.IMAGE:
                                    imageSrc = src
                                    args = [ src, mediaType.IMAGE ]
                                    break
                                case mediaType.AUDIO:
                                    break
                            }
                            return (
                                <View 
                                    className={'at-col at-col-4 image'}
                                    key={src}
                                    onClick={() => { this.handlePreviewMedia.apply(this, args) }}
                                >
                                    <View 
                                        className={`image-icon at-icon ${ICON_TYPE[type]}`}
                                        style={{
                                            ...style.color('primary'),
                                            textShadow: `0 0 2px ${TypeColor['disabled']}`,
                                            fontSize: SYSTEM_PAGE_SIZE(16) + 'px'
                                        }}
                                    ></View>
                                    <ImageLoading
                                        src={imageSrc}
                                        customStyle={{
                                            ...style.border(1, 'thirdly', 'dashed', 'all'),
                                            boxSizing: 'border-box',
                                            padding: `${SYSTEM_PAGE_SIZE(1)}px`
                                        }}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
                {
                    extra ? this.props.renderExtra : null
                }
                <ScrollView
                    scrollX
                    className='footer'
                >
                    {
                        comment_users.map((value) => {
                            const { avatar, _id:id } = value
                            return (
                                <View className='footer-img'
                                    key={id}
                                    onClick={this.getUser.bind(this, id)}    
                                >
                                    <ImageLoading 
                                        src={avatar || ''}  
                                        loadingProps={{content: ''}}
                                        customStyle={{
                                            display: 'inline-block',
                                            width: `${SYSTEM_PAGE_SIZE(25)}px`,
                                            height: `${SYSTEM_PAGE_SIZE(25)}px`,
                                        }}
                                    />
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <View 
                    className='video-preview'
                    style={{display: this.getVideoShowStatus() ? 'block' : 'none'}}
                >
                    <View className='shadow'></View>
                    <View className='main'>

                    </View>
                </View>
                <Curtain
                    isOpen={this.getVideoShowStatus()}
                    handleClose={this.handleVideoClose}
                    title={false}
                    main={true}
                    curtainStyle={{backgroundColor:'#000', opacity: 1}}
                    renderMain={
                        <View 
                            className='video'
                        >
                            <GVideo
                                style={{width: '100%', height: '100%'}}
                                src={this.getVideoSrc() || ''}
                                controls={true}
                                loop={true}
                                autoplay={true}
                                poster={activeVideoPoster || ''}
                            ></GVideo>
                        </View>
                    }
                    action={false}
                    other={false}
                    cancel={false}
                ></Curtain>
            </View>
        )
    }
}

export {
    List
}
