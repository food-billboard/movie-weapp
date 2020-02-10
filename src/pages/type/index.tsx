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
let FIRST = true

@connect(mapStateToProps, mapDispatchToPrps)
export default class Index extends Component<any> {

    public config:Config = {
        navigationBarTitleText: ""
    }

    public state = {
        typeDetail: [],
        type: [],
        listShow: true
    }

    //电影分类id
    private _id

    public get id() {
        return this._id || ''
    }

    public set id(id: string) {
        this._id = id
        this.setTitle(id)
    }

    public scrollRef = Taro.createRef<GScrollView>()

    public fabRef = Taro.createRef<Fab>()

    public componentDidMount = async () => {
        await this.fetchTypeData()
        const {params} = this.$router
        this.id = params.id || ''
    }

    /**
     * 获取数据
     */
    public fetchData = async (query: any, isInit=false) => {
        const { typeDetail } = this.state
        const data = await this.props.getTypeDetail({id: this.id, ...query})
        const _data = data.detail
        let newData
        if(isInit) {
            newData = [ ..._data ]
        }else {
            newData = [ ...typeDetail, ..._data ]
        }
        await this.setState({
            typeDetail: newData
        })
        return _data
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
    public listChange = () => {
        const { listShow } = this.state
        this.setState({
            listShow: !listShow
        })
    }

    //获取分类列表
    public fetchTypeData = async () => {
        const type = await this.props.getSwitch()
        const data = type.switch
        await this.setState({
            type: data
        })
    }

    //设置标题
    public setTitle = (id: string) => {
        const { type } = this.state
        const target: any = type.filter((val: any) => {
            return val.id === id
        })
        const title = target.length ? target[0].value : '分类'
        Taro.setNavigationBarTitle({title})
    }

    public render() {
        const { typeDetail, listShow, type } = this.state
        return (
            <GScrollView
                sourceType={'Scope'}
                scrollWithAnimation={true}
                renderContent={
                    <View>
                        {
                            listShow ? (<LinearList list={typeDetail} />) : (<IconList list={typeDetail} />)
                        }
                    </View>
                }
                fetch={this.throttleFetchData}
                header={80}
                renderHeader={ <View className='header-type'>
                                    <Text className='text'>分类: </Text>
                                    <ScrollView 
                                        scrollX={true}
                                        className='header'
                                    >
                                        {
                                            type.map((val) => {
                                                const { value, id } = val
                                                return (
                                                    <View 
                                                        className='header-list'
                                                        key={id}
                                                        onClick={(e) => {this.getTypeDetail.call(this, id)}}
                                                    >   
                                                        {value}
                                                    </View>
                                                )
                                            })
                                        }
                                    </ScrollView>
                            </View>}
                bottom={0}
                renderBottom={ <View className="btn">
                                <Fab value={listShow} change={this.listChange} />
                              </View>}
                ref={this.scrollRef}
            >
            </GScrollView> 
        )
    }
}