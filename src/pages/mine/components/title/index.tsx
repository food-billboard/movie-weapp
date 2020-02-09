import Taro, {Component, connectSocket} from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

import {router} from '~utils'

interface IProps {
    id: string,

}

export default class Title extends Component<IProps>{
    public static defaultProps = {
        id: ''
    }

    public constructor() {
        super(...arguments)
        this.handleClick = this.handleClick.bind(this)
    }

    public handleClick(value) {
        const {id} = this.props
        switch(value) {
            case '收藏':
                router.push('/record', {id})
                break;
            case '通知':
                router.push('/news', {id})
                break;
        }
    }

    public render(){
        return (
            <View className='title at-row at-row__justify--around'>
                <View className='message at-col at-col-5'
                    onClick={() => {this.handleClick.call(this, '收藏')}}
                >
                    <AtIcon value='message' size='30' color='#F00'></AtIcon>
                    <Text className='text'>收藏</Text>
                </View>
                <View className='separate'></View>
                <View className='folder at-col at-col-5'
                    onClick={() => {this.handleClick.call(this, '通知')}}
                >
                    <AtIcon value='folder' size='30' color='#F00'></AtIcon>
                    <Text className='text'>通知</Text>
                </View>
            </View>
        )
    }
}