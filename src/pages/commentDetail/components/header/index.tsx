import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtIcon, AtAvatar } from 'taro-ui'
import Ellipsis from '~components/ellipsis'

import { router, formatTime, formatNumber } from '~utils'

import './index.scss'

interface IContent {
  id: string
  user: string
  userId: string
  content: string
  icon: string
  hot: number
  time: string
  isLike: boolean
}

interface IProps {
  content: IContent
  like: (commentId: string, user: string, mine: string) => any
  id: string
  total: number
  getUserInfo: () => any
}

interface IState {
  content: IContent
}

export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    content: {
      id: '',
      user: '',
      userId: '',
      content: '',
      icon: '头像',
      hot: 100,
      time: '',
      isLike: false
    },
    like: () => {},
    id: '',
    total: 0,
    getUserInfo: () => {}
  }

  public state: IState = {
    content: this.props.content
  }

  public componentWillReceiveProps = (props) => {
    this.setState({
      content: props.content
    })
  }

  /**
   * 查看用户详情
   * @param id 用户id
   */
  public getUser = (id: string) => {
    router.push('/user', { id })
  }

  /**
   * 点赞
   * @param id: 评论用户id
   * @param hot: 点赞人数
   * @param isLike: 是否为点赞状态
   * @param commentId: 评论id
   */ 
  public like = async (id: string, hot: number = 0, isLike: boolean = false, commentId: string) => {
    this.props.getUserInfo()
    const {content} = this.state
    if(!isLike) {
        content.hot ++
    }else {
        content.hot --
    }
    content.isLike = !content.isLike
    this.setState({
      content
    })
    Taro.showLoading({ mask: true, title: '等我一下' })
    await this.props.like(commentId, id, this.props.id)   
    Taro.hideLoading()
  }

  public render() {
    const { 
      id,
      user,
      userId,
      content,
      icon,
      hot,
      time,
      isLike
    } = this.state.content
    const { total } = this.props
    return (
      <View className='header'>
        <View className='content'>
          <View className='content-header at-row'>
            <View 
              className='at-col at-col-2'
              onClick={this.getUser.bind(this, userId)}  
            >
              <AtAvatar 
                image={icon}
                circle={true}
                className='icon' 
                text={'头像'}
                customStyle={{width:'40px', height: '40px'}}
              />
            </View>
            <View 
              className='at-col at-col-7 user'
            >
              {user}
            </View>
            <View className='content-header-extra at-col at-col-3 time'>
              {formatTime(time)}
            </View>
          </View>
          <View className='contnet-main'>
            <View className='content-main-text'>
              <Ellipsis
                text={content}
              />
            </View>
            <View className='content-main-extra'>

            </View>
          </View>
          <View className='content-footer'>
              <View className='at-row at-row__align--center content-footer-main'>
                <View className='at-col at-col-6 at-row at-row__align--center'>
                  <AtIcon value={'message'} size={16} customStyle={{marginRight: '5px', display: 'inline-block'}} />
                  <Text>{formatNumber(total)}</Text>
                </View>
                <View 
                  className='at-col at-col-6'
                  onClick={this.like.bind(this, userId, hot, isLike, id)}
                >
                  <AtIcon size={16} value={isLike ? 'heart-2' : 'heart'} customStyle={{marginRight: '5px', display: 'inline-block'}} />
                  <Text>{formatNumber(hot)}</Text>
                </View>
              </View>
          </View>
        </View>
      </View>
    )
  }

}