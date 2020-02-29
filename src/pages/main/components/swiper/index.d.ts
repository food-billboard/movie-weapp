import { swiperRouteType } from '~utils'
/**
 * 轮播图组件
 * list: {
 *  id: 图片id
 *  image: 图片
 *  type: 路由类型
 * }
 * 
 * props: {
 *  list: 图片列表
 * }
 */
interface List {
  id: string,
  image: string
  type: keyof typeof swiperRouteType
}

export interface IProps {
  list: Array<List>
}