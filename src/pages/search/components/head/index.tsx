import Taro, { Component } from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { IState, IProps, TabList } from './index.d'
import './index.scss'

export const idList = {
    all:'all',
    fee: 'fee',
    free: 'free'
}

export default class Head extends Component<IProps, IState>{
    public static defaultProps = {
        screen: () => {}
    }

    readonly tabList: Array<TabList> = [
        {
            title: '全部',
            id: idList.all
        },
        {
            title: '免费',
            id: idList.free
        },
        {
            title: '付费',
            id: idList.fee
        }
    ]

    public state:IState = {
        current: 0  
    }

    /**
     * 条件筛选
     */
    public handleClick = (value: number) => {
        this.setState({
            current: value
        })
        this.props.screen(idList[this.tabList[value]['id']])
    }

    public render() {
        const heads = this.tabList.map((value, index) => {
            const { id } = value
            return (
                <AtTabsPane 
                    current={this.state.current} 
                    index={0} 
                    key={id.toString()}
                >
                </AtTabsPane>
            )
        })
        return (
            <AtTabs 
                animated={false}
                current={this.state.current} 
                tabList={this.tabList} 
                onClick={this.handleClick.bind(this)}
                className='head'    
            >
                {heads}
            </AtTabs>
        )
    }
}