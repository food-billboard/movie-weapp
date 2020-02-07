import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

import {router} from '~utils'

import './index.scss'

interface IUser {
    name: string,
    time: string,
    img: string,
    id: string,
    content: string,
    hot: number,
    isHot: boolean
}

interface CommentUsers {
    img: string,
    id: string
}

interface IList {
    user: IUser,
    commentUsers: Array<CommentUsers>
}

interface IProps {
    list: IList,
    like: any,
    comment: any
    id: string
}

@connect(mapStateToProps, mapDispatchToProps)
export default class List extends Component<IProps>{
    public static defaultProps: IProps = {
        list: {
            user: {
                name: '',
                time: '',
                img: '',
                id: '',
                content:'',
                hot: 0,
                isHot: false
            },
            commentUsers: [
                {
                    img: '',
                    id: ''
                }
            ]
        },
        id: '',
        like: () => {},
        comment: () => {}
    }

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
     * commentId: 评论id
     */
    public like = async (id: string, hot: number = 0, isHot: boolean = false, commentId: string) => {
        const {list} = this.state
        if(isHot) {
            list.user.hot ++
        }else {
            list.user.hot --
        }
        list.user.isHot = !list.user.isHot
        this.setState({
            list
        })
        Taro.showLoading({ mask: true, title: '等我一下' })
        await this.props.like(commentId, id, this.props.id)   
        Taro.hideLoading()
    }

    /**
     * 发布评论
     * user: 用户id
     * id: 我的id
     */
    public pushComment(user: string, id: string) {
        this.props.comment(true, user, id)
    }

    /**
     * 查看详细评论
     * id: 评论id
     */
    public getDetail = (id: string) => {
        router.push('/commentdetail', { id })
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
            img,
            id,
            hot,
            isHot
        } = user
        //评论用户组件
        const userList = commentUsers.map((value) => {
            const {img, id} = value
            return (
                <View className='footer-img'
                    key={id}
                    onClick={this.getUser.bind(this, id)}    
                >
                    <Image src={img} className='footer-img-content'></Image>
                </View>
            )
        })
        return (
            <View className='list'>
                <View className='head'>
                    <View className='head-img'
                        onClick={this.getUser.bind(this, id)}
                    >
                        <Image src={img} className='head-img-content'></Image>
                    </View>
                    <View className='name'>
                        <Text className='name-user'
                            onClick={this.pushComment.bind(this, id, this.props.id)}>{name}</Text>说: 
                    </View>
                    <View className='up'
                        onClick={this.like.bind(this, id, hot, isHot, this.props.id)}
                    >
                        <Text className={'up-text'}>
                            {hot}
                            <AtIcon value={isHot ? 'heart-2' : 'heart'} />
                        </Text>
                    </View>
                    <View className='time'>
                        {time}
                    </View>
                </View>
                <View 
                    className='content'
                    onClick={this.getDetail.bind(this, this.props.id)}
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
