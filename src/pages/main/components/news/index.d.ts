/**
 * 每日上新组件
 * props: {
 *  count: 显示数量
 *  list: 列表内容
 * }
 * 
 * list: {
 *  id: 项目id
 *  title: 项目标题
 *  image: 项目图片
 * }
 */

interface List {
  _id: string,
  name: string,
  poster: string
}

export interface IProps {
  count: number,
  list: Array<List>
}