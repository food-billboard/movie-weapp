import Taro, {Component} from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import { TypeColor, colorStyleChange } from '~theme/color'
import style from '~theme/style'
import { IProps } from './index.d'
import { router, routeAlias} from '~utils'
import ImageLoading from '~components/imageLoading'

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
        router.push(routeAlias.detail, { id })
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
                        const { _id: id, name: title, poster: image } = value
                        return (
                            <View className='news-img'
                                onClick={(_) => {this.gotTo.call(this, id)}}
                                key={id}
                                >
                                <Text 
                                    className='news-title'
                                    style={{...style.color('primary'), textShadow: `0 0 2px ${TypeColor['disabled']}`}}
                                >{title}</Text>
                                <ImageLoading
                                    src={image}
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