import Taro, {Component} from '@tarojs/taro'
import { ScrollView, View, Image, Text } from '@tarojs/components'
import { TypeColor, colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { IProps } from './index.d'
import { router, routeAlias} from '~utils'

import './index.scss'

const MAX_COUNT = 10

class News extends Component<IProps>{
    public static defaultProps = {
        count: MAX_COUNT,
        list: []
    }

    public componentDidShow = () => {
        colorStyleChange()
    }
    
    /**
     * 路由跳转
     */
    public gotTo(id: string) {
        router.push(routeAlias.detail, {id})
    }

    public render() {
        const {list} = this.props
        return (
            <ScrollView
                scrollX
                scrollWithAnimation
                className='news-main'
            >
                {
                    list.map((value) => {
                        const { id, title, image } = value
                        return (
                            <View className='news-img'
                                onClick={(event) => {this.gotTo.call(this, id)}}
                                key={id}
                                >
                                <Text 
                                    className='news-title'
                                    style={{...style.color('primary'), textShadow: `0 0 2px ${TypeColor['disabled']}`}}
                                >{title}</Text>
                                <Image 
                                    src={image}
                                    className='news-img-main'
                                />
                            </View>
                        )
                    })
                }
            </ScrollView>
        )
    }
}

export default News