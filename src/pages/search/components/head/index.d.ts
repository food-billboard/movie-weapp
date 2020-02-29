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
  id: symbol
}

export interface IState {
  current: number
}

export const all = Symbol('all')
export const fee = Symbol('fee')
export const free = Symbol('free')

export const idList = {
  [all]:'all',
  [fee]: 'fee',
  [free]: 'free'
}