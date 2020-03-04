import Taro, {Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import GScrollView from '~components/scrollList'
import style from '~theme/style'
import { colorStyleChange } from '~theme/color'
import { throttle } from 'lodash'
import { router, routeAlias } from '~utils'
import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

import './index.scss'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any>{

    public state: any = {
        fans: []
    }

    //用户id
    readonly id = this.$router.params.id

    private scrollRef = Taro.createRef<GScrollView>()

    public componentDidShow = () => {
        colorStyleChange()
    }

    public static config: Config = {
        navigationBarTitleText: '粉丝',
        enablePullDownRefresh: true
    }

    //下拉刷新
    public onPullDownRefresh = async () => {
        await this.scrollRef.current!.handleToUpper()
        Taro.stopPullDownRefresh()
    }
    
    //上拉加载
    public onReachBottom = async () => {
        await this.scrollRef.current!.handleToLower()
    }

    /**
     * 获取数据
     */
    public fetchData = async (query: any, isInit=false) => {
        const { fans } = this.state
        const data = await this.props.getUserFans({id: this.id, ...query})
        const _data = data.data
        let newData
        if(isInit) {
            newData = [ ..._data ]
        }else {
            newData = [ ...fans, ..._data ]
        }
        await this.setState({
            fans: newData
        })
        return _data
    }

    /**
     * 节流数据获取
     */
    public throttleFetchData = throttle(this.fetchData, 2000)

    /**
     * 获取用户信息
     */
    public getUser = (id: string) => {
        router.push(routeAlias.user, {id})
    }

    public render() {
        const { fans } = this.state

        return (
            <GScrollView 
                ref={this.scrollRef}
                sourceType={'Scope'}
                scrollWithAnimation={true}
                query={{pageSize: 20}}
                style={{...style.backgroundColor('bgColor')}}
                renderContent={<View>
                    {
                        fans.map((value) => {
                            const {image, name, id} = value  
                            return (
                                <View className={'list'}
                                    style={{...style.border(1, 'disabled', 'solid', 'bottom')}}
                                    key={id}
                                    onClick={this.getUser.bind(this, id)}    
                                >
                                    <Image src={image} className='img'></Image>
                                    <View className={'username'} 
                                        style={{...style.color('primary')}}
                                    >
                                        {name}
                                    </View>
                                    <Text className={'enter'}
                                        style={{...style.color('thirdly')}}
                                    >></Text>
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