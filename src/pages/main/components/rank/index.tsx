import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'
import RankIcon from './icon'

import {router} from '~utils'

interface List {
    rank: number,
    id: string,
    img: string,
    name: string
}

interface IProps {
    count: number,
    type: string,
    list: Array<List>
}

export default class Rank extends Component<IProps>{
    public static defaultProps = {
        count: 3,
        type: '综合排行榜',
        list: []
    }

    public constructor() {
        super(...arguments)
        this.getDetail = this.getDetail.bind(this)
    }

    /**
     * 获取详细信息
     */
    public getDetail = (id: string) => {
        router.push('/detail', {id})
    }

    public render() {
        const {list, type} = this.props
        const ranks = list.map((value) => {
            const {rank, id, img, name} = value
            return (
                <View 
                    className='rank-list'
                    key={id}
                    onClick={this.getDetail.bind(this, id)}
                >
                    <Image 
                        className='rank-img'
                        src={img}
                    />
                    <RankIcon rank={rank} />
                </View>
            )
        })
        return (
            <View className='rank-main'>
                <Text className='rank-title'>{type}</Text>
                <View className='ran-content'>
                    {ranks}
                </View>
            </View>    
        )
    }
}



