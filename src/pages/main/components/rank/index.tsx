import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import RankIcon from './icon'
import { IProps, IState } from './index.d'
import { router, routeAlias } from '~utils'
import style from '~theme/style'
import ImageLoading from '~components/imageLoading'

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

        return (
            <View className='rank-main' style={propsStyle}>
                <Text 
                    className={'rank-title'} 
                    style={{...style.backgroundColor('secondary'), ...style.color('disabled')}}
                    onClick={() => { router.push(routeAlias.rank, { id, type }) }}
                >{type}</Text>
                <View className='ran-content'>
                    {
                        list.map(( value, index ) => {
                            const { _id, poster } = value
                            return (
                                <View 
                                    className='rank-list'
                                    key={_id}
                                    onClick={this.getDetail.bind(this, _id)}
                                >
                                    <ImageLoading
                                        src={poster}
                                    />
                                    <RankIcon rank={index + 1} />
                                </View>
                            )
                        })
                    }
                </View>
            </View>    
        )
    }
}



