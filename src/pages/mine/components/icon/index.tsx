import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtGrid } from "taro-ui"
import { router, routeAlias } from '~utils'
import { IProps, List } from './interface'
import { style, TypeColor } from '~theme/global-style'

import './index.scss'

export default class IconList extends Component<IProps>{

    public state: any = {
        typeColor: TypeColor
    }

    public componentDidShow = () => {
        const { typeColor } = this.state
        if(typeColor == TypeColor) return
        this.setState({typeColor: TypeColor})
    }

    //标题配置
    readonly titleConfig = {
        attention: '关注',
        comment: '我的评论',
        record: '浏览记录'
    }

    readonly list: Array<List> = [
        {
            value: this.titleConfig.attention,
            iconInfo: {
                size: 28,
                value: 'heart-2',
                color: TypeColor['thirdly']
            }
        },
        {
            value: this.titleConfig.comment,
            iconInfo: {
                size: 28,
                value: 'bookmark',
                color: TypeColor['thirdly']
            }
        },
        {
            value: this.titleConfig.record,
            iconInfo: {
                size: 28,
                value: 'filter',
                color: TypeColor['thirdly']
            }
        }
    ]

    //处理点击
    public handleClick = (item: any, index: number) => {
        const {value} = item
        const {id} = this.props
        switch(value) {
            case titleConfig.attention: 
                router.push(routeAlias.attention, {id})
                break;
            case titleConfig.comment: 
                router.push(routeAlias.mycomment, {id})
                break
            case titleConfig.record:
            default:
                router.push(routeAlias.record, {id})

        }
    }

    public render() {
        return (
            <View className='icon'
                style={{...style.border(1, 'thirdly', 'solid', 'bottom')}}
            >
                <AtGrid 
                    data={this.list.map((val: List) => {
                        const { iconInfo } = val
                        return { 
                            ...val,
                            iconInfo: { ...iconInfo, color: TypeColor['thirdly'] }
                        }
                    })}
                    mode={'square'}    
                    hasBorder={false}
                    columnNum={3}
                    onClick={this.handleClick}
                />
            </View>
        )
    }
}