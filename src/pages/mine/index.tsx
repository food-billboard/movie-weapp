import Taro, {Component, Config} from '@tarojs/taro'
import { View } from '@tarojs/components'
import Title from './components/title'
import IconList from './components/icon'
import List from '~components/linearlist'
import IconHead from '~components/headicon'
import './index.scss'

import {router} from '~utils'

import { connect } from '@tarojs/redux'
import { mapStateToProps, mapDispatchToProps } from './connect'

type right = 'right'
const arrow:right = 'right'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any>{

    public static config: Config = {
        navigationBarTitleText: '我的'
    }

    //设置
    readonly setting = [
        {
            title: '设置',
            disabled: false,
            note: '',
            arrow: arrow,
            iconInfo: {
                value: 'bell',
                size: 14, 
                color: '#000'
            },
            handle: () => {
                router.push('/setting')
            },
            id: 'setting'
        }
    ] 

    //用户id
    readonly id = this.$router.params.id

    public state: any = {
        detail: {}
    }

    public componentWillMount = () => {
        if(!this.id) {
            // router.replace('/login')
        }
    }

    public componentDidMount = async () => {
        Taro.showLoading({ mask: true, title: '加载中' })
        const detail = await this.props.getUserInfo()
        const { info } = detail
        Taro.hideLoading()
        await this.setState({
            detail: info
        })
    }

    public render() {
        const { id } = this.props
        const { detail } = this.state
        return (
            <View className='mine'>
                <View className='head'>
                    <IconHead
                        list={detail}
                    />
                </View>
                <View className='main'>
                    <View className='title'>
                        <Title 
                            id={id}
                        />
                    </View>
                    <View className='iconlist'>
                        <IconList
                            id={id}
                        />
                    </View>
                    <View className='list'>
                        <List
                            list={this.setting}
                        />
                    </View>
                </View>
            </View>
        )
    }
}