
/**
 * 色调选择
 * props: {
 *  style: 样式
 *  handleClick: 自定义选择点击
 * }
 * 
 * state: {
 *  active: 当前活跃
 *  color: 列表内容
 * }
 */

 export interface IProps {
  style?: any
  handleClick?: (val: any) => any
 }

 export interface IState {
   active: string
   color: Array<string>
 }