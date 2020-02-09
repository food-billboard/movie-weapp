import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { router, formatNumber } from '~utils'

interface List {
    id: string, 
    name: string, 
    image: string, 
    hot: number
}

interface IProps {
    list: Array<List>
}

export default class IconList extends Component<IProps>{
    public static defaultProps = {
        list: []
    }

    public constructor() {
        super(...arguments)
        this.goTo = this.goTo.bind(this)
    }

    /**
     * 路由跳转
     */
    public goTo(name, id, event) {
        router.push('/detail', {id})
    }

    public render() {
        const {list} = this.props
        const lists = list.map((value) => {
            const {id, name, image, hot} = value
            return (
                <View className='icon-content at-col at-col-5'
                    onClick={(event) => {this.goTo.call(this, name, id, event)}}
                    key={id}
                >
                    <View className='img'>             
                        <Image src={image} className='img-main' />
                    </View>
                    <View>
                        <View className='name'>{name}</View>
                        <View className='count'>
                            {formatNumber(hot)}
                            <Text className='text'>人看</Text>
                        </View>
                    </View>
                </View>
            )
        })
        return(
            <View className='icon at-row at-row--wrap at-row__justify--around'>
                {lists}
            </View>
        )
    }
}