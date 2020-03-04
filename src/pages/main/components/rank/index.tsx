import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'
import RankIcon from './icon'
import { IProps, IState } from './index.d'
import { router, routeAlias } from '~utils'
import style from '~theme/style'

export default class Rank extends Component<IProps, IState>{
    public static defaultProps = {
        count: 3,
        type: '综合排行榜',
        list: [],
        id: 0
    }

    /**
     * 获取详细信息
     */
    public getDetail = (id: string) => {
        router.push(routeAlias.detail, {id})
    }

    public render() {
        const { list, type, id, style:propsStyle={} } = this.props
        const ranks = list.map((value) => {
            const {rank, id, image, name} = value
            return (
                <View 
                    className='rank-list'
                    key={id}
                    onClick={this.getDetail.bind(this, id)}
                >
                    <Image 
                        className='rank-img'
                        src={image}
                    />
                    <RankIcon rank={rank} />
                </View>
            )
        })
        return (
            <View className='rank-main' style={propsStyle}>
                <Text 
                    className={'rank-title'} 
                    style={{...style.backgroundColor('secondary'), ...style.color('disabled')}}
                    onClick={() => { router.push(routeAlias.rank, { id, type }) }}
                >{type}</Text>
                <View className='ran-content'>
                    {ranks}
                </View>
            </View>    
        )
    }
}



