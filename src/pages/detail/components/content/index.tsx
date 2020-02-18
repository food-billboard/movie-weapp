import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import GRate from '../rate'
import GStore from '../store'
import { AtModal } from 'taro-ui'
import { formatTime, formatNumber, ItypeList } from '~utils'
import { IProps, IState } from './interface'
import { style } from '~theme/global-style'
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

import './index.scss'

@connect(mapStateToProps, mapDispatchToProps)
export default class Content extends Component<IProps, IState>{
    public static defaultProps:IProps = {
        movie: '',
        id: '',
        info: {
            name: '',
            area: [],
            people: 0,
            director: [],
            actor: [],
            type: [],
            time: '',
            publishTime: '',
            language: '',
            description: '',
            hot: 0,
            rate:0,
            store: false,
        },
        sendRate: () => {},
        sendStore: () => {},
        getUserInfo: () => {}
    }   

    //我的id
    readonly id = this.props.id

    public state: IState = {
        isOpened: false
    }

    /**
     * 显示详情
     */
    public showDetail = () => {
        const {isOpened} = this.state
        this.setState({
            isOpened: !isOpened
        })
    }

    public render() {
        const { isOpened } = this.state
        const { info, movie } = this.props
        const {
            name='',
            area=[],
            people=0,
            director=[],
            actor=[],
            type=[],
            time=0,
            publishTime=0,
            language='',
            description='',
            hot=0,
            rate,
            store
        } = info
        return (
            <View className='content'>
                <View
                    className={'title'}
                    style={{...style.color('primary')}}
                >
                    {name}
                    <GStore
                        movie={movie}
                    />
                </View>
                <View className='main'>
                    <View className='main-rate'>
                        <GRate
                            movie={movie}
                        />
                    </View>
                    <View className='main-info'>
                        <View className='actor'>
                            主演: <Text className='text'
                                    style={{...style.color('primary')}}
                                >{actor.map((val: ItypeList) => {
                                const { value } = val
                                return value
                            }).join(' ')}</Text>
                        </View>
                        <View className='at-row at-row__justify--between director-lan'>
                            <View className='at-col at-col-5 director'>
                                导演: <Text className={'text'}
                                        style={{...style.color('primary')}}
                                >{director.map((val: ItypeList) => {
                                    const { value } = val
                                    return value
                                }).join(' ')}</Text>
                            </View>
                            {/* <View className='at-col at-col-5 lan'>
                                语言: <Text className='text'>{language}</Text>
                            </View> */}
                        </View>
                        <View className='type'>
                            分类: <Text className={'text'}
                                style={{...style.color('primary')}}
                            >{type.map((val: ItypeList) => {
                                const { value } = val
                                return value
                            }).join(' ')}</Text>
                        </View>
                        <View className='at-row at-row__justify--between time-area'>
                            <View className='at-col at-col-5 time'>
                                时间: <Text className={'text'}
                                    style={{...style.color('primary')}}
                                >{formatTime(publishTime)}</Text>
                            </View>
                            <View className='at-col at-col-5 area'>
                                地区: <Text className={'text'}
                                    style={{...style.color('primary')}}
                                >{area.map((val: ItypeList) => {
                                    const { value } = val
                                    return value
                                }).join(' ')}</Text>
                            </View>
                        </View>
                        <View className='hot'>
                            人气: 
                            <Text className={'text'}
                                style={{...style.color('primary')}}
                            >{formatNumber(hot)}</Text>
                            <Text className='hot-text'> 人看过</Text>
                        </View>
                        <View className='description'
                            style={{...style.border(1, 'disabled', 'dashed', 'left_right')}}
                        > 
                            简介: <Text className={'text'}
                                style={{...style.color('primary')}}
                            >{description}</Text>
                            <Text className='description-detail'
                                style={{...style.border(1, 'secondary', 'dashed', 'top_bottom'), ...style.backgroundColor('disabled')}}
                                onClick={this.showDetail}
                            >
                                详情>
                            </Text>
                        </View>
                        <AtModal
                            className='introduce'
                            isOpened={isOpened}
                            confirmText='确认'
                            onClose={ () => {this.setState({isOpened: false})}}
                            onConfirm={() => {this.setState({isOpened: false})}}
                            content={description}
                        />
                    </View>
                </View>
            </View>
        )
    }
}