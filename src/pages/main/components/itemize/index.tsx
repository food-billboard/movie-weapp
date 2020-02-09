import Taro, {Component} from '@tarojs/taro'
import { AtGrid } from 'taro-ui'
import {router} from '~utils'

import './index.scss'

interface List {
    id: string,
    value: string,
    image: string
}

interface IProps {
    columnNum: number,
    list: Array<List>
}

interface IState {
    idList: Array<string>
}

class Itemize extends Component<IProps>{
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

    public constructor() {
        super(...arguments)
        this.goTo = this.goTo.bind(this)
    }

    /**
     * 分类跳转
     */
    public goTo(item: List, index: number) {
        const { idList } = this.state
        if(!idList.length) return
        const { id } = item
        return router.push('/type', {id})
    }

    public render() {
        const { list, columnNum } = this.props
        return (
            <AtGrid 
                mode='rect' 
                hasBorder={false} 
                data={list} 
                columnNum={columnNum}	
                onClick={this.goTo}
            />
        )
    }
}   

export default Itemize