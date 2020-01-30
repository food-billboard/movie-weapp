import Taro, {Component} from '@tarojs/taro'
import {ScrollView, View, Image} from '@tarojs/components'
import './index.scss'

import {router} from '~utils'

interface List {
    id: string,
    title: string,
    img: string
}

interface IProps {
    count: number,
    list: Array<List>
}

class News extends Component<IProps>{
    public static defaultProps = {
        count: 8,
        list: []
    }
    
    /**
     * 路由跳转
     */
    public gotTo(id: string, title: string, event: object) {
        console.log(`路由跳转${id}, ${title}`)
        //还没有实现
        router.push('/detail', {id})
    }

    public render() {
        const {list} = this.props
        const news = list.map((value) => {
            const { id, title, img } = value
            return (
                <View className='news-img'
                    onClick={(event) => {this.gotTo.bind(this, id, title, event)}}
                    key={id}
                    >
                    <Image 
                        src={img}
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