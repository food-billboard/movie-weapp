/**
 * 搜索框组件
 * props: {
 *  value: 输入框内容
 *  disabled: 控制禁止
 *  hot: 热搜列表
 *  coonfirm: 确认方法
 *  focus: 是否获取焦点
 *  control: 自定义获取焦点触发方法
 *  hotShow: 控制热搜的显示隐藏
 *  handleChange: 处理文字输入
 *  getHot: 获取热搜
 * }
 * 
 * state: {
 *  focus: 是否获取焦点
 *  vlaue: 输入框内容 
 * }
 */

export interface IPoint {
  value: string
}

export interface IProps {
  value: string,
  disabled: boolean,
  confirm: any
  focus?: boolean
  control?: (op: boolean) => any
  handleChange?: (...args: any[]) => any
}

export interface IState {
  focus: boolean
  value?: string
  pointList: Array<IPoint>
}