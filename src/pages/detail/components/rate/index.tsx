import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtRate } from 'taro-ui'
import { IProps, IState } from './index.d'
import style from '~theme/style'
import { SYSTEM_PAGE_SIZE } from '~config'

import './index.scss'

export default class GTate extends Component<IProps, IState>{
    public static defaultProps: IProps = {
        value: 0,
        rate: () => {},
        movie: '',
    }

    /**
     * 监听分数变化
     */
    public handleChange = async (value: number) => {
        await this.props.rate(value)
    }

    public render() {
        const { readonly=false, value } = this.props
        return (
            <View className='rate'>
                {
                    readonly ? 
                    <AtRate
                        className='star'
                        size={SYSTEM_PAGE_SIZE(25)}
                        max={10}
                        value={value}
                    /> 
                    :
                    <AtRate
                        className='star'
                        size={SYSTEM_PAGE_SIZE(25)}
                        max={10}
                        value={value}
                        onChange={(value) => {this.handleChange.call(this, value)}}
                    /> 
                }
                <Text 
                    className='number'
                    style={{...style.color('secondary')}}
                >{value}</Text>
            </View>
        )
    }
}