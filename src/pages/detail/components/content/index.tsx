import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import GRate from '~components/rate'
import './index.scss'
import { AtModal } from 'taro-ui'

interface sendRate {
    (value: string): void
}

interface IProps {
    info: Info,
    sendRate: sendRate
}

interface Info {
    name: string,
    area: string,
    people: string,
    director: Array<string>,
    actor: Array<string>,
    type: Array<string>,
    time: string,
    publishTime: string,
    language: string,
    description: string,
    hot: number,
    rate:number
}

export default class Content extends Component<IProps>{
    public static defaultProps = {
        info: {
            name: '',
            area: '',
            people: '',
            director: [],
            actor: [],
            type: [],
            time: '',
            publishTime: '',
            language: '',
            description: '',
            hot: 0,
            rate:0
        },
        sendRate: () => {}
    }   

    public state = {
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
        console.log('描述文字详情')
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
            rate=0
        } = info
        return (
            <View className='content'>
                <View className='title'>
                    {name}
                </View>
                <View className='main'>
                    <View className='main-rate'>
                        <GRate 
                            value={rate} 
                            sendRate={this.props.sendRate}
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
                            <View className='at-col at-col-5 lan'>
                                语言: <Text className='text'>{language}</Text>
                            </View>
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