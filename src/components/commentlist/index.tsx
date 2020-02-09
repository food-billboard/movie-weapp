import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

import { router, formatTime, formatNumber } from '~utils'

import './index.scss'

interface IUser {
    name: string,
    time: string,
    image: string,
    id: string,
    content: string,
    hot: number,
    isHot: boolean
}

interface CommentUsers {
    image: string,
    id: string
}

interface IList {
    user: IUser,
    commentUsers: Array<CommentUsers>
}

interface IProps {
    list: IList
    like: any
    comment: (isUserCall: boolean, user: string, commentId: string) => any
    id: string
    getUserInfo: () => any
    commentId: string
}

@connect(mapStateToProps, mapDispatchToProps)
export default class List extends Component<IProps>{
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
            commentUsers: [
                {
                    image: '',
                    id: ''
                }
            ]
        },
        id: '',
        commentId: '',
        like: () => {},
        comment: () => {},
        getUserInfo: () => {}
    }

    //评论id
    readonly commentId: string = this.props.commentId

    public state = {
        list: this.props.list
    }

    public constructor() {
        super(...arguments)
        this.getUser = this.getUser.bind(this)
        this.like = this.like.bind(this)
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
    public pushComment(user: string) {
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
    public getUser(id: string) {
        router.push('/user', {id})
    }

    public render() {
        const {list} = this.state
        const {
            user,
            commentUsers
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
        //评论用户组件
        const userList = commentUsers.map((value) => {
            const {image, id} = value
            return (
                <View className='footer-img'
                    key={id}
                    onClick={this.getUser.bind(this, id)}    
                >
                    <Image src={image} className='footer-img-content'></Image>
                </View>
            )
        })
        return (
            <View className='list'>
                <View className='head'>
                    <View className='head-img'
                        onClick={this.getUser.bind(this, id)}
                    >
                        <Image src={image} className='head-img-content'></Image>
                    </View>
                    <View className='name'>
                        <Text className='name-user'
                            onClick={this.pushComment.bind(this, id)}>{name}</Text>说: 
                    </View>
                    <View className='up'
                        onClick={this.like.bind(this, id, hot, isHot, this.props.id)}
                    >
                        <Text className={'up-text'}>
                            {formatNumber(hot)}
                            <AtIcon value={isHot ? 'heart-2' : 'heart'} />
                        </Text>
                    </View>
                    <View className='time'>
                        {formatTime(time)}
                    </View>
                </View>
                <View 
                    className='content'
                    onClick={this.getDetail.bind(this)}
                >
                    {content}
                </View>
                <ScrollView
                    scrollX
                    className='footer'
                >
                    {userList}
                </ScrollView>

            </View>
        )
    }
}
