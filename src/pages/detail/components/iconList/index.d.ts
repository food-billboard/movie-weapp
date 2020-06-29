/**
 * 评论用户展示列表组件
 * props: {
 *  list: 列表内容
 *  id: 电影id
 * }
 * 
 * state: {
 *  activeShow: 控制内容显示
 *  active: 当前活跃内容
 * }
 * 
 * list: {
 *  image: 头像
 *  id: 用户id
 *  content: 评论内容
 * }
 */

interface IList {
  image: string
  id: string
  content: string
}

export interface IProps {
  list: Array<IList>
  handleClick?: () => any
}

export interface IState {
  activeShow: boolean
  active: string
}