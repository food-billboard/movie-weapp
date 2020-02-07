import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import GRate from '~components/rate'
import GStore from '~components/store'
import { AtModal } from 'taro-ui'

import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

import './index.scss'

interface IProps {
    movie: string
    id: string
    info: Info
    sendRate: (value: any, user: any, movie: any) => any
    sendStore: (user: any, movie: any) => any
}

interface Info {
    name: string
    area: string
    people: number
    director: Array<string>
    actor: Array<string>
    type: Array<string>
    time: string
    publishTime: string
    language: string
    description: string
    hot: number
    rate:number
    store: boolean
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Content extends Component<IProps>{
    public static defaultProps:IProps = {
        movie: '',
        id: '',
        info: {
            name: '',
            area: '',
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
            store: true
        },
        sendRate: () => {},
        sendStore: () => {}
    }   

    public state: any = {
        isOpened: false
    }

    public constructor() {
        super(...arguments)
        this.showDetail = this.showDetail.bind(this)
    }

    /**
     * 显示详情
     */
    public showDetail():void {
        const {isOpened} = this.state
        this.setState({
            isOpened: !isOpened
        })
    }

    //评分
    public sendRate = async (value: string) => {
        const {id='', movie} = this.props
        Taro.showLoading({mask: true, title: '评分中'})
        const rate = await this.props.sendRate(value, id, movie)
        Taro.hideLoading()
        return rate
    }

    //收藏
    public sendStore = async () => {
        const { id='', movie } = this.props
        Taro.showLoading({ mask: true, title: '联系收藏中' })
        const store = await this.props.sendStore(id, movie)
        Taro.hideLoading()
        return store
    }

    public render() {
        const { isOpened } = this.state
        const { info } = this.props
        const {
            name='',
            area='',
            people=0,
            director=[],
            actor=[],
            type=[],
            time=0,
            publishTime=0,
            language='',
            description='',
            hot=0,
            rate=0,
            store=false
        } = info
        return (
            <View className='content'>
                <View className='title'>
                    {name}
                    <GStore
                        handleClick={this.sendStore}
                        store={store}
                    />
                </View>
                <View className='main'>
                    <View className='main-rate'>
                        <GRate 
                            value={rate} 
                            sendRate={this.sendRate}
                        />
                    </View>
                    <View className='main-info'>
                        <View className='actor'>
                            主演: <Text className='text'>{actor.join(' ')}</Text>
                        </View>
                        <View className='at-row at-row__justify--between director-lan'>
                            <View className='at-col at-col-5 director'>
                                导演: <Text className='text'>{director.join(' ')}</Text>
                            </View>
                            {/* <View className='at-col at-col-5 lan'>
                                语言: <Text className='text'>{language}</Text>
                            </View> */}
                        </View>
                        <View className='type'>
                            分类: <Text className='text'>{type.join(' ')}</Text>
                        </View>
                        <View className='at-row at-row__justify--between time-area'>
                            <View className='at-col at-col-5 time'>
                                时间: <Text className='text'>{publishTime}</Text>
                            </View>
                            <View className='at-col at-col-5 area'>
                                地区: <Text className='text'>{area}</Text>
                            </View>
                        </View>
                        <View className='hot'>
                            人气: 
                            <Text className='text'>{hot}</Text>
                            <Text className='hot-text'> 人看过</Text>
                        </View>
                        <View className='description'> 
                            简介: <Text className='text'>{description}</Text>
                            <Text className='description-detail'
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