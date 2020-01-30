import Taro, { Component, Config } from '@tarojs/taro'
import {View} from '@tarojs/components'
import SearchBar from '~components/searchbutton'
import Head from './components/head'
import Sub from './components/sub'
import List from '~components/list'
import IconList from '~components/iconlist'

import PropTypes from 'prop-types'

import { debounce } from 'lodash'

import './index.scss'

import {connect} from '@tarojs/redux'
import {mapDispatchToProps, mapStateToProps} from './connect'

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends Component<any> {
    public static defaultProps = {
        search: []
    }

    public static propTypes = {
        search: PropTypes.array
    }

    public config: Config = {
        navigationBarTitleText: "搜索",
        navigationBarTextStyle: "black",
        navigationBarBackgroundColor: "#fff"
    }

    public componentDidMount = async () => {
        //需要将搜索的数据在下次进入页面时删除
        Taro.showLoading({mask: true, title: '加载中'})
        await this.props.getHot()
        Taro.hideLoading()
    }

    public state = {
        showList: true
    }

    public constructor() {
        super(...arguments)
        this.screen = this.screen.bind(this)
        this.simpleScreen = this.simpleScreen.bind(this)
        this.showMethod = this.showMethod.bind(this)
    }

    /**
     * 数据筛选
     */
    public screen = async (value:string) => {
        Taro.showLoading({mask: true, title: '查找中'})
        await this.props.factorSelect(value)
        Taro.hideLoading()
    }

    /**
     * 搜索
     */
    public confirm = async (value: string) => {
        Taro.showLoading({mask: true, title: '努力搜索中'})
        await this.props.search(value)
        Taro.hideLoading()
    }

    /**
     * 防抖搜索
     */
    public debounceConfirm = debounce(this.confirm, 2000)

    /**
     * 价格等筛选
     */
    public simpleScreen = async (value: string) => {
        Taro.showLoading({mask: true, title: '努力搜索中'})
        await this.props.sort(value)
        Taro.hideLoading()
    }

    /**
     * 展示方式切换
     */
    public showMethod() {
        const {showList} = this.state
        this.setState({
            showList: !showList
        })
    }

    public render() {
        const { showList } = this.state
        const { hot, search } = this.props
        return (
            <View className='search'>
                <View className='search-head'>
                    <SearchBar 
                        confirm={this.debounceConfirm} 
                        hot={hot}
                    />
                </View>
                <View className='search-main'>
                    <View className='head'>
                        <Head screen={this.screen} />
                    </View>
                    <View className='head-sub'>
                        <Sub 
                            simpleScreen={this.simpleScreen} 
                            showMethod={this.showMethod}
                        />
                    </View>
                    <View className='main'>
                        {showList ? <List list={search} /> : <IconList list={search} />}
                    </View>
                </View>
            </View>
        )
    }
}