import { AtNoticeBarProps } from 'taro-ui/@types/noticebar'
/**
 * 跑马灯
 */

 export interface IProps extends AtNoticeBarProps {
  text: string
  handleClose?: () => any
  handleMore?: () => any
 }

 export interface IState {
  show: boolean
  modalShow: boolean
 }