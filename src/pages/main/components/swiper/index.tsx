import Taro, {Component} from '@tarojs/taro'
import { Swiper, SwiperItem, Image } from '@tarojs/components'
import { router, routeAlias, swiperRouteType } from '~utils'
import { IProps } from './interface'
import { TypeColor } from '~theme/global-style'

class Index extends Component<IProps>{
    public static defaultProps = {
        list: []
    }

    /**
     * 轮播图地址跳转
     */
    public getDetail = (id: string, type: string) => {
        switch(swiperRouteType[type]) {
            case swiperRouteType.comment:
                router.push(routeAlias.comment, { id })
                break
            case swiperRouteType.media:
                router.push(routeAlias.detail, { id })
                break
            case swiperRouteType.special:
                router.push(routeAlias.special, { id })
                break
        }
    }

    public render() {
        const { list } = this.props
        const swiper = list.map((value) => {
            const { id, image, type } = value
            return (
                <SwiperItem 
                    key={id}
                    onClick={(event) => {this.getDetail.call(this, id, type)}}>
                    <Image
                        style={{width: "100%", height: "100%"}}
                        src={image}
                    />
                </SwiperItem>
            )
        })
        return (
            <Swiper
                indicatorColor={TypeColor['primary']}
                indicatorActiveColor={TypeColor['disabled']}
                circular
                indicatorDots
                autoplay>
                {swiper}
            </Swiper>
        )   
    }
}

export default Index