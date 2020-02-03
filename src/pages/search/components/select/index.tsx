import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtDrawer } from 'taro-ui'
import Form from './form'

import { FormData } from '../../interface'

import './index.scss'

interface IProps {
    screen: (fromData: FormData) => void
}

interface IState {
    show: boolean,
    right: boolean
}

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
                    <Form screen={this.props.screen} />     
                </AtDrawer>
            </View>
        )
    }
}