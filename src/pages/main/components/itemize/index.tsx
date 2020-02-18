import Taro, {Component} from '@tarojs/taro'
import { AtGrid } from 'taro-ui'
import {router} from '~utils'
import { IProps, IState, List } from './interface'

class Itemize extends Component<IProps, IState>{
    public static defaultProps = {
        columnNum: 3,
        list: []
    }

    public componentDidMount = () => {
        //生成id列表
        const {list} = this.props
        let idMap: Array<any> = []
        idMap = list.filter(value => {
            return value.id
        })
        this.setState({
            idList: idMap
        })
    }

    public state:IState = {
        idList:[]
    }

    /**
     * 分类跳转
     */
    public goTo = (item: List, index: number) => {
        const { idList } = this.state
        if(!idList.length) return
        const { id } = item
        return router.push('/type', {id})
    }

    public render() {
        const { list, columnNum } = this.props
        return (
            <AtGrid 
                mode='square' 
                hasBorder={true} 
                data={list} 
                columnNum={columnNum}	
                onClick={this.goTo}
            />
        )
    }
}   

export default Itemize