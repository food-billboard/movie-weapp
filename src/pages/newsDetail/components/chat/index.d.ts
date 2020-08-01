import { mediaType } from '~utils'
/**
 * 聊天消息界面
 * 
 * list: {
 *  content: '内容',
    type: '消息类型',
    time: '消息时间',
    username: '用户',
    id: '用户id',
    image: '用户头像',
    news: '消息id'
 * }
 * 
 * props: {
 *  list: 信息
 *  mine: 用户id
 *  height: 高度
 *  style: 样式
 *  onScroll: 监听滚动
 *  autoBottom: 是否自动滚动至底部
 *  onPreview: 监听预览模式改变
 * }
 * 
 * state: {
 *  imgList: 图片列表
 *  videoShow: 控制视频组件的显示隐藏
 *  activeVideo: 当前播放的视频
 *  activeScrollItem: 当前获取的消息的id
 *  loadLoading: 加载数据loading
 * }
 */


 export interface IContent<T> {
   text: T 
   image: T 
   video: T 
   audio: T 
 }

 export interface IList {
  type: keyof typeof mediaType
  content: string
  createdAt: string
  _id: string
  origin: {
    _id: string
    username: string
    avatar: string
    isMine: boolean
  }
 }

 export interface INewData extends Exclude<IList, 'createdAt' | 'origin'> {
  loading: boolean
  scrollId?: string
}

 export interface IProps {
  list: Array<INewData>
  height?: number
  style?: any
  onScroll?: (...args: any[]) => any
  autoBottom?: boolean
  onPreview: (status: boolean) => void
 }

 export interface IState {
   videoShow: boolean
   activeVideo: string
   activeScrollItem: string
   loadLoading: boolean
 }