import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { router, formatNumber } from '~utils'

export interface IList {
    id: string, 
    name: string, 
    image: string, 
    hot: number
}

interface IProps {
    list: Array<IList>
    handleClick: (...args: any) => any
}

export default class IconList extends Component<IProps>{
    public static defaultProps: IProps = {
        list: [],
        handleClick: () => {}
    }

    public constructor() {
        super(...arguments)
        this.goTo = this.goTo.bind(this)
    }

    /**
     * 自定义点击
     * @parma id 电影id
     */
    public handleClick = (id: string) => {
        this.props.handleClick(id)
    }

    /**
     * 路由跳转
     */
    public goTo(name, id, event) {
        router.push('/detail', {id})
    }

    public render() {
        const {list} = this.props
        const lists = list.map((value) => {
            const {id, name, image, hot} = value
            return (
                <View 
                    className='icon-content at-col at-col-5'
                    key={id}
                >
                    <View 
                        className='img'
                        onClick={(event) => {this.goTo.call(this, name, id, event)}}
                    >             
                        <Image src={image} className='img-main' />
                    </View>
                    <View>
                        <View 
                            className='name'
                            onClick={this.handleClick.bind(this, id)}
                        >{name}</View>
                        <View className='count'>
                            {formatNumber(hot)}
                            <Text className='text'>人看</Text>
                        </View>
                    </View>
                </View>
            )
        })
        return(
            <View className='icon at-row at-row--wrap at-row__justify--around'>
                {lists}
            </View>
        )
    }
}