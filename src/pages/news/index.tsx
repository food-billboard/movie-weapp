import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import './index.scss'
import { style } from '~theme/global-style'
import { mapDispatchToProps, mapStateToProps } from './connect'
import {connect} from '@tarojs/redux'

import {router} from '~utils'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {
    public static config: Config = {
        navigationBarTitleText: "通知"
    }

    public state = {
        news: []
    }

    //用户id
    readonly id = this.$router.params.id

    public componentDidMount = async () => {
        this.fetchData()
    }

    public constructor() {
        super(...arguments)
        this.getDetail = this.getDetail.bind(this)
    }

    //获取详细信息
    public getDetail(id: string) {
        router.push('/user', {id})
    }

    //获取数据
    public fetchData = async () => {
        Taro.showLoading({mask: true, title: '加载中'})
        const news = await this.props.getNews(this.id)  //获取用户通知
        await this.setState({
            news
        })
        Taro.hideLoading()
    }   

    public render() {
        const { news } = this.state
        const list = news.map((value) => {
            const {img, id, username, description} = value
            return (
                <AtListItem
                    className='list'
                    customStyle={{...style.backgroundColor('disabled')}}
                    key={id}
                    title={username}
                    arrow='right'
                    thumb={img}
                    extraText={description}
                    onClick={this.getDetail.bind(this, id)}
                />
            )
        })
        return (
            <View className='news'>
                <AtList>
                    {list}
                </AtList>
            </View>
        )
    }
}