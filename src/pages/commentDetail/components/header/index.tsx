import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtAvatar } from 'taro-ui'
import Ellipsis from '~components/ellipsis'
import { router, formatTime, formatNumber, routeAlias, size } from '~utils'
import { IProps, IState } from './index.d'
import style from '~theme/style'
import { TypeColor } from '~theme/color'
import { SYSTEM_PAGE_SIZE, getCookie } from '~config'
import { mapDispatchToProps, mapStateToProps } from './connect'
import { connect } from '@tarojs/redux'

import './index.scss'
@connect(mapStateToProps, mapDispatchToProps)
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
    total: 0,
    getUserInfo: () => {}
  }

  public state: IState = {
    content: this.props.content,
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
    router.push(routeAlias.user, { id })
  }

  /**
   * 点赞
   * @param id: 评论用户id
   * @param hot: 点赞人数
   * @param isLike: 是否为点赞状态
   * @param commentId: 评论id
   */ 
  public like = async (id: string, hot: number = 0, isLike: boolean = false, commentId: string) => {
    
    //获取个人信息缓存
    const userInfo = getCookie('user') || {}
    if(!size(userInfo)) {
      await this.props.getUserInfo()
      return 
    }
    const { id: mineId } = JSON.parse(userInfo)

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
    await this.props.like(commentId, id, mineId)   
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
        <View   
          className={'content'}
          style={{...style.border(2, 'disabled', 'dashed', 'top_bottom')}}
        >
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
                customStyle={{width:SYSTEM_PAGE_SIZE(40) + 'px', height: SYSTEM_PAGE_SIZE(40) + 'px'}}
              />
            </View>
            <View 
              className='at-col at-col-7 user'
              style={{...style.color('primary')}}
            >
              {user}
            </View>
            <View className='content-header-extra at-col at-col-3 time' style={{...style.color('secondary')}}>
              {formatTime(time)}
            </View>
          </View>
          <View className='contnet-main'>
            <View className='content-main-text'>
              <Ellipsis
                text={content}
                style={{...style.color('primary')}}
              />
            </View>
            <View className='content-main-extra'>

            </View>
          </View>
          <View className='content-footer'>
              <View className='at-row at-row__align--center content-footer-main'>
                <View className='at-col at-col-6 at-row at-row__align--center'>
                  <AtIcon color={TypeColor['thirdly']} value={'message'} size={SYSTEM_PAGE_SIZE(16)} customStyle={{marginRight: '5px', display: 'inline-block'}} />
                  <Text style={{...style.color('secondary')}}>{formatNumber(total)}</Text>
                </View>
                <View 
                  className='at-col at-col-6'
                  onClick={this.like.bind(this, userId, hot, isLike, id)}
                >
                  <AtIcon color={TypeColor['thirdly']} size={SYSTEM_PAGE_SIZE(16)} value={isLike ? 'heart-2' : 'heart'} customStyle={{marginRight: '5px', display: 'inline-block'}} />
                  <Text style={{...style.color('secondary')}}>{formatNumber(hot)}</Text>
                </View>
              </View>
          </View>
        </View>
      </View>
    )
  }

}