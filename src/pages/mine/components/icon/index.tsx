import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtGrid } from "taro-ui"
import {router} from '~utils'
import { IProps, List } from './interface'
import { style } from '~theme/global-style'

import './index.scss'

export default class IconList extends Component<IProps>{

    readonly list: Array<List> = [
        {
            value: '关注',
            iconInfo: {
                size: 28,
                value: 'heart-2'
            }
        },
        {
            value: '我的评论',
            iconInfo: {
                size: 28,
                value: 'bookmark'
            }
        },
        {
            value: '浏览记录',
            iconInfo: {
                size: 28,
                value: 'filter'
            }
        }
    ]

    //处理点击
    public handleClick = (item: any, index: number) => {
        const {value} = item
        const {id} = this.props
        switch(value) {
            case '关注': 
                router.push('/attention', {id})
                break;
            case '我的评论': 
                router.push('/mycomment', {id})
                break
            case '浏览记录':
            default:
                router.push('/record', {id})

        }
    }
    public render() {
        return (
            <View className='icon'
                style={{...style.border(1, 'thirdly', 'solid', 'bottom')}}
            >
                <AtGrid 
                    data={this.list}
                    mode={'square'}    
                    hasBorder={false}
                    columnNum={3}
                    onClick={this.handleClick}
                />
            </View>
        )
    }
}