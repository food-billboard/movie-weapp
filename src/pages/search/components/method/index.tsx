import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import icon from '../../../../assets/icon.png'
import list from '../../../../assets/list.png'

import './index.scss'

export interface IProps {
    screen: () => any
  }
  
  export interface IState {
    change: Array<number>,
    index: number,
    active: number
  }

export default class Methods extends Component<IProps, IState>{
    public static defaultProps = {
        screen: () => {}
    }

    public state: IState = {
        change: [0, 1],
        index: 0,
        active: 0
    }

    /**
     * 状态改变
     */
    public change = () => {
        const {index, change} = this.state
        var i = index
        i ++
        i %= 2
        this.setState({
            active: change[i],
            index: i
        })
        this.props.screen()
    }

    public render() {
        return (
            <View className='method'
                onClick={this.change}>
                <Image className='active' src={this.state.active ? list : icon}></Image>
            </View>
        )
    }
}