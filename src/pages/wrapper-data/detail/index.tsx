import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import merge from 'lodash/merge'
import GVideo from '~components/video'
import EmptyTry from '~components/empty-try'
import GButton from '~components/button'
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { withTry, router, routeAlias, EAction } from '~utils'
import { getCustomerMovieDetail, getUserMovieDetail, putStore, cancelStore, putRate } from '~services'
import Header from './components/header'
import List from './components/imglist'
import Content from './components/content'
import IconList from './components/iconList'
import GTag from './components/tag'
import Actor from './components/actor'
import Title from './components/title'
import { mapDispatchToProps, mapStateToProps } from './connect'
import './index.scss'

class Detail extends Component<any> {

  public state: any = {
    data: {},
    commentData: []
  }

  public componentDidMount = () => {
    this.setTitle()
  }

  public componentDidShow = async () => {
    await this.fetchData()
    colorStyleChange()
  }

  //电影id
  private id = getCurrentInstance().router?.params.id

  //设置标题
  public setTitle = async () => {
    Taro.setNavigationBarTitle({ title: '电影' })
  }

  //获取数据
  public fetchData = async () => {
    if (!this.id) {
      Taro.showToast({
        title: '网络错误，请重试',
        icon: 'none',
        duration: 1000
      })
      return
    }
    Taro.showLoading({ mask: true, title: '凶猛加载中' })
    const isLogin = await this.props.getUserInfo({ prompt: false })
    const method = isLogin ? getCustomerMovieDetail : getUserMovieDetail
    return method(this.id)
      .then(data => {
        const { comment } = data
        this.setState({
          data,
          commentData: comment,
        })
        Taro.hideLoading()
      })
      .catch(err => {
        Taro.showToast({
          title: '数据获取出错',
          icon: 'none'
        })
        Taro.hideLoading()
      })
  }

  //打开评论界面
  public handleComment = async () => {
    let param: NComment.Comment_Params = {
      action: EAction.COMMENT_MOVIE,
      postInfo: this.id
    }
    router.push(routeAlias.toComment, param)
  }

  //收藏
  public store = async (store: boolean) => {
    const action = async (res) => {
      if (!res) return
      Taro.showLoading({ mask: true, title: '稍等一下' })
      const method = store ? putStore : cancelStore
      await withTry(method)(this.id)
      Taro.hideLoading()
      return this.fetchData()
    }
    return this.props.getUserInfo({ action })
      .catch(() => {
        Taro.showToast({
          title: '操作失败，请重试',
          icon: 'none'
        })
      })
  }

  //评分
  public rate = async (value: number) => {
    const action = async (res) => {
      if (!res) return
      Taro.showLoading({ mask: true, title: '稍等一下' })
      await withTry(putRate)(this.id, value)
      Taro.hideLoading()
      return this.fetchData()
    }
    return this.props.getUserInfo({ action })
      .catch(() => {
        Taro.showToast({
          title: '操作失败，请重试',
          icon: 'none'
        })
      })
  }

  public render() {
    const { data: {
      video,
      poster,
      images = [],
      info = {},
      tag,
      glance,
      createdAt,
      hot,
      rate,
      author_rate,
      store,
      author_description,
      author
    }, commentData = [] } = this.state
    const {
      actor,
      district,
      language,
      director,
      classify,
      ...nextInfo
    } = info

    return (
      <View id='detail' style={style.backgroundColor('bgColor')}>
        <View className='page-detail-video'>
          {
            !!video && <GVideo
              src={video}
              poster={poster}
              id={video}
            />
          }
        </View>
        <View
          className='page-detail-description'
          style={merge(style.color('thirdly'), style.border(1, 'thirdly', 'solid', 'top'))}
        >
          <Header
            store={this.store}
            rate={this.rate}
            info={{
              name: nextInfo.name,
              poster: poster,
              rate: parseFloat(rate) || 0,
              author_rate: parseFloat(author_rate) || 0,
              store: store,
              createdAt
            }}
          />
          <Content
            info={{
              ...nextInfo,
              glance,
              district: (district || []).map(item => ({ value: item.name })),
              director: (director || []).map(item => ({ value: item.name })),
              actor: (actor || []).map(item => ({ value: item.name })),
              classify: (classify || []).map(item => ({ value: item.name })),
              language: (language || []).map(item => ({ value: item.name })),
              createdAt,
              hot,
              author_description,
              author
            }}
          />
        </View>
        <EmptyTry
          value={images}
        >
          <View className='page-detail-image'>
            <View className='page-detail-title'>
              <Title
                title='截图'
              />
            </View>
            <List
              list={images}
            />
          </View>
        </EmptyTry>
        <EmptyTry
          value={actor}
        >
          <View className='page-detail-actor'>
            <View className='page-detail-title'>
              <Title
                title='卡司'
              />
            </View>
            <Actor
              list={(actor || []).map(item => {
                const { name, avatar } = item
                return {
                  name,
                  image: avatar
                }
              })}
            />
          </View>
        </EmptyTry>
        <EmptyTry
          value={tag}
        >
          <View className='page-detail-tag'>
            <View className='page-detail-title'>
              <Title
                title='大家都说'
              />
            </View>
            <GTag
              list={tag?.map(item => {
                const { text } = item
                return {
                  value: text
                }
              })}
            ></GTag>
          </View>
        </EmptyTry>
        <EmptyTry
          value={commentData}
        >
          <View className='page-detail-comment'>
            <View className='page-detail-title'>
              <Title
                title='大家评论'
              />
            </View>
            <IconList
              list={commentData?.map(comment => {
                const { content: { text }, _id, user_info: { avatar } } = comment
                return {
                  id: _id,
                  content: text || '[ 媒体 ]',
                  image: avatar
                }
              })}
              handleClick={() => router.push(routeAlias.comment, { id: this.id })}
            />
          </View>
        </EmptyTry>
        <View className='page-detail-other'>
          <GButton
            type='secondary'
            value={new Array(2).fill('说点什么吧')}
            operate={this.handleComment}
          />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)