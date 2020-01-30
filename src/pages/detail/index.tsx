import Taro, {Component, Config} from '@tarojs/taro'
import { View } from '@tarojs/components'
import GVideo from './components/video'
import List from './components/imglist'
import Content from './components/content'
import GButton from '~components/button'
import './index.scss'

import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {
    public config: Config = {
        navigationBarTitleText: "详情"
    }

    private detail

    readonly id = this.$router.params.id

    public componentDidMount = async() => {
        const {params} = this.$router
        Taro.showLoading({ mask: true, title: '加载中' })
        const detail = await this.props.getDetail(params.id)
        this.detail = detail
        Taro.hideLoading()
    }

    public constructor() {
        super(...arguments)
        this.sendRate = this.sendRate.bind(this)
    }

    public sendRate = async (value: string) => {
        const {id, detail} = this.props
        Taro.showLoading({mask: true, title: '评分中'})
        await this.props.sendRate(value, id, detail.id)
        Taro.hideLoading()
    }

    public render() {
        const {
            video,
            info,
            image
        } = this.detail
        //video数据
        const {
            src='',
            poster='',
            id=''
        } = video
        return (
            <View className='detail'>
                <View className='video'>
                    <GVideo
                        src={src}
                        poster={poster}
                        id={id}
                    />
                </View>
                <View className='description'>
                    <Content
                        info={info}
                        sendRate={this.sendRate}
                    />
                </View>
                <View className='image'>
                    <List 
                        list={image}
                    />
                </View>
                <View className='other'>
                    多少人评论了, 改一下按钮级别
                    <GButton />
                </View>
            </View>
        )
    }
}