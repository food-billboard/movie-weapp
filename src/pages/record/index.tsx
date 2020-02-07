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
        navigationBarTitleText: "收藏",
        enablePullDownRefresh: true
    }

    public state = {
        record: []
    }

    //用户id
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
            record: newData
        })
        return data
    }

    /**
     * 节流数据获取
     */
    public throttleFetchData = throttle(this.fetchData, 2000)

    public render() {
        const { record } = this.state
        // const list = record.map(( value ) => {
        //     const { id } = value
        //     return (
        //         <List 
        //             content={value}
        //             key={id}
        //         />
        //     )
        // })
        return (
            <GScrollView 
                sourceType={'Scope'}
                scrollWithAnimation={true}
                renderContent={<View>
                    {
                        record.map(val => {
                            const { id } = val
                            return <List content={val} key={id} />
                        })
                    }
                </View>}
                fetch={this.throttleFetchData}
            ></GScrollView>
        )
    }
}