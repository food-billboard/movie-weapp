import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import Item from './item'
import './index.scss'
import { router } from '~utils'

interface IList {
    img: string, 
    name: string, 
    type: string, 
    time: string | number, 
    hot: number, 
    id: string
}

interface IProps {
    list: Array<IList>
}

export default class List extends Component<IProps>{
    public static defaultProps: IProps = {
        list: []
    }
    
    public constructor() {
        super(...arguments)
        this.goTo = this.goTo.bind(this)
    }

    public goTo(id: string): void {
        router.push('/detail', {id})
    }

    public render() {
        const { list } = this.props
        const lists = list.map((value) => {
            const {img, name, type, time, hot, id} = value
            return (
                <View className='list-content'
                    key={id}
                    onClick={this.goTo.bind(this, id)}
                >
                    <View className='img'>  
                        <Image
                            className='img-content'
                            src={img}
                        />
                    </View>
                    <View className='detail'>
                        <View className='name'>
                            {name}
                        </View>
                        <Item 
                            type={'类型: '}
                            value={type} 
                        />
                        <Item 
                            type={'更新: '}
                            value={time} 
                        />
                        <Item 
                            type={'人气: '}
                            value={hot} 
                        />
                    </View>
                </View>
            )
        })
        return(
            <View className='list'>
                {lists}
            </View>
        )
    }
}