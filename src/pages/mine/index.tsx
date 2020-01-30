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

    public state = {
        setting: {
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
            }
        }
    }   

    public componentWillMount = () => {
        const params = this.$router.params
        if(!params.id) {
            router.replace('/login')
        }
    }

    public componentDidMound = async () => {
        const params = this.$router.params
        Taro.showLoading({ mask: true, title: '加载中' })
        await this.props.getUserInfo(params.id)
        Taro.hideLoading()
    }

    public render() {
        const {id, info} = this.props
        const {setting} = this.state
        return (
            <View className='mine'>
                <View className='head'>
                    <IconHead
                        list={info}
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
                            list={[setting]}
                        />
                    </View>
                </View>
            </View>
        )
    }
}