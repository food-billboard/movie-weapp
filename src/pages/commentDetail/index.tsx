import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import CommentCom from '~components/comment'
import GScrollView from '~components/scrollList'
import {List} from '~components/commentlist'
import GButton from '~components/button'
import { throttle } from 'lodash'
import Header from './components/header'
import { style } from '~theme/global-style'
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

const INIT_QUERY = { currPage:1, pageSize: 7 }
let FIRST = true

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {

  public static config: Config = {
      navigationBarTitleText: "评论"
  }

  public componentDidMount = async () => {
      this.setTitle()
  }

  //设置标题
  public setTitle = async () => {
      const { commentHeader } = this.state
      if(commentHeader.user && FIRST) {
        FIRST = false
        Taro.setNavigationBarTitle({title: `${commentHeader.user}的评论`})
      }
  }

  //评论组件
  public commentRef = Taro.createRef<CommentCom>()

  //评论id
  readonly id = this.$router.params.id

  //我的id
  readonly mineId = this.props.id

  public state: any = {
    commentHeader: {},
    comment: [],
    commentId: '',
    userId: ''
  }

   /**
   * 获取评论数据
   */
  public fetchData = async (query: any, isInit=false) => {
    const { comment } = this.state
    const data = await this.props.getCommentDetail({commentId: this.id, userId: this.mineId,  ...query})
    const commentList = data.comment
    const header = data.header
    let newData
    if(isInit) {
        newData = [ ...commentList ]
    }else {
        newData = [ ...comment, ...commentList ]
    }
    await this.setState({
        comment: newData,
        commentHeader: header
    })
    return commentList
  }

  /**
   * 节流数据获取
   */
  public throttleFetchData = throttle(this.fetchData, 2000)

  /**
   * 发布评论
   */
  public publishComment = async (value) => {
    const { userId, commentId } = this.state
    Taro.showLoading({ mask: true, title: '发布中' })
    
    await this.props.publishUserComment(commentId, value, userId, this.mineId)

    Taro.hideLoading()
    await this.fetchData({...INIT_QUERY}, true)
  }

  /**
   * 展示评论组件
   * isUserCall: 是否为回复
   * user: 用户id
   * commentId: 评论id
   */
  public publish = (isUserCll=true, user, commentId) => {
    this.props.getUserInfo()
    this.commentRef.current!.open()
    const { commentHeader } = this.state
    const { userId } = commentHeader
    this.setState({
        userId: user ? user : userId,
        commentId: commentId ? commentId : this.id
    })
  }

  public render() {

    const { commentHeader, comment } = this.state

    this.setTitle()

    return (
      <GScrollView
        style={{...style.backgroundColor('bgColor')}}
        sourceType={'Scope'}
        scrollWithAnimation={true}
        query={{pageSize: 7}}
        renderContent={
          <View>
            <Header content={commentHeader}></Header>
            {
              comment.map((value) => {
                const { id } = value
                return (
                  <View>
                    <List 
                      comment={this.publish} 
                      key={id}
                      list={value}
                      commentId={id}
                    />
                  </View>
                )
              })
            }
          </View>
        }
        fetch={this.throttleFetchData}
        bottom={92}
                renderBottom={<View>
                            <GButton 
                                style={{width: '100%', height: '92', position: 'fixed', bottom: 0, left: 0, zIndex: '999'}}
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