import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import List from '~components/commentlist'
import GScrollView from '~components/scrollList'
import { throttle } from 'lodash'
import './index.scss'

import {mapDispatchToProps, mapStateToProps} from './connect'
import {connect} from '@tarojs/redux'

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any>{

    public static config: Config = {
        navigationBarTitleText: '我的评论'
    }

    //用户id
    readonly id = this.$router.params.id

    public state: any = {
        comment: []
    }

    /**
     * 获取数据
     */
    public fetchData = async (query: any, isInit=false) => {
        const { comment } = this.state
        const data = await this.props.getUserComment({id: this.id, ...query})
        let newData
        if(isInit) {
            newData = [ ...data ]
        }else {
            newData = [ ...comment, ...data ]
        }
        await this.setState({
            attention: newData
        })
        return comment || []
    }

    /**
     * 节流数据获取
     */
    public throttleFetchData = throttle(this.fetchData, 2000)

    public render() {
        const {comment} = this.state
        const list = comment.map(( value ) => {
            const { id } = value
            return (
                <List 
                    key={id}
                    list={value}
                />
            )
        })
        return (
            <GScrollView 
                sourceType={'Scope'}
                scrollWithAnimation={true}
                renderContent={<View>{list}</View>}
                fetch={this.throttleFetchData}
            ></GScrollView>
        )
    }
}