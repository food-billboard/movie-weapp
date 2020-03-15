import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtRate } from 'taro-ui'
import GRate from '../rate'
import GStore from '../store'
import Ellipsis from '~components/ellipsis'
import { formatTime, formatNumber, ItypeList } from '~utils'
import { IProps, IState } from './index.d'
import style from '~theme/style'
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'
import { SYSTEM_PAGE_SIZE } from '~config'

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
            rateMine: 0,
            store: false,
            mine: '',
            author: ''
        },
        sendRate: () => {},
        sendStore: () => {},
        getUserInfo: () => {}
    }   

    //我的id
    readonly id = this.props.id
    
    public render() {
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
            rateMine,
            store,
            mine,
            author
        } = info
        return (
            <View className='content'>
                <View
                    className={'title at-row'}
                    style={{...style.color('primary')}}
                >
                    <View className='title-name at-col at-col-10'>
                        {name}
                    </View>
                    <View className='title-store at-col at-col-2'>
                        <GStore
                            movie={movie}
                        />
                    </View>
                </View>
                <View className='main'>
                    <View className='main-rate'>
                        <GRate
                            movie={movie}
                        />
                    </View>
                    <View className='main-rate'>
                        <View className='up-rate'>楼主评分: </View>
                        <View className='at-row at-row__align--center'>
                            <View className='at-col at-col-9'>
                                <AtRate
                                    value={rateMine}
                                    max={10}
                                    size={SYSTEM_PAGE_SIZE(20)}
                                ></AtRate>
                            </View>
                            <View className='at-col at-col-1 main-rate-number'>
                                {rateMine}
                            </View>
                        </View>
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
                        <View className='director'>
                            <View className='at-col director-content'>
                                导演: <Text className={'text'}
                                        style={{...style.color('primary')}}
                                >{director.map((val: ItypeList) => {
                                    const { value } = val
                                    return value
                                }).join(' ')}</Text>
                            </View>
                        </View>
                        <View className='type'>
                            分类: <Text className={'text'}
                                style={{...style.color('primary')}}
                            >{type.map((val: ItypeList) => {
                                const { value } = val
                                return value
                            }).join(' ')}</Text>
                        </View>
                        <View className='at-row at-row__justify--between time-publish'>
                            <View className='at-col at-col-5 publish'>
                                时间: <Text className={'text'}
                                    style={{...style.color('primary')}}
                                >{formatTime(publishTime)}</Text>
                            </View>
                            <View className='at-col at-col-5 time'>
                                上映: <Text className={'text'}
                                    style={{...style.color('primary')}}
                                >{formatTime(time)}</Text>
                            </View>
                        </View>
                        <View className='at-row at-row__justify--between area-lang'>
                            <View className='at-col at-col-5 lang'>
                                语言: <Text className={'text'}
                                    style={{...style.color('primary')}}
                                >{language}</Text>
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
                            <Text className='hot-text' style={{...style.color('thirdly')}}> 人收藏</Text>
                        </View>
                        <View className='look'>
                            浏览: 
                            <Text className={'text'}
                                style={{...style.color('primary')}}
                            >{formatNumber(people)}</Text>
                            <Text className='look-text' style={{...style.color('thirdly')}}> 人看过</Text>
                        </View>
                        <View className='author'>
                            作者: 
                            <Text className={'text'}
                                style={{...style.color('primary')}}
                            >{author}</Text>
                            <Text className='hot-text' style={{...style.color('thirdly')}}></Text>
                        </View>
                        <View className='description'
                            style={{...style.border(1, 'disabled', 'dashed', 'left_right'), marginBottom: '10px'}}
                        > 
                            简介: 
                            <Ellipsis
                                text={description}
                                style={{lineHeight: SYSTEM_PAGE_SIZE(25) + 'px', ...style.color('primary')}}
                                needPoint={true}
                            ></Ellipsis>
                        </View>
                        <View   
                            className='mine description'
                            style={{...style.border(1, 'disabled', 'dashed', 'left_right')}}
                        >
                            楼主认为: 
                            <Ellipsis
                                text={mine}
                                style={{lineHeight: SYSTEM_PAGE_SIZE(25) + 'px', ...style.color('primary')}}
                                needPoint={true}
                            ></Ellipsis>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}