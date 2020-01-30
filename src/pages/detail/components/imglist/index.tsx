import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

interface IList {
    img: string,
    id: string
}

interface IProps {
    list: Array<IList>
}

export default class List extends Component<IProps> {
    public static defaultProps = {
        list: []
    }
    
    public render() {
        const {list} = this.props
        const lists = list.map((value, index) => {
            const { img, id } = value
            return (
                <View className='content'
                    key={id}
                >
                    <Image 
                        src={img} 
                        className='main'
                     />
                </View>
            )
        })
        return (
            <View className='list'>
                {lists}
            </View>
        )
    }
}