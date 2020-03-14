/**
 * 聊天输入框
 * 
 * props: {
 *  userInfo: 用户信息
 *  disabled: 控制输入禁止
 *  placeholder: 占位内容
 *  sendInfo: 发送消息
 *  onHeightChange: 监听高度变化
 *  onFocus: 监听输入框获取焦点
 * }
 * 
 * state: {
 *  inputDisabled: 禁止用户输入
 *  detailFunc: 控制详细功能的显示隐藏
 *  inputValue: 输入框内容
 *  autoHeight: 输入框是否自动适应高度
 *  height: 聊天框高度
 *  lifeStatus: 聊天框是否聚焦
 * }
 * 
 * videoType: {
 *  image: 海报地址
 *  video: 视频地址
 * }
 */

 export interface IProps {
  userInfo: any
  disabled?: boolean
  placeholder?: string
  sendInfo: (...args: any[]) => any
  onHeightChange?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
 }

 export interface IState {
  inputDisabled: boolean
  detailFunc: boolean
  inputValue: string
  autoHeight: boolean
  // lifeStatus: boolean
 }

 export interface IVideoType {
  image: string,
  video: string
 }