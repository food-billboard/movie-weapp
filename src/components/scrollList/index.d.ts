import { sourceTypeList } from '~utils'
/**
 * 滚动列表组件
 * props: {
 *  sourceType: 资源获取方式
 *  query: 查询参数
 *  fetch: 数据获取方法
 *  header: 顶部偏移距离
 *  bottom: 底部偏移距离
 *  renderContent: 内容渲染
 *  renderHeader: 头部渲染
 *  renderBottom: 底部渲染
 *  divider: 是否需要分隔符
 * }
 * 
 * state: {
 *  data: 数据内容
 *  empty: 判定获取内容是否为空
 *  query: 查询参数
 *  loading: 是否处于loading
 * }
 */

//header定义的同时也需要定义renderHeader才可以显示header信息
//bottom定义的同时也需要定义renderBottom才可以显示bottom信息
//bottom 内的内容只能是固定定位
export interface IProps {
  sourceType: keyof typeof sourceTypeList,
  style?: any
  autoFetch?: boolean
  query?: any,
  fetch: (...args: any[]) => any
  header?: false | number
  bottom?: false | number
  renderContent?: any
  renderHeader?: any
  renderBottom?: any
  divider?: boolean
}

export interface IState {
  data: Array<any>
  empty: boolean
  query: any
  loading: boolean
}