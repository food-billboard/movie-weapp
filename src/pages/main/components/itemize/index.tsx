import Taro, { Component } from '@tarojs/taro'
import { AtGrid } from 'taro-ui'
import { router, routeAlias } from '~utils'

export interface List {
  _id: string,
  name: string,
  poster: string
}

export interface IProps {
  columnNum: number,
  list: Array<List>
}

export interface IState {}

const COLUMN_COUNT = 4

class Itemize extends Component<IProps, IState>{
  public static defaultProps:IProps = {
    columnNum: COLUMN_COUNT,
    list: []
  }

  //分类跳转
  public goTo = (item: any, _: number) => router.push(routeAlias.type, { id: item.id })

  public render() {

    const { list, columnNum } = this.props
    
    return (
      <AtGrid
        mode='square'
        hasBorder={false}
        data={list.map(item => {
          const { _id, poster, name } = item
          return {
            id: _id,
            image: poster,
            value: name
          }
        })}
        columnNum={columnNum}
        onClick={this.goTo}
      />
    )
  }
}

export default Itemize