import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import List from '~components/newsheader'
import GScrollView from '~components/scrollList'
import { throttle } from 'lodash'

import {mapDispatchToProps, mapStateToProps} from './connect'
import {connect} from '@tarojs/redux'
import {router} from '~utils'

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends Component<any> {
    public static config: Config = {
        navigationBarTitleText: "浏览记录"
    }

    public state = {
        record: []
    }

    readonly id = this.$router.params.id

    /**
     * 获取数据
     */
    public fetchData = async (query: any, isInit=false) => {
        const { record } = this.state
        const data = await this.props.getRecord({id: this.id, ...query})
        let newData
        if(isInit) {
            newData = [ ...data ]
        }else {
            newData = [ ...record, ...data ]
        }
        await this.setState({
            attention: newData
        })
        return record || []
    }

    /**
     * 节流数据获取
     */
    public throttleFetchData = throttle(this.fetchData, 2000)

    public render() {
        const { record } = this.state
        const list = record.map(( value ) => {
            const { id } = value
            return (
                <List 
                    content={value}
                    key={id}
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