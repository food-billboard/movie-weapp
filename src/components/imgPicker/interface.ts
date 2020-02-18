/**
 * 图片选择表单
 * props: {
 *  files: 已经选择的图片列表
 *  mode: 图片查看模式
 *  multiple: 是否允许多选图片
 *  length: 一行显示的最大图片长度
 * }
 * 
 * state: {
 *  files: 选择的图片列表
 *  showAddBtn: 控制添加图片按钮的显示隐藏
 *  error: 控制表单错误的样式
 * }
 * 
 * files: {
 *  url: 图片地址
 * }
 */

interface IFiles {
  url: string
}

export interface IProps {
  files?: Array<IFiles> | false
  mode?: 'scaleToFill'|'aspectFit'|'aspectFill'|'widthFix'|'top'|'bottom'|'center'|'left'|'right'|'top left'|'top right'|'bottom left'|'bottom right'
  multiple?: boolean
  length?: number
}

export interface IState {
  files: Array<IFiles>
  showAddBtn: boolean
  error: boolean
}