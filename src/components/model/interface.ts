/**
 * 模态框组件
 * props: {
 *  info: 模态框内容
 * }
 * 
 * info: {
 *  isOpen: 控制模态框的显示隐藏
 *  title: 标题
 *  cancelText: 取消文字
 *  confirmText: 确认文字
 *  onClose: 关闭触发
 *  onCancel: 取消触发
 *  onConfirm: 确认触发
 *  content: 主要内容
 * }
 */

interface Info {
  isOpen: boolean,
  title: string,
  cancelText?: string,
  confirmText: string,
  onClose?: () => any,
  onCancel?: () => any,
  onConfirm: () => any,
  content: string
}

export interface IProps {
  info: Info
}