import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { IProps } from './index.d'
import style from '~theme/style'
import './index.scss'
import { router, formatNumber, routeAlias } from '~utils'

export default class IconList extends Component<IProps>{
    public static defaultProps: IProps = {
        list: [],
        handleClick: () => {}
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
    public goTo = (name, id, event) => {
        router.push(routeAlias.detail, {id})
    }

    public render() {
        const {list} = this.props
        return(
            <View className='icon at-row at-row--wrap at-row__justify--around'>
                {
                    list.map((value) => {
                        const {id, name, image, hot} = value
                        return (
                            <View 
                                className='icon-content at-col at-col-5'
                                style={{...style.backgroundColor('disabled')}}
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
                                        style={{...style.color('primary')}}
                                        onClick={this.handleClick.bind(this, id)}
                                    >{name}</View>
                                    <View className='count'
                                        style={{...style.color('secondary')}}
                                    >
                                        {formatNumber(hot)}
                                        <Text className='text'>人看</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}