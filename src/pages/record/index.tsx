import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import List from '~components/newsheader'
import GScrollView from '~components/scrollList'
import { throttle } from 'lodash'
import style from '~theme/style'
import { colorStyleChange } from '~theme/color'
import { getCustomerGlance, getUserGlance } from '~services'

export default class Index extends Component<any> {
    public static config: Config = {
        navigationBarTitleText: "浏览记录",
        enablePullDownRefresh: true
    }

    public state: any = {
        record: []
    }

    //用户id
    readonly id = this.$router.params.id

    private scrollRef = Taro.createRef<GScrollView>()

    public componentDidShow = () => {
        colorStyleChange()
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
        const { record } = this.state
        const method = this.id ? getUserGlance : getCustomerGlance
        const args = this.id ? { id: this.id } : {}
        const data = await method({ ...args, ...query })

        let newData
        if(isInit) {
            newData = [ ...data ]
        }else {
            newData = [ ...record, ...data ]
        }
        this.setState({
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
        return (
            <GScrollView 
                ref={this.scrollRef}
                style={{...style.backgroundColor('bgColor')}}
                sourceType={'Scope'}
                scrollWithAnimation={true}
                renderContent={<View>
                    {
                        record.map(val => {
                            const { _id, poster, name, description } = val
                            return <List content={{
                                name,
                                detail: description,
                                image: poster,
                                id: _id
                            }} key={_id} />
                        })
                    }
                </View>}
                fetch={this.throttleFetchData}
            ></GScrollView>
        )
    }
}