/**
 * 价格选择
 */

 export interface IProps {
  value: {
    max: string
    min: string
  }
  onChange: (...args: any[]) => any
 }

 export interface IState {
  disabled: boolean
 }