import Taro, {Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import GScrollView from '~components/scrollList'

import './index.scss'

import { throttle } from 'lodash'

import {router} from '~utils'
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any>{

    public state = {
        attention: []
    }

    //用户id
    readonly id = this.$router.params.id

    public static config: Config = {
        navigationBarTitleText: '关注'
    }

    public constructor() {
        super(...arguments)

        this.fetchData = this.fetchData.bind(this)
        this.throttleFetchData = this.throttleFetchData.bind(this)
        this.getUser = this.getUser.bind(this)
    }

    /**
     * 获取数据
     */
    public fetchData = async (query: any, isInit=false) => {
        const { attention } = this.state
        const data = await this.props.getAttention({id: this.id, ...query})
        let newData
        if(isInit) {
            newData = [ ...data ]
        }else {
            newData = [ ...attention, ...data ]
        }
        await this.setState({
            attention: newData
        })
        return data
    }

    /**
     * 节流数据获取
     */
    public throttleFetchData = throttle(this.fetchData, 2000)

    /**
     * 获取用户信息
     */
    public getUser(id: string) {
        router.push('/user', {id})
    }

    public render() {
        const { attention } = this.state

        return (
            <GScrollView 
                sourceType={'Scope'}
                scrollWithAnimation={true}
                query={{pageSize: 20}}
                renderContent={<View>
                    {
                        attention.map((value) => {
                            const {image, name, id} = value  
                            return (
                                <View className='list'
                                    key={id}
                                    onClick={this.getUser.bind(this, id)}    
                                >
                                    <Image src={image} className='img'></Image>
                                    <View className='username' >
                                        {name}
                                    </View>
                                    <Text className='enter'>></Text>
                                </View>
                            )
                        })
                    }
                </View>}
                fetch={this.throttleFetchData}
            ></GScrollView>
        )
    }
}