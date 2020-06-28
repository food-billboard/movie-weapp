import Taro, {Component} from '@tarojs/taro'
import { AtGrid } from 'taro-ui'
import { router, routeAlias } from '~utils'
import { IProps, IState, List } from './index.d'

const COLUMN_COUNT = 4

class Itemize extends Component<IProps, IState>{
    public static defaultProps = {
        columnNum: COLUMN_COUNT,
        list: []
    }

    //分类跳转
    public goTo = (item: any, _: number) => {
        const { id } = item
        return router.push(routeAlias.type, { id })
    }

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