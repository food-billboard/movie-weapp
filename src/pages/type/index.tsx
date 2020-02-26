import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import IconList from '~components/iconlist'
import LinearList from '~components/list'
import GScrollView from '~components/scrollList'
import Fab from './components/fab'
import { throttle } from 'lodash'
import { style } from '~theme/global-style'
import { connect } from '@tarojs/redux'
import { mapStateToProps, mapDispatchToPrps } from './connect'

import './index.scss'

const INIT_QUERY = { currPage: 1, pageSize: 10 }

const SINGLE_HEADER_HEIGHT = 80

const SCROLL_MAX_SHOW_COUNT = 10

const SHOW_MORE = 'SHOW_MORE'
const HIDE_MORE = 'HIDE_MORE'

const SHOW_TYPE = {
    SHOW_MORE: Symbol('show_more'),
    HIDE_MORE: Symbol('hide_more')
}

@connect(mapStateToProps, mapDispatchToPrps)
export default class Index extends Component<any> {

    public config:Config = {
        navigationBarTitleText: ""
    }

    public state = {
        typeDetail: [],
        type: [],
        listShow: true,
        typeShow: false
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

    //控制详细分类的显示隐藏
    public handleControlTypeDetail = (type: keyof typeof SHOW_TYPE) => {
        let status = false
        if(SHOW_TYPE[type] === SHOW_TYPE.SHOW_MORE) status = true
        this.setState({
            typeShow: status
        })
    }

    public render() {
        const { typeDetail, listShow, type, typeShow } = this.state

        const bgColor = style.backgroundColor('bgColor')

        const showType = type.length <= SCROLL_MAX_SHOW_COUNT

        const list = type.map((val: any) => {
            const { value, id } = val
            return (
                <View 
                    className={'header-list ' + (typeShow ? 'at-col at-col-2' : 'header-list-size')}
                    style={{...style.color('primary')}}
                    key={id}
                    onClick={(e) => {this.getTypeDetail.call(this, id)}}
                >   
                    {value}
                </View>
            )
        })

        const headerHeight = (showType || !typeShow) ? SINGLE_HEADER_HEIGHT : SINGLE_HEADER_HEIGHT * (Math.ceil((type.length + 2) / 6))
        return (
            <GScrollView
                style={{...bgColor}}
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
                header={headerHeight}
                renderHeader={ 
                    <View className='header-type' style={{
                        ...bgColor, 
                        height: headerHeight / 2 + 'px'
                    }}
                    >
                        <Text className='text'
                            style={{...style.color('thirdly'), ...bgColor}}
                        >分类: </Text>
                        {
                            showType || !typeShow ?
                            <ScrollView 
                                scrollX={true}
                                className='header'
                            >
                                {
                                    !showType ?
                                    <View 
                                        className={'header-list header-list-size'}
                                        style={{...style.color('primary'), fontWeight: 'normal'}}
                                        onClick={(e) => {this.handleControlTypeDetail.call(this, SHOW_MORE)}}
                                    >   
                                        展开
                                    </View>
                                    : null
                                }
                                {list}
                            </ScrollView>
                                :
                            <View className='header-type-detail at-row at-row--wrap'>
                                {list}
                                <View 
                                    className={'header-list at-col at-col-2'}
                                    style={{...style.color('primary'), fontWeight: 'normal'}}
                                    onClick={(e) => {this.handleControlTypeDetail.call(this, HIDE_MORE)}}
                                >   
                                    收起
                                </View>
                            </View>
                        }
                    </View>
                }
                bottom={80}
                renderBottom={ <View className="btn">
                                <Fab value={listShow} change={this.listChange} />
                              </View>}
                ref={this.scrollRef}
            >
            </GScrollView> 
        )
    }
}