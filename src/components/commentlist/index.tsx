import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import './index.scss'

import {router} from '~utils'

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
}

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
     * 获取用户信息
     */
    public getUser(id: string) {
        router.push('/user', {id})
    }

    /**
     * 点赞
     */
    public like(id: string, hot: number = 0, isHot: boolean = false): void {
        const {list} = this.state
        const {user} = list
        var {isHot, hot} = user
        if(isHot) {
            hot ++
        }else {
            hot --
        }
        this.setState({
            hot,
            isHot: !isHot
        })
        this.props.like(id)
    }

    /**
     * 发布评论
     */
    public pushComment(user) {
        this.props.comment(true, user)
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
                            onClick={this.pushComment.bind(this, id)}>{name}</Text>说: 
                    </View>
                    <View className='up'
                        onClick={this.like.bind(this, id, hot, isHot)}
                    >
                        <Text className={'up-text ' + (isHot ? 'up-like' : '')}>
                            {hot}
                        </Text>❤
                    </View>
                    <View className='time'>
                        {time}
                    </View>
                </View>
                <View className='content'>
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
