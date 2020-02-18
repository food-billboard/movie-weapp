/**
 * 查看方法筛选
 * props: {
 *  screen: 筛选方法
 * }
 * 
 * state: {
 *  change: 查看方式key列表
 *  index:当前key
 *  active: 活跃key
 * }
 */

export interface IProps {
  screen: () => any
}

export interface IState {
  change: Array<number>,
  index: number,
  active: number
}