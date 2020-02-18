/**
 * 搜索框组件
 * props: {
 *  value: 输入框内容
 *  disabled: 控制禁止
 *  hot: 热搜列表
 *  coonfirm: 确认方法
 *  focus: 是否获取焦点
 *  control: 自定义获取焦点触发方法
 * }
 * 
 * state: {
 *  focus: 是否获取焦点
 *  vlaue: 输入框内容
 * }
 */

interface Hot {
  name: string,
  id: string
}

export interface IProps {
  value: string,
  disabled: boolean,
  hot: Array<Hot>,
  confirm: any
  focus?: boolean
  control?: (op: boolean) => any
}

export interface IState {
  focus: boolean
  value?: string
}