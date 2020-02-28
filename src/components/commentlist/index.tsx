import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import GVideo from '../video'
// import Modal from '../model'
import Curtain from '../curtain'
import { Info } from '../model/interface'
import { router, formatTime, formatNumber, mediaType, routeAlias } from '~utils'
import { style } from '~theme/global-style'
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { IState, IProps, IMediaList } from './interface'

import './index.scss'

//媒体的图标类型
const ICON_TYPE = {
    [mediaType.video]: 'at-icon-video',
    [mediaType.image]: 'at-icon-image',
    [mediaType.audio]: 'at-icon-soung'
}

@connect(mapStateToProps, mapDispatchToProps)
class List extends Component<IProps, IState>{
    public static defaultProps: IProps = {
        list: {
            user: {
                name: '',
                time: '',
                image: '',
                id: '',
                content:'',
                hot: 0,
                isHot: false
            },
            commentUsers: [],
            id: '',
            media: [],
            info: {
                id: '',
                image: '',
                content: '',
                origin: false,
                hasImage: false,
                hasVideo: false
            }
        },
        id: '',
        commentId: '',
        like: () => {},
        comment: () => {},
        getUserInfo: () => {}
    }

    //评论id
    readonly commentId: string = this.props.commentId

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
        activeVideo: ''
    }

    /**
     * 点赞
     * id: 评论用户id
     * hot: 点赞人数
     * isHot: 是否为点赞状态
     */
    public like = async (id: string, hot: number = 0, isHot: boolean = false) => {
        this.props.getUserInfo()
        const {list} = this.state
        if(!isHot) {
            list.user.hot ++
        }else {
            list.user.hot --
        }
        list.user.isHot = !list.user.isHot
        this.setState({
            list
        })
        Taro.showLoading({ mask: true, title: '等我一下' })
        await this.props.like(this.commentId, id, this.props.id)   
        Taro.hideLoading()
    }

    /**
     * 发布评论
     * @param user: 用户id
     * @param id: 我的id
     */
    public pushComment = (user: string) => {
        this.props.comment(true, user, this.commentId)
    }

    /**
     * 查看详细评论
     */
    public getDetail = () => {
        router.push(routeAlias.commentdetail, { id: this.commentId })
    }

    /**
     * 获取用户信息
     */
    public getUser = (id: string) => {
        router.push(routeAlias.user, {id})
    }

    /**
     * 预览媒体
     */
    public handlePreviewMedia = (src: string, type: keyof typeof mediaType) => {
        const { list } = this.props
        const { media=[] } = list
        if(!media.length) return
        if(mediaType[type] === mediaType.image) {
            this.handlePreviewImage(src, media.filter((val: IMediaList) => {
                const { type } = val
                return mediaType[type] === mediaType.image
            }).map((val: IMediaList) => {
                const { src } = val
                return src
            }))
        }else if(mediaType[type] === mediaType.video) {
            this.handlePreviewVideo(src)
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
    public handlePreviewVideo = (target: string) => {
        this.setState({
            activeVideo: target,
            videoShow: true
        })
    }

    //监听视频关闭
    public handleVideoClose = () => {
        this.setState({
            videoShow: false,
            activeVideo: ''
        })
    }

    //获取视频地址
    public getVideoSrc = () => {
        const { activeVideo } = this.state
        return activeVideo
    }

    //获取视频显示隐藏
    public getVideoShowStatus = () => {
        const { videoShow } = this.state
        return videoShow
    }

    public render() {
        const { list, activeVideo, videoShow } = this.state
        const {
            user,
            commentUsers,
            id: commentId,
            media=[]
        } = list
        const { 
            name,
            time,
            content,
            image,
            id,
            hot,
            isHot
        } = user
        const { extra=false } = this.props
        return (
            <View 
                className={'list'}
                style={{...style.backgroundColor('disabled')}}
            >
                <View className='head'>
                    <View className='head-img'
                        onClick={this.getUser.bind(this, id)}
                    >
                        <Image src={image} className='head-img-content'></Image>
                    </View>
                    <View 
                        className={'name'}
                        style={{...style.color('thirdly')}}
                    >
                        <Text 
                            className={'name-user'}
                            onClick={this.pushComment.bind(this, id)}
                            style={{...style.color('primary')}}
                        >{name}</Text>说: 
                    </View>
                    <View 
                        className={'up'}
                        onClick={this.like.bind(this, id, hot, isHot)}
                        style={{...style.color('thirdly')}}
                    >
                        <View className={'up-text'}>
                            {formatNumber(hot)}
                            <AtIcon value={isHot ? 'heart-2' : 'heart'} />
                        </View>
                    </View>
                    <View 
                        className={'time'}
                        style={{...style.color('thirdly')}}
                    >
                        {formatTime(time)}
                    </View>
                </View>
                <View 
                    className='content'
                    style={{...style.color('primary')}}
                    onClick={this.getDetail.bind(this)}
                >
                    {content}
                </View>
                <View className='image-list at-row at-row--wrap'>
                    {
                        media.map((val: IMediaList, index: number) => {
                            const { image, id, src, type } = val
                            return (
                                <View 
                                    className={'at-col at-col-4 image'}
                                    key={id}
                                >
                                    <View 
                                        className={`image-icon at-icon ${ICON_TYPE[type]}`}
                                        style={{
                                            ...style.backgroundColor('bgColor'),
                                            ...style.color('primary')
                                        }}
                                    ></View>
                                    {
                                        mediaType[type] === mediaType.video ?
                                        <Image 
                                            onClick={() => {this.handlePreviewMedia.call(this, src, 'video')}}
                                            src={image} 
                                            style={{...style.border(1, 'thirdly', 'dashed', 'all')}}
                                            className={'image-content'}
                                        ></Image>
                                        : null
                                    }
                                    {
                                        mediaType[type] === mediaType.image ?
                                        <Image 
                                            onClick={() => {this.handlePreviewMedia.call(this, src, 'image')}}
                                            src={src} 
                                            style={{...style.border(1, 'thirdly', 'dashed', 'all')}}
                                            className={'image-content'}
                                        ></Image>
                                        : null
                                    }
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
                        commentUsers.map((value) => {
                            const {image:userIcon, id} = value
                            return (
                                <View className='footer-img'
                                    key={id}
                                    onClick={this.getUser.bind(this, id)}    
                                >
                                    <Image src={userIcon} className='footer-img-content'></Image>
                                </View>
                            )
                        })
                    }
                </ScrollView>
                {/* <Modal
                    info={{...this.videoConfig, isOpen: videoShow}}
                    content={true}
                    renderContent={
                        <View className='video'>
                            <View 
                                className='at-icon at-icon-close icon'
                                style={{...style.color('primary')}}
                                onClick={this.handleVideoClose}
                            ></View>
                            <GVideo
                                style={{width: '100%', height: '97%'}}
                                src={activeVideo}
                                controls={true}
                                loop={true}
                            ></GVideo>
                        </View>
                    }
                ></Modal> */}
                <Curtain
                    isOpen={videoShow}
                    title={false}
                    main={true}
                    renderMain={<View>111111</View>}
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
