import Taro, {Component} from '@tarojs/taro'
import { AtGrid } from 'taro-ui'
import {router} from '~utils'
import { IProps, IState, List } from './interface'

const COLUMN_COUNT = 4

class Itemize extends Component<IProps, IState>{
    public static defaultProps = {
        columnNum: COLUMN_COUNT,
        list: []
    }

    public state:IState = {
       
    }

    /**
     * 分类跳转
     */
    public goTo = (item: List, index: number) => {
        const { id } = item
        return router.push('/type', {id})
    }

    public render() {
        const { list, columnNum } = this.props
        return (
            <AtGrid 
                mode='square' 
                hasBorder={false} 
                data={list} 
                columnNum={columnNum}	
                onClick={this.goTo}
            />
        )
    }
}   

export default Itemize