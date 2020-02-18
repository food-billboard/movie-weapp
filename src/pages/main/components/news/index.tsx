import Taro, {Component} from '@tarojs/taro'
import {ScrollView, View, Image} from '@tarojs/components'
import { IProps } from './interface'

import './index.scss'

import {router} from '~utils'

class News extends Component<IProps>{
    public static defaultProps = {
        count: 8,
        list: []
    }
    
    /**
     * 路由跳转
     */
    public gotTo(id: string) {
        router.push('/detail', {id})
    }

    public render() {
        const {list} = this.props
        const news = list.map((value) => {
            const { id, title, image } = value
            return (
                <View className='news-img'
                    onClick={(event) => {this.gotTo.call(this, id)}}
                    key={id}
                    >
                    <Image 
                        src={image}
                        className='news-img-main'
                    />
                </View>
            )
        })
        return (
            <ScrollView
                scrollX
                scrollWithAnimation
                className='news-main'
            >
                {news}
            </ScrollView>
        )
    }
}

export default News