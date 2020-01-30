import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import IconList from '~components/iconlist'
import LinearList from '~components/list'
import { AtFab } from 'taro-ui'

import {router} from '~utils'
import { connect } from '@tarojs/redux'
import { mapStateToProps, mapDispatchToPrps } from './connect'

import './index.scss'

@connect(mapStateToProps, mapDispatchToPrps)
export default class Index extends Component<any> {
    public config:Config = {
        navigationBarTitleText: "分类"
    }

    public state = {
        listShow: true,
        typeDetail: []
    }

    public componentDidMount = async () => {
        const {params} = this.$router
        Taro.showLoading({
            mask: true,
            title: '加载中...'
        })
        const typeDetail = await this.props.getTypeDetail(params.id)
        await this.setState({
            typeDetail
        })
        Taro.hideLoading()
    }

    public getTypeDetail = async(id: string) => {
        Taro.showLoading({mask: true, title: '稍等一下...'})
        await this.props.getTypeDetail(id)
        Taro.hideLoading()
    }

    public render() {
        const { listShow, typeDetail } = this.state
        const { type } = this.props
        const headerList = type.map((val) => {
            const { value, id } = val
            return (
                <View 
                    className='header-list'
                    key={id}
                    onClick={this.getTypeDetail.bind(this, id)}
                >   
                    {value}
                </View>
            )
        })
        return (
            <View className='type'>
                <View className='header'>
                    <View className='header-type'>
                        <Text className='text'>分类: </Text>
                        <ScrollView 
                            scrollX={true}
                            className='header'
                        >
                            {headerList}
                        </ScrollView>
                    </View>
                </View>
                <View className='main'>
                    {listShow ? <LinearList list={typeDetail} /> : <IconList list={typeDetail} />}
                </View>
                <View className='btn'>
                    <AtFab 
                        onClick={() => {this.setState({listShow: !listShow})}}
                    >
                        <Text className={'at-fab__icon at-icon ' + (listShow ? 'at-icon-bullet-list' : 'at-icon-money')}></Text>
                    </AtFab>
                </View>
            </View>
        )
    }
}