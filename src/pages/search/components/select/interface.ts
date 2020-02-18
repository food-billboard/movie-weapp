import { FormData } from '../../interface'
/**
 * 详细筛选
 * props: {
 *  screen: 筛选方法
 * }
 * 
 * state: {
 *  show: 控制表单的显示隐藏
 *  right: 控制表单的出现位置
 * }
 */

export interface IProps {
  screen: (fromData: FormData) => void
}

export interface IState {
  show: boolean,
  right: boolean
}