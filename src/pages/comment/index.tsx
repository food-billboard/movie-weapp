import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import GButton from '~components/button'
import Header from '~components/newsheader'
import { List } from '~components/commentlist'
import CommentCom from '~components/comment'
import GScrollView from '~components/scrollList'
import style from '~theme/style'
import { colorStyleChange } from '~theme/color'
import { throttle } from 'lodash'
import { withTry } from '~utils'
import { connect } from '@tarojs/redux'
import { mapDispatchToProps, mapStateToProps } from './connect'
import { getCustomerMovieCommentList, getMovieCommentList, getMovieDetailSimple, postCommentToUser, postCommentToMovie, putLike, cancelLike } from '~services'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {
  public static config: Config = {
    navigationBarTitleText: "评论",
    enablePullDownRefresh: true
  }

  public componentDidMount = async () => {
    this.fetchMovieData()
  }

  public componentDidShow = () => {
    colorStyleChange()
  }

  private scrollRef = Taro.createRef<GScrollView>()

  //下拉刷新
  public onPullDownRefresh = async () => {
    await this.scrollRef.current!.handleToUpper()
    Taro.stopPullDownRefresh()
  }

  //上拉加载
  public onReachBottom = async () => {
    await this.scrollRef.current!.handleToLower()
  }

  public state: any = {
    data: [],
    id: false,
    userCall: false,
    headerData: {},
  }

  //评论组件
  public commentRef = Taro.createRef<CommentCom>()

  //电影id
  readonly id = this.$router.params.id

  //获取电影数据
  public fetchMovieData = async () => {
    const data = await getMovieDetailSimple(this.id)
    this.setState({
      headerData: data
    })
  }

  //获取评论数据
  public fetchData = async (query: any, isInit = false) => {
    const { data } = this.state
    const { userInfo } = this.props
    const method = userInfo ? getCustomerMovieCommentList : getMovieCommentList
    const resData = await method({ id: this.id, ...query })

    this.setState({
      comment: [ ...(isInit ? [] : [...data]), ...resData ]
    })
    return resData
  }

  public throttleFetchData = throttle(this.fetchData, 2000)

  //发布评论
  public publishComment = async (value: {
    text?: string,
    image?: Array<any>,
    video?: Array<any>
  }) => {
    const { id } = this.state
    const { text = '', image = [], video = [] } = value
    const method = id ? postCommentToUser : postCommentToMovie
    const params: any = {
      content: {
        text,
        image,
        video
      },
      id: id ? id : this.id
    }

    Taro.showLoading({ mask: true, title: '发布中' })
    await withTry(method)(params)
    Taro.hideLoading()

    await this.onPullDownRefresh()
  }

  //点赞/取消点赞
  public like = async (id: string, like: boolean) => {
    await this.props.getUserInfo()
      .then(async (_) => {
        const method = like ? cancelLike : putLike

        Taro.showLoading({ mask: true, title: '操作中' })
        await withTry(method)(id)
        Taro.hideLoading()
        //刷新
        await this.onPullDownRefresh()
      })
      .catch(err => err)
  }

  /**
   * 展示评论组件
   * isUserCall: 是否为回复
   * commentId: 评论id
   */
  public publish = async (isUserCall, commentId) => {

    //TODo
    Taro.showToast({
      title: '功能完善中...',
      icon: 'none',
      duration: 1000
    })
    return
    //

    await this.props.getUserInfo()
    .then(_ => {
      this.commentRef.current!.open()

      this.setState({
        userCall: !!isUserCall,
        id: !!commentId && commentId
      })
    })
    .catch(err => err)
  }

  public render() {
    const { headerData: { description, _id, poster, ...nextHeaderData }, data } = this.state

    return (
      <GScrollView
        ref={this.scrollRef}
        sourceType={'Scope'}
        query={{ pageSize: 6 }}
        style={{ ...style.backgroundColor('bgColor') }}
        renderContent={<View>
          {
            data.map((value) => {
              const { _id } = value
              return (
                <List
                  comment={this.publish}
                  key={_id}
                  list={value}
                  like={this.like}
                />
              )
            })
          }
        </View>}
        fetch={this.throttleFetchData}
        header={200}
        bottom={92}
        renderHeader={<Header content={{
          ...nextHeaderData,
          detail: description,
          id: _id,
          image: poster,
        }}></Header>}
        renderBottom={<View>
          <GButton
            style={{ width: '100%', height: '92', position: 'fixed', bottom: 0, left: 0, zIndex: '999' }}
            type={'secondary'}
            value={['发布评论', '发布评论']}
            operate={this.publish}
          />
          <CommentCom
            buttonText={'写完了'}
            publishCom={this.publishComment}
            ref={this.commentRef}
          />
        </View>}
      >
      </GScrollView>
    )
  }
}