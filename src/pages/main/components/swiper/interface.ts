/**
 * 轮播图组件
 * list: {
 *  id: 图片id
 *  image: 图片
 * }
 * 
 * props: {
 *  list: 图片列表
 * }
 */
interface List {
  id: string,
  image: string
}

export interface IProps {
  list: Array<List>
}