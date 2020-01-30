import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

import {router} from '~utils'

interface Content {
    name: string,
    detail: string,
    img: string,
    id: string  
}

interface IProps {
    content: Content
    style?: {} | object
}

export default class NewsHead extends Component<IProps>{
    public static defaultProps: IProps = {
        content: {
            name: '',
            detail: '',
            img: '',
            id: ''  
        },
        style: {}
    }

    public constructor() {
        super(...arguments)
        this.handleClick = this.handleClick.bind(this)
    }

    public handleClick(id: string): void {
        router.push('/detail', {id})
    }

    public render() {
        const { content, style } = this.props
        const {detail, name, id, img} = content
        return (
            <View className='head'
                style={style}
                onClick={this.handleClick.bind(this, id)}>
                <View className='img'>
                    <Image src={img} className='content'></Image>            
                </View>
                <View className='detail'>
                    <View className='at-article'>
                        <View className='at-article__h3'>
                            {name}
                        </View>
                        <View className='at-article__content'>
                            <View className='at-article__section'>
                                <View className='at-article__p article'>
                                    {detail}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='enter'>
                    >
                </View>
            </View>
        )
    }
}