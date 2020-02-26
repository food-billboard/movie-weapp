import Taro, {Component} from '@tarojs/taro'
import { Swiper, SwiperItem, Image } from '@tarojs/components'
import { router, routeAlias } from '~utils'
import { IProps } from './interface'
import { TypeColor } from '~theme/global-style'

class Index extends Component<IProps>{
    public static defaultProps = {
        list: []
    }

    /**
     * 轮播图地址跳转
     */
    public getDetail(id: string, event: any): void {
        router.push(routeAlias.detail, {id})
    }

    public render() {
        const { list } = this.props
        const swiper = list.map((value) => {
            const { id, image } = value
            return (
                <SwiperItem 
                    key={id}
                    onClick={(event) => {this.getDetail.call(this, id, event)}}>
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