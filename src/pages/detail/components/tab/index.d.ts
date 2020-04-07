import { AtSegmentedControlProps } from 'taro-ui/@types/segmented-control'
/**
 * tab组件
 */


 export interface IProps extends Pick<AtSegmentedControlProps, 'color' | 'selectedColor' | 'fontSize' | 'disabled' | 'values'>{
  handleClick?: (value: any) => void
  current?: number
  tabToggle?: false | number
 }

 export interface IState {
   current: number
 } 