/**
 * 搜索头
 * props: {
 *  screen: 筛选方法
 * }
 * 
 * state: {
 *  current: 当前活跃key
 *  tablist: tab列表
 * }
 * 
 * tabList: {
 *  title: 标题
 *  id: key
 * }
 */

export interface IProps {
  screen: (value: string) => any
}

export interface TabList {
  title: string,
  id: string
}

export interface IState {
  current: number
}