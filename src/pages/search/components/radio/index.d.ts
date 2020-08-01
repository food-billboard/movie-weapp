/**
 * 单选筛选
 * prps: {
 *  screen: 筛选方法
 * }
 * 
 * state: {
 *  value: 当前选择的值
 *  text: 当前选择的文本
 *  show: 控制radio选择
 *  list: 筛选列表
 * }
 * 
 * list: {
 *  label: 显示的值
 *  value: key
 *  id: id
 * }
 */

export interface IProps {
  screen: (value: string) => void
}

export interface IRadio {
  id: string
  label: string
}

export interface List {
  label: string,
  value: string,
  id: string
}

export interface IState {
  value: string,
  text: string,
  show: boolean,
  radioList: Array<List>
}