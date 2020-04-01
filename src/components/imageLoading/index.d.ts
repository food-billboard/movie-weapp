import { ImageProps } from '@tarojs/components/types/Image'
import { AtActivityIndicatorProps } from 'taro-ui/@types/activity-indicator'
/**
 * 图片加载loading动画
 */

 export interface IProps extends ImageProps {
  loadingProps?: AtActivityIndicatorProps
  border?:false | string
  customStyle?:false | any
  imageStyle?: false | any
  handleClick?: (...args: any[]) => any
 }

 export interface IState {
   loading: boolean
 }