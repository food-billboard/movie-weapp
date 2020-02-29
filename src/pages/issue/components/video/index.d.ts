import { IProps as IVideo } from '~components/video/index.d'
/**
 * 视频选择表单组件
 * props: {
 *  info: 视频信息
 * }
 * 
 * state: {
 *  info: 视频信息
 *  srcError: 控制视频地址选择错误
 *  posterError: 控制视频海报选择错误
 * }
 */

export interface IProps {
  info: IVideo
}

export interface IState {
  info: IVideo
  srcError: boolean
  posterError: boolean
}