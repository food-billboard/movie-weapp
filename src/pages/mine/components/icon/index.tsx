import Taro, {Component} from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtGrid } from "taro-ui"
import './index.scss'
import {router} from '~utils'

interface List {
    image: string,
    value: string
}

interface IProps {
    list: Array<List>,
    id: string
}

export default class IconList extends Component<IProps>{
    public static defaultProps = {
        list: [
            {
                image: '../../../../assets/attention.png',
                value: '关注'
            },
            {
                image: '../../../../assets/comment.png',
                value: '我的评论'
            },
            {
                image: '../../../../assets/record.png',
                value: '浏览记录'
            }
        ]
    }

    public constructor() {
        super(...arguments)
        this.handleClick = this.handleClick.bind(this)
    }

    public handleClick(item: object, index: number) {
        console.log(`获取项目值${index}`)
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
        const {list} = this.props
        return (
            <View className='icon'>
                <AtGrid 
                    data={list}
                    mode={'square'}    
                    hasBorder={false}
                    columnNum={3}
                    onClick={this.handleClick}
                />
            </View>
        )
    }
}