import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'

import './index.scss'

export interface IProps {
    screen: () => any
  }
  
  export interface IState {
    active: boolean
  }

export default class Methods extends Component<IProps, IState>{
    public static defaultProps = {
        screen: () => {}
    }

    public state: IState = {
        active: true
    }

    public change = () => {
        const { active } = this.state
        this.setState({
            active: !active
        })
        this.props.screen()
    }

    public render() {
        const { active } = this.state 
        return (
            <View 
                className={`at-icon at-icon-${active ? 'list' : 'image'}`}
                onClick={this.change}
            ></View>
        )
    }
}