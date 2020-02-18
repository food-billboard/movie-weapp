import Taro, { Component } from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { IState, IProps } from './interface'
import './index.scss'

export default class Head extends Component<IProps>{
    public static defaultProps = {
        screen: () => {}
    }

    public state:IState = {
        current: 0,
        tabList: [
            {
                title: '全部',
                id: 'all'
            },
            {
                title: '免费',
                id: 'free'
            },
            {
                title: '付费',
                id: 'fee'
            }
        ]   
    }

    /**
     * 条件筛选
     */
    public handleClick = (value: number) => {
        const { tabList } = this.state
        this.setState({
            current: value
        })
        this.props.screen(tabList[value]['id'])
    }

    public render() {
        const { tabList } = this.state
        const heads = tabList.map((value, index) => {
            const { id } = value
            return (
                <AtTabsPane 
                    current={this.state.current} 
                    index={0} 
                    key={id}
                >
                </AtTabsPane>
            )
        })
        return (
            <AtTabs 
                animated={false}
                current={this.state.current} 
                tabList={tabList} 
                onClick={this.handleClick.bind(this)}
                className='head'    
            >
                {heads}
            </AtTabs>
        )
    }
}