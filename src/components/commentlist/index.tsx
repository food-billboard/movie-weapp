import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

import { router, formatTime, formatNumber  } from '~utils'
import { style } from '~theme/global-style'

import './index.scss'

import { IState, IProps, IImageList } from './interface'

@connect(mapStateToProps, mapDispatchToProps)
export default class List extends Component<IProps, IState>{
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
            images: []
        },
        id: '',
        commentId: '',
        like: () => {},
        comment: () => {},
        getUserInfo: () => {}
    }

    //评论id
    readonly commentId: string = this.props.commentId

    public state: IState = {
        list: this.props.list
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
        router.push('/commentdetail', { id: this.commentId })
    }

    /**
     * 获取用户信息
     */
    public getUser = (id: string) => {
        router.push('/user', {id})
    }

    /**
     * 查看图片
     */
    public handlePreviewImage = (image: string) => {
        const { list } = this.props
        const { images=[] } = list
        if(!images.length) return
        const urlList = images.map(val => {
            const { image } = val
            return image
        })
        Taro.previewImage({
            urls: urlList,
            current: image
        })
    }

    public render() {
        const { list } = this.state
        const {
            user,
            commentUsers,
            id: commentId,
            images=[]
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
                        images.map((val: IImageList, index: number) => {
                            const { image: preImg, id } = val
                            return (
                                <View 
                                    className={'at-col at-col-4 image'}
                                    key={id}
                                    onClick={this.handlePreviewImage.bind(this, preImg)}
                                >
                                    <Image 
                                        src={preImg} 
                                        style={{...style.border(1, 'thirdly', 'dashed', 'all')}}
                                        className={'image-content'}
                                    ></Image>
                                </View>
                            )
                        })
                    }
                </View>
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

            </View>
        )
    }
}
