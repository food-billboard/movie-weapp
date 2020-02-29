import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtDrawer } from 'taro-ui'
import Forms from './form'
import { IProps, IState } from './index.d'

import './index.scss'

export default class Select extends Component<IProps, IState>{

    public state: IState = {
        show: false,
        right: true
    }

    /**
     * 筛选遮罩展示
     */
    public showList() {
        const { show } = this.state
        this.setState({
            show: !show
        }) 
    }

    public render() {
        const { right, show } = this.state
        return (
            <View className='select'>
                <Text className='text'
                    onClick={this.showList}>筛选</Text>
                <AtDrawer
                    show={show}
                    mask
                    right={right}
                    onClose={() => {this.setState({show: false})}}
                    width='300px'
                    className='drawer'
                >
                    <Forms screen={this.props.screen} />     
                </AtDrawer>
            </View>
        )
    }
}