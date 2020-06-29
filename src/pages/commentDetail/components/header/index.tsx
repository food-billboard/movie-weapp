import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtAvatar } from 'taro-ui'
import Ellipsis from '~components/ellipsis'
import { router, formatTime, formatNumber, routeAlias } from '~utils'
import { IProps, IState } from './index.d'
import style from '~theme/style'
import { TypeColor } from '~theme/color'
import { SYSTEM_PAGE_SIZE } from '~config'

import './index.scss'

export default class extends Component<IProps, IState> {

  public static defaultProps: IProps = {
    content: {
      _id: '',
      user_info: {
        avatar: null,
        username: '',
        _id: ''
      },
      content: {},
      comment_users: 0,
      createdAt: Date.now(),
      like: false,
      total_like: 0
    },
    like: () => {},
  }

  /**
   * 查看用户详情
   * @param id 用户id
   */
  public getUser = (id: string) => {
    router.push(routeAlias.user, { id })
  }

  public render() {
    const { 
      content: {
        _id:commentId,
        user_info: {
          avatar,
          username,
          _id:userId
        },
        content: {
          text='',
          image=[],
          video=[]
        },
        comment_users,
        createdAt,
        like,
        total_like
      }
    } = this.props

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
                image={avatar || ''}
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
              {username}
            </View>
            <View className='content-header-extra at-col at-col-3 time' style={{...style.color('secondary')}}>
              {formatTime(createdAt)}
            </View>
          </View>
          <View className='contnet-main'>
            <View className='content-main-text'>
              <Ellipsis
                text={text}
                style={{...style.color('primary')}}
              />
            </View>
            <View className='content-main-extra'>
              {/* ToDo */}
            </View>
          </View>
          <View className='content-footer'>
              <View className='at-row at-row__align--center content-footer-main'>
                <View className='at-col at-col-6 at-row at-row__align--center'>
                  <AtIcon color={TypeColor['thirdly']} value={'message'} size={SYSTEM_PAGE_SIZE(16)} customStyle={{marginRight: '5px', display: 'inline-block'}} />
                  <Text style={{...style.color('secondary')}}>{formatNumber(comment_users)}</Text>
                </View>
                <View 
                  className='at-col at-col-6'
                  onClick={this.props.like.bind(this, userId, commentId)}
                >
                  <AtIcon color={TypeColor['thirdly']} size={SYSTEM_PAGE_SIZE(16)} value={like ? 'heart-2' : 'heart'} customStyle={{marginRight: '5px', display: 'inline-block'}} />
                  <Text style={{...style.color('secondary')}}>{formatNumber(total_like)}</Text>
                </View>
              </View>
          </View>
        </View>
      </View>
    )
  }

}