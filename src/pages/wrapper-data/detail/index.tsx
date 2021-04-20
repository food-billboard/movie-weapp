import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import GVideo from '~components/video'
import GButton from '~components/button'
import List from './components/imglist'
import Content from './components/content'
import IconList from './components/iconList'
import GTag from './components/tag'
import Actor from './components/actor'
import Title from './components/title'
import Tab from './components/tab'
import style from '~theme/style'
import { colorStyleChange } from '~theme/color'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from './connect'
import { withTry, router, routeAlias } from '~utils'
import { getCustomerMovieDetail, getUserMovieDetail, putStore, cancelStore, putRate } from '~services'
import './index.scss'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {

  //电影id
  private id = getCurrentInstance().router?.params.id

  public componentDidShow = () => colorStyleChange()

  private tabRef = React.createRef<Tab>()

  public state: any = {
    data: {},
    // tab: [],
    commentData: []
  }

  public componentDidMount = async () => await this.fetchData()

  //设置标题
  public setTitle = async () => {
    // const current = this.tabRef.current ? this.tabRef.current.getCurrent() : 0
    // const { tab } = this.state
    // Taro.setNavigationBarTitle({ title: tab[current] ? tab[current].same_name : '电影' })
    Taro.setNavigationBarTitle({ title: '电影' })
  }

  //获取数据
  public fetchData = async () => {
    const { userInfo } = this.props
    if(!this.id) {
      Taro.showToast({
        title: '网络错误，请重试',
        icon: 'none',
        duration: 1000
      })
      return
    }
    Taro.showLoading({ mask: true, title: '凶猛加载中' })
    const method = userInfo ? getCustomerMovieDetail : getUserMovieDetail
    const data = await method(this.id)
    const { comment, same_film = [], name, _id } = data
    // const baseTab = [{
    //   _id,
    //   same_name: name,
    //   type: 'NAMESAKE'
    // }]
    this.setState({
      // tab: same_film.length ? [...baseTab, ...same_film] : [...baseTab],
      data,
      commentData: comment,
    })
    Taro.hideLoading()
  }

  //打开评论界面
  public handleComment = async () => {
    let param: NComment.Comment_Params = {
      action: NComment.EAction.COMMENT_MOVIE,
      postInfo: this.id
    }
    router.push(routeAlias.toComment, param)
  }

  //收藏
  public store = async (store: boolean) => {
    await this.props.getUserInfo()
      .then(async (_) => {
        Taro.showLoading({ mask: true, title: '稍等一下' })
        const method = store ? cancelStore : putStore
        await withTry(method)(this.id)
        Taro.hideLoading()
      })
      .catch(err => err)
  }

  //评分
  public rate = async (value: number) => {
    await this.props.getUserInfo()
      .then(async (_) => {
        Taro.showLoading({ mask: true, title: '稍等一下' })
        await withTry(putRate)({ _id: this.id, value })
        Taro.hideLoading()
      })
      .catch(err => err)
  }

  // //tab切换
  // public handleTabChange = async (value: string) => {
  //   const { tab } = this.state
  //   // const [ item ] = tab.filter(item => item.name === value)
  //   const { _id } = tab[value]
  //   this.id = _id
  //   await this.fetchData()
  // }

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
    }, commentData = [], tab } = this.state
    const {
      actor,
      district,
      language,
      director,
      classify,
      ...nextInfo
    } = info

    this.setTitle()

    return (
      <View id='detail' style={{ ...style.backgroundColor('bgColor') }}>
        {/* {
          tab.length ?
            <Tab
              values={tab.map(item => item.name)}
              handleClick={this.handleTabChange}
              ref={this.tabRef}
              tabToggle={1000}
            />
            : null
        } */}
        <View className='video'>
          {
            !!video && <GVideo
              src={video.src}
              poster={poster}
              id={video}
            />
          }
        </View>
        <View 
          className={'description'}
          style={{ ...style.color('thirdly'), ...style.border(1, 'thirdly', 'solid', 'top') }}
        >
          <Content
            store={this.store}
            rate={this.rate}
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
              rate: rate || 0,
              author_rate,
              store,
              author_description,
              author: author ? author.user : ''
            }}
          />
        </View>
        <View className='image'>
          <View className='title'>
            <Title
              title={'截图'}
            />
          </View>
          <List
            list={images}
          />
        </View>
        <View className='actor'>
          <View className='title'>
            <Title
              title={'卡司'}
            />
          </View>
          <Actor list={(actor || []).map(item => {
            const { name, avatar } = item
            return {
              name,
              image: avatar
            }
          })} />
        </View>
        {
          Array.isArray(tag) && !!tag.length && (
            <View className='tag'>
              <View className='title'>
                <Title
                  title={'大家都说'}
                />
              </View>
              <GTag
                list={tag.map(item => {
                  const { text } = item
                  return {
                    value: text
                  }
                })}
              ></GTag>
            </View>
          )
        }
        {
          Array.isArray(commentData) && !!commentData.length && (
            <View className='comment'>
              <View className='title'>
                <Title
                  title={'大家评论'}
                />
              </View>
              <IconList
                list={commentData.map(comment => {
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
          )
        }
        <View className='other'>
          <GButton
            type={'secondary'}
            value={new Array(2).fill('说点什么吧')}
            operate={this.handleComment}
          />
        </View>
      </View>
    )
  }
}