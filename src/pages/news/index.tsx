import Taro, {Component, Config} from '@tarojs/taro'
import { AtList, AtListItem, AtSwipeAction } from "taro-ui"
import { colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { mapDispatchToProps, mapStateToProps } from './connect'
import {connect} from '@tarojs/redux'
import { router, routeAlias, infomationType, formatTime } from '~utils'
import { throttle, findIndex } from 'lodash'

import './index.scss'

const BUTTON_STYLE = [
    {
        text: '已读',
        style: {
            backgroundColor: '#6190E8'
        }
    },
    {
        text: '删除',
        style: {
        backgroundColor: '#FF4949'
        }
    }
]

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component<any> {
    public static config: Config = {
        navigationBarTitleText: "通知",
        enablePullDownRefresh: true
    }

    //用户id
    readonly id = this.$router.params.id

    public state: any = {
        list: {}
    }

    public componentDidShow = () => {
        colorStyleChange()
        this.throttleFetchData()
    }

    //下拉刷新
    public onPullDownRefresh = async () => {
        await this.throttleFetchData()
        Taro.stopPullDownRefresh()
    }

    //获取详细信息
    public getDetail = async (id: string, type: string) => {
        await this.handleReadNews(id)
        switch(infomationType[type]) {
            case infomationType.attention: 
                Taro.showModal({
                    title: '提示',
                    content: '有人关注了你，要不要去看看',
                    success: (res) => {
                        const { confirm } = res
                        if(confirm) router.push(routeAlias.user, {id})
                    }
                })
                break
            case infomationType.app:
                router.push(routeAlias.newsdetail, {id})
                break
        }
    }

    //获取数据
    public fetchData = async () => {
        await this.props.getNews(this.id)
    }   

    //处理消息操作按钮
    public handleOperate = async (target: any, id: string) => {
        const index = findIndex(BUTTON_STYLE, (val) => {
            const { text } = val
            const { text: targetText } = target
            return text === targetText
        })
        if(index == 0) {
            await this.handleReadNews(id)
        }else if(index == 1) {
            await this.handleDeleteNews(id)
        }
    }

    //删除消息
    public handleDeleteNews = async (id: string) => {
        await this.props.deleteNews(id, new Date().getTime())
        this.setState({})
    }

    //已读消息
    public handleReadNews = async (id: string) => {
        await this.props.readNews(id, new Date().getTime())
        this.setState({})
    }

    /* 
    * 节流数据获取
    */
    public throttleFetchData = throttle(this.fetchData, 2000)

    //对数据进行排序
    public sort = () => {
        const { news=[] } = this.props
        const list = [ ...news ]
        list.sort((a: any, b: any) => {
            let aTime = 0
            let aReadTime = 0
            let bTime = 0
            let bReadTime = 0
            a.list.map((aVal: any) => {
                const { time, read } = aVal
                if(read) {
                    if(time > aReadTime) aReadTime = time
                }else {
                    if(time > aTime) aTime = time
                }
            })
            b.list.map((bVal: any) => {
                const { time, read } = bVal
                if(read) {
                    if(time > bReadTime) bReadTime = time
                }else {
                    if(time > bTime) bTime = time
                }
            })
            if(aTime == 0 && bTime != 0) {
                return 1
            }else if(aTime != 0 && bTime == 0) {
                return -1
            }else if(aTime == 0 && bTime == 0) {
                return bReadTime - aReadTime
            }
            return bTime - aTime
        })
        return list
    }

    public render() {
        const { news=[] } = this.props
        const list = this.sort()

        return (
            <AtList>
                {
                    list.map((val: any) => {
                        const { image, id, username, list, type } = val
                        let nearTime = 0
                        let nearUnreadTime = 0
                        let length = 0
                        //筛选未读信息
                        list.map((value: any) => {
                            const { read, time: date } = value
                            if(date > nearTime) {   //最近消息时间获取
                                nearTime = date
                            }
                            if(!read) {
                                if(date > nearUnreadTime) {     //未读最近消息时间
                                    nearUnreadTime = date
                                }
                                length ++   //未读消息数量累计
                            }
                        })
                        
                        return (
                            <AtSwipeAction
                                key={id}
                                onClick={(target) => { this.handleOperate.call(this, target, id) }}
                                options={BUTTON_STYLE}
                                autoClose={true}
                            >
                                <AtListItem
                                    className='list'
                                    customStyle={{...style.backgroundColor('disabled')}}
                                    title={username}
                                    arrow='right'
                                    thumb={image}
                                    extraText={formatTime(length > 0 ? nearUnreadTime : nearTime)}
                                    note={length > 0 ? (`${length}条新消息`) : '无新消息'}
                                    onClick={() => {this.getDetail.call(this, id, type)}}
                                />
                            </AtSwipeAction>
                        )
                    })
                }
            </AtList>
        )
    }
}