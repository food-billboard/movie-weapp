import Taro, { Component, Config } from '@tarojs/taro'
import {View} from '@tarojs/components'
import SearchBar from '~components/searchbutton'
import Head from './components/head'
import Sub from './components/sub'
import List from '~components/list'
import IconList from '~components/iconlist'
import GScrollView from '~components/scrollList'

import { debounce, throttle } from 'lodash'
import { FormData } from './interface'

import './index.scss'

import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

//初始化页码参数
const INIT_PAGE = { currPage:1, pageSize: 10 }

//初始化参数
const INIT_QUERY = { type: '', sort: '', query: {} }

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends Component<any> {

    public config: Config = {
        navigationBarTitleText: "搜索",
        navigationBarTextStyle: "black",
        navigationBarBackgroundColor: "#fff"
    }

    public searchBarRef = Taro.createRef<SearchBar>()

    public componentDidMount = async () => {
        //需要将搜索的数据在下次进入页面时删除
        Taro.showLoading({mask: true, title: '加载中'})
        await this.setState({
            hot: [],
            searchList: []
        })
        await this.props.getHot()
        Taro.hideLoading()
    }

    public state = {
        hot: [],
        showList: true,
        searchList: [],
        query: {...INIT_QUERY}
    }

    public constructor() {
        super(...arguments)

        this.typeScreen = this.typeScreen.bind(this)
        this.sortScreen = this.sortScreen.bind(this)
        this.showMethod = this.showMethod.bind(this)
    }

    //数据获取
    public fetchData = async (query: any, isInit=false) => {
        const { searchList } = this.state
        const data = await this.props.factorySearch({...query})
        let newData
        if(isInit) {
            newData = [ ...data ]
        }else {
            newData = [ ...searchList, ...data ]
        }
        await this.setState({
            searchList: newData
        })
        return searchList || []
    }

    /**
     * 字段筛选
     */
    public confirm = async (value: string) => {
        Taro.showLoading({mask: true, title: '努力搜索中'})
        const data = await this.props.factorySearch({ ...INIT_PAGE, query: { query: {}, field: value } })
        await this.setState({
            searchList: data
        })
        Taro.hideLoading()
    }

    /**
     * 分类筛选
     */
    public typeScreen = async (type: string) => {
        const { query } = this.state
        this.setState({
            query: { ...query, type }
        })
        Taro.showLoading({mask: true, title: '筛选中'})
        const data = await this.props.factorSearch({ ...INIT_PAGE, query: { ...INIT_QUERY, ...query, type, field: this.searchBarRef.current!.state!.value || '' } })
        await this.setState({
            searchList: data
        })
        Taro.hideLoading()
    }

    /**
     * 排序筛选
     */
    public sortScreen = async (sort: string) => {
        const { query } = this.state
        this.setState({
            query: { ...query, sort }
        })
        Taro.showLoading({mask: true, title: '努力搜索中'})
        const data = await this.props.factorSearch({ ...INIT_PAGE, query: { ...INIT_QUERY, ...query, sort, field: this.searchBarRef.current!.state!.value || '' } })
        await this.setState({
            searchList: data
        })
        Taro.hideLoading()
    }

    /**
     * 参数筛选
     */
    public queryScreen = async (formData: FormData) => {
        const { query } = this.state
        this.setState({
            query: { ...query, query: formData }
        })
        Taro.showLoading({ mask: true, title: '努力筛选中' })
        const data  = await this.props.factorSearch({ ...INIT_PAGE, query: { ...INIT_QUERY, ...query, query: formData, field: this.searchBarRef.current!.state.value || '' } })
        await this.setState({
            searchList: data
        })
        Taro.hideLoading()
    }

    /**
     * 节流数据获取
     */
    public throttleFetchData = throttle(this.fetchData, 2000)

    /**
     * 防抖搜索
     */
    public debounceConfirm = debounce(this.confirm, 2000)

    /**
     * 展示方式切换
     */
    public showMethod() {
        const {showList} = this.state
        this.setState({
            showList: !showList
        })
    }

    //获取搜索栏是否为选中状态
    public getSearchBarStatus = () => {
        const { current } = this.searchBarRef
        if(!current) return false
        return current!.state.focus
    }

    public render() {
        const { showList, searchList, hot } = this.state
        return (
            <GScrollView
                sourceType={'Scope'}
                scrollWithAnimation={true}
                renderContent={ <View className='search-main' style={{visibility: this.getSearchBarStatus.call(this) ? 'visible' : 'hidden'}}>
                                    <View className='head'>
                                        <Head screen={this.typeScreen} />
                                    </View>
                                    <View className='head-sub'>
                                        <Sub 
                                            sortScreen={this.sortScreen} 
                                            showMethod={this.showMethod}
                                            queryScreen={this.queryScreen}
                                        />
                                    </View>
                                    <View className='main'>
                                        {showList ? <List list={searchList} /> : <IconList list={searchList} />}
                                    </View>
                                </View>}
                fetch={this.throttleFetchData}
                header={71}
                renderHeader={<SearchBar 
                        confirm={this.debounceConfirm} 
                        hot={hot}
                        ref={this.searchBarRef}
                    />}
            >
            </GScrollView>
        )
    }
}