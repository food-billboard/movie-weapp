import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import IconList from '~components/iconlist'
import LinearList from '~components/list'
import GScrollView from '~components/scrollList'
import Fab from './components/fab'
import { throttle } from 'lodash'

import { connect } from '@tarojs/redux'
import { mapStateToProps, mapDispatchToPrps } from './connect'

import './index.scss'

const INIT_QUERY = { currPage: 1, pageSize: 10 }

@connect(mapStateToProps, mapDispatchToPrps)
export default class Index extends Component<any> {

    public config:Config = {
        navigationBarTitleText: "分类"
    }

    public state = {
        typeDetail: []
    }

    //电影分类id
    private _id

    public get id() {
        return this._id || ''
    }

    public set id(id: string) {
        this._id = id
    }

    public scrollRef = Taro.createRef<GScrollView>()

    public fabRef = Taro.createRef<Fab>()

    public componentDidMount = async () => {
        const {params} = this.$router
        this.id = params.id || ''
    }

    /**
     * 获取数据
     */
    public fetchData = async (query: any, isInit=false) => {
        const { typeDetail } = this.state
        const data = await this.props.getTypeDetail({id: this.id, ...query})
        let newData
        if(isInit) {
            newData = [ ...data ]
        }else {
            newData = [ ...typeDetail, ...data ]
        }
        await this.setState({
            typeDetail: newData
        })
        return typeDetail || []
    }

    /**
     * 节流数据获取
     */
    public throttleFetchData = throttle(this.fetchData, 2000)

    //改变当前页面路由
    public getTypeDetail = async(id: string) => {
        this.id = id
        this.scrollRef.current!.fetchData({INIT_QUERY}, true)
    }

    //获取查看方式
    public getShowState = () => {
        this.fabRef.current!.listShow || true
    }

    public render() {
        const { typeDetail } = this.state
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
            <GScrollView
                sourceType={'Scope'}
                scrollWithAnimation={true}
                renderContent={this.getShowState.bind(this) ? <LinearList list={typeDetail} /> : <IconList list={typeDetail} />}
                fetch={this.throttleFetchData}
                header={80}
                renderHeader={ <View className='header-type'>
                                    <Text className='text'>分类: </Text>
                                    <ScrollView 
                                        scrollX={true}
                                        className='header'
                                    >
                                        {headerList}
                                    </ScrollView>
                            </View>}
                bottom={0}
                renderBottom={ <View className="btn">
                                <Fab ref={this.fabRef} />
                              </View>}
                ref={this.scrollRef}
            >
            </GScrollView> 
        )
    }
}