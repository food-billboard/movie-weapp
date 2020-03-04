import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtRate } from 'taro-ui'
import { IProps, IState } from './index.d'
import style from '~theme/style'
import './index.scss'

import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

@connect(mapStateToProps, mapDispatchToProps)
export default class GTate extends Component<IProps, IState>{
    public static defaultProps: IProps = {
        getUserInfo: () => {},
        sendRate: () => {},
        getRate: () => {},
        movie: '',
        id: ''
    }

    public state: IState = {
        value: 0
    }

    public componentDidMount = async () => {
        this.fetchData()
    }

    //数据获取
    public fetchData = async () => {
        const rate = await this.props.getRate(this.props.movie)
        const data = rate.rate
        this.setState({
            value: data
        })
    }

    //评分
    public sendRate = async (value: string | number) => {
        this.props.getUserInfo()
        const {movie} = this.props
        Taro.showLoading({mask: true, title: '评分中'})
        await this.props.sendRate(value, this.props.id, movie)
        Taro.hideLoading()
    }

    /**
     * 监听分数变化
     */
    public handleChange = async (value: number) => {
        await this.setState({
            value
        })
        await this.sendRate(value)
    }

    public render() {
        const { value } = this.state
        const { readonly=false } = this.props
        return (
            <View className='rate'>
                {
                    readonly ? 
                    <AtRate
                        className='star'
                        size={25}
                        max={10}
                        value={value}
                    /> 
                    :
                    <AtRate
                        className='star'
                        size={25}
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