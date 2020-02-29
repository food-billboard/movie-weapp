/**
 * 时间倒计时组件
 * props: {
 *  getData: 获取数据
 *  phone: 电话
 * }
 * 
 * state: {
 *  text: 文本内容
 *  open: 控制启用状态
 * }
 */

export interface IState {
  text: string,
  open: boolean
}

export interface IProps {
  getData: () => any,
  phone: string 
}