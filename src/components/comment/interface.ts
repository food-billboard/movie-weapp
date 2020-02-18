/**
 * 评论组件
 * props: {
 *  buttonText: 按钮内容
 *  publishCom: 内容提交处理方法
 * }
 *
 * state: {
 *  value: 输入框内容
 *  isOpen: 控制组件的显示隐藏
 * }
 */

export interface IProps {
  buttonText: string,
  publishCom: (value: any) => any
}

export interface IState {
  value: string
  isOpen: boolean
}