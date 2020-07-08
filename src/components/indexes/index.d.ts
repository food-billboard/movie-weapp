export interface Item {
  name: string

  [propName: string]: any
}

interface ListItem {
  title: string

  key: string

  items: Array<Item>
}

export interface IProps {
  animation?: boolean
  isVibrate?: boolean
  isShowToast?: boolean
  list: Array<ListItem>
  topKey?: string
  handleClick?: (item: Item) => void
}

export interface IState {

}