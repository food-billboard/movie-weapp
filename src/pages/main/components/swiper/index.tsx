import Taro, {Component} from '@tarojs/taro'
import { Swiper, SwiperItem, Image } from '@tarojs/components'
import {router} from '~utils'

interface List {
    id: string,
    image: string
}

interface IProps {
    list: Array<List>
}

class Index extends Component<IProps>{
    public static defaultProps = {
        list: []
    }

    /**
     * 轮播图地址跳转
     */
    public getDetail(id: string, event: any): void {
        router.push('/detail', {id})
    }

    public render() {
        const { list } = this.props
        const swiper = list.map((value) => {
            const { id, image } = value
            return (
                <SwiperItem 
                    key={id}
                    style={{backgroundColor: 'yellow'}}
                    onClick={(event) => {this.getDetail.bind(this, id, event)}}>
                    <Image
                        style={{width: "100%", height: "100%"}}
                        src={image}
                    />
                </SwiperItem>
            )
        })
        return (
            <Swiper
                indicatorColor='#999'
                indicatorActiveColor='#333'
                circular
                indicatorDots
                autoplay>
                {swiper}
            </Swiper>
        )   
    }
}

export default Index