import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { Text, View } from '@tarojs/components'
import { AtFab  } from 'taro-ui'

import { throttle } from 'lodash'

import './index.scss'

interface ITopProps {
    content?: any
}

interface ITopState {
    size: normal | small
}

interface IContentProps {

}

type normal = 'normal'
type small = 'small'
const small:small = 'small'
const normal:normal = 'normal'

class Content extends Component<IContentProps> {
    public render() {
        return (
            <View className='at-fab__icon at-icon at-icon-home'></View>
        )
    }
}

export default class Top extends Component<ITopProps> {

    private _top:number = 0

    public get top() {
        return this._top
    }

    public set top(top:number) {
        if(this._top == 0 && top === 0) return 
        this._top = top
    }

    public state:ITopState = {
        size: small
    }

    public constructor() {
        super(...arguments)

        this.handlerClick = this.handlerClick.bind(this)
        this.throttleClick = this.throttleClick.bind(this)
    }

    public handlerClick() {
        const that = this
        this.setState({
            size: normal
        })
        this._top = 0
        // Taro.pageScrollTo({
        //     scrollTop: 0
        // })
        let timer = setTimeout(() => {
            that.setState({
                size: small
            })
            clearTimeout(timer)
        }, 3000)
    }

    public throttleClick = throttle(this.handlerClick, 2000)

    public render() {
        const { size } = this.state
        const { content } = this.props
        return (
            <View className='btn'>
                <AtFab
                    onClick={this.throttleClick}
                    size={size}
                >   
                    {content ? content : Content}
                </AtFab>
            </View>
        )
    }
}