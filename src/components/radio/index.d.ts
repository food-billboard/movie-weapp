import { Option } from 'taro-ui/@types/radio'
/**
 * 单选表单
 * props: {
 *    radioboxOption: 可选项
 *    active: 当前活跃
 *    style: 样式
 *    needHiddenList: 是否需要隐藏选项列表
 *    extraFactor: 是否需要额外内容
 *    handleClick: 自定义点击事件
 * }
 * 
 * state: {
 *    active: 当前活跃
 *    show: 是否显示列表
 *    error: 控制错误显示
 * }
 */

 export interface IProps {
  radioboxOption: Array<Option<string>>, 
  active?: false | string, 
  style?: any, 
  needHiddenList?: boolean, 
  extraFactor?: boolean
  handleClick?: (...args: any[]) => any
 }
 
 export interface IState {
    active: string,
    show: boolean,
    error: boolean
 }