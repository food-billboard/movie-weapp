import Taro from '@tarojs/taro'
import { Component, useCallback } from 'react'
import { AtAvatar } from 'taro-ui'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'
import noop from 'lodash/noop'
import style from '~theme/style'
import { router, formatNumber, routeAlias, withTry } from '~utils'
import { putStore, cancelStore } from '~services'
import { mapDispatchToProps, mapStateToProps } from './connect'
import Rate from '../rate'
import Swipper from './swipper'

import './index.scss'

export interface IProps {
  list: API_USER.IMovieListData[]
  handleClick: (...args: any) => any
  getUserInfo: TGetUserInfo
  reload: (...args: any[]) => Promise<any>
}

const IconListItemInternal = (props: Omit<IProps, 'list'> & {
  value: API_USER.IMovieListData | null
}) => {

  const { value, getUserInfo: propsGetUserInfo, reload, handleClick: propsHandleClick } = props

  const handleClick = (id: string) => propsHandleClick(id)

  const getUserInfo = useCallback(async (e, id: string) => {
    e.stopPropagation()
    const result = await propsGetUserInfo({ prompt: false })
    if (result && result._id === id) {
      Taro.switchTab({
        url: "/pages/mine/index"
      })
    } else {
      router.push(routeAlias.user, { id })
    }
  }, [propsGetUserInfo])

  const goTo = useCallback((_, id, __) => router.push(routeAlias.detail, { id }), [])

  const handleStore = useCallback(async (id: string, isStore?: boolean) => {
    let method
    if (typeof isStore === 'undefined' || isStore) {
      method = putStore
    } else {
      method = cancelStore
    }
    const action = async (res) => {
      if (res) return
      const [err] = await withTry(method)(id)
      let toastConfig: Taro.showToast.Option = {
        icon: 'none',
        duration: 1000,
        title: ''
      }
      if (err) {
        toastConfig = {
          ...toastConfig,
          title: '网络错误，请重试'
        }
      } else {
        toastConfig = {
          ...toastConfig,
          title: '操作成功~'
        }
      }
      Taro.showToast(toastConfig)
    }
    await propsGetUserInfo({ action })
      .catch(_ => {
        Taro.showToast({
          title: '未登录无法操作',
          icon: 'none',
          duration: 1000
        })
      })
    return reload()
  }, [propsGetUserInfo, reload])

  if (!value) return (
    <View
      className='at-col at-col-4'
      key='component-icon-list-item'
    ></View>
  )
  const { _id, name, images, hot, rate, store, author } = value
  const imageList = Array.isArray(images) ? images : [images]
  return (
    <View
      className='component-icon-list-content-wrapper at-col at-col-4'
      key={_id}
    >
      <View
        className='component-icon-list-content'
      >
        <View
          className='component-icon-list-content-poster'
          onClick={(event) => { goTo.call(null, name, _id, event) }}
        >
          {/* <ImageLoading src={image} mode={'scaleToFill'} /> */}
          <Swipper style={{ height: '100%' }} list={imageList} />
          <View
            onClick={handleStore.bind(null, _id, store)}
            className={`at-icon at-icon-heart${store ? "-2" : ""} component-icon-list-content-poster-store`}
            style={style.color('primary')}
          ></View>
        </View>
        <View className='component-icon-list-content-main'>
          <View
            className='component-icon-list-content-main-name normal-font-size-class'
            style={{ ...style.color('primary') }}
            onClick={handleClick.bind(null, _id)}
          >{name}</View>
          <View className='component-icon-list-content-main-rate'>
            <Rate
              value={parseFloat((rate / 2).toFixed(1))}
              readonly
              rate={noop}
              size={14}
              max={5}
              origin={rate}
            ></Rate>
          </View>
          <View className='component-icon-list-content-main-extra normal-font-size-class'
            style={{ ...style.color('secondary') }}
          >
            <View className='component-icon-list-content-main-extra-count'>
              {formatNumber(hot)}
              <Text style={{ fontSize: '70%' }}>人看</Text>
            </View>
            <View onClick={(e) => getUserInfo.call(this, e, author._id)}>
              <AtAvatar className='component-icon-list-content-main-extra-avatar' size='small' circle image={author.avatar} text={author.username}></AtAvatar>
            </View>
          </View>
        </View>
      </View>
    </View>
  )

}

export const IconListItem = connect(mapStateToProps, mapDispatchToProps)(IconListItemInternal)

class IconList extends Component<IProps>{

  public static defaultProps: IProps = {
    list: [],
    handleClick: noop,
    getUserInfo: () => Promise.resolve(),
    reload: () => Promise.resolve()
  }

  public render() {

    const { list } = this.props
    const listLen = list.length
    const realList = listLen % 2 == 0 ? list : [...list, null]

    return (
      <View className='component-icon-list at-row at-row--wrap at-row__justify--around'>
        {
          realList.map((value: API_USER.IMovieListData, index) => {
            return (
              <IconListItem
                key={value?._id || index}
                value={value}
                reload={this.props.reload}
                handleClick={this.props.handleClick}
              />
            )
          })
        }
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconList)

