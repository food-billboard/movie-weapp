/**
 * emoj组件
 * props: {
 *  handleAddEmoj: 添加表情到指定位置
 * }
 * 
 * state: {
 *  show: 控制显示隐藏
 * }
 */

 export interface IProps {
  handleAddEmoj:(value: any) => any
 }

 export interface IState {
  show: boolean
  mode: any
 }