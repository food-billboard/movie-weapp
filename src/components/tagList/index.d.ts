import { AtTagProps } from 'taro-ui/@types/tag'

export interface Item {
  name:string
  key: string
}

export interface IProps extends AtTagProps {
  list: Array<Item>
  error?: boolean
  style?: any
  handleChange: (items: Array<Item>) => any
}

export interface IState {

}