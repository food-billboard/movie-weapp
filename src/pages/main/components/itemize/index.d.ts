/**
 * 分类列表组件
 * props: {
 *  columnNum: 每行显示的数目
 *  list: 列表内容
 * }
 * 
 * state: {
 * 
 * }
 * 
 * list: {
 *  id: 项目id
 *  vlaue: 项目名称
 *  image: 项目图标
 * }
 */

export interface List {
  id: string,
  value: string,
  image: string
}

export interface IProps {
  columnNum: number,
  list: Array<List>
}

export interface IState {
  
}